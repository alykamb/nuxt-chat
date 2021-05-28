import auth from './auth'
import chat from './chat'
import users from './users'

export default () => ({
  auth: auth(),
  chat: chat(),
  users: users(),
  selectedUser: 'user2',
})
