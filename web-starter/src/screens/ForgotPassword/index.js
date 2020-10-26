import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import './style.css';

export const ForgotPassword = () => {
  const { push } = useHistory();

  const [email, setEmail] = useState('');

  const handleSendEmail = useCallback(
    e => {
      e.preventDefault();
      console.log(email);
    },
    [email],
  );

  return (
    <div id="container-forgotPassword">
      <h3>ForgotPassword</h3>
      <form className="content" onSubmit={handleSendEmail}>
        <input
          id="email"
          placeholder="E-mail"
          required
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button className="forgotPassword-button" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
};
