"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Task = {
  id: string;
  title: string;
  caseNumber: string;
  caseDate: string;
  daysRemaining: number;
  type: string;
};

type TasksWidgetProps = {
  tasks: Task[];
  totalTasks: number;
  registeredCases: number;
};

export const TasksWidget = ({
  tasks,
  totalTasks,
  registeredCases,
}: TasksWidgetProps): React.ReactElement => {
  return (
    <Card className="mt-4 border border-[var(--pucar-teal)] border-opacity-30">
      {/* Header */}
      <div className="p-3">
        <h2 className="text-xl font-semibold text-gray-800">Your Tasks</h2>
      </div>

      {/* Filters */}
      <div className="flex gap-2 p-3">
        <Select defaultValue="case-stage">
          <SelectTrigger className="h-10 w-full border-gray-200 hover:border-[var(--pucar-teal)]">
            <SelectValue placeholder="Case Stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="case-stage">Case Stage</SelectItem>
            <SelectItem value="pre-trial">Pre-Trial</SelectItem>
            <SelectItem value="trial">Trial</SelectItem>
            <SelectItem value="post-trial">Post-Trial</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="task-type">
          <SelectTrigger className="h-10 w-full border-gray-200 hover:border-[var(--pucar-teal)]">
            <SelectValue placeholder="Task Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="task-type">Task Type</SelectItem>
            <SelectItem value="hearing">Hearing</SelectItem>
            <SelectItem value="application">Application</SelectItem>
            <SelectItem value="judgment">Judgment</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Due Today Section */}
      <Accordion
        type="single"
        collapsible
        defaultValue="due-today"
        className="w-full"
      >
        <AccordionItem value="due-today" className="border-0">
          <AccordionTrigger className="bg-amber-50 px-4 py-3 hover:bg-amber-100 hover:no-underline">
            <div className="flex items-center gap-2 font-medium text-amber-800">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-600 text-white">
                <span className="text-xs">!</span>
              </div>
              <span className="text-base">Due Today (2)</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-0">
            <RadioGroup defaultValue="task-1" className="space-y-0">
              {tasks.map((task) => (
                <div key={task.id} className="px-4 py-3 pl-12 hover:bg-gray-50">
                  <div className="relative flex items-start">
                    <div className="absolute left-[-25px] top-1">
                      <RadioGroupItem value={task.id} id={task.id} />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">
                        {task.title}
                      </div>
                      <div className="mt-1 flex flex-wrap gap-x-4 text-sm text-gray-500">
                        <span>{task.caseNumber}</span>
                        <span className="text-gray-400">•</span>
                        <span>{task.caseDate}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-blue-600">
                          {task.type} in {task.daysRemaining} days
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>

        {/* All other tasks section */}
        <AccordionItem value="all-tasks" className="border-0">
          <AccordionTrigger className="bg-gray-50 px-4 py-3 hover:bg-gray-100 hover:no-underline">
            <div className="flex w-full items-center justify-between">
              <span className="text-base font-medium text-gray-700">
                All other tasks ({totalTasks})
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-0">
            <div className="p-3 text-sm text-gray-500">
              <p>No tasks selected. Click on a task to view details.</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Admit registered cases section */}
        <AccordionItem value="registered-cases" className="border-0">
          <div className="px-4 py-3 hover:bg-gray-50">
            <div className="flex w-full items-center justify-between">
              <span className="text-base font-medium text-gray-700">
                Admit registered cases ({registeredCases})
              </span>
              <div className="flex items-center gap-2">
                <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                  4 new
                </span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
