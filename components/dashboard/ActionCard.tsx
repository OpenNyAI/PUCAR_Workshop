"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

type ActionCardProps = {
  icon: LucideIcon;
  label: string;
  color?: string;
  onClick?: () => void;
};

export const ActionCard = ({
  icon: Icon,
  label,
  color = "text-[var(--pucar-teal)]",
  onClick,
}: ActionCardProps): React.ReactElement => {
  return (
    <Card 
      className="flex cursor-pointer flex-col items-center justify-center bg-[rgba(0,128,128,0.05)] p-6 text-center shadow-sm transition-all hover:bg-[rgba(0,128,128,0.1)] hover:shadow-md"
      onClick={onClick}
    >
      <div className="flex flex-col items-center">
        <Icon className={`h-8 w-8 ${color}`} />
        <p className="mt-2 whitespace-pre-line text-sm font-medium text-gray-700">
          {label}
        </p>
      </div>
    </Card>
  );
};
