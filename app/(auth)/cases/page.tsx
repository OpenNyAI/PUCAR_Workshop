"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { TasksWidget } from "@/components/dashboard/TasksWidget";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  X,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Types
type TabType =
  | "all"
  | "time-bound"
  | "6-months"
  | "pending-judgement"
  | "pending";
type StageType = "all" | "judgement" | "trial" | "appearance" | "inquiry";

// Case interface
interface CaseInfo {
  tasks: number;
  type: string;
  days: number;
}

interface Case {
  id: string;
  name: string;
  stage: string;
  ccstNumber: string;
  nextHearingDate: string;
  info: CaseInfo;
}

// Task interface
interface Task {
  id: string;
  title: string;
  caseNumber: string;
  caseDate: string;
  daysRemaining: number;
  type: string;
}

// Mock data for cases
const mockCases: Case[] = [
  {
    id: "1",
    name: "Aparna vs Sandesh",
    stage: "Judgement",
    ccstNumber: "CC/1/2024",
    nextHearingDate: "01/01/2024",
    info: { tasks: 4, type: "Hearing", days: 2 },
  },
  {
    id: "2",
    name: "Keshav vs Ishtha",
    stage: "Trial",
    ccstNumber: "CC/1/2024",
    nextHearingDate: "01/01/2024",
    info: { tasks: 2, type: "Hearing", days: 2 },
  },
  {
    id: "3",
    name: "Subarna vs Aparna",
    stage: "Trial",
    ccstNumber: "CC/1/2024",
    nextHearingDate: "01/01/2024",
    info: { tasks: 1, type: "Registered", days: 2 },
  },
  {
    id: "4",
    name: "Subarna vs Aparna",
    stage: "Trial",
    ccstNumber: "CC/1/2024",
    nextHearingDate: "01/01/2024",
    info: { tasks: 1, type: "Hearing", days: 3 },
  },
  {
    id: "5",
    name: "Samridhi vs Tanay",
    stage: "Appearance",
    ccstNumber: "CC/1/2024",
    nextHearingDate: "01/01/2024",
    info: { tasks: 1, type: "Judgement", days: 0 },
  },
  {
    id: "6",
    name: "Aakash vs Pavan",
    stage: "Inquiry",
    ccstNumber: "CC/1/2024",
    nextHearingDate: "01/01/2024",
    info: { tasks: 0, type: "Hearing", days: 8 },
  },
  {
    id: "7",
    name: "Nilanjana vs Yazad",
    stage: "Appearance",
    ccstNumber: "CC/1/2024",
    nextHearingDate: "01/01/2024",
    info: { tasks: 0, type: "Hearing", days: 8 },
  },
  {
    id: "8",
    name: "Diksha vs Anil",
    stage: "Inquiry",
    ccstNumber: "CC/1/2024",
    nextHearingDate: "01/01/2024",
    info: { tasks: 0, type: "Hearing", days: 8 },
  },
  {
    id: "9",
    name: "Tarun vs Gaurav",
    stage: "Inquiry",
    ccstNumber: "CC/1/2024",
    nextHearingDate: "01/01/2024",
    info: { tasks: 0, type: "Hearing", days: 12 },
  },
  {
    id: "10",
    name: "M Krishna vs Tripthi",
    stage: "Judgement",
    ccstNumber: "CC/1/2024",
    nextHearingDate: "01/01/2024",
    info: { tasks: 0, type: "Hearing", days: 12 },
  },
  {
    id: "11",
    name: "Aakash vs Pavan",
    stage: "Judgement",
    ccstNumber: "CC/1/2024",
    nextHearingDate: "01/01/2024",
    info: { tasks: 0, type: "Hearing", days: 22 },
  },
];

// Mock data for tasks widget
const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Prepare for hearing",
    caseNumber: "CC/1/2024",
    caseDate: "01/01/2024",
    daysRemaining: 2,
    type: "Hearing",
  },
  {
    id: "task-2",
    title: "Submit documents",
    caseNumber: "CC/1/2024",
    caseDate: "01/01/2024",
    daysRemaining: 3,
    type: "Submission",
  },
];

// Available stages for filtering
const stageOptions = [
  { value: "all", label: "All Stages" },
  { value: "judgement", label: "Judgement" },
  { value: "trial", label: "Trial" },
  { value: "appearance", label: "Appearance" },
  { value: "inquiry", label: "Inquiry" },
];

export default function CasesPage(): React.ReactElement {
  // State
  const [activeTab, setActiveTab] = useState<TabType>("time-bound");
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedStage, setSelectedStage] = useState<StageType>("all");
  const [filteredCases, setFilteredCases] = useState<Case[]>(mockCases);
  const [showPendingTasks, setShowPendingTasks] = useState<boolean>(false);

  // Filter cases based on search query, stage, and pending tasks
  useEffect(() => {
    let filtered = [...mockCases];

    // Filter by search query
    if (searchQuery.trim()) {
      const lowerCaseQuery = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (caseItem) =>
          caseItem.name.toLowerCase().includes(lowerCaseQuery) ||
          caseItem.ccstNumber.toLowerCase().includes(lowerCaseQuery)
      );
    }

    // Filter by stage
    if (selectedStage !== "all") {
      filtered = filtered.filter(
        (caseItem) => caseItem.stage.toLowerCase() === selectedStage
      );
    }

    // Filter by pending tasks
    if (showPendingTasks) {
      filtered = filtered.filter((caseItem) => caseItem.info.tasks > 0);
    }

    setFilteredCases(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, selectedStage, showPendingTasks]);

  // Get info display based on case info
  const getInfoDisplay = (info: CaseInfo): React.ReactNode => {
    if (info.tasks > 0) {
      return (
        <div>
          <span className="font-medium text-red-600">
            {info.tasks} tasks due
          </span>
          {info.type === "Registered" ? (
            <span className="text-gray-600">
              , Registered {info.days} days ago
            </span>
          ) : (
            <span className="text-gray-600">
              , {info.type} in {info.days} days
            </span>
          )}
        </div>
      );
    } else if (info.type === "Judgement") {
      return <div className="text-gray-600">{info.type} due</div>;
    } else {
      return (
        <div className="text-gray-600">
          {info.type} in {info.days} days
        </div>
      );
    }
  };

  // Calculate pagination values
  const totalPages = Math.ceil(filteredCases.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, filteredCases.length);
  const displayedCases = filteredCases.slice(startIndex, endIndex);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  // Handle search clear
  const clearSearch = (): void => {
    setSearchQuery("");
  };

  // Toggle pending tasks filter
  const togglePendingTasks = (): void => {
    setShowPendingTasks(!showPendingTasks);
  };

  // Handle stage selection
  const handleStageChange = (value: string): void => {
    setSelectedStage(value as StageType);
  };

  // Count pending tasks
  const pendingTasksCount = mockCases.filter(
    (caseItem) => caseItem.info.tasks > 0
  ).length;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Good afternoon, Mehul
        </h1>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">Your Cases</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-3/4">
          {/* Tabs */}
          <div className="flex flex-wrap border-b mb-4">
            <button
              className={`px-4 py-2 text-sm ${activeTab === "all" ? "border-b-2 border-blue-600 font-medium" : "text-gray-600"}`}
              onClick={() => setActiveTab("all")}
            >
              All (120)
            </button>
            <button
              className={`px-4 py-2 text-sm ${activeTab === "time-bound" ? "border-b-2 border-blue-600 font-medium" : "text-gray-600"}`}
              onClick={() => setActiveTab("time-bound")}
            >
              Time bound disposal orders (24)
            </button>
            <button
              className={`px-4 py-2 text-sm ${activeTab === "6-months" ? "border-b-2 border-blue-600 font-medium" : "text-gray-600"}`}
              onClick={() => setActiveTab("6-months")}
            >
              &gt;6 months (8)
            </button>
            <button
              className={`px-4 py-2 text-sm ${activeTab === "pending-judgement" ? "border-b-2 border-blue-600 font-medium" : "text-gray-600"}`}
              onClick={() => setActiveTab("pending-judgement")}
            >
              Pending Judgement (32)
            </button>
            <button
              className={`px-4 py-2 text-sm ${activeTab === "pending" ? "border-b-2 border-blue-600 font-medium" : "text-gray-600"}`}
              onClick={() => setActiveTab("pending")}
            >
              Pending (120)
            </button>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-wrap justify-between mb-4">
            <div className="flex gap-2 mb-2 sm:mb-0">
              <Button
                variant={showPendingTasks ? "default" : "outline"}
                className={`h-10 px-4 py-2 text-sm ${showPendingTasks ? "bg-blue-600" : ""}`}
                onClick={togglePendingTasks}
              >
                Pending tasks{" "}
                <span
                  className={`ml-1 ${showPendingTasks ? "bg-blue-500" : "bg-gray-200"} px-1.5 py-0.5 rounded text-xs`}
                >
                  {pendingTasksCount}
                </span>
              </Button>
              <Select value={selectedStage} onValueChange={handleStageChange}>
                <SelectTrigger className="h-10 w-32">
                  <SelectValue placeholder="Stage" />
                </SelectTrigger>
                <SelectContent>
                  {stageOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search Case ID or Case Name"
                className="h-10 pl-10 pr-10 w-full sm:w-72"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {searchQuery && (
                <button
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  onClick={clearSearch}
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Cases Table */}
          <Card className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-1/4">Case Name</TableHead>
                  <TableHead className="w-1/6">Stage</TableHead>
                  <TableHead className="w-1/6">CC/ST Number</TableHead>
                  <TableHead className="w-1/6">Next Hearing Date</TableHead>
                  <TableHead className="w-1/4">Info</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedCases.length > 0 ? (
                  displayedCases.map((caseItem) => (
                    <TableRow
                      key={caseItem.id}
                      className="cursor-pointer hover:bg-gray-50"
                    >
                      <TableCell className="font-medium">
                        {caseItem.name}
                      </TableCell>
                      <TableCell>{caseItem.stage}</TableCell>
                      <TableCell>{caseItem.ccstNumber}</TableCell>
                      <TableCell>{caseItem.nextHearingDate}</TableCell>
                      <TableCell>{getInfoDisplay(caseItem.info)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-6 text-gray-500"
                    >
                      {searchQuery
                        ? `No cases found matching "${searchQuery}"`
                        : "No cases found with the selected filters"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-2 border-t">
              <div className="flex items-center">
                <span className="text-sm text-gray-700">Rows</span>
                <select
                  className="mx-2 border rounded p-1 text-sm"
                  value={rowsPerPage}
                  onChange={(e) => setRowsPerPage(Number(e.target.value))}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>

              <div className="flex items-center">
                {filteredCases.length > 0 && (
                  <>
                    <span className="text-sm text-gray-700 mr-4">
                      {startIndex + 1} - {endIndex} of {filteredCases.length}
                    </span>
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                      >
                        <ChevronsLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                      >
                        <ChevronsRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Tasks Widget */}
        <div className="lg:w-1/4">
          <TasksWidget tasks={mockTasks} totalTasks={8} registeredCases={4} />
        </div>
      </div>
    </div>
  );
}
