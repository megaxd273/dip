import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from '../Pages/AuthPage/AuthPage';
import Dashboard from '../Pages/Dashboard/Dashboard';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<AuthPage />} />
        <Route element={<PrivateRoute/>}>
          <Route path="/dashboard/*" element={<Dashboard />}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;