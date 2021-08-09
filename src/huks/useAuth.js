import { useContext } from 'react';
import { authContext } from '../App.js';

export function useAuth() {
  const value = useContext(authContext);

  return value;
}
