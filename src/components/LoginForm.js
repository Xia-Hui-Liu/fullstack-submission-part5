import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, password, usernameChange, passwordChange }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
            username
        <input type="text" value={username} name="Username" onChange={usernameChange} />
      </div>
      <div>
            password
        <input
          type="text"
          value={password}
          name="Password"
          autoComplete="off"
          onChange={passwordChange}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  usernameChange: PropTypes.func.isRequired,
  passwordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm