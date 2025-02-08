import { Outlet } from 'react-router';

export default function AuthLayout() {
  return (
    <div className="min-h-dvh bg-muted flex">
      <Outlet />
    </div>
  );
}
