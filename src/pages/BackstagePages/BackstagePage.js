import React, { useEffect, useState, useContext } from 'react'
import { useTheme } from '@emotion/react'
import moment from 'moment'

import { BackstageSearchNavbar } from '../../components/Navbar/BackstageNavbar'
import BackstageMenuContent from '../../components/Menu/BackstageMenuContent'
import Menu from '../../components/Menu/Menu'
import { commentIcon, issueIcon } from '../../components/icons'
import { getAllIssues } from '../../webapi/issueApi'
import LoadingContext from '../../contexts/loadingContext'
import {
  ActivitiesContainer,
  ActivityContent,
  ActivityDescription,
  ActivityHeader,
  ActivityInfo,
  ActivityTitle,
  ActivityType,
  ActivityWrapper,
  PositionedButton,
  StyledLink
} from './components'
import { isIssueFinished, isIssueOncoming, isIssueOngoing } from '../../utils'

const getIssueStatus = (issue) => {
  if (isIssueFinished(issue)) return '已結束'
  if (isIssueOncoming(issue)) return '即將發布'
  if (isIssueOngoing(issue)) return '進行中'
}

const BackstagePage = () => {
  const [issues, setIssues] = useState([])
  const [filteredIssues, setFilteredIssues] = useState([])
  const theme = useTheme()
  const setIsLoading = useContext(LoadingContext)

  useEffect(() => {
    const doAsyncEffects = async () => {
      setIsLoading(true)
      let issuesData = []
      try {
        const response = await getAllIssues(3)
        const { data } = response
        if (!data.ok) throw new Error(data.message)
        issuesData = data.issuesWithURL
      } catch (error) {
        console.log(error.message)
      }
      setIsLoading(false)
      setIssues(issuesData)
    }
    doAsyncEffects()
  }, [])

  useEffect(() => {
    setFilteredIssues(issues)
  }, [issues])

  const renderIssues = () =>
    filteredIssues
      .sort((a, b) => new Date(b.issue.beginDate) - new Date(a.issue.beginDate))
      .map(({ issue, url, commentCount }) => (
        <ActivityContent key={issue.id} to={`/backstage/issues/${url}`}>
          <ActivityHeader color={theme.secondary_300}>
            <ActivityInfo>
              <div>{getIssueStatus(issue)}</div>
              <div>
                {moment(issue.beginDate).format('YYYY/MM/DD')} -{' '}
                {moment(issue.finishDate).format('YYYY/MM/DD')}
              </div>
            </ActivityInfo>
            <div>
              {commentIcon('sm', theme.secondary_300)} {commentCount}
            </div>
          </ActivityHeader>
          <ActivityTitle>{issue.title}</ActivityTitle>
          <ActivityDescription>{issue.description}</ActivityDescription>
        </ActivityContent>
      ))

  const renderIssueSection = () => (
    <ActivityWrapper>
      <ActivityType>
        {issueIcon('2x', theme.secondary_200)}
        留言箱
      </ActivityType>
      <ActivitiesContainer color={theme.secondary_300}>
        {renderIssues()}
        <PositionedButton color={theme.secondary_300}>
          <StyledLink to="/issues">看更多</StyledLink>
        </PositionedButton>
      </ActivitiesContainer>
    </ActivityWrapper>
  )

  return (
    <>
      <Menu MenuContent={BackstageMenuContent} />
      <BackstageSearchNavbar
        issues={issues}
        setFilteredIssues={setFilteredIssues}
      />
      {renderIssueSection()}
    </>
  )
}

export default BackstagePage
