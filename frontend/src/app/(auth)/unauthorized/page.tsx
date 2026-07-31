import { PublicLayout } from "@/components/layout/public-layout";
import { Card, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <PublicLayout>
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="max-w-[448px] w-full text-center">
          <CardHeader>
            <div className="mx-auto bg-destructive/10 p-3 rounded-full w-fit mb-4">
              <ShieldAlert className="w-8 h-8 text-destructive" />
            </div>
            <CardTitle className="text-2xl">Access Denied</CardTitle>
            <CardDescription>
              You do not have permission to view this page or perform this action.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button render={<Link href={ROUTES.DASHBOARD}>Return to Dashboard</Link>} />
          </CardFooter>
        </Card>
      </div>
    </PublicLayout>
  );
}
