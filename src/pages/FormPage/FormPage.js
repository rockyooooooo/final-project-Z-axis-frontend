import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import EditIssueContext from '../../contexts/editIssueContext'
import { plusIcon } from '../../components/icons'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { DateRange } from 'react-date-range'
import { BackstageNavbar } from '../../components/Navbar/BackstageNavbar'
import Menu from '../../components/Menu/Menu'
import BackstageMenuContent from '../../components/Menu/BackstageMenuContent'
import {
  AddFormWrapper,
  FormTitle,
  InputText,
  ErrorMessage,
  SubmitBtn
} from '../../components/form'

const FormPage = () => {
  const { editIssue, setEditIssue } = useContext(EditIssueContext)
  const { isEdit } = editIssue
  const history = useHistory()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (isEdit) {
      const {
        title,
        description,
        date: { startDate, endDate }
      } = editIssue
      setTitle(title)
      setDescription(description)
      setDate([
        {
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          key: 'selection'
        }
      ])
    }
  }, [editIssue, isEdit])

  useEffect(() => {
    setErrorMessage('')
  }, [title, description, date])

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const startDate = new Date(date[0].startDate).toISOString().slice(0, 10)
    const endDate = new Date(date[0].endDate).toISOString().slice(0, 10)

    if (title === '' || startDate === '' || endDate === '') {
      return setErrorMessage('必填欄位：標題、起始日期、結束日期')
    }

    setTitle('')
    setDescription('')
    setDate([
      {
        startDate: new Date(),
        endDate: null,
        key: 'selection'
      }
    ])

    // todo: 串編輯 API
    if (isEdit) {
      // ... post edited issue
      setEditIssue({
        isEdit: false,
        title,
        description,
        date: {
          startDate: new Date(date[0].startDate).toISOString().slice(0, 10),
          endDate: new Date(date[0].endDate).toISOString().slice(0, 10),
          key: 'selection'
        }
      })
      history.push('/backstage/issues/' + editIssue.url)
      return console.log(title, description, startDate, endDate)
    }

    // todo: 串 API
    return console.log(title, description, startDate, endDate)
  }

  return (
    <>
      <Menu
        userId={1}
        nickname="嘎嘎嗚拉拉"
        MenuContent={BackstageMenuContent}
      />
      <BackstageNavbar iconName={plusIcon} title="建立" />
      <AddFormWrapper onSubmit={handleFormSubmit}>
        <FormTitle>{isEdit ? '編輯' : '新增'}留言箱</FormTitle>
        <InputText
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          placeholder="標題"
        />
        <InputText
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name="description"
          placeholder="描述"
        />
        <DateRange
          editableDateInputs={true}
          onChange={(e) => setDate([e.selection])}
          moveRangeOnFirstSelection={false}
          ranges={date}
          minDate={new Date()}
        />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <SubmitBtn type="submit">{isEdit ? '更新' : '送出'}</SubmitBtn>
      </AddFormWrapper>
    </>
  )
}

export default FormPage
