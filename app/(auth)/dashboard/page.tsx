import React from "react";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function DashboardPage(): React.ReactElement {
  // This would come from authentication in a real app
  const judge = {
    name: "Judge Koshy",
  };

  // Current date
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // Dashboard metrics
  const metrics = [
    {
      value: 16,
      label: "Pending for >6 months",
    },
    {
      value: 24,
      label: "Time-bound disposal orders",
      hasAvatar: true,
    },
    {
      value: 6,
      label: "Pending Judgment",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col p-6 md:p-10">
      {/* Header with greeting and date */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-normal">
            Hello, <span className="text-gray-500">{judge.name}</span>
          </h1>
        </div>
        <p className="mt-2 text-sm text-gray-500">Today, {formattedDate}</p>
      </div>

      {/* Metrics cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <Card
            key={index}
            className="flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="flex flex-col items-center">
              <span className="text-4xl font-semibold">{metric.value}</span>
              <p className="mt-2 text-sm text-gray-500">{metric.label}</p>
            </div>
          </Card>
        ))}

        {/* View All Cases card */}
        <Card className="flex flex-col items-center justify-center bg-green-50 p-6 text-center">
          <div className="flex flex-col items-center">
            <ArrowRight className="h-8 w-8 text-green-600" />
            <p className="mt-2 text-sm text-gray-700">
              View
              <br />
              All Cases
            </p>
          </div>
        </Card>
      </div>

      {/* Data Dashboard section */}
      <Card className="w-full p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-gray-100 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
            </div>
            <h2 className="text-lg font-medium">Your Data Dashboard</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500">40 new</span>
            <ArrowRight className="h-5 w-5 text-gray-500" />
          </div>
        </div>
      </Card>
    </main>
  );
}
