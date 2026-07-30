"use client";

import { AuthLayout } from "@/components/layout/auth-layout";
import { GuestGuard } from "@/components/auth/guest-guard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default function ForgotPasswordPage() {
  return (
    <GuestGuard>
      <AuthLayout quote="Secure your access to VITHub.">
        <Card className="border-none shadow-none bg-transparent">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight">Forgot password?</CardTitle>
            <CardDescription>Enter your email and we will send you a reset link</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input id="email" type="email" placeholder="msd@example.com" />
              </div>
              <Button type="submit" className="w-full">
                Send reset link
              </Button>
            </form>
            <div className="mt-4 text-center text-sm text-muted-foreground">
              Remember your password?{" "}
              <Link href={ROUTES.LOGIN} className="font-medium text-primary hover:underline">
                Back to login
              </Link>
            </div>
          </CardContent>
        </Card>
      </AuthLayout>
    </GuestGuard>
  );
}
