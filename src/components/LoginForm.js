const LoginForm = ({handleLogin, username, password, userNameChange, passwordChange}) => {
    return (
        <form onSubmit={handleLogin}>
          <div>
            username
            <input type="text" value={username} name="Username" onChange={userNameChange} />
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
        );
    };

    export default LoginForm;