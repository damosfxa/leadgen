import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, HeadphonesIcon, ExternalLink, MessageCircle, Globe, Sparkles, Code, Palette, MonitorSmartphone, TrendingUp, Star } from "lucide-react"

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

function HighlightText({ text }: { text: string }) {
  // Parses **text** and wraps it in a blue span
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <span key={i} className="text-indigo-900">{part.slice(2, -2)}</span>
        }
        return <span key={i}>{part}</span>
      })}
    </>
  )
}

export default async function LandingPage() {
  const { settings, packages } = await fetchData()
  
  // Dynamic Variables from Database with fallbacks
  const whatsappNumber = settings.whatsapp_number || "6282113906629"
  const waLink = `https://wa.me/${whatsappNumber}`
  
  // Note: if user wants exact clone text, they should edit via admin panel to:
  // "Website Travel **Profesional** untuk Bisnis Anda"
  const heroTitle = settings.hero_title || "Website Travel **Profesional** untuk Bisnis Anda"
  const heroDesc = settings.hero_desc || "Kami bantu Anda memiliki website travel yang modern, cepat, dan mudah dikelola. Dibuat dengan WordPress & Elementor agar Anda bisa update konten sendiri, kapan saja."
  
  const filosofiTitle = settings.filosofi_title || "Kenapa Harus Kami?"
  const filosofiDesc1 = settings.filosofi_desc1 || "Kami spesialis membangun ekosistem digital untuk kemudahan operasional Anda."
  const filosofiDesc2 = settings.filosofi_desc2 || "Setiap website yang kami buat dirancang untuk menarik calon customer."
  
  const keunggulanTitle = settings.keunggulan_title || "Alasan Klien Memilih Kami"
  const keunggulanDesc = settings.keunggulan_desc || "Setiap fitur dan desain dibuat khusus untuk membantu Anda."
  
  const pricingTitle = settings.pricing_title || "Investasi Terjangkau"
  const pricingDesc = settings.pricing_desc || "Semua paket sudah termasuk optimasi standar dan keamanan."

  const ctaTitle = settings.cta_title || "Jangan tunggu kompetitor Anda lebih dulu online."
  const ctaDesc = settings.cta_desc || "Konsultasikan kebutuhan sistem dan web Anda sekarang."

  return (
    <main className="min-h-screen bg-white text-zinc-900 font-sans overflow-x-clip selection:bg-indigo-900 selection:text-white">
      
      {/* NAVBAR */}
      <nav className="bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-bold text-2xl tracking-tight text-indigo-950">Rafiwpsite</div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-500">
            <a href="#filosofi" className="hover:text-indigo-900 transition-colors">Tentang</a>
            <a href="#keunggulan" className="hover:text-indigo-900 transition-colors">Kelebihan</a>
            <a href="#harga" className="hover:text-indigo-900 transition-colors">Harga</a>
            <a href="#testimoni" className="hover:text-indigo-900 transition-colors">Testimoni</a>
          </div>
          <a 
            href={`${waLink}?text=Halo,%20saya%20ingin%20berdiskusi%20lebih%20lanjut.`}
            className="bg-indigo-900 text-white px-6 py-2.5 text-sm font-bold rounded-xl hover:bg-indigo-950 transition-colors shadow-sm"
          >
            Hubungi Kami
          </a>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-24 px-6 text-center max-w-4xl mx-auto relative">
        <div className="absolute inset-0 bg-[radial-gradient(#f4f4f5_1px,transparent_1px)] [background-size:24px_24px] opacity-50 -z-10"></div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 leading-[1.15] text-zinc-900">
          <HighlightText text={heroTitle} />
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-500 mb-12 max-w-2xl mx-auto leading-relaxed">
          {heroDesc}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href={`${waLink}?text=Halo,%20saya%20tertarik%20untuk%20konsultasi%20website%20travel.`}
            className="w-full sm:w-auto bg-indigo-900 text-white px-8 py-4 font-bold rounded-xl hover:bg-indigo-950 transition-all text-[15px] flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/20"
          >
            <MessageCircle className="w-5 h-5" />
            Konsultasi Gratis
          </a>
          <a 
            href="#harga"
            className="w-full sm:w-auto bg-white text-indigo-900 border border-zinc-200 px-8 py-4 font-bold rounded-xl hover:bg-zinc-50 hover:border-zinc-300 transition-all text-[15px] flex items-center justify-center gap-2 shadow-sm"
          >
            Lihat Paket Harga <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* HIGHLIGHTS / 3 BOXES */}
      <section className="pb-24 pt-8 bg-transparent">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          <div className="bg-white border border-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-8 flex flex-col items-center justify-center text-center">
            <div className="bg-indigo-50/80 text-indigo-600 rounded-2xl w-14 h-14 flex items-center justify-center mb-5">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-zinc-900">Desain Modern & Responsif</h3>
          </div>
          
          <div className="bg-white border border-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-8 flex flex-col items-center justify-center text-center">
            <div className="bg-indigo-50/80 text-indigo-600 rounded-2xl w-14 h-14 flex items-center justify-center mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-zinc-900">Mudah Dikelola Sendiri</h3>
          </div>
          
          <div className="bg-white border border-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-8 flex flex-col items-center justify-center text-center">
            <div className="bg-indigo-50/80 text-indigo-600 rounded-2xl w-14 h-14 flex items-center justify-center mb-5">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-zinc-900">SEO & Speed Optimized</h3>
          </div>
        </div>
      </section>

      {/* FILOSOFI */}
      <section id="filosofi" className="py-24 bg-zinc-50 border-y border-zinc-100">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          
          {/* LEFT: 3 CARDS */}
          <div className="space-y-4 md:pr-8">
            <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-5 flex items-center gap-5">
              <div className="bg-indigo-50 text-indigo-600 rounded-xl w-12 h-12 flex items-center justify-center flex-shrink-0">
                <Code className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-zinc-900 text-[15px] mb-0.5">WordPress & Elementor</h4>
                <p className="text-sm text-zinc-500">Platform terpercaya yang mudah dikelola</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-5 flex items-center gap-5">
              <div className="bg-indigo-50 text-indigo-600 rounded-xl w-12 h-12 flex items-center justify-center flex-shrink-0">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-zinc-900 text-[15px] mb-0.5">Desain Custom</h4>
                <p className="text-sm text-zinc-500">Tampilan unik sesuai brand travel Anda</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-5 flex items-center gap-5">
              <div className="bg-indigo-50 text-indigo-600 rounded-xl w-12 h-12 flex items-center justify-center flex-shrink-0">
                <MonitorSmartphone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-zinc-900 text-[15px] mb-0.5">Responsif di Semua Perangkat</h4>
                <p className="text-sm text-zinc-500">Tampil sempurna di HP, tablet, & laptop</p>
              </div>
            </div>
          </div>

          {/* RIGHT: TEXT */}
          <div>
            <h2 className="text-indigo-600 font-bold mb-4 uppercase tracking-widest text-sm">Tentang Kami</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold mb-6 text-zinc-900 tracking-tight">
              <HighlightText text={filosofiTitle} />
            </h3>
            <p className="text-zinc-500 text-[17px] leading-relaxed mb-6">
              {filosofiDesc1}
            </p>
            <p className="text-zinc-500 text-[17px] leading-relaxed mb-10">
              {filosofiDesc2}
            </p>
            <a 
              href={`${waLink}?text=Halo,%20saya%20ingin%20menceritakan%20kebutuhan%20website%20saya.`}
              className="inline-flex items-center gap-2 bg-indigo-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-950 transition-colors shadow-lg shadow-indigo-900/20"
            >
              <MessageCircle className="w-5 h-5" />
              Ceritakan Kebutuhan Anda
            </a>
          </div>

        </div>
      </section>

      {/* KEUNGGULAN */}
      <section id="keunggulan" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-indigo-600 font-bold mb-4 uppercase tracking-widest text-sm">Kelebihan Kami</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold mb-4 text-zinc-900 tracking-tight">
              <HighlightText text={keunggulanTitle} />
            </h3>
            <p className="text-zinc-500 text-[17px] leading-relaxed">{keunggulanDesc}</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="group bg-white rounded-2xl border border-zinc-100 p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-t-4 hover:border-t-indigo-700 hover:-translate-y-1">
              <div className="bg-indigo-50 text-indigo-600 rounded-2xl w-14 h-14 flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-indigo-900 group-hover:text-white">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold mb-4 text-zinc-900">Proses Cepat & Tepat</h4>
              <p className="text-zinc-500 text-sm leading-relaxed">Website travel Anda siap dalam hitungan hari, bukan minggu. Kami bekerja efisien tanpa mengorbankan kualitas, supaya bisnis Anda bisa segera go online.</p>
            </div>
            
            {/* Card 2 */}
            <div className="group bg-white rounded-2xl border border-zinc-100 p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-t-4 hover:border-t-indigo-700 hover:-translate-y-1">
              <div className="bg-indigo-50 text-indigo-600 rounded-2xl w-14 h-14 flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-indigo-900 group-hover:text-white">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold mb-4 text-zinc-900">Aman & Terpercaya</h4>
              <p className="text-zinc-500 text-sm leading-relaxed">Setiap website dilengkapi SSL, keamanan berlapis, dan backup rutin. Data bisnis travel Anda terlindungi dengan baik, jadi Anda bisa fokus jualan.</p>
            </div>
            
            {/* Card 3 */}
            <div className="group bg-white rounded-2xl border border-zinc-100 p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-t-4 hover:border-t-indigo-700 hover:-translate-y-1">
              <div className="bg-indigo-50 text-indigo-600 rounded-2xl w-14 h-14 flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-indigo-900 group-hover:text-white">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold mb-4 text-zinc-900">SEO Friendly</h4>
              <p className="text-zinc-500 text-sm leading-relaxed">Website Anda dioptimasi agar mudah muncul di halaman pertama Google. Calon traveler bisa menemukan bisnis Anda dengan lebih mudah tanpa iklan mahal.</p>
            </div>
            
            {/* Card 4 */}
            <div className="group bg-white rounded-2xl border border-zinc-100 p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-t-4 hover:border-t-indigo-700 hover:-translate-y-1">
              <div className="bg-indigo-50 text-indigo-600 rounded-2xl w-14 h-14 flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-indigo-900 group-hover:text-white">
                <HeadphonesIcon className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold mb-4 text-zinc-900">Support Setelah Jadi</h4>
              <p className="text-zinc-500 text-sm leading-relaxed">Kami nggak lepas tangan setelah website jadi. Ada masa garansi support gratis untuk bantu Anda kalau ada kendala atau butuh perubahan kecil.</p>
            </div>

          </div>
        </div>
      </section>

      {/* HARGA SECTION */}
      <section id="harga" className="py-24 bg-[#F8F9FA] border-t border-zinc-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-indigo-700 font-bold mb-4 uppercase tracking-widest text-sm">Paket Harga</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold mb-6 text-zinc-900 tracking-tight">
              <HighlightText text={pricingTitle} />
            </h3>
            <p className="text-zinc-500 text-[16px] leading-relaxed max-w-lg mx-auto">{pricingDesc}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {packages.map((pkg) => {
              const isPopular = pkg.id === "populer";
              
              // Hardcoded Features matching screenshot
              let features: string[] = [];
              if (pkg.id === "starter") {
                features = ["1-2 Halaman", "Include Hosting 1 tahun", "Free Copywriting", "Integrasi google maps", "Tombol ctwa/whatsapp", "Formulir Kontak / email", "Free Domain 1 tahun (.com, .id, dll)", "Optimasi SEO Basic", "Free SSL/Keamanan", "Mobile friendly", "Gratis revisi minor (kecil)", "Optimasi kecepatan (Lazy Load + Caching Tools)", "4x Revisi Mayor (besar)"];
              } else if (pkg.id === "populer") {
                features = ["Free Copywriting", "Tampilan Modern - Tamu auto trust", "Include Hosting 1 tahun", "Sistem Booking wa otomatis", "Tombol ctwa/whatsapp", "Integrasi google maps", "4-5 Halaman", "Mobile friendly", "Optimasi SEO Basic", "Desain visual lebih kompleks (CTA, Form, Galeri)", "Free Domain 1 tahun (.com, .id, dll)", "Gallery Paket Wisata", "SSL & Keamanan Premium", "Gratis revisi minor (kecil)", "6x Revisi Mayor (besar)", "Garansi Maintenance 1 Bulan", "Optimasi kecepatan (Lazy Load + Caching Tools)"];
              } else {
                features = ["Fokus pada trust", "Include Hosting 1 tahun", "Sistem Booking & payment gateway", "Tombol ctwa/whatsapp", "Integrasi google maps", "Free Copywriting", "5-7 Halaman Utama (Home, About Us, Tour Packages, Gallery, Blog, Contact, Testimonial)", "Mobile friendly", "Optimasi SEO Basic", "Design Modern", "Free Domain 1 tahun (.com, .id, dll)", "Gallery Paket Wisata", "SSL & Keamanan Premium", "Gratis revisi minor (kecil)", "6x Revisi Mayor (besar)", "Garansi Maintenance 1 Bulan", "Optimasi kecepatan (Lazy Load + Caching Tools)"];
              }

              return (
                <div 
                  key={pkg.id} 
                  className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 ${
                    isPopular 
                      ? 'border-[3px] border-[#10037a] shadow-xl relative' 
                      : 'border border-zinc-200 shadow-sm mt-0 md:mt-8'
                  }`}
                >
                  {isPopular && (
                    <div className="bg-[#10037a] text-white py-2 text-center text-xs font-bold flex items-center justify-center gap-1.5">
                      <Star className="w-3.5 h-3.5 fill-white" />
                      Paling Populer
                    </div>
                  )}
                  
                  <div className="p-8">
                    <h4 className="text-xl font-bold mb-3 text-zinc-900">{pkg.name}</h4>
                    <p className="text-zinc-500 mb-8 min-h-[60px] text-sm leading-relaxed">{pkg.description}</p>
                    
                    <div className="flex items-baseline gap-1 mb-8">
                      <span className="text-zinc-500 font-medium text-sm">Rp</span>
                      <span className="text-4xl font-extrabold text-zinc-900">{pkg.price}</span>
                      <span className="text-zinc-500 font-medium text-sm">Jt</span>
                    </div>

                    <a 
                      href={`${waLink}?text=Halo,%20saya%20tertarik%20dengan%20paket%20${pkg.name}.`}
                      className={`w-full py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 mb-8 ${
                        isPopular
                          ? 'bg-[#10037a] text-white hover:bg-indigo-950'
                          : 'bg-white text-[#10037a] border border-[#10037a] hover:bg-indigo-50'
                      }`}
                    >
                      <MessageCircle className="w-4 h-4" />
                      Pilih Paket Ini
                    </a>

                    <div className="space-y-4">
                      {features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-indigo-200 fill-indigo-50 flex-shrink-0 mt-0.5" />
                          <span className="text-[13px] font-medium text-zinc-500 leading-tight">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
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
      <section className="py-24 bg-indigo-950 text-center px-6 border-t-8 border-indigo-600">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 max-w-3xl mx-auto leading-tight tracking-tight">
          {ctaTitle}
        </h2>
        <p className="text-indigo-200 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          {ctaDesc}
        </p>
        <a 
          href={`${waLink}?text=Halo,%20saya%20ingin%20menjadwalkan%20sesi%20konsultasi.`}
          className="inline-block bg-white text-indigo-900 px-8 py-4 font-extrabold rounded-xl hover:bg-zinc-100 transition-colors shadow-xl text-lg"
        >
          Hubungi Kami Sekarang
        </a>
      </section>

    </main>
  )
}
