import { BrowserRouter, Route, Routes } from 'react-router';
import AuthLayout from './authentication/layout';
import Login from '@/authentication/login/login';
import Signup from '@/authentication/signup/signup';
import FeedsLayout from './layouts/feeds-layout';
import Feeds from './pages/feeds/feeds';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FeedsLayout />}>
            <Route index element={<Feeds />} />
          </Route>
          <Route path="auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
