"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Info,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    type: "C" | "A"; // Counsel or Attorney
  }[];
  tasks: number;
  applications: number;
  slot?: number;
  time?: string;
};

type CauseListWidgetProps = {
  cases: Case[];
  totalCases: number;
  lastMinRequests: number;
};

export const CauseListWidget = ({
  cases,
  totalCases,
  lastMinRequests,
}: CauseListWidgetProps): React.ReactElement => {
  // State for filters
  const [statusFilter, setStatusFilter] = useState<string>("Not Started");
  const [purposeFilter, setPurposeFilter] = useState<string>("Judgement");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // Group cases by slot
  const casesBySlot = cases.reduce(
    (acc, caseItem) => {
      const slot = caseItem.slot || 0;
      if (!acc[slot]) {
        acc[slot] = [];
      }
      acc[slot].push(caseItem);
      return acc;
    },
    {} as Record<number, Case[]>
  );

  // Format date for display
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // Navigate to previous day
  const goToPreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  // Navigate to next day
  const goToNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  // Filter cases based on search query
  const filteredCases = Object.keys(casesBySlot).reduce(
    (acc, slotKey) => {
      const slotNumber = Number(slotKey);
      const filteredSlotCases = casesBySlot[slotNumber].filter((caseItem) => {
        // Apply status filter if not set to default
        const statusMatch =
          statusFilter === "Status" || caseItem.status === statusFilter;

        // Apply purpose filter if not set to default
        const purposeMatch =
          purposeFilter === "Purpose" || caseItem.purpose === purposeFilter;

        // Apply search filter if there's a query
        const searchMatch =
          searchQuery === "" ||
          caseItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          caseItem.pbptCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
          caseItem.advocates.some((adv) =>
            adv.name.toLowerCase().includes(searchQuery.toLowerCase())
          );

        return statusMatch && purposeMatch && searchMatch;
      });

      if (filteredSlotCases.length > 0) {
        acc[slotNumber] = filteredSlotCases;
      }

      return acc;
    },
    {} as Record<number, Case[]>
  );

  const filteredSlots = Object.keys(filteredCases).map(Number);

  return (
    <Card className="mt-8 border border-[var(--pucar-teal)] border-opacity-30">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Your Cause List ({totalCases})
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="bg-white text-[var(--pucar-teal)] border-[var(--pucar-teal)] hover:bg-[rgba(0,128,128,0.05)] btn-outline"
          >
            Reschedule
          </Button>
          <Button className="bg-[var(--pucar-teal)] text-white hover:bg-[var(--pucar-teal)] hover:opacity-90 btn-teal">
            Download
          </Button>
        </div>
      </div>

      {/* Date Navigation and Filters */}
      <div className="border-t border-[var(--pucar-teal)] border-opacity-30 p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Date Navigation */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-gray-200 hover:border-[var(--pucar-teal)] hover:text-[var(--pucar-teal)]"
              onClick={goToPreviousDay}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">Today, {formattedDate}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-gray-200 hover:border-[var(--pucar-teal)] hover:text-[var(--pucar-teal)]"
              onClick={goToNextDay}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-8 w-32 border-gray-200 hover:border-[var(--pucar-teal)]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Status">Status</SelectItem>
                <SelectItem value="Not Started">Not Started</SelectItem>
                <SelectItem value="Adjourned">Adjourned</SelectItem>
                <SelectItem value="Passed Over">Passed Over</SelectItem>
                <SelectItem value="Heard">Heard</SelectItem>
              </SelectContent>
            </Select>

            <Select value={purposeFilter} onValueChange={setPurposeFilter}>
              <SelectTrigger className="h-8 w-32 border-gray-200 hover:border-[var(--pucar-teal)]">
                <SelectValue placeholder="Purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Purpose">Purpose</SelectItem>
                <SelectItem value="Judgement">Judgement</SelectItem>
                <SelectItem value="Admission Hearing">Admission</SelectItem>
                <SelectItem value="Return of warrant">
                  Return of warrant
                </SelectItem>
                <SelectItem value="Bail Hearing">Bail Hearing</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative ml-2">
              <Input
                type="text"
                placeholder="Search Case ID, Name, Advocate"
                className="h-8 w-64 pl-2 pr-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-8 w-8"
                onClick={() => setSearchQuery("")}
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Last-minute requests */}
      <div className="border-t border-[var(--pucar-teal)] border-opacity-30 bg-amber-50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium text-amber-800">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-600 text-white">
              <span className="text-xs">!</span>
            </div>
            <span>Last-min reschedule requests</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
              {lastMinRequests} new
            </span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">S.No.</TableHead>
              <TableHead className="w-64">
                <div className="flex items-center gap-1">
                  Case Name & ID
                  <div className="text-xs text-gray-500">Pending Tasks</div>
                </div>
              </TableHead>
              <TableHead className="w-32">Hearing Status</TableHead>
              <TableHead className="w-32">
                <div className="flex items-center gap-1">
                  Purpose of Hearing
                </div>
              </TableHead>
              <TableHead className="w-48">
                <div className="flex items-center gap-1">
                  Advocates
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">C: Counsel, A: Attorney</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableHead>
              <TableHead className="w-32 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSlots.length > 0 ? (
              filteredSlots.map((slot) => (
                <React.Fragment key={slot}>
                  {/* Slot header */}
                  <TableRow className="bg-blue-50">
                    <TableCell
                      colSpan={5}
                      className="py-2 font-medium text-blue-700"
                    >
                      Slot {slot} ({filteredCases[slot].length})
                    </TableCell>
                    <TableCell className="text-right text-gray-500">
                      {filteredCases[slot][0]?.time}
                    </TableCell>
                  </TableRow>

                  {/* Cases in this slot */}
                  {filteredCases[slot].map((caseItem) => (
                    <TableRow key={caseItem.id} className="hover:bg-gray-50">
                      <TableCell>{caseItem.number}</TableCell>
                      <TableCell>
                        <div className="font-medium">{caseItem.name}</div>
                        <div className="text-sm text-gray-500">
                          {caseItem.pbptCode}
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                              <rect
                                width="8"
                                height="4"
                                x="8"
                                y="2"
                                rx="1"
                                ry="1"
                              />
                            </svg>
                            {caseItem.tasks} tasks & {caseItem.applications}{" "}
                            applications
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-block rounded px-2 py-1 text-xs font-medium ${
                            caseItem.status === "Not Started"
                              ? "bg-gray-100 text-gray-700"
                              : caseItem.status === "Adjourned"
                                ? "bg-amber-100 text-amber-700"
                                : caseItem.status === "Passed Over"
                                  ? "bg-orange-100 text-orange-700"
                                  : "bg-green-100 text-green-700"
                          }`}
                        >
                          {caseItem.status}
                        </span>
                      </TableCell>
                      <TableCell>{caseItem.purpose}</TableCell>
                      <TableCell>
                        {caseItem.advocates.map((advocate, index) => (
                          <div key={index} className="text-sm">
                            <span>
                              {advocate.name} ({advocate.type})
                            </span>
                          </div>
                        ))}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 bg-white text-green-600 hover:bg-green-50"
                          >
                            {caseItem.status === "Passed Over"
                              ? "Join"
                              : "Start"}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-8 text-center text-gray-500"
                >
                  No cases match your filter criteria. Try adjusting your
                  filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
