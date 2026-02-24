import { samplePlaces } from "@/lib/data";
import Link from "next/link";
import { HistoricPlace } from "@/types";

const categoryColors: Record<string, string> = {
  temple: "bg-red-100 text-red-800",
  stupa: "bg-orange-100 text-orange-800",
  durbar: "bg-yellow-100 text-yellow-800",
  palace: "bg-purple-100 text-purple-800",
  museum: "bg-cyan-100 text-cyan-800",
  monument: "bg-green-100 text-green-800",
  garden: "bg-emerald-100 text-emerald-800",
  heritage: "bg-blue-100 text-blue-800",
};

export default function PlacesPage() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Historic Places</h1>
          <p className="text-gray-500 mt-1">
            Manage Nepal&apos;s heritage sites and historic locations
          </p>
        </div>
        <Link
          href="/cms/places/new"
          className="bg-red-800 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-red-900 transition-colors flex items-center gap-2"
        >
          <span>+</span> Add New Place
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6 flex flex-wrap gap-3">
        <div className="flex-1 min-w-48">
          <input
            type="text"
            placeholder="🔍 Search places..."
            className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
          />
        </div>
        <select className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-300">
          <option value="">All Categories</option>
          <option value="temple">Temple</option>
          <option value="stupa">Stupa</option>
          <option value="durbar">Durbar</option>
          <option value="palace">Palace</option>
          <option value="museum">Museum</option>
          <option value="monument">Monument</option>
        </select>
        <select className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-300">
          <option value="">All Cities</option>
          <option value="kathmandu">Kathmandu</option>
          <option value="lalitpur">Lalitpur</option>
          <option value="bhaktapur">Bhaktapur</option>
        </select>
      </div>

      {/* Places Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Place
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Featured
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {samplePlaces.map((place) => (
              <PlaceRow key={place.id} place={place} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-4 text-sm text-gray-500 text-right">
        Showing {samplePlaces.length} places
      </div>
    </div>
  );
}

function PlaceRow({ place }: { place: HistoricPlace }) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div>
          <div className="font-semibold text-gray-900 text-sm">
            {place.name_en}
          </div>
          <div className="text-gray-500 text-xs mt-0.5">{place.name_ne}</div>
          <div className="text-gray-400 text-xs mt-0.5">
            {place.historical_period}
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${categoryColors[place.category] || "bg-gray-100 text-gray-700"}`}
        >
          {place.category}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-700">{place.city}</div>
        <div className="text-xs text-gray-400">{place.province} Province</div>
        <div className="text-xs text-gray-400 font-mono">
          {place.latitude.toFixed(4)}, {place.longitude.toFixed(4)}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-1">
          <span className="text-amber-400">★</span>
          <span className="text-sm font-semibold">{place.rating}</span>
          <span className="text-xs text-gray-400">({place.review_count})</span>
        </div>
      </td>
      <td className="px-6 py-4">
        {place.is_featured ? (
          <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
            ★ Featured
          </span>
        ) : (
          <span className="text-gray-400 text-xs">—</span>
        )}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <Link
            href={`/cms/places/${place.id}`}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            View
          </Link>
          <Link
            href={`/cms/places/${place.id}/edit`}
            className="text-xs text-amber-600 hover:text-amber-800 font-medium"
          >
            Edit
          </Link>
          <button className="text-xs text-red-600 hover:text-red-800 font-medium">
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
