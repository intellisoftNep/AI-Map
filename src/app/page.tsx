import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-amber-700">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
            <span className="text-4xl">🏛️</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Heritage Trail CMS
          </h1>
          <p className="text-xl text-amber-200 mb-2">
            Content Management System for Nepal Historic Places
          </p>
          <p className="text-amber-300/80 text-lg">
            नेपाल ऐतिहासिक स्थान व्यवस्थापन प्रणाली
          </p>
        </div>

        {/* Main Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Link href="/cms/dashboard">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all cursor-pointer group">
              <div className="text-4xl mb-4">📊</div>
              <h2 className="text-xl font-bold text-white mb-2">Dashboard</h2>
              <p className="text-amber-200 text-sm">
                Overview of all places, projects, and progress statistics
              </p>
              <div className="mt-4 text-amber-300 text-sm group-hover:translate-x-1 transition-transform">
                View Dashboard →
              </div>
            </div>
          </Link>

          <Link href="/cms/places">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all cursor-pointer group">
              <div className="text-4xl mb-4">🗺️</div>
              <h2 className="text-xl font-bold text-white mb-2">
                Historic Places
              </h2>
              <p className="text-amber-200 text-sm">
                Manage temples, stupas, durbar squares and other heritage sites
              </p>
              <div className="mt-4 text-amber-300 text-sm group-hover:translate-x-1 transition-transform">
                Manage Places →
              </div>
            </div>
          </Link>

          <Link href="/cms/projects">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all cursor-pointer group">
              <div className="text-4xl mb-4">🏗️</div>
              <h2 className="text-xl font-bold text-white mb-2">
                Projects
              </h2>
              <p className="text-amber-200 text-sm">
                Track restoration, conservation and infrastructure projects
              </p>
              <div className="mt-4 text-amber-300 text-sm group-hover:translate-x-1 transition-transform">
                View Projects →
              </div>
            </div>
          </Link>

          <Link href="/cms/progress">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all cursor-pointer group">
              <div className="text-4xl mb-4">📈</div>
              <h2 className="text-xl font-bold text-white mb-2">
                Progress Tracking
              </h2>
              <p className="text-amber-200 text-sm">
                Monitor physical and financial progress of all projects
              </p>
              <div className="mt-4 text-amber-300 text-sm group-hover:translate-x-1 transition-transform">
                Track Progress →
              </div>
            </div>
          </Link>

          <Link href="/cms/projects/ping">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all cursor-pointer group">
              <div className="text-4xl mb-4">📍</div>
              <h2 className="text-xl font-bold text-white mb-2">
                Ping Location
              </h2>
              <p className="text-amber-200 text-sm">
                Mark project locations with GPS coordinates and progress updates
              </p>
              <div className="mt-4 text-amber-300 text-sm group-hover:translate-x-1 transition-transform">
                Ping Location →
              </div>
            </div>
          </Link>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <div className="text-4xl mb-4">📱</div>
            <h2 className="text-xl font-bold text-white mb-2">
              Mobile App
            </h2>
            <p className="text-amber-200 text-sm">
              Flutter app with bilingual support (English/Nepali), GPS navigation, audio/video guides
            </p>
            <div className="mt-4 text-amber-300/60 text-sm">
              See /heritage_app directory
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            System Features
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🗺️', label: 'Interactive Map' },
              { icon: '🧭', label: 'GPS Navigation' },
              { icon: '🎵', label: 'Audio Guides' },
              { icon: '🎬', label: 'Video Tours' },
              { icon: '📸', label: 'Photo Gallery' },
              { icon: '🌐', label: 'Bilingual (EN/NE)' },
              { icon: '📍', label: 'Location Ping' },
              { icon: '📊', label: 'Progress Tracking' },
            ].map((feature) => (
              <div
                key={feature.label}
                className="text-center p-3 bg-white/5 rounded-xl"
              >
                <div className="text-2xl mb-1">{feature.icon}</div>
                <div className="text-amber-200 text-xs font-medium">
                  {feature.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
