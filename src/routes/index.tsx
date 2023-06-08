import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// import { Loader } from 'components/Loader';

const AppRoutes = lazy(() => import('./routes'));

function RootRoutes() {
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
