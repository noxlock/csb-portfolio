import React from 'react';

export default function LoginForm({ onLogin }) {
  function handleSubmit(event) {
    event.preventDefault();
    const elements = event.target.elements;
    const username = elements.username.value;
    const password = elements.password.value;
    onLogin({ username, password });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Username
          <input type="text" name="username"/>
        </label>
      </div>
      <div>
        <label>
          Password
          <input type="password" name="password"/>
        </label>
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
