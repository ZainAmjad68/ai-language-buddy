import { Route, Routes } from 'react-router-dom';

import Menu from '../pages/Menu';
import Chat from '../pages/Chat';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import NotFound from '../pages/Error/404';
import InternalServerError from '../pages/Error/500';

const AppRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={(
          <Menu />
      )}
    />
    <Route
      path="/chat"
      element={(
          <Chat />
      )}
    />
    <Route
      path="/login"
      element={(
          <Login />
      )}
    />
    <Route
      path="/sign-up"
      element={(
          <SignUp />
      )}
    />
    <Route
      path="/500"
      element={(
        <InternalServerError />
      )}
    />
    <Route
      path="*"
      element={(
        <NotFound />
      )}
    />
  </Routes>
)

export default AppRoutes;
