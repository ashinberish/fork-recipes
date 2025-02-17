import { BrowserRouter, Route, Routes } from 'react-router';
import AuthLayout from '@/pages/authentication/layout';
import Login from '@/pages/authentication/login/login';
import Signup from '@/pages/authentication/signup/signup';
import FeedsLayout from '@/layouts/feeds-layout';
import Feeds from '@/pages/feeds/feeds';
import { Toaster } from '@/components/ui/sonner';

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
      <Toaster richColors expand closeButton position="top-right" />
    </>
  );
}

export default App;
