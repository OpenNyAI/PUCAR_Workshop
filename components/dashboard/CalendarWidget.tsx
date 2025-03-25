"use client";
import React from "react";
import { Calendar } from "@/components/ui/calendar";

type CalendarWidgetProps = Record<string, never>;

export const CalendarWidget = ({}: CalendarWidgetProps): React.ReactElement => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="rounded-md border w-full">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md w-full"
      />
    </div>
  );
};
