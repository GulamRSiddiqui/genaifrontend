import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Header = () => {
  const {user} = useContext(AuthContext)
  return (
    <div>
      <Link to="/">Home</Link>
      <span> | </span>
      <Link to="/login">Login</Link>

      <p>{user ? (
                <div>
                    <h2>Welcome, {user.email}!</h2>
                    <p>User ID: {user.user_id}</p>
                    <p>Token Type: {user.token_type}</p>
                    {/* Add any other properties you want to display */}
                </div>
            ) : (
                <h2>Please log in.</h2>
            )}</p>
    </div>
  )
}

export default Header


