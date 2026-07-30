"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { loginSchema, LoginInput } from "@/validators/auth";
import { ROUTES } from "@/constants/routes";
import { AuthLayout } from "@/components/layout/auth-layout";
import { GuestGuard } from "@/components/auth/guest-guard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function LoginPage() {
  const { login, isLoggingIn, loginError } = useAuth();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      usernameOrEmail: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(data: LoginInput) {
    try {
      await login(data);
    } catch (_error) {
      // Handled by react-query error state
    }
  }

  return (
    <GuestGuard>
      <AuthLayout quote="Connect to the ultimate digital twin of VIT Bhopal.">
        <Card className="border-none shadow-none bg-transparent">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
            <CardDescription>Enter your credentials to sign in to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {loginError && (
                  <Alert variant="destructive">
                    <AlertDescription>
                      Invalid credentials or server error. Please try again.
                    </AlertDescription>
                  </Alert>
                )}

                <FormField
                  control={form.control}
                  name="usernameOrEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username or Email</FormLabel>
                      <FormControl>
                        <Input placeholder="m.dhoni" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal text-sm">Remember me</FormLabel>
                      </FormItem>
                    )}
                  />

                  <Link
                    href={ROUTES.FORGOT_PASSWORD}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button className="w-full" type="submit" disabled={isLoggingIn}>
                  {isLoggingIn ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </Form>
            
            <div className="mt-4 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href={ROUTES.REGISTER} className="font-medium text-primary hover:underline">
                Register here
              </Link>
            </div>
          </CardContent>
        </Card>
      </AuthLayout>
    </GuestGuard>
  );
}
