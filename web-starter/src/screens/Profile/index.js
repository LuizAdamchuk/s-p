import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/AuthContext';
import './style.css';

export const Profile = () => {
  const { signOut } = useAuth();
  const { push } = useHistory();

  const handleSignOut = useCallback(() => {
    signOut();
    push('/');
  }, []);
  return (
    <div id="container-profile">
      <h3>Profile</h3>
      <button onClick={handleSignOut}>Sair</button>
    </div>
  );
};
