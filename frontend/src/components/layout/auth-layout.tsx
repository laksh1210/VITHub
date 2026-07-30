import * as React from "react";
import { Brand } from "./brand";
import { PageWrapper } from "./page-wrapper";

export function AuthLayout({ children, quote }: { children: React.ReactNode; quote?: string }) {
  return (
    <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-primary/20" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Brand />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;{quote || "VITHub is the AI-powered digital twin of the VIT Bhopal campus."}&rdquo;
            </p>
          </blockquote>
        </div>
      </div>
      <PageWrapper className="lg:p-8 flex items-center justify-center h-full w-full">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          {children}
        </div>
      </PageWrapper>
    </div>
  );
}
