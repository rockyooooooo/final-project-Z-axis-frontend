import React, { useState } from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { useTheme } from '@emotion/react'
import { sendIcon } from './../styles/icon'
import flexJustifyAlign from './../styles/flexJustifyAlign'
import { createComment } from './../webapi/commentApi'

const AddCommentFormWrapper = styled.form`
  position: fixed;
  bottom: 0rem;
  width: 95%;
  background: ${({ theme }) => theme.secondary_900};
  padding: 1rem 0;
  ${flexJustifyAlign()}
  gap: 0.3rem;
  z-index: 1;
`

const NicknameInput = styled.input`
  width: 20%;
  padding: 0.5rem 1rem;
  border: ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.secondary_300};
  border-radius: 1.5rem;
  color: ${({ theme }) => theme.secondary_900};
  &::placeholder {
    color: ${({ theme }) => theme.secondary_900};
  }
  &:focus {
    width: 80%;
    outline: none;
  }
`

const CommentInput = styled.input`
  width: 80%;
  padding: 0.5rem 1rem;
  border: ${({ theme }) => theme.border};
  border-radius: 1.5rem;
  &::placeholder {
    color: ${({ theme }) => theme.secondary_300};
  }
  &:focus {
    outline: none;
  }
`

const CommentSubmitBtn = styled.div`
  background: none;
  border: none;
  cursor: pointer;
`

const AddCommentForm = ({ IssueId, guestToken }) => {
  const theme = useTheme()
  const [nickname, setNickname] = useState('')
  const [content, setContent] = useState('')

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (content === '') {
      return
    }
    await createComment(guestToken, IssueId, nickname, content)

    setNickname('')
    setContent('')
  }

  return (
    <AddCommentFormWrapper>
      <NicknameInput
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="暱稱"
      />
      <CommentInput
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="輸入留言"
      />
      <CommentSubmitBtn onClick={handleCommentSubmit}>
        {sendIcon('2x', theme.primary)}
      </CommentSubmitBtn>
    </AddCommentFormWrapper>
  )
}

AddCommentForm.propTypes = {
  IssueId: PropTypes.number,
  guestToken: PropTypes.string
}

export default AddCommentForm
