import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { api } from '../../services/api';
import { BASE_URL } from '../../constants/Keys';
import './style.css';

export const Home = () => {
  const [articlesData, setArticlesData] = useState([]);

  useEffect(() => {
    api.get('/articles').then(res => {
      setArticlesData(res.data);
    });
  }, []);
  console.log(articlesData);

  return (
    <div id="container-home">
      <h3>Home</h3>
      <Link to="/profile">Profile</Link>
      {articlesData && (
        <>
          {articlesData.map((i, k) => (
            <div key={i.id}>
              <h3>{i.title}</h3>
              <p>{i.message}</p>
              <img
                src={`${BASE_URL}${i.cover.url}`}
                alt={i.title}
                className="image"
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};
