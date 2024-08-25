import {
  plusIcon,
  backstageIcon,
  issueIcon,
  testIcon,
  lotteryIcon,
  questionIcon
} from '../components/icons'

const optionList = [
  { iconName: plusIcon, optionName: '建立', path: '/add' },
  { iconName: backstageIcon, optionName: '後台', path: '/backstage' },
  { iconName: issueIcon, optionName: '留言箱', path: '/issues' },
  { iconName: testIcon, optionName: '測驗', path: '#', disabled: true },
  { iconName: lotteryIcon, optionName: '抽獎', path: '#', disabled: true },
  { iconName: questionIcon, optionName: '問卷', path: '#', disabled: true }
]

export default optionList
