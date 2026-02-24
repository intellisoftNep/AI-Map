"use client";

import { useState } from "react";
import { sampleProjects } from "@/lib/data";
import {
  nepalProvinces,
  Province,
  District,
  Municipality,
} from "@/lib/nepal-municipalities";
import Link from "next/link";

interface PingFormData {
  project_id: string;
  latitude: string;
  longitude: string;
  physical_progress: number;
  financial_progress: number;
  notes: string;
  pinged_by: string;
  province_id: string;
  district_id: string;
  municipality_id: string;
}

export default function PingLocationPage() {
  const [formData, setFormData] = useState<PingFormData>({
    project_id: "",
    latitude: "",
    longitude: "",
    physical_progress: 0,
    financial_progress: 0,
    notes: "",
    pinged_by: "",
    province_id: "",
    district_id: "",
    municipality_id: "",
  });
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [locationError, setLocationError] = useState("");

  // Municipality filter state
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [selectedMunicipality, setSelectedMunicipality] = useState<Municipality | null>(null);

  const selectedProject = sampleProjects.find(
    (p) => p.id === formData.project_id
  );

  const handleGetLocation = () => {
    setIsGettingLocation(true);
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          latitude: position.coords.latitude.toFixed(6),
          longitude: position.coords.longitude.toFixed(6),
        }));
        setIsGettingLocation(false);
      },
      (error) => {
        setLocationError(`Location error: ${error.message}`);
        setIsGettingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleProjectSelect = (projectId: string) => {
    const project = sampleProjects.find((p) => p.id === projectId);
    if (project) {
      setFormData((prev) => ({
        ...prev,
        project_id: projectId,
        latitude: project.latitude.toString(),
        longitude: project.longitude.toString(),
        physical_progress: project.physical_progress,
        financial_progress: project.financial_progress,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would POST to an API
    console.log("Ping submitted:", {
      ...formData,
      timestamp: new Date().toISOString(),
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-md shadow-lg">
          <div className="text-6xl mb-4">📍</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Location Pinged!
          </h2>
          <p className="text-gray-500 mb-6">
            Project location has been successfully pinged with progress update.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 text-left mb-6 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <span className="text-gray-500">Project:</span>
              <span className="font-medium">
                {selectedProject?.name || formData.project_id}
              </span>
              <span className="text-gray-500">Coordinates:</span>
              <span className="font-mono text-xs">
                {formData.latitude}, {formData.longitude}
              </span>
              <span className="text-gray-500">Physical:</span>
              <span className="font-medium text-blue-600">
                {formData.physical_progress}%
              </span>
              <span className="text-gray-500">Financial:</span>
              <span className="font-medium text-green-600">
                {formData.financial_progress}%
              </span>
              <span className="text-gray-500">Pinged by:</span>
              <span className="font-medium">{formData.pinged_by}</span>
              <span className="text-gray-500">Time:</span>
              <span className="font-medium">
                {new Date().toLocaleString()}
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setSubmitted(false)}
              className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              Ping Again
            </button>
            <Link
              href="/cms/projects"
              className="flex-1 px-4 py-2.5 bg-red-800 text-white rounded-xl font-medium hover:bg-red-900 transition-colors text-center"
            >
              View Projects
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">📍 Ping Location</h1>
        <p className="text-gray-500 mt-1">
          Mark project location with GPS coordinates and update progress
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Selection */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Select Project
              </h2>
              <select
                value={formData.project_id}
                onChange={(e) => handleProjectSelect(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300 text-sm"
              >
                <option value="">-- Select a project --</option>
                {sampleProjects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.status})
                  </option>
                ))}
              </select>

              {selectedProject && (
                <div className="mt-4 p-4 bg-blue-50 rounded-xl text-sm">
                  <div className="font-semibold text-blue-800 mb-2">
                    {selectedProject.name}
                  </div>
                  <div className="text-blue-600">
                    📍 {selectedProject.location_name}
                  </div>
                  <div className="text-blue-600">
                    Current Physical: {selectedProject.physical_progress}% |
                    Financial: {selectedProject.financial_progress}%
                  </div>
                </div>
              )}
            </div>

            {/* Municipality Selector */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                🏙️ Administrative Location
              </h2>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Province</label>
                  <select
                    value={formData.province_id}
                    onChange={(e) => {
                      const prov = nepalProvinces.find(p => p.id.toString() === e.target.value) || null;
                      setSelectedProvince(prov);
                      setSelectedDistrict(null);
                      setSelectedMunicipality(null);
                      setFormData(prev => ({ ...prev, province_id: e.target.value, district_id: '', municipality_id: '' }));
                    }}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
                  >
                    <option value="">-- Select Province --</option>
                    {nepalProvinces.map(p => (
                      <option key={p.id} value={p.id}>{p.nameEn} ({p.nameNe})</option>
                    ))}
                  </select>
                </div>
                {selectedProvince && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">District</label>
                    <select
                      value={formData.district_id}
                      onChange={(e) => {
                        const dist = selectedProvince.districts.find(d => d.id === e.target.value) || null;
                        setSelectedDistrict(dist);
                        setSelectedMunicipality(null);
                        setFormData(prev => ({ ...prev, district_id: e.target.value, municipality_id: '' }));
                      }}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
                    >
                      <option value="">-- Select District --</option>
                      {selectedProvince.districts.map(d => (
                        <option key={d.id} value={d.id}>{d.nameEn} ({d.nameNe})</option>
                      ))}
                    </select>
                  </div>
                )}
                {selectedDistrict && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Municipality / Rural Municipality</label>
                    <select
                      value={formData.municipality_id}
                      onChange={(e) => {
                        const mun = selectedDistrict.municipalities.find(m => m.id === e.target.value) || null;
                        setSelectedMunicipality(mun);
                        setFormData(prev => ({
                          ...prev,
                          municipality_id: e.target.value,
                          latitude: mun ? mun.centerLat.toFixed(6) : prev.latitude,
                          longitude: mun ? mun.centerLng.toFixed(6) : prev.longitude,
                        }));
                      }}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
                    >
                      <option value="">-- Select Municipality --</option>
                      {selectedDistrict.municipalities.map(m => (
                        <option key={m.id} value={m.id}>{m.nameEn} ({m.nameNe})</option>
                      ))}
                    </select>
                    {selectedMunicipality && (
                      <div className="mt-2 p-2 bg-green-50 rounded-lg text-xs text-green-700 flex items-center gap-2">
                        <span>✅</span>
                        <span>Coordinates auto-filled from {selectedMunicipality.nameEn}: {selectedMunicipality.centerLat.toFixed(4)}°N, {selectedMunicipality.centerLng.toFixed(4)}°E</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* GPS Location */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                GPS Location
              </h2>
              <div className="flex gap-3 mb-4">
                <button
                  type="button"
                  onClick={handleGetLocation}
                  disabled={isGettingLocation}
                  className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isGettingLocation ? (
                    <>
                      <span className="animate-spin">⟳</span> Getting
                      Location...
                    </>
                  ) : (
                    <>📡 Get Current GPS Location</>
                  )}
                </button>
              </div>
              {locationError && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-xl text-sm">
                  ⚠️ {locationError}
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Latitude *
                  </label>
                  <input
                    type="number"
                    step="0.000001"
                    value={formData.latitude}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        latitude: e.target.value,
                      }))
                    }
                    required
                    placeholder="27.7109"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300 text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Longitude *
                  </label>
                  <input
                    type="number"
                    step="0.000001"
                    value={formData.longitude}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        longitude: e.target.value,
                      }))
                    }
                    required
                    placeholder="85.3484"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300 text-sm font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Progress Update */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Progress Update
              </h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      🔨 Physical Progress
                    </label>
                    <span className="text-sm font-bold text-blue-600">
                      {formData.physical_progress}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.physical_progress}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        physical_progress: parseInt(e.target.value),
                      }))
                    }
                    className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>0%</span>
                    <span>25%</span>
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      💰 Financial Progress
                    </label>
                    <span className="text-sm font-bold text-green-600">
                      {formData.financial_progress}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.financial_progress}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        financial_progress: parseInt(e.target.value),
                      }))
                    }
                    className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-green-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>0%</span>
                    <span>25%</span>
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes & Reporter */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Field Notes
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pinged By *
                  </label>
                  <input
                    type="text"
                    value={formData.pinged_by}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        pinged_by: e.target.value,
                      }))
                    }
                    required
                    placeholder="Site Engineer / Project Manager name"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Field Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        notes: e.target.value,
                      }))
                    }
                    rows={4}
                    placeholder="Describe current site conditions, work completed, issues encountered..."
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300 text-sm resize-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-red-800 text-white rounded-xl font-bold text-lg hover:bg-red-900 transition-colors flex items-center justify-center gap-2"
            >
              📍 Submit Ping
            </button>
          </form>
        </div>

        {/* Ping History */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Recent Pings
            </h2>
            {sampleProjects
              .flatMap((p) =>
                p.ping_history.map((ping) => ({
                  ...ping,
                  project_name: p.name,
                }))
              )
              .sort(
                (a, b) =>
                  new Date(b.timestamp).getTime() -
                  new Date(a.timestamp).getTime()
              )
              .slice(0, 5)
              .map((ping) => (
                <div
                  key={ping.id}
                  className="border-b border-gray-100 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0"
                >
                  <div className="font-medium text-sm text-gray-900 mb-1">
                    {ping.project_name}
                  </div>
                  <div className="text-xs text-gray-500 mb-2">
                    📍 {ping.latitude.toFixed(4)}, {ping.longitude.toFixed(4)}
                  </div>
                  <div className="flex gap-3 text-xs mb-2">
                    <span className="text-blue-600">
                      Physical: {ping.physical_progress}%
                    </span>
                    <span className="text-green-600">
                      Financial: {ping.financial_progress}%
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    By {ping.pinged_by} •{" "}
                    {new Date(ping.timestamp).toLocaleDateString()}
                  </div>
                  {ping.notes && (
                    <div className="text-xs text-gray-600 mt-1 italic">
                      &ldquo;{ping.notes.substring(0, 80)}...&rdquo;
                    </div>
                  )}
                </div>
              ))}
          </div>

          {/* Map Preview */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Location Preview
            </h2>
            {formData.latitude && formData.longitude ? (
              <div className="bg-gray-100 rounded-xl p-4 text-center">
                <div className="text-4xl mb-2">📍</div>
                <div className="font-mono text-sm text-gray-700">
                  {parseFloat(formData.latitude).toFixed(6)}°N
                </div>
                <div className="font-mono text-sm text-gray-700">
                  {parseFloat(formData.longitude).toFixed(6)}°E
                </div>
                <a
                  href={`https://maps.google.com/?q=${formData.latitude},${formData.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-xs text-blue-600 hover:text-blue-800 font-medium"
                >
                  Open in Google Maps →
                </a>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-400">
                <div className="text-3xl mb-2">🗺️</div>
                <div className="text-sm">
                  Enter coordinates or use GPS to see location
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
