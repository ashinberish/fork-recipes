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
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import AuthService from '@/services/auth';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

type ServerResponse = {
  message: string;
  success: boolean;
  errors?: Record<string, string>;
};

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const loginFormSchema = z.object({
    email: z
      .string()
      .min(1, t('email_required'))
      .email(t('please_enter_valid_email')),
    password: z.string().min(1, t('password_required')),
  });

  type LoginFormType = z.infer<typeof loginFormSchema>;

  const loginForm = useForm<LoginFormType>({
    defaultValues: {
      email: '',
      password: '',
    },
    reValidateMode: 'onSubmit',
    resolver: zodResolver(loginFormSchema),
  });

  const handleLogin = async () => {
    const isValid = await loginForm.trigger();
    if (!isValid) {
      return;
    }
    setIsLoading(true);

    const { email, password } = loginForm.getValues();
    try {
      const res = await AuthService.login(email, password);
      await AuthService.initProfile().then(() => {
        navigate('/');
      });
      if (res.success) {
        toast.success(t('login_success'), {
          description: t('login_success_desc'),
        });
      }
      setIsLoading(false);
    } catch (error: unknown) {
      const errorResponse = error as AxiosError<ServerResponse>;
      if (errorResponse.response?.status === 401) {
        toast.error(t('login_failed'), {
          description: t('invalid_credentials'),
        });
      } else {
        toast.error(t('login_failed'), {
          description:
            errorResponse.response?.data?.message || t('something_went_wrong'),
        });
      }
      setIsLoading(false);
    }
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
                          autoComplete="username"
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
                        <div className="relative">
                          <Input
                            autoComplete="current-password"
                            type={passwordVisibility ? 'text' : 'password'}
                            placeholder={`${t('enter_your_password')}`}
                            {...field}
                          />
                          <span
                            className="absolute top-0 right-2 h-full flex place-items-center text-muted-foreground cursor-pointer hover:text-black"
                            onClick={() =>
                              setPasswordVisibility(!passwordVisibility)
                            }
                          >
                            {passwordVisibility ? (
                              <Eye size={18} />
                            ) : (
                              <EyeOff size={18} />
                            )}
                          </span>
                        </div>
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
