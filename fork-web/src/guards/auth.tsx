import { useAppStore } from '@/stores';
import { ReactNode } from 'react';
import { Navigate } from 'react-router';

export const AuthGuard = ({ children }: { children: ReactNode }) => {
  const user = useAppStore((s) => s.user);

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};
