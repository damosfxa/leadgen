import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, HeadphonesIcon, ExternalLink } from "lucide-react"

// Supabase fetching logic
async function fetchData() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    }
  )
  
  const [settingsRes, packagesRes] = await Promise.all([
    supabase.from("site_settings").select("*"),
    supabase.from("pricing_packages").select("*")
  ])
  
  const settings = (settingsRes.data || []).reduce((acc, curr) => {
    acc[curr.key] = curr.value
    return acc
  }, {} as Record<string, string>)

  const packages = packagesRes.data || []
  
  // Sort packages
  const order = ["starter", "populer", "professional"]
  packages.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id))
  
  return { settings, packages }
}

export default async function LandingPage() {
  const { settings, packages } = await fetchData()
  
  // Dynamic Variables from Database with fallbacks
  const whatsappNumber = settings.whatsapp_number || "6282113906629"
  const waLink = `https://wa.me/${whatsappNumber}`
  
  const heroTitle = settings.hero_title || "Kami bantu Anda memiliki website dan sistem otomatisasi yang modern & cepat."
  const heroDesc = settings.hero_desc || "Dibuat dengan Next.js & Supabase agar bisnis Anda tampil profesional."
  
  const filosofiTitle = settings.filosofi_title || "Kenapa Harus Kami?"
  const filosofiDesc1 = settings.filosofi_desc1 || "Kami spesialis membangun ekosistem digital untuk kemudahan operasional Anda."
  const filosofiDesc2 = settings.filosofi_desc2 || "Setiap website yang kami buat dirancang untuk menarik calon customer."
  
  const keunggulanTitle = settings.keunggulan_title || "Alasan Klien Memilih Kami"
  const keunggulanDesc = settings.keunggulan_desc || "Setiap fitur dan desain dibuat khusus untuk membantu Anda."
  
  const portfolioTitle = settings.portfolio_title || "Karya Terbaik Kami"
  const portfolioDesc = settings.portfolio_desc || "Jelajahi berbagai mahakarya digital di halaman portofolio kami."
  const portfolioUrl = settings.portfolio_url || "https://voxy.co.id/portfolio"

  const pricingTitle = settings.pricing_title || "Investasi Terjangkau"
  const pricingDesc = settings.pricing_desc || "Semua paket sudah termasuk optimasi standar dan keamanan."

  const ctaTitle = settings.cta_title || "Jangan tunggu kompetitor Anda lebih dulu online."
  const ctaDesc = settings.cta_desc || "Konsultasikan kebutuhan sistem dan web Anda sekarang."

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 font-sans overflow-x-clip selection:bg-blue-600 selection:text-white">
      
      {/* NAVBAR */}
      <nav className="border-b border-zinc-200 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight text-blue-600">LeadGen.</div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-600">
            <a href="#filosofi" className="hover:text-black transition-colors">Filosofi</a>
            <a href="#keunggulan" className="hover:text-black transition-colors">Keunggulan</a>
            <a href="#harga" className="hover:text-black transition-colors">Investasi</a>
          </div>
          <a 
            href={`${waLink}?text=Halo,%20saya%20ingin%20berdiskusi%20lebih%20lanjut.`}
            className="bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded-full hover:bg-blue-700 transition-colors"
          >
            Mari Berdiskusi
          </a>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1] text-zinc-900">
          {heroTitle}
        </h1>
        <p className="text-lg md:text-xl text-zinc-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          {heroDesc}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href={`${waLink}?text=Halo,%20saya%20tertarik%20untuk%20eskalasi%20bisnis%20saya.`}
            className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 font-semibold rounded-full hover:bg-blue-700 transition-all text-lg"
          >
            Mulai Transformasi Anda
          </a>
          <a 
            href="#harga"
            className="w-full sm:w-auto bg-white text-zinc-900 border border-zinc-300 px-8 py-4 font-semibold rounded-full hover:bg-zinc-100 transition-all text-lg"
          >
            Lihat Paket Harga
          </a>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="py-12 bg-white border-y border-zinc-200">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-zinc-200">
          <div className="pt-6 md:pt-0 px-4">
            <h3 className="font-bold text-xl mb-2">Arsitektur Modern</h3>
            <p className="text-zinc-600 text-sm">Infrastruktur skalabel dengan standar performa dan keamanan tinggi.</p>
          </div>
          <div className="pt-6 md:pt-0 px-4">
            <h3 className="font-bold text-xl mb-2">Bespoke UI/UX</h3>
            <p className="text-zinc-600 text-sm">Antarmuka eksklusif yang dirancang untuk identitas brand Anda.</p>
          </div>
          <div className="pt-6 md:pt-0 px-4">
            <h3 className="font-bold text-xl mb-2">Responsif</h3>
            <p className="text-zinc-600 text-sm">Pengalaman interaksi sempurna di seluruh perangkat.</p>
          </div>
        </div>
      </section>

      {/* FILOSOFI */}
      <section id="filosofi" className="py-24 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-blue-600 font-bold mb-2 uppercase tracking-wide text-sm">Filosofi</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-zinc-900">{filosofiTitle}</h3>
          <p className="text-zinc-600 text-lg leading-relaxed mb-6">
            {filosofiDesc1}
          </p>
          <p className="text-zinc-600 text-lg leading-relaxed mb-8">
            {filosofiDesc2}
          </p>
          <a 
            href={`${waLink}?text=Halo,%20saya%20ingin%20konsultasi.`}
            className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700"
          >
            Konsultasi Gratis <ArrowRight className="w-5 h-5" />
          </a>
        </div>
        <div className="bg-zinc-200 aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden relative shadow-inner flex items-center justify-center text-zinc-400">
          <div className="text-center p-8">
            <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-10 h-10" />
            </div>
            <p className="font-medium text-zinc-500">Fast & Modern Ecosystem</p>
          </div>
        </div>
      </section>

      {/* KEUNGGULAN */}
      <section id="keunggulan" className="py-24 bg-white border-t border-zinc-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-blue-600 font-bold mb-2 uppercase tracking-wide text-sm">Keunggulan</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-zinc-900">{keunggulanTitle}</h3>
            <p className="text-zinc-600 text-lg">{keunggulanDesc}</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2 text-zinc-900">Eksekusi Tangkas</h4>
                <p className="text-zinc-600">Pengiriman proyek tepat waktu dengan standar akurasi tinggi.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2 text-zinc-900">Keamanan Enterprise</h4>
                <p className="text-zinc-600">Infrastruktur data solid menjamin integritas aset digital Anda.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2 text-zinc-900">SEO & Performa Optimal</h4>
                <p className="text-zinc-600">Arsitektur web yang dirancang disukai oleh algoritma mesin pencari.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <HeadphonesIcon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2 text-zinc-900">Dukungan Pasca-Peluncuran</h4>
                <p className="text-zinc-600">Kami berkomitmen memberikan pemeliharaan berkelanjutan.</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* HARGA SECTION (RESTORED EXACT CLONE) */}
      <section id="harga" className="py-24 bg-white border-t border-zinc-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-blue-600 font-bold mb-2 uppercase tracking-wide text-sm">Rencana Investasi</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-zinc-900">{pricingTitle}</h3>
            <p className="text-zinc-600 text-lg">{pricingDesc}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            {packages.map((pkg) => {
              const isPopular = pkg.id === "populer";
              return (
                <div 
                  key={pkg.id} 
                  className={`bg-white rounded-3xl p-8 transition-transform duration-300 ${
                    isPopular 
                      ? 'border-2 border-blue-600 shadow-xl scale-105 z-10 relative' 
                      : 'border border-zinc-200 shadow-sm hover:shadow-md'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide">
                      PALING POPULER
                    </div>
                  )}
                  <h4 className="text-xl font-bold mb-2 text-zinc-900">{pkg.name}</h4>
                  <div className="text-3xl font-bold mb-4 text-zinc-900">{pkg.price}</div>
                  <p className="text-zinc-600 mb-8 min-h-[48px]">{pkg.description}</p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-zinc-700">Custom UI Design</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-zinc-700">Next.js Framework</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-zinc-700">SEO Optimized</span>
                    </div>
                  </div>

                  <a 
                    href={`${waLink}?text=Halo,%20saya%20tertarik%20dengan%20paket%20${pkg.name}.`}
                    className={`block text-center w-full py-3 rounded-xl font-bold transition-colors ${
                      isPopular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'
                    }`}
                  >
                    Pilih Paket
                  </a>
                </div>
              )
            })}
            
            {packages.length === 0 && (
              <div className="md:col-span-3 text-center text-zinc-500 py-12">
                Belum ada paket harga. Silakan tambahkan di Admin Panel.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-24 bg-blue-600 text-center px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 max-w-3xl mx-auto leading-tight">
          {ctaTitle}
        </h2>
        <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          {ctaDesc}
        </p>
        <a 
          href={`${waLink}?text=Halo,%20saya%20ingin%20menjadwalkan%20sesi%20konsultasi.`}
          className="inline-block bg-white text-blue-600 px-8 py-4 font-bold rounded-full hover:bg-zinc-100 transition-colors shadow-lg text-lg"
        >
          Jadwalkan Sesi Konsultasi
        </a>
      </section>

    </main>
  )
}
