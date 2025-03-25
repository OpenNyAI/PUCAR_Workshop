"use client";

import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type DashboardSectionProps = {
  title: string;
  icon?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export const DashboardSection = ({
  title,
  icon,
  actions,
  children,
  className = "",
}: DashboardSectionProps): React.ReactElement => {
  return (
    <Card className={`shadow-sm ${className}`}>
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon && (
              <div className="rounded-md bg-gray-100 p-2">
                {icon}
              </div>
            )}
            <h2 className="text-lg font-medium">{title}</h2>
          </div>
          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      </CardHeader>
      {children && <CardContent className="p-4 pt-2">{children}</CardContent>}
    </Card>
  );
};
