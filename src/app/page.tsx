import Image from 'next/image';
import Link from 'next/link';
import { samplePlaces, sampleProjects, getDashboardStats } from '@/lib/data';

const featuredPlaces = samplePlaces.filter(p => p.is_featured);
const stats = getDashboardStats();

// Calculate category counts from actual data
const categoryCounts = samplePlaces.reduce((acc, place) => {
  acc[place.category] = (acc[place.category] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

const categories = [
  { id: 'temple', label: 'Temples', icon: '🛕', count: categoryCounts['temple'] || 0 },
  { id: 'stupa', label: 'Stupas', icon: '🏯', count: categoryCounts['stupa'] || 0 },
  { id: 'durbar', label: 'Durbar Squares', icon: '🏰', count: categoryCounts['durbar'] || 0 },
  { id: 'monument', label: 'Monuments', icon: '🗿', count: categoryCounts['monument'] || 0 },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-red-700 rounded-xl flex items-center justify-center">
                <span className="text-xl">🏛️</span>
              </div>
              <span className="text-xl font-bold text-stone-800">Heritage Trail</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#places" className="text-stone-600 hover:text-amber-700 font-medium transition-colors">Places</a>
              <a href="#map" className="text-stone-600 hover:text-amber-700 font-medium transition-colors">Map</a>
              <a href="#about" className="text-stone-600 hover:text-amber-700 font-medium transition-colors">About</a>
              <Link href="/cms" className="px-4 py-2 bg-stone-100 text-stone-700 rounded-lg font-medium hover:bg-stone-200 transition-colors">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-red-950">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/20 rounded-full blur-3xl"></div>
          </div>
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-400/30 rounded-full mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-amber-200 text-sm font-medium">Explore Nepal&apos;s UNESCO World Heritage Sites</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Discover Nepal&apos;s<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-300">
              Rich Heritage
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-stone-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Your ultimate guide to exploring ancient temples, stupas, and monuments across Nepal. 
            Navigate with GPS, listen to audio guides, and experience history come alive.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a 
              href="#explore" 
              className="px-8 py-4 bg-amber-600 text-white rounded-xl font-semibold text-lg hover:bg-amber-700 transition-all hover:scale-105 shadow-lg shadow-amber-600/30"
            >
              Start Exploring
            </a>
            <a 
              href="#about" 
              className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all"
            >
              Learn More
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { value: '10+', label: 'Heritage Sites' },
              { value: '7', label: 'Provinces' },
              { value: '100+', label: 'Places Mapped' },
              { value: 'EN/NE', label: 'Languages' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-stone-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="places" className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4">
              Explore by Category
            </h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              From sacred temples to ancient palaces, discover the diverse heritage of Nepal
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <a 
                key={cat.id}
                href="#"
                className="group bg-white rounded-2xl p-6 border border-stone-200 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-200/30 transition-all duration-300"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {cat.icon}
                </div>
                <h3 className="text-lg font-bold text-stone-800 mb-1">{cat.label}</h3>
                <p className="text-stone-500 text-sm">{cat.count} places</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Places */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4">
                Featured Places
              </h2>
              <p className="text-xl text-stone-600">
                Must-visit heritage sites recommended by travelers
              </p>
            </div>
            <a 
              href="#" 
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-amber-700 font-semibold hover:gap-3 transition-all"
            >
              View All Places
              <span>→</span>
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPlaces.map((place) => (
              <a 
                key={place.id}
                href="#"
                className="group bg-white rounded-2xl overflow-hidden border border-stone-200 hover:shadow-2xl hover:shadow-stone-300/50 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image placeholder */}
                <div className="relative h-56 bg-gradient-to-br from-amber-100 to-red-100 flex items-center justify-center overflow-hidden">
                  <div className="text-6xl opacity-50 group-hover:scale-110 transition-transform duration-500">
                    {place.category === 'temple' ? '🛕' : place.category === 'stupa' ? '🏯' : '🏰'}
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-stone-700">
                    {place.category.charAt(0).toUpperCase() + place.category.slice(1)}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-stone-800 mb-2 group-hover:text-amber-700 transition-colors">
                    {place.name_en}
                  </h3>
                  <p className="text-ne font-medium text-amber-700 mb-3">{place.name_ne}</p>
                  <p className="text-stone-600 text-sm line-clamp-2 mb-4">
                    {place.description_en}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                    <div className="flex items-center gap-1">
                      <span className="text-amber-500">⭐</span>
                      <span className="font-semibold text-stone-800">{place.rating}</span>
                      <span className="text-stone-400 text-sm">({place.review_count.toLocaleString()})</span>
                    </div>
                    <div className="text-sm text-stone-500">
                      {place.historical_period}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* App Features */}
      <section id="about" className="py-24 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-400/30 rounded-full mb-6">
                <span className="text-amber-400 text-sm font-medium">Mobile App</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Your Personal Heritage Guide
              </h2>
              <p className="text-xl text-stone-300 mb-8 leading-relaxed">
                Download our mobile app for an immersive experience. Navigate with GPS, 
                listen to audio guides in English or Nepali, and explore at your own pace.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: '🗺️', title: 'Interactive Map', desc: 'Find all heritage sites' },
                  { icon: '🧭', title: 'GPS Navigation', desc: 'Turn-by-turn directions' },
                  { icon: '🎵', title: 'Audio Guides', desc: 'Expert narrations' },
                  { icon: '🌐', title: 'Bilingual', desc: 'English & Nepali' },
                  { icon: '📸', title: 'Photo Gallery', desc: 'High-quality images' },
                  { icon: '🎬', title: 'Video Tours', desc: 'Virtual exploration' },
                ].map((feature) => (
                  <div key={feature.title} className="flex items-start gap-3 p-3 bg-white/5 rounded-xl">
                    <span className="text-2xl">{feature.icon}</span>
                    <div>
                      <div className="font-semibold text-white">{feature.title}</div>
                      <div className="text-stone-400 text-sm">{feature.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-white text-stone-900 rounded-xl font-semibold flex items-center gap-3 hover:bg-stone-100 transition-colors">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  App Store
                </button>
                <button className="px-6 py-3 bg-white text-stone-900 rounded-xl font-semibold flex items-center gap-3 hover:bg-stone-100 transition-colors">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.36,10.72L18.27,11.93L15.39,9.05L20.36,7.28C20.68,7.4 20.89,7.69 20.89,8.03C20.89,8.39 20.72,8.73 20.36,8.94L20.36,10.72M16.81,8.88L14.54,11.15L6.05,2.66L16.81,8.88Z"/>
                  </svg>
                  Google Play
                </button>
              </div>
            </div>

            {/* App mockup */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 to-red-500/30 rounded-3xl blur-3xl"></div>
              <div className="relative bg-stone-800 rounded-3xl p-4 border border-stone-700">
                <div className="bg-stone-900 rounded-2xl overflow-hidden aspect-[9/16]">
                  {/* App screen mockup */}
                  <div className="h-full flex flex-col">
                    <div className="p-4 bg-gradient-to-br from-amber-600 to-red-700">
                      <div className="text-white font-bold">Heritage Trail</div>
                      <div className="text-white/70 text-xs">Kathmandu, Nepal</div>
                    </div>
                    <div className="flex-1 bg-stone-100 p-3 space-y-2">
                      <div className="h-24 bg-white rounded-xl flex items-center justify-center">
                        <span className="text-4xl">🛕</span>
                      </div>
                      <div className="h-20 bg-white rounded-xl flex items-center justify-center">
                        <span className="text-3xl">🏯</span>
                      </div>
                      <div className="h-20 bg-white rounded-xl flex items-center justify-center">
                        <span className="text-3xl">🏰</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Preview */}
      <section id="map" className="py-24 bg-amber-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4">
              Explore the Map
            </h2>
            <p className="text-xl text-stone-600">
              Filter heritage sites by province, district, and municipality
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl shadow-stone-300/50 overflow-hidden">
            {/* Map placeholder */}
            <div className="h-[500px] bg-gradient-to-br from-stone-100 to-amber-100 flex items-center justify-center relative">
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              }}></div>
              <div className="text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <div className="text-stone-600 font-medium">Interactive Map</div>
                <div className="text-stone-400 text-sm">Filter by Province → District → Municipality</div>
              </div>
              
              {/* Map markers */}
              <div className="absolute top-1/3 left-1/4 w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center shadow-lg animate-pulse cursor-pointer">
                <span className="text-white text-sm">🛕</span>
              </div>
              <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center shadow-lg animate-pulse cursor-pointer" style={{animationDelay: '0.5s'}}>
                <span className="text-white text-sm">🏯</span>
              </div>
              <div className="absolute bottom-1/3 right-1/4 w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center shadow-lg animate-pulse cursor-pointer" style={{animationDelay: '1s'}}>
                <span className="text-white text-sm">🏰</span>
              </div>
            </div>
            
            {/* Map controls */}
            <div className="p-6 border-t border-stone-200">
              <div className="flex flex-wrap gap-4 items-center">
                <select className="px-4 py-2 bg-stone-100 border border-stone-200 rounded-lg text-stone-700">
                  <option>All Provinces</option>
                  <option>Province 1</option>
                  <option>Madhesh</option>
                  <option>Bagmati</option>
                  <option>Gandaki</option>
                  <option>Lumbini</option>
                  <option>Karnali</option>
                  <option>Sudurpashchim</option>
                </select>
                <select className="px-4 py-2 bg-stone-100 border border-stone-200 rounded-lg text-stone-700">
                  <option>All Districts</option>
                  <option>Kathmandu</option>
                  <option>Lalitpur</option>
                  <option>Bhaktapur</option>
                </select>
                <select className="px-4 py-2 bg-stone-100 border border-stone-200 rounded-lg text-stone-700">
                  <option>All Municipalities</option>
                </select>
                <button className="ml-auto px-6 py-2 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors">
                  Apply Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4">
              Conservation Projects
            </h2>
            <p className="text-xl text-stone-600">
              Tracking restoration and preservation efforts across Nepal
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {sampleProjects.slice(0, 3).map((project) => (
              <div key={project.id} className="bg-stone-50 rounded-2xl p-6 border border-stone-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-stone-800 mb-1">{project.name}</h3>
                    <p className="text-stone-500 text-sm">📍 {project.location_name}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'completed' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {project.status === 'completed' ? 'Completed' : 'Ongoing'}
                  </span>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-stone-600">Progress</span>
                    <span className="font-semibold text-stone-800">{project.physical_progress}%</span>
                  </div>
                  <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        project.physical_progress === 100 ? 'bg-green-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${project.physical_progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="text-sm text-stone-500">
                  Budget: <span className="font-semibold text-stone-700">NPR {(project.budget_total / 1000000).toFixed(1)}M</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/cms/projects" 
              className="inline-flex items-center gap-2 text-amber-700 font-semibold hover:gap-3 transition-all"
            >
              View All Projects
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-amber-600 to-red-700 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Explore?
          </h2>
          <p className="text-xl text-amber-100 mb-10 leading-relaxed">
            Download the Heritage Trail app and start your journey through Nepal&apos;s 
            magnificent historical and cultural landmarks.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 bg-white text-stone-900 rounded-xl font-semibold text-lg flex items-center gap-3 hover:bg-stone-100 transition-colors">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              Download on App Store
            </button>
            <button className="px-8 py-4 bg-white/10 border border-white/20 rounded-xl font-semibold text-lg flex items-center gap-3 hover:bg-white/20 transition-colors">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.36,10.72L18.27,11.93L15.39,9.05L20.36,7.28C20.68,7.4 20.89,7.69 20.89,8.03C20.89,8.39 20.72,8.73 20.36,8.94L20.36,10.72M16.81,8.88L14.54,11.15L6.05,2.66L16.81,8.88Z"/>
              </svg>
              Get on Google Play
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-red-700 rounded-xl flex items-center justify-center">
                  <span className="text-xl">🏛️</span>
                </div>
                <span className="text-xl font-bold text-white">Heritage Trail</span>
              </div>
              <p className="text-sm leading-relaxed">
                Your comprehensive guide to exploring Nepal&apos;s UNESCO World Heritage Sites 
                and cultural landmarks.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Explore</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-amber-400 transition-colors">All Places</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Temples</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Stupas</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Durbar Squares</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-amber-400 transition-colors">Mobile App</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">API Documentation</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">For Developers</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Admin</h4>
              <ul className="space-y-2">
                <li><Link href="/cms" className="hover:text-amber-400 transition-colors">CMS Dashboard</Link></li>
                <li><Link href="/cms/places" className="hover:text-amber-400 transition-colors">Manage Places</Link></li>
                <li><Link href="/cms/projects" className="hover:text-amber-400 transition-colors">Projects</Link></li>
                <li><Link href="/cms/progress" className="hover:text-amber-400 transition-colors">Progress Tracking</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm">© 2024 Heritage Trail Nepal. All rights reserved.</p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
