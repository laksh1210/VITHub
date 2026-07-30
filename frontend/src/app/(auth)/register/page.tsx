"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { registerSchema, RegisterInput } from "@/validators/auth";
import { ROUTES } from "@/constants/routes";
import { GuestGuard } from "@/components/auth/guest-guard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Brand } from "@/components/layout/brand";
import { PageWrapper } from "@/components/layout/page-wrapper";

export default function RegisterPage() {
  const { register, isRegistering, registerError } = useAuth();

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      fullName: "",
      registrationNumber: "",
      degree: "",
      currentSemester: "",
      hostelBlock: "",
    },
  });

  async function onSubmit(data: RegisterInput) {
    try {
      await register(data);
    } catch {
      // Handled by react-query error state
    }
  }

  return (
    <GuestGuard>
      <div className="w-full min-h-screen flex flex-col lg:grid lg:grid-cols-2">
        {/* Left Side (Branding/Quote) */}
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex border-r">
          <div className="absolute inset-0 bg-primary/20" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Brand />
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Join the digital revolution of VIT Bhopal.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>

        {/* Right Side (Form) */}
        <div className="flex items-center justify-center p-4 sm:p-8 w-full min-h-screen">
          <div className="w-full sm:w-[500px] xl:w-[600px] mx-auto flex flex-col justify-center">
            <Card className="border-none shadow-none bg-transparent w-full">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold tracking-tight">Student Registration</CardTitle>
                <CardDescription>Fill in your academic profile to set up your VITHub account.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {registerError && (
                      <Alert variant="destructive">
                        <AlertDescription>
                          Registration failed. Please try a different username or email.
                        </AlertDescription>
                      </Alert>
                    )}

                    {/* Account Details Section */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Account Credentials</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Mahendra Singh Dhoni" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                <Input placeholder="m.dhoni" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="msd@example.com" type="email" {...field} />
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
                      </div>
                    </div>

                    {/* Academic Profile Section */}
                    <div className="space-y-4 pt-4 border-t border-border">
                      <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Academic Profile</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="registrationNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Registration Number</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. 23BCE10482" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="degree"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Degree & Major</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. B.Tech CSE (AI & ML)" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="currentSemester"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Current Semester</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. Semester V (Fall 2026)" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="hostelBlock"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Hostel Block & Room</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. Boys Hostel Block A (Room 412)" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <Button className="w-full mt-6" type="submit" disabled={isRegistering}>
                      {isRegistering ? "Creating account & saving profile..." : "Register Account"}
                    </Button>
                  </form>
                </Form>
                
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href={ROUTES.LOGIN} className="font-medium text-primary hover:underline">
                    Sign in here
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </GuestGuard>
  );
}
