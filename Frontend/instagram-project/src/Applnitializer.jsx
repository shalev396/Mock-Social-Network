import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { login } from './Redux/authSlice';

const AppInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      axios
        .get('http://85.250.88.33:3006/api/users/self', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          dispatch(login({ token, user: response.data }));
        })
        .catch((error) => {
          console.error('Error initializing user:', error);
        });
    }
  }, [dispatch]);

  return null; // This component does not render anything visible.
};

export default AppInitializer;
