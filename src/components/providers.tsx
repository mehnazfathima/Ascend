"use client";

import { SessionProvider } from "next-auth/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ServiceWorkerRegister } from "@/components/service-worker-register";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <TooltipProvider delay={200}>
        {children}
        <Toaster position="bottom-right" />
        <ServiceWorkerRegister />
      </TooltipProvider>
    </SessionProvider>
  );
}
