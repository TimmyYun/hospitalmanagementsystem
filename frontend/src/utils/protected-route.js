import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/authContext';

export default function ProtectedRoute({ children }) {
  // console.log(user)
  const { user } = useContext(AuthContext)
  console.log(user)
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
