import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Login = lazy(() => import('./pages/login'));

function App() {
  return (
    <Router>
        <Routes>
          <Route
            path={'/login'}
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <Login />
              </Suspense>
            }
          />
         
        </Routes>
      </Router>
  );
}

export default App;
