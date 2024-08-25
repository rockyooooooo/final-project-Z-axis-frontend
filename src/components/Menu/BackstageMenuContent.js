import React from 'react'
import styled from '@emotion/styled'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '@emotion/react'
import PropTypes from 'prop-types'
import flexJustifyAlign from '../../styles/flexJustifyAlign'
import optionList from '../../constants/optionList'
import Avatar from '../../components/Avatar'

const BackStageMenu = styled.div`
  ${flexJustifyAlign()}
  flex-direction: column;
`

const Profile = styled.div`
  ${flexJustifyAlign()}
  flex-direction: column;
`

const MenuAvatarWrapper = styled.div`
  margin: 1rem 0;
`

const EditBtn = styled(Link)`
  font-size: 0.875rem;
  padding: 0.3rem 1rem;
  border-radius: 2.5rem;
  border: ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.secondary_300};
`

const OptionWrapper = styled.div`
  margin: 1.5rem 0;
  ${flexJustifyAlign()}
  flex-wrap: wrap;
  gap: 1.5em;
`

const OptionBtn = styled(Link)`
  width: 7rem;
  height: 6rem;
  color: ${({ theme }) => theme.secondary_000};
  border: ${({ theme }) => theme.border};
  border-radius: 1rem;
  ${flexJustifyAlign()}
  flex-direction: column;
  gap: 0.5rem;
`

const Text = styled.div`
  color: ${({ color }) => color};
`
const Option = ({ iconName, optionName, path, disabled }) => {
  const location = useLocation()
  const theme = useTheme()
  return (
    <>
      <OptionBtn to={path} disabled={disabled}>
        {iconName(
          '2x',
          location.pathname === path ? theme.primary : theme.secondary_300
        )}
        <Text
          color={
            location.pathname === path ? theme.primary : theme.secondary_000
          }
        >
          {disabled ? '敬請期待' : optionName}
        </Text>
      </OptionBtn>
    </>
  )
}

Option.propTypes = {
  iconName: PropTypes.func,
  optionName: PropTypes.string,
  path: PropTypes.string,
  disabled: PropTypes.bool
}

const BackstageMenuContent = () => {
  return (
    <BackStageMenu>
      <Profile>
        <MenuAvatarWrapper>
          <Avatar size={'70px'} />
        </MenuAvatarWrapper>
        <EditBtn to="/user/me">個人資料</EditBtn>
      </Profile>
      <OptionWrapper>
        {optionList.map((option) => (
          <Option
            key={option.optionName}
            iconName={option.iconName}
            optionName={option.optionName}
            path={option.path}
            disabled={option.disabled}
          />
        ))}
      </OptionWrapper>
    </BackStageMenu>
  )
}

export default BackstageMenuContent
