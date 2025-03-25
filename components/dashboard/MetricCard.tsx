"use client";
import React from "react";
import { Card } from "@/components/ui/card";

type MetricCardProps = {
  value: number;
  label: string;
  hasAvatar?: boolean;
};

export const MetricCard = ({
  value,
  label,
  hasAvatar = false,
}: MetricCardProps): React.ReactElement => {
  return (
    <Card className="flex flex-col items-center justify-center p-6 text-center shadow-sm transition-all hover:shadow-md">
      <div className="flex flex-col items-center">
        <span className="text-4xl font-semibold text-gray-800">{value}</span>
        {hasAvatar && (
          <div className="mt-2 flex h-8 w-8 items-center justify-center rounded-full bg-green-700 text-white"></div>
        )}
        <p className="mt-2 text-sm text-gray-500">{label}</p>
      </div>
    </Card>
  );
};
