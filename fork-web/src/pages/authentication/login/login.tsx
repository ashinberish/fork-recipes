import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router';
import AuthService from '@/services/auth';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodType } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export type LoginFormType = {
  email: string;
  password: string;
};

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { t } = useTranslation();

  const loginFormSchema: ZodType<LoginFormType> = z.object({
    email: z
      .string()
      .min(1, t('email_required'))
      .email(t('please_enter_valid_email')),
    password: z.string().min(1, t('password_required')),
  });
  const loginForm = useForm<LoginFormType>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginFormSchema),
  });

  const handleLogin = async () => {
    if (loginForm.formState.isValid!) {
      return;
    }
    setIsLoading(true);
    // if (email === null || password === null) {
    //   return;
    // }
    // await AuthService.login(email, password);
    // setIsLoading(false);
  };
  return (
    <Card className="m-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">{t('login_intro_header')}</CardTitle>
        <CardDescription>{t('login_intro_desc')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...loginForm}>
          <form onSubmit={loginForm.handleSubmit(handleLogin)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('email')}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={`${t('enter_your_email')}`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="mt-3">
                      <div className="flex justify-between">
                        <FormLabel>{t('password')}</FormLabel>
                        <Link
                          to="/forgot"
                          className="ml-auto inline-block text-sm underline"
                        >
                          {t('forgot_your_password_qn_mark')}
                        </Link>
                      </div>
                      <FormControl>
                        <Input
                          placeholder={`${t('enter_your_password')}`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading && <Loader2 className="animate-spin" />}
                {t('login')}
              </Button>
              <Button type="button" variant="outline" className="w-full">
                {t('login_with_google')}
              </Button>
              <Button type="button" variant="outline" className="w-full">
                {t('login_with_apple')}
              </Button>
            </div>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          {t('dont_have_an_account_qn_mark')}{' '}
          <Link to={'/auth/signup'} className="underline">
            {t('signup')}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
