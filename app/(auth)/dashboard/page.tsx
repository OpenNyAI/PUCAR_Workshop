"use client";
import React from "react";
import { ArrowRight, LayoutDashboard } from "lucide-react";
import { useRouter } from "next/navigation";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ActionCard } from "@/components/dashboard/ActionCard";
import { CalendarWidget } from "@/components/dashboard/CalendarWidget";
import { TasksWidget } from "@/components/dashboard/TasksWidget";
import { CauseListWidget } from "@/components/dashboard/CauseListWidget";
import { DashboardSection } from "@/components/dashboard/DashboardSection";

// Define the types to match CauseListWidget component
type CaseStatus = "Not Started" | "Adjourned" | "Passed Over" | "Heard";
type HearingPurpose =
  | "Judgement"
  | "Admission Hearing"
  | "Return of warrant"
  | "Bail Hearing";

type Case = {
  id: string;
  number: number;
  name: string;
  pbptCode: string;
  status: CaseStatus;
  purpose: HearingPurpose;
  advocates: {
    name: string;
    type: "C" | "A";
  }[];
  tasks: number;
  applications: number;
  slot?: number;
  time?: string;
};

export default function DashboardPage(): React.ReactElement {
  const router = useRouter();
  const judge = {
    name: "Judge Koshy",
  };

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

  // Tasks data
  const tasks = [
    {
      id: "task-1",
      title: "Reschedule hearing request: Aparna vs Sandesh",
      caseNumber: "N/A 01138",
      caseDate: "PB-PT-2023",
      daysRemaining: 3,
      type: "Hearing",
    },
    {
      id: "task-2",
      title: "Delay application request: Raj vs Anushka",
      caseNumber: "N/A 01138",
      caseDate: "PB-PT-2023",
      daysRemaining: 2,
      type: "Hearing",
    },
  ];

  // Cases data with proper types
  const cases: Case[] = [
    {
      id: "case-1",
      number: 1,
      name: "Anjali vs Arjun",
      pbptCode: "PB-PT-2023",
      status: "Not Started",
      purpose: "Judgement",
      advocates: [
        { name: "Aarav Patel", type: "C" },
        { name: "Priya Sharma", type: "A" },
      ],
      tasks: 4,
      applications: 2,
      slot: 1,
      time: "10:00 AM - 12:00 PM",
    },
    {
      id: "case-2",
      number: 2,
      name: "Kavita vs Vikram",
      pbptCode: "PB-PT-2023",
      status: "Adjourned",
      purpose: "Judgement",
      advocates: [
        { name: "Aarav Patel", type: "C" },
        { name: "Priya Sharma", type: "A" },
      ],
      tasks: 7,
      applications: 9,
      slot: 1,
      time: "10:00 AM - 12:00 PM",
    },
    {
      id: "case-3",
      number: 3,
      name: "Meera vs Raj",
      pbptCode: "PB-PT-2023",
      status: "Passed Over",
      purpose: "Judgement",
      advocates: [
        { name: "Aarav Patel", type: "C" },
        { name: "Priya Sharma", type: "A" },
      ],
      tasks: 5,
      applications: 3,
      slot: 1,
      time: "10:00 AM - 12:00 PM",
    },
    {
      id: "case-4",
      number: 4,
      name: "Priya vs Rohit",
      pbptCode: "PB-PT-2023",
      status: "Heard",
      purpose: "Admission Hearing",
      advocates: [
        { name: "Aarav Patel", type: "C" },
        { name: "Priya Sharma", type: "A" },
      ],
      tasks: 1,
      applications: 6,
      slot: 1,
      time: "10:00 AM - 12:00 PM",
    },
    {
      id: "case-5",
      number: 5,
      name: "Neha vs Rahul",
      pbptCode: "PB-PT-2023",
      status: "Not Started",
      purpose: "Return of warrant",
      advocates: [
        { name: "Aarav Patel", type: "C" },
        { name: "Priya Sharma", type: "A" },
      ],
      tasks: 8,
      applications: 4,
      slot: 2,
      time: "1:00 PM - 4:00 PM",
    },
    {
      id: "case-6",
      number: 6,
      name: "Sunita vs Sanjay",
      pbptCode: "PB-PT-2023",
      status: "Not Started",
      purpose: "Return of warrant",
      advocates: [
        { name: "Aarav Patel", type: "C" },
        { name: "Priya Sharma", type: "A" },
      ],
      tasks: 3,
      applications: 7,
      slot: 2,
      time: "1:00 PM - 4:00 PM",
    },
    {
      id: "case-7",
      number: 7,
      name: "Pooja vs Alok",
      pbptCode: "PB-PT-2023",
      status: "Not Started",
      purpose: "Bail Hearing",
      advocates: [
        { name: "Aarav Patel", type: "C" },
        { name: "Priya Sharma", type: "A" },
      ],
      tasks: 2,
      applications: 5,
      slot: 2,
      time: "1:00 PM - 4:00 PM",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-gray-50 p-6 md:p-10">
      {/* Header with greeting and date */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-light">
            Hello,{" "}
            <span className="text-gray-500 font-normal">{judge.name}</span>
          </h1>
        </div>
        <p className="mt-2 text-sm text-gray-500">Today, {formattedDate}</p>
      </div>

      {/* Main content with two columns */}
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Left column - Dashboard content */}
        <div className="w-full lg:w-2/3">
          {/* Metrics cards */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {metrics.map((metric, index) => (
              <MetricCard
                key={index}
                value={metric.value}
                label={metric.label}
              />
            ))}

            {/* View All Cases card */}
            <ActionCard
              icon={ArrowRight}
              label="View All Cases"
              onClick={() => router.push("/cases")}
            />
          </div>

          {/* Data Dashboard section */}
          <DashboardSection
            title="Your Data Dashboard"
            icon={<LayoutDashboard className="h-5 w-5" />}
            actions={
              <>
                <span className="text-sm font-medium text-gray-500">
                  40 new
                </span>
                <ArrowRight className="h-5 w-5 text-gray-500" />
              </>
            }
          />
          {/* Cause List Widget */}
          <CauseListWidget cases={cases} totalCases={30} lastMinRequests={11} />
        </div>

        {/* Right column - Calendar */}
        <div className="w-full lg:w-1/3">
          {/* Calendar Widget */}
          <CalendarWidget />

          {/* Tasks Widget */}
          <TasksWidget tasks={tasks} totalTasks={12} registeredCases={32} />
        </div>
      </div>
    </main>
  );
}
