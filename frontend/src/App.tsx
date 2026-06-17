import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Splash } from './pages/Splash';
import { Welcome } from './pages/Welcome';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { SignupEmail } from './pages/SignupEmail';
import { ForgotPassword } from './pages/ForgotPassword';
import { OTP } from './pages/OTP';
import { Onboarding } from './pages/Onboarding';
import { Permissions } from './pages/Permissions';
import { Success } from './pages/Success';
import { Profile } from './pages/Profile';
import { Feed } from './pages/Feed';
import { Hunt } from './pages/Hunt';
import { HuntBuilder } from './pages/HuntBuilder';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/splash" replace />} />
        <Route path="/splash" element={<Splash />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/email" element={<SignupEmail />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/verify" element={<OTP />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/permissions" element={<Permissions />} />
        <Route path="/success" element={<Success />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/hunt" element={<Hunt />} />
        <Route path="/create" element={<HuntBuilder />} />
      </Routes>
    </BrowserRouter>
  );
}
