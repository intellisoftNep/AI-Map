"use client";

import { useState, useMemo } from "react";
import {
  nepalProvinces,
  Province,
  District,
  Municipality,
  municipalityTypeLabel,
  MunicipalityType,
} from "@/lib/nepal-municipalities";
import { samplePlaces, sampleProjects } from "@/lib/data";

export default function MunicipalityMapPage() {
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [selectedMunicipality, setSelectedMunicipality] = useState<Municipality | null>(null);
  const [filterType, setFilterType] = useState<MunicipalityType | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Get filtered municipalities
  const filteredMunicipalities = useMemo(() => {
    let muns: Municipality[] = [];

    if (selectedDistrict) {
      muns = selectedDistrict.municipalities;
    } else if (selectedProvince) {
      muns = selectedProvince.districts.flatMap((d) => d.municipalities);
    } else {
      muns = nepalProvinces.flatMap((p) =>
        p.districts.flatMap((d) => d.municipalities)
      );
    }

    if (filterType !== "all") {
      muns = muns.filter((m) => m.type === filterType);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      muns = muns.filter(
        (m) =>
          m.nameEn.toLowerCase().includes(q) ||
          m.nameNe.includes(searchQuery)
      );
    }

    return muns;
  }, [selectedProvince, selectedDistrict, filterType, searchQuery]);

  // Get places in selected municipality/district/province
  const relevantPlaces = useMemo(() => {
    if (selectedMunicipality) {
      // Find places near the municipality center (within ~20km)
      return samplePlaces.filter((place) => {
        const dist = Math.sqrt(
          Math.pow(place.latitude - selectedMunicipality.centerLat, 2) +
            Math.pow(place.longitude - selectedMunicipality.centerLng, 2)
        );
        return dist < 0.3;
      });
    }
    return samplePlaces;
  }, [selectedMunicipality]);

  // Get projects in selected area
  const relevantProjects = useMemo(() => {
    if (selectedMunicipality) {
      return sampleProjects.filter((project) => {
        const dist = Math.sqrt(
          Math.pow(project.latitude - selectedMunicipality.centerLat, 2) +
            Math.pow(project.longitude - selectedMunicipality.centerLng, 2)
        );
        return dist < 0.3;
      });
    }
    return sampleProjects;
  }, [selectedMunicipality]);

  const typeColors: Record<MunicipalityType, string> = {
    metropolitan_city: "bg-red-100 text-red-800 border-red-200",
    sub_metropolitan_city: "bg-orange-100 text-orange-800 border-orange-200",
    municipality: "bg-blue-100 text-blue-800 border-blue-200",
    rural_municipality: "bg-green-100 text-green-800 border-green-200",
  };

  const typeDotColors: Record<MunicipalityType, string> = {
    metropolitan_city: "bg-red-500",
    sub_metropolitan_city: "bg-orange-500",
    municipality: "bg-blue-500",
    rural_municipality: "bg-green-500",
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          🗺️ Municipality Map Filter
        </h1>
        <p className="text-gray-500 mt-1">
          Browse historic places and projects by Province → District →
          Municipality / Rural Municipality
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel: Filter */}
        <div className="lg:col-span-1 space-y-4">
          {/* Search */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
            <input
              type="text"
              placeholder="🔍 Search municipality..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
            />
          </div>

          {/* Type Filter */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
            <div className="text-xs font-bold text-gray-500 uppercase mb-3">
              Filter by Type
            </div>
            <div className="space-y-2">
              <button
                onClick={() => setFilterType("all")}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  filterType === "all"
                    ? "bg-gray-800 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                All Types
              </button>
              {(
                [
                  "metropolitan_city",
                  "sub_metropolitan_city",
                  "municipality",
                  "rural_municipality",
                ] as MunicipalityType[]
              ).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                    filterType === type
                      ? "bg-gray-800 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${typeDotColors[type]}`}
                  />
                  {municipalityTypeLabel[type].en}
                </button>
              ))}
            </div>
          </div>

          {/* Province Selector */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
            <div className="text-xs font-bold text-gray-500 uppercase mb-3">
              Province
            </div>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setSelectedProvince(null);
                  setSelectedDistrict(null);
                  setSelectedMunicipality(null);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  !selectedProvince
                    ? "bg-red-800 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                🇳🇵 All Nepal
              </button>
              {nepalProvinces.map((province) => (
                <button
                  key={province.id}
                  onClick={() => {
                    setSelectedProvince(province);
                    setSelectedDistrict(null);
                    setSelectedMunicipality(null);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedProvince?.id === province.id
                      ? "bg-red-800 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <div className="font-medium">Province {province.id}</div>
                  <div
                    className={`text-xs ${selectedProvince?.id === province.id ? "text-red-200" : "text-gray-500"}`}
                  >
                    {province.nameEn}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* District Selector */}
          {selectedProvince && (
            <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
              <div className="text-xs font-bold text-gray-500 uppercase mb-3">
                District — {selectedProvince.nameEn}
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setSelectedDistrict(null);
                    setSelectedMunicipality(null);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    !selectedDistrict
                      ? "bg-amber-600 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  All Districts
                </button>
                {selectedProvince.districts.map((district) => (
                  <button
                    key={district.id}
                    onClick={() => {
                      setSelectedDistrict(district);
                      setSelectedMunicipality(null);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedDistrict?.id === district.id
                        ? "bg-amber-600 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="font-medium">{district.nameEn}</div>
                    <div
                      className={`text-xs ${selectedDistrict?.id === district.id ? "text-amber-100" : "text-gray-500"}`}
                    >
                      {district.nameNe} •{" "}
                      {district.municipalities.length} units
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Panel: Municipality List + Details */}
        <div className="lg:col-span-2 space-y-4">
          {/* Breadcrumb */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <button
                onClick={() => {
                  setSelectedProvince(null);
                  setSelectedDistrict(null);
                  setSelectedMunicipality(null);
                }}
                className="hover:text-red-800 font-medium"
              >
                🇳🇵 Nepal
              </button>
              {selectedProvince && (
                <>
                  <span>›</span>
                  <button
                    onClick={() => {
                      setSelectedDistrict(null);
                      setSelectedMunicipality(null);
                    }}
                    className="hover:text-red-800 font-medium"
                  >
                    {selectedProvince.nameEn}
                  </button>
                </>
              )}
              {selectedDistrict && (
                <>
                  <span>›</span>
                  <button
                    onClick={() => setSelectedMunicipality(null)}
                    className="hover:text-red-800 font-medium"
                  >
                    {selectedDistrict.nameEn}
                  </button>
                </>
              )}
              {selectedMunicipality && (
                <>
                  <span>›</span>
                  <span className="text-red-800 font-semibold">
                    {selectedMunicipality.nameEn}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Selected Municipality Detail */}
          {selectedMunicipality && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {selectedMunicipality.nameEn}
                  </h2>
                  <div className="text-lg text-gray-600">
                    {selectedMunicipality.nameNe}
                  </div>
                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium border ${typeColors[selectedMunicipality.type]}`}
                  >
                    {municipalityTypeLabel[selectedMunicipality.type].en}
                  </span>
                </div>
                <div className="text-right">
                  <div className="font-mono text-sm text-gray-600">
                    {selectedMunicipality.centerLat.toFixed(4)}°N
                  </div>
                  <div className="font-mono text-sm text-gray-600">
                    {selectedMunicipality.centerLng.toFixed(4)}°E
                  </div>
                  <a
                    href={`https://maps.google.com/?q=${selectedMunicipality.centerLat},${selectedMunicipality.centerLng}&z=${selectedMunicipality.zoomLevel}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-xs text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>

              {/* Places in this municipality */}
              {relevantPlaces.length > 0 && (
                <div className="mt-4">
                  <div className="text-sm font-bold text-gray-700 mb-2">
                    🏛️ Historic Places ({relevantPlaces.length})
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {relevantPlaces.map((place) => (
                      <span
                        key={place.id}
                        className="px-3 py-1 bg-red-50 text-red-800 rounded-full text-xs font-medium border border-red-200"
                      >
                        {place.name_en}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects in this municipality */}
              {relevantProjects.length > 0 && (
                <div className="mt-4">
                  <div className="text-sm font-bold text-gray-700 mb-2">
                    🏗️ Projects ({relevantProjects.length})
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {relevantProjects.map((project) => (
                      <span
                        key={project.id}
                        className="px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-xs font-medium border border-blue-200"
                      >
                        {project.name.split(" ").slice(0, 3).join(" ")}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Municipality Grid */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-bold text-gray-800">
                Municipalities & Rural Municipalities
              </h2>
              <span className="text-sm text-gray-500">
                {filteredMunicipalities.length} units
              </span>
            </div>
            <div className="divide-y divide-gray-50 max-h-[500px] overflow-y-auto">
              {filteredMunicipalities.length === 0 ? (
                <div className="p-8 text-center text-gray-400">
                  No municipalities found
                </div>
              ) : (
                filteredMunicipalities.map((mun) => (
                  <button
                    key={mun.id}
                    onClick={() => setSelectedMunicipality(mun)}
                    className={`w-full text-left px-6 py-4 hover:bg-gray-50 transition-colors flex items-center justify-between ${
                      selectedMunicipality?.id === mun.id
                        ? "bg-red-50 border-l-4 border-red-800"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-3 h-3 rounded-full flex-shrink-0 ${typeDotColors[mun.type]}`}
                      />
                      <div>
                        <div className="font-medium text-sm text-gray-900">
                          {mun.nameEn}
                        </div>
                        <div className="text-xs text-gray-500">{mun.nameNe}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium border ${typeColors[mun.type]}`}
                      >
                        {municipalityTypeLabel[mun.type].ne}
                      </span>
                      <span className="text-gray-400 text-xs">
                        {mun.centerLat.toFixed(2)}°N
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Legend */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
            <div className="text-xs font-bold text-gray-500 uppercase mb-3">
              Legend
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  "metropolitan_city",
                  "sub_metropolitan_city",
                  "municipality",
                  "rural_municipality",
                ] as MunicipalityType[]
              ).map((type) => (
                <div key={type} className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${typeDotColors[type]}`}
                  />
                  <span className="text-xs text-gray-700">
                    {municipalityTypeLabel[type].en}
                  </span>
                  <span className="text-xs text-gray-400">
                    ({municipalityTypeLabel[type].ne})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
