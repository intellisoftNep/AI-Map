import { sampleProjects } from "@/lib/data";
import Link from "next/link";
import { Project } from "@/types";

const statusColors: Record<string, string> = {
  ongoing: "bg-blue-100 text-blue-800 border-blue-200",
  completed: "bg-green-100 text-green-800 border-green-200",
  planning: "bg-yellow-100 text-yellow-800 border-yellow-200",
  on_hold: "bg-orange-100 text-orange-800 border-orange-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

const categoryIcons: Record<string, string> = {
  restoration: "🔨",
  conservation: "🛡️",
  infrastructure: "🏗️",
  documentation: "📄",
  tourism: "🗺️",
  other: "📋",
};

export default function ProjectsPage() {
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
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-500 mt-1">
            Heritage restoration and conservation projects
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/cms/projects/ping"
            className="bg-amber-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-amber-700 transition-colors flex items-center gap-2"
          >
            📍 Ping Location
          </Link>
          <Link
            href="/cms/projects/new"
            className="bg-red-800 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-red-900 transition-colors flex items-center gap-2"
          >
            + New Project
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total", count: sampleProjects.length, color: "bg-gray-50 border-gray-200", text: "text-gray-700" },
          { label: "Ongoing", count: sampleProjects.filter(p => p.status === 'ongoing').length, color: "bg-blue-50 border-blue-200", text: "text-blue-700" },
          { label: "Completed", count: sampleProjects.filter(p => p.status === 'completed').length, color: "bg-green-50 border-green-200", text: "text-green-700" },
          { label: "Planning", count: sampleProjects.filter(p => p.status === 'planning').length, color: "bg-yellow-50 border-yellow-200", text: "text-yellow-700" },
        ].map(item => (
          <div key={item.label} className={`rounded-xl border p-4 ${item.color}`}>
            <div className={`text-2xl font-bold ${item.text}`}>{item.count}</div>
            <div className="text-sm text-gray-600">{item.label} Projects</div>
          </div>
        ))}
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {sampleProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            formatCurrency={formatCurrency}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  formatCurrency,
}: {
  project: Project;
  formatCurrency: (n: number) => string;
}) {
  const completedMilestones = project.milestones.filter(
    (m) => m.completed
  ).length;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">
                {categoryIcons[project.category] || "📋"}
              </span>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">
                  {project.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[project.status] || "bg-gray-100 text-gray-700"}`}
                  >
                    {project.status.replace("_", " ").toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-500 capitalize">
                    {project.category}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <span>📍 {project.location_name}</span>
              <span>🏢 {project.contractor}</span>
              <span>
                📅 {project.start_date} → {project.end_date}
              </span>
            </div>
          </div>
          <div className="ml-6 text-right">
            <div className="text-lg font-bold text-gray-900">
              {formatCurrency(project.budget_total)}
            </div>
            <div className="text-xs text-gray-500">Total Budget</div>
            <div className="text-sm font-semibold text-amber-600 mt-1">
              {formatCurrency(project.budget_spent)} spent
            </div>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600 font-medium">
                🔨 Physical Progress
              </span>
              <span className="font-bold text-blue-600">
                {project.physical_progress}%
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div
                className="bg-blue-500 h-3 rounded-full transition-all"
                style={{ width: `${project.physical_progress}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600 font-medium">
                💰 Financial Progress
              </span>
              <span className="font-bold text-green-600">
                {project.financial_progress}%
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full transition-all"
                style={{ width: `${project.financial_progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Milestones & Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>
              ✅ {completedMilestones}/{project.milestones.length} milestones
            </span>
            <span>📍 {project.ping_history.length} pings</span>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/cms/projects/${project.id}`}
              className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              View Details
            </Link>
            <Link
              href={`/cms/progress?project=${project.id}`}
              className="px-3 py-1.5 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium"
            >
              Update Progress
            </Link>
            <Link
              href={`/cms/projects/ping?project=${project.id}`}
              className="px-3 py-1.5 text-xs bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors font-medium"
            >
              📍 Ping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
