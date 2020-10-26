import React, { useCallback, useState } from 'react';

import './style.css';
import { useAuth } from '../../hooks/AuthContext';
import { Link, useHistory } from 'react-router-dom';

export const SignIn = () => {
  const { push } = useHistory();

  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = useCallback(
    async e => {
      e.preventDefault();
      console.log(email, password);
      await signIn({
        email,
        password,
      });
      push('/home');
    },
    [email, password],
  );

  return (
    <div id="container-signIn">
      <h3>SignIn</h3>
      <p>teste</p>

      <form className="content" onSubmit={handleLogin}>
        <input
          id="email"
          placeholder="E-mail"
          required
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          id="password"
          required
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="signIn-button" type="submit">
          Entrar
        </button>
        <Link to="/sign-up">Cadastrar</Link>
        <Link to="/forgot-password">Esqueceu senha?</Link>
      </form>
    </div>
  );
};
