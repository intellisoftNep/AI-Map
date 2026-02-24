import { getDashboardStats, sampleProjects, samplePlaces } from "@/lib/data";
import Link from "next/link";

export default function DashboardPage() {
  const stats = getDashboardStats();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NP", {
      style: "currency",
      currency: "NPR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const statusColors: Record<string, string> = {
    ongoing: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    planning: "bg-yellow-100 text-yellow-800",
    on_hold: "bg-orange-100 text-orange-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Heritage Trail CMS — Overview & Statistics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon="🏛️"
          label="Historic Places"
          value={stats.total_places}
          color="bg-red-50 border-red-200"
          textColor="text-red-700"
        />
        <StatCard
          icon="🏗️"
          label="Total Projects"
          value={stats.total_projects}
          color="bg-blue-50 border-blue-200"
          textColor="text-blue-700"
        />
        <StatCard
          icon="⚙️"
          label="Ongoing Projects"
          value={stats.ongoing_projects}
          color="bg-amber-50 border-amber-200"
          textColor="text-amber-700"
        />
        <StatCard
          icon="✅"
          label="Completed"
          value={stats.completed_projects}
          color="bg-green-50 border-green-200"
          textColor="text-green-700"
        />
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            💰 Budget Overview
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Total Budget</span>
                <span className="font-semibold">
                  {formatCurrency(stats.total_budget)}
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div
                  className="bg-blue-500 h-3 rounded-full"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Amount Spent</span>
                <span className="font-semibold text-amber-600">
                  {formatCurrency(stats.total_spent)}
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div
                  className="bg-amber-500 h-3 rounded-full"
                  style={{
                    width: `${(stats.total_spent / stats.total_budget) * 100}%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Remaining</span>
                <span className="font-semibold text-green-600">
                  {formatCurrency(stats.total_budget - stats.total_spent)}
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{
                    width: `${((stats.total_budget - stats.total_spent) / stats.total_budget) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            📊 Average Progress
          </h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Physical Progress
                </span>
                <span className="text-sm font-bold text-blue-600">
                  {stats.avg_physical_progress}%
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-4">
                <div
                  className="bg-blue-500 h-4 rounded-full flex items-center justify-end pr-2"
                  style={{ width: `${stats.avg_physical_progress}%` }}
                >
                  <span className="text-white text-xs font-bold">
                    {stats.avg_physical_progress}%
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Financial Progress
                </span>
                <span className="text-sm font-bold text-green-600">
                  {stats.avg_financial_progress}%
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-4">
                <div
                  className="bg-green-500 h-4 rounded-full flex items-center justify-end pr-2"
                  style={{ width: `${stats.avg_financial_progress}%` }}
                >
                  <span className="text-white text-xs font-bold">
                    {stats.avg_financial_progress}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-8">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">
            🏗️ Recent Projects
          </h2>
          <Link
            href="/cms/projects"
            className="text-sm text-red-700 hover:text-red-900 font-medium"
          >
            View All →
          </Link>
        </div>
        <div className="divide-y divide-gray-50">
          {sampleProjects.map((project) => (
            <div key={project.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">
                      {project.name}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[project.status] || "bg-gray-100 text-gray-700"}`}
                    >
                      {project.status.replace("_", " ").toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">
                    📍 {project.location_name}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Physical</span>
                        <span className="font-medium text-blue-600">
                          {project.physical_progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${project.physical_progress}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Financial</span>
                        <span className="font-medium text-green-600">
                          {project.financial_progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${project.financial_progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ml-6 text-right">
                  <div className="text-sm font-semibold text-gray-900">
                    {formatCurrency(project.budget_total)}
                  </div>
                  <div className="text-xs text-gray-500">Total Budget</div>
                  <Link
                    href={`/cms/projects/${project.id}`}
                    className="mt-2 inline-block text-xs text-red-700 hover:text-red-900 font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Places by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            🏛️ Places by Category
          </h2>
          <div className="space-y-3">
            {Object.entries(stats.places_by_category).map(([cat, count]) => (
              <div key={cat} className="flex items-center justify-between">
                <span className="text-sm text-gray-700 capitalize">{cat}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{
                        width: `${(count / stats.total_places) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-4">
                    {count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            🏗️ Projects by Status
          </h2>
          <div className="space-y-3">
            {Object.entries(stats.projects_by_status).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <span className="text-sm text-gray-700 capitalize">
                  {status.replace("_", " ")}
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{
                        width: `${(count / stats.total_projects) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-4">
                    {count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
  textColor,
}: {
  icon: string;
  label: string;
  value: number;
  color: string;
  textColor: string;
}) {
  return (
    <div className={`rounded-2xl border p-6 ${color}`}>
      <div className="text-3xl mb-3">{icon}</div>
      <div className={`text-3xl font-bold ${textColor}`}>{value}</div>
      <div className="text-sm text-gray-600 mt-1">{label}</div>
    </div>
  );
}
