import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/AuthContext';

import './style.css';

export const SignUp = () => {
  const { signUp } = useAuth();
  const { push } = useHistory();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();
      const parsedData = {
        username: name.trim(),
        email: email.trim(),
        password: password.trim(),
      };
      const res = await signUp(parsedData);

      if (res.status === 200) {
        return push('/');
      } else {
        return alert('Algo deu errado', 'Confira os valores e tente novamente');
      }
    },
    [name, email, password, passwordConfirmation],
  );

  return (
    <div id="container-signUp">
      <h3>SignUp</h3>
      <form className="content" onSubmit={handleSubmit}>
        <input
          id="name"
          placeholder="Nome"
          required
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
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
          placeholder="Senha"
          required
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input
          required
          id="password-confirmation"
          placeholder="Confirme sua senha"
          type="password"
          value={passwordConfirmation}
          onChange={e => setPasswordConfirmation(e.target.value)}
        />
        <button className="signUp-button" type="submit">
          Cadastrar
        </button>
      </form>
    </div>
  );
};
