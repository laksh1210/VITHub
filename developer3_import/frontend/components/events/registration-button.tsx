"use client";

import { useState } from "react";
import { CalendarPlus, Check, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { EventResponse } from "@/lib/types/event";

export function RegistrationButton({ event }: { event: EventResponse }) {
  const [copied, setCopied] = useState(false);

  if (!event.registrationRequired) {
    return (
      <Button variant="outline" disabled>
        <Ticket className="h-4 w-4" />
        Walk-in event
      </Button>
    );
  }

  return (
    <Button
      onClick={async () => {
        const text = [
          `Event: ${event.title}`,
          `Organizer: ${event.organizer}`,
          `Venue: ${event.venue}`,
          `Starts: ${event.startDateTime}`,
          `Ends: ${event.endDateTime}`,
        ].join("\n");

        await navigator.clipboard.writeText(text);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      }}
    >
      {copied ? <Check className="h-4 w-4" /> : <CalendarPlus className="h-4 w-4" />}
      {copied ? "Details copied" : "Registration details"}
    </Button>
  );
}
