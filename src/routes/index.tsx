import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// import { Loader } from 'components/Loader';

const AppRoutes = lazy(() => import('./routes'));

function RootRoutes() {
  console.log('root routes');

  console.log('test logs');
  console.log('test logs2');

  console.log('end root routes');



  return (
    <Routes>
      <Route
        path="/*"
        element={(
            <AppRoutes />
        )}
      />
    </Routes>
  );
}

export default RootRoutes;
