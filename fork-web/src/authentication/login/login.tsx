import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
  };
  return (
    <Card className="m-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Welcome Back, Foodie!</CardTitle>
        <CardDescription>
          Log in to connect with food lovers and share recipes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              disabled={isLoading}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                to="/forgot"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              disabled={isLoading}
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            onClick={handleLogin}
            className="w-full"
          >
            {isLoading && <Loader2 className="animate-spin" />}
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
          <Button variant="outline" className="w-full">
            Login with Apple
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link to={'/auth/signup'} className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
