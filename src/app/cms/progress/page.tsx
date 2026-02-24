"use client";

import { useState } from "react";
import { sampleProjects } from "@/lib/data";
import { Project } from "@/types";
import Link from "next/link";

export default function ProgressPage() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    sampleProjects[0]?.id || ""
  );

  const selectedProject = sampleProjects.find(
    (p) => p.id === selectedProjectId
  );

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-NP", {
      style: "currency",
      currency: "NPR",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            📈 Progress Tracking
          </h1>
          <p className="text-gray-500 mt-1">
            Monitor physical and financial progress of heritage projects
          </p>
        </div>
        <Link
          href="/cms/projects/ping"
          className="bg-amber-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-amber-700 transition-colors flex items-center gap-2"
        >
          📍 Ping Update
        </Link>
      </div>

      {/* Project Selector */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6 flex gap-3 overflow-x-auto">
        {sampleProjects.map((project) => (
          <button
            key={project.id}
            onClick={() => setSelectedProjectId(project.id)}
            className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              selectedProjectId === project.id
                ? "bg-red-800 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {project.name.split(" ").slice(0, 2).join(" ")}
          </button>
        ))}
      </div>

      {selectedProject && (
        <ProjectProgressDetail
          project={selectedProject}
          formatCurrency={formatCurrency}
        />
      )}

      {/* All Projects Overview */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          All Projects Overview
        </h2>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Project
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Physical Progress
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Financial Progress
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Budget
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {sampleProjects.map((project) => (
                <tr
                  key={project.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-semibold text-sm text-gray-900">
                      {project.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {project.location_name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={project.status} />
                  </td>
                  <td className="px-6 py-4 w-40">
                    <ProgressBar
                      value={project.physical_progress}
                      color="blue"
                    />
                  </td>
                  <td className="px-6 py-4 w-40">
                    <ProgressBar
                      value={project.financial_progress}
                      color="green"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold">
                      {formatCurrency(project.budget_total)}
                    </div>
                    <div className="text-xs text-amber-600">
                      {formatCurrency(project.budget_spent)} spent
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedProjectId(project.id)}
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Details
                      </button>
                      <Link
                        href={`/cms/projects/ping?project=${project.id}`}
                        className="text-xs text-amber-600 hover:text-amber-800 font-medium"
                      >
                        Ping
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ProjectProgressDetail({
  project,
  formatCurrency,
}: {
  project: Project;
  formatCurrency: (n: number) => string;
}) {
  const budgetUtilization =
    (project.budget_spent / project.budget_total) * 100;
  const completedMilestones = project.milestones.filter(
    (m) => m.completed
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{project.name}</h2>
            <p className="text-gray-500 text-sm mt-1">
              📍 {project.location_name}
            </p>
            <p className="text-gray-500 text-sm">🏢 {project.contractor}</p>
          </div>
          <StatusBadge status={project.status} large />
        </div>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Physical Progress */}
        <div className="bg-white rounded-2xl border border-blue-200 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">🔨 Physical Progress</h3>
            <span className="text-3xl font-bold text-blue-600">
              {project.physical_progress}%
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-6 mb-4">
            <div
              className="bg-blue-500 h-6 rounded-full flex items-center justify-end pr-3 transition-all"
              style={{ width: `${project.physical_progress}%` }}
            >
              <span className="text-white text-xs font-bold">
                {project.physical_progress}%
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-blue-50 rounded-xl p-3">
              <div className="text-lg font-bold text-blue-700">
                {completedMilestones}
              </div>
              <div className="text-xs text-gray-500">Completed</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-lg font-bold text-gray-700">
                {project.milestones.length - completedMilestones}
              </div>
              <div className="text-xs text-gray-500">Remaining</div>
            </div>
            <div className="bg-green-50 rounded-xl p-3">
              <div className="text-lg font-bold text-green-700">
                {project.milestones.length}
              </div>
              <div className="text-xs text-gray-500">Total</div>
            </div>
          </div>
        </div>

        {/* Financial Progress */}
        <div className="bg-white rounded-2xl border border-green-200 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">💰 Financial Progress</h3>
            <span className="text-3xl font-bold text-green-600">
              {project.financial_progress}%
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-6 mb-4">
            <div
              className="bg-green-500 h-6 rounded-full flex items-center justify-end pr-3 transition-all"
              style={{ width: `${project.financial_progress}%` }}
            >
              <span className="text-white text-xs font-bold">
                {project.financial_progress}%
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Budget</span>
              <span className="font-semibold">
                {formatCurrency(project.budget_total)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Amount Spent</span>
              <span className="font-semibold text-amber-600">
                {formatCurrency(project.budget_spent)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Remaining</span>
              <span className="font-semibold text-green-600">
                {formatCurrency(project.budget_total - project.budget_spent)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Utilization</span>
              <span className="font-semibold">
                {budgetUtilization.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-4">
          📋 Milestones ({completedMilestones}/{project.milestones.length})
        </h3>
        <div className="space-y-3">
          {project.milestones.map((milestone) => (
            <div
              key={milestone.id}
              className={`flex items-start gap-4 p-4 rounded-xl border ${
                milestone.completed
                  ? "bg-green-50 border-green-200"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  milestone.completed
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {milestone.completed ? "✓" : "○"}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm text-gray-900">
                  {milestone.title}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {milestone.description}
                </div>
                <div className="flex gap-4 mt-1 text-xs text-gray-400">
                  <span>Due: {milestone.due_date}</span>
                  {milestone.completed_date && (
                    <span className="text-green-600">
                      ✓ Completed: {milestone.completed_date}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ping History */}
      {project.ping_history.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">
            📍 Ping History ({project.ping_history.length} records)
          </h3>
          <div className="space-y-4">
            {project.ping_history.map((ping) => (
              <div
                key={ping.id}
                className="border border-gray-200 rounded-xl p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-semibold text-sm text-gray-900">
                      {ping.pinged_by}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(ping.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex gap-3 text-xs">
                    <span className="text-blue-600 font-semibold">
                      Physical: {ping.physical_progress}%
                    </span>
                    <span className="text-green-600 font-semibold">
                      Financial: {ping.financial_progress}%
                    </span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mb-2 font-mono">
                  📍 {ping.latitude.toFixed(4)}, {ping.longitude.toFixed(4)}
                </div>
                {ping.notes && (
                  <div className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
                    {ping.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({
  status,
  large,
}: {
  status: string;
  large?: boolean;
}) {
  const colors: Record<string, string> = {
    ongoing: "bg-blue-100 text-blue-800 border-blue-200",
    completed: "bg-green-100 text-green-800 border-green-200",
    planning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    on_hold: "bg-orange-100 text-orange-800 border-orange-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full font-medium border ${colors[status] || "bg-gray-100 text-gray-700"} ${large ? "text-sm" : "text-xs"}`}
    >
      {status.replace("_", " ").toUpperCase()}
    </span>
  );
}

function ProgressBar({
  value,
  color,
}: {
  value: number;
  color: "blue" | "green";
}) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className={`font-semibold ${color === "blue" ? "text-blue-600" : "text-green-600"}`}>
          {value}%
        </span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${color === "blue" ? "bg-blue-500" : "bg-green-500"}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
