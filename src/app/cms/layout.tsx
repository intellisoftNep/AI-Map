"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/cms/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/cms/places", label: "Historic Places", icon: "🏛️" },
  { href: "/cms/map", label: "Municipality Map", icon: "🗺️" },
  { href: "/cms/projects", label: "Projects", icon: "🏗️" },
  { href: "/cms/progress", label: "Progress", icon: "📈" },
  { href: "/cms/projects/ping", label: "Ping Location", icon: "📍" },
];

export default function CMSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-red-900 text-white flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-red-800">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-3xl">🏛️</span>
            <div>
              <div className="font-bold text-lg leading-tight">Heritage Trail</div>
              <div className="text-red-300 text-xs">CMS Admin Panel</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/cms/dashboard" &&
                pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-amber-600 text-white font-semibold"
                    : "text-red-200 hover:bg-red-800 hover:text-white"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-red-800">
          <div className="text-red-300 text-xs text-center">
            Heritage Trail CMS v1.0
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
