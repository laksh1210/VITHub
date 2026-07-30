import { PublicLayout } from "@/components/layout/public-layout";
import { Card, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { Clock } from "lucide-react";

export default function SessionExpiredPage() {
  return (
    <PublicLayout>
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="mx-auto bg-amber-500/10 p-3 rounded-full w-fit mb-4">
              <Clock className="w-8 h-8 text-amber-500" />
            </div>
            <CardTitle className="text-2xl">Session Expired</CardTitle>
            <CardDescription>
              Your session has expired due to inactivity or security reasons. Please log in again to continue.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button render={<Link href={ROUTES.LOGIN}>Log in again</Link>} />
          </CardFooter>
        </Card>
      </div>
    </PublicLayout>
  );
}
