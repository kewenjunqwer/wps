import { Navigate } from 'react-router-dom';
import Form from './component/form';

//eslint-disable-next-line
export const routers = [
  {
    path: '/form',
    element: <Form />,
  },

  {
    path: '/',
    element: <Navigate to="/form" />,
  },
];
