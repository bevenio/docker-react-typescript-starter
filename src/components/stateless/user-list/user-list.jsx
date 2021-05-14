import './user-list.scss'

import React from 'react'

export const UserList = ({ children = [] }) => (
  <div className="app-user-list">{children}</div>
)

export default UserList
