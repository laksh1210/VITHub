export function formatClockTime(value: string | null) {
  if (!value) return "Not available";

  const [hourText = "0", minuteText = "00"] = value.split(":");
  const hour = Number(hourText);
  const minute = Number(minuteText);

  if (Number.isNaN(hour) || Number.isNaN(minute)) {
    return value;
  }

  const normalizedHour = hour % 24;
  const suffix = normalizedHour >= 12 ? "PM" : "AM";
  const displayHour = normalizedHour % 12 || 12;
  return `${displayHour}:${minute.toString().padStart(2, "0")} ${suffix}`;
}

export function formatServiceWindow(openingTime: string | null, closingTime: string | null) {
  if (!openingTime && !closingTime) {
    return "Hours unavailable";
  }

  if (openingTime && closingTime) {
    return `${formatClockTime(openingTime)} - ${formatClockTime(closingTime)}`;
  }

  return openingTime
    ? `Opens at ${formatClockTime(openingTime)}`
    : `Closes at ${formatClockTime(closingTime)}`;
}

export function formatShortDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
  }).format(new Date(value));
}

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function formatDateTimeRange(start: string, end: string) {
  return `${formatDateTime(start)} - ${formatDateTime(end)}`;
}

export function formatRelativeMinutes(minutes: number | null) {
  if (minutes === null) return "NA";
  if (minutes <= 1) return "1 min";
  return `${minutes} min`;
}

export function inferShuttleEtaMinutes({
  status,
  speed,
  hasLiveStop,
}: {
  status: "ACTIVE" | "INACTIVE" | "MAINTENANCE";
  speed: number | null;
  hasLiveStop: boolean;
}) {
  if (status !== "ACTIVE" || speed === null || speed <= 0 || !hasLiveStop) {
    return null;
  }

  if (speed >= 35) return 3;
  if (speed >= 20) return 5;
  if (speed >= 10) return 8;
  return 12;
}
