import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, HeadphonesIcon, ExternalLink, MessageCircle, Globe, Sparkles, Code, Palette, MonitorSmartphone, TrendingUp, Star } from "lucide-react"
import { Reveal } from "@/components/reveal"

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
          return <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 font-bold">{part.slice(2, -2)}</span>
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
    <main className="min-h-screen bg-[#fafafa] text-zinc-900 font-sans overflow-x-clip selection:bg-indigo-900 selection:text-white">
      
      {/* NAVBAR */}
      <nav className="fixed w-full top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200/50 supports-[backdrop-filter]:bg-white/40">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-bold text-2xl tracking-tighter text-zinc-900">Rafiwpsite<span className="text-indigo-600">.</span></div>
          <div className="hidden md:flex gap-8 text-[15px] font-medium text-zinc-500">
            <a href="#filosofi" className="hover:text-zinc-900 transition-colors">Tentang</a>
            <a href="#keunggulan" className="hover:text-zinc-900 transition-colors">Kelebihan</a>
            <a href="#harga" className="hover:text-zinc-900 transition-colors">Harga</a>
            <a href="#testimoni" className="hover:text-zinc-900 transition-colors">Testimoni</a>
          </div>
          <a 
            href={`${waLink}?text=Halo,%20saya%20ingin%20berdiskusi%20lebih%20lanjut.`}
            className="bg-zinc-900 text-white px-6 py-2.5 text-sm font-semibold rounded-full hover:bg-zinc-800 transition-all shadow-[0_0_20px_-5px_rgba(0,0,0,0.3)] hover:shadow-[0_0_25px_-5px_rgba(0,0,0,0.4)]"
          >
            Hubungi Kami
          </a>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 text-center max-w-4xl mx-auto relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-indigo-50/50 to-transparent -z-10 blur-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40 -z-10"></div>

        <Reveal direction="up" delay={0.1}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100/80 border border-zinc-200/80 text-zinc-600 text-sm font-medium mb-8 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>Elevate your digital presence</span>
          </div>
          
          <h1 className="text-5xl md:text-[5.5rem] font-extrabold tracking-tighter mb-8 leading-[1.05] text-zinc-900">
            <HighlightText text={heroTitle} />
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            {heroDesc}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href={`${waLink}?text=Halo,%20saya%20tertarik%20untuk%20konsultasi%20website%20travel.`}
              className="w-full sm:w-auto bg-zinc-900 text-white px-8 py-4 font-semibold rounded-full hover:bg-zinc-800 transition-all text-[15px] flex items-center justify-center gap-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]"
            >
              <MessageCircle className="w-5 h-5" />
              Konsultasi Gratis
            </a>
            <a 
              href="#harga"
              className="w-full sm:w-auto bg-white/80 backdrop-blur-md text-zinc-900 border border-zinc-200/80 px-8 py-4 font-semibold rounded-full hover:bg-zinc-50 hover:border-zinc-300 transition-all text-[15px] flex items-center justify-center gap-2 shadow-sm"
            >
              Lihat Paket Harga <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </Reveal>
      </section>

      {/* HIGHLIGHTS / 3 BOXES */}
      <section className="pb-24 pt-8 bg-transparent">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          <Reveal delay={0.1} className="relative group overflow-hidden bg-white border border-zinc-200/60 shadow-sm rounded-3xl p-8 flex flex-col items-center justify-center text-center transition-all hover:shadow-md">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10 bg-zinc-50 border border-zinc-100 text-zinc-700 rounded-2xl w-14 h-14 flex items-center justify-center mb-5 shadow-inner">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="relative z-10 font-semibold text-[15px] text-zinc-900">Desain Modern & Responsif</h3>
          </Reveal>
          
          <Reveal delay={0.2} className="relative group overflow-hidden bg-white border border-zinc-200/60 shadow-sm rounded-3xl p-8 flex flex-col items-center justify-center text-center transition-all hover:shadow-md">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10 bg-zinc-50 border border-zinc-100 text-zinc-700 rounded-2xl w-14 h-14 flex items-center justify-center mb-5 shadow-inner">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="relative z-10 font-semibold text-[15px] text-zinc-900">Mudah Dikelola Sendiri</h3>
          </Reveal>
          
          <Reveal delay={0.3} className="relative group overflow-hidden bg-white border border-zinc-200/60 shadow-sm rounded-3xl p-8 flex flex-col items-center justify-center text-center transition-all hover:shadow-md">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10 bg-zinc-50 border border-zinc-100 text-zinc-700 rounded-2xl w-14 h-14 flex items-center justify-center mb-5 shadow-inner">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="relative z-10 font-semibold text-[15px] text-zinc-900">SEO & Speed Optimized</h3>
          </Reveal>
        </div>
      </section>

      {/* FILOSOFI */}
      <section id="filosofi" className="py-32 bg-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.03),transparent_50%)]"></div>
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
          
          {/* LEFT: 3 CARDS */}
          <div className="space-y-6 md:pr-8">
            <Reveal direction="left" delay={0.1} className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 p-6 flex items-start gap-5 hover:-translate-y-1 transition-transform relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 pointer-events-none"></div>
              <div className="relative z-10 bg-zinc-100/80 border border-zinc-200/50 text-zinc-700 rounded-2xl w-14 h-14 flex items-center justify-center flex-shrink-0 shadow-inner">
                <Code className="w-6 h-6" />
              </div>
              <div className="relative z-10">
                <h4 className="font-semibold text-zinc-900 text-base mb-1">WordPress & Elementor</h4>
                <p className="text-sm text-zinc-500 font-medium">Platform terpercaya yang mudah dikelola</p>
              </div>
            </Reveal>
            
            <Reveal direction="left" delay={0.2} className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 p-6 flex items-start gap-5 hover:-translate-y-1 transition-transform relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 pointer-events-none"></div>
              <div className="relative z-10 bg-zinc-100/80 border border-zinc-200/50 text-zinc-700 rounded-2xl w-14 h-14 flex items-center justify-center flex-shrink-0 shadow-inner">
                <Palette className="w-6 h-6" />
              </div>
              <div className="relative z-10">
                <h4 className="font-semibold text-zinc-900 text-base mb-1">Desain Custom</h4>
                <p className="text-sm text-zinc-500 font-medium">Tampilan unik sesuai brand travel Anda</p>
              </div>
            </Reveal>
            
            <Reveal direction="left" delay={0.3} className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 p-6 flex items-start gap-5 hover:-translate-y-1 transition-transform relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 pointer-events-none"></div>
              <div className="relative z-10 bg-zinc-100/80 border border-zinc-200/50 text-zinc-700 rounded-2xl w-14 h-14 flex items-center justify-center flex-shrink-0 shadow-inner">
                <MonitorSmartphone className="w-6 h-6" />
              </div>
              <div className="relative z-10">
                <h4 className="font-semibold text-zinc-900 text-base mb-1">Responsif di Semua Perangkat</h4>
                <p className="text-sm text-zinc-500 font-medium">Tampil sempurna di HP, tablet, & laptop</p>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: TEXT */}
          <Reveal direction="right" delay={0.2}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-6">
              Tentang Kami
            </div>
            <h3 className="text-4xl md:text-5xl font-extrabold mb-6 text-zinc-900 tracking-tighter leading-tight">
              <HighlightText text={filosofiTitle} />
            </h3>
            <p className="text-zinc-500 text-lg leading-relaxed mb-6 font-medium">
              {filosofiDesc1}
            </p>
            <p className="text-zinc-500 text-lg leading-relaxed mb-10 font-medium">
              {filosofiDesc2}
            </p>
            <a 
              href={`${waLink}?text=Halo,%20saya%20ingin%20menceritakan%20kebutuhan%20website%20saya.`}
              className="inline-flex items-center gap-2 bg-zinc-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-zinc-800 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]"
            >
              <MessageCircle className="w-5 h-5" />
              Ceritakan Kebutuhan Anda
            </a>
          </Reveal>

        </div>
      </section>

      {/* KEUNGGULAN */}
      <section id="keunggulan" className="py-32 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-6">
              Kelebihan Kami
            </div>
            <h3 className="text-4xl md:text-5xl font-extrabold mb-6 text-zinc-900 tracking-tighter leading-tight">
              <HighlightText text={keunggulanTitle} />
            </h3>
            <p className="text-zinc-500 text-lg leading-relaxed font-medium">{keunggulanDesc}</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <Reveal delay={0.1} className="group relative bg-white rounded-[2rem] border border-zinc-200/50 p-8 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 bg-zinc-50 border border-zinc-100 text-zinc-700 rounded-2xl w-14 h-14 flex items-center justify-center mb-6 shadow-inner transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="relative z-10 text-xl font-bold mb-3 text-zinc-900 tracking-tight">Proses Cepat & Tepat</h4>
              <p className="relative z-10 text-zinc-500 text-[15px] leading-relaxed font-medium">Website travel Anda siap dalam hitungan hari, bukan minggu. Kami bekerja efisien tanpa mengorbankan kualitas, supaya bisnis Anda bisa segera go online.</p>
            </Reveal>
            
            {/* Card 2 */}
            <Reveal delay={0.2} className="group relative bg-white rounded-[2rem] border border-zinc-200/50 p-8 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 bg-zinc-50 border border-zinc-100 text-zinc-700 rounded-2xl w-14 h-14 flex items-center justify-center mb-6 shadow-inner transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="relative z-10 text-xl font-bold mb-3 text-zinc-900 tracking-tight">Aman & Terpercaya</h4>
              <p className="relative z-10 text-zinc-500 text-[15px] leading-relaxed font-medium">Setiap website dilengkapi SSL, keamanan berlapis, dan backup rutin. Data bisnis travel Anda terlindungi dengan baik, jadi Anda bisa fokus jualan.</p>
            </Reveal>
            
            {/* Card 3 */}
            <Reveal delay={0.3} className="group relative bg-white rounded-[2rem] border border-zinc-200/50 p-8 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 bg-zinc-50 border border-zinc-100 text-zinc-700 rounded-2xl w-14 h-14 flex items-center justify-center mb-6 shadow-inner transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h4 className="relative z-10 text-xl font-bold mb-3 text-zinc-900 tracking-tight">SEO Friendly</h4>
              <p className="relative z-10 text-zinc-500 text-[15px] leading-relaxed font-medium">Website Anda dioptimasi agar mudah muncul di halaman pertama Google. Calon traveler bisa menemukan bisnis Anda dengan lebih mudah tanpa iklan mahal.</p>
            </Reveal>
            
            {/* Card 4 */}
            <Reveal delay={0.4} className="group relative bg-white rounded-[2rem] border border-zinc-200/50 p-8 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 bg-zinc-50 border border-zinc-100 text-zinc-700 rounded-2xl w-14 h-14 flex items-center justify-center mb-6 shadow-inner transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100">
                <HeadphonesIcon className="w-6 h-6" />
              </div>
              <h4 className="relative z-10 text-xl font-bold mb-3 text-zinc-900 tracking-tight">Support Setelah Jadi</h4>
              <p className="relative z-10 text-zinc-500 text-[15px] leading-relaxed font-medium">Kami nggak lepas tangan setelah website jadi. Ada masa garansi support gratis untuk bantu Anda kalau ada kendala atau butuh perubahan kecil.</p>
            </Reveal>

          </div>
        </div>
      </section>

      {/* HARGA SECTION */}
      <section id="harga" className="py-32 bg-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(79,70,229,0.04),transparent_70%)]"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-6">
              Paket Harga
            </div>
            <h3 className="text-4xl md:text-5xl font-extrabold mb-6 text-zinc-900 tracking-tighter leading-tight">
              <HighlightText text={pricingTitle} />
            </h3>
            <p className="text-zinc-500 text-lg leading-relaxed max-w-lg mx-auto font-medium">{pricingDesc}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            {packages.map((pkg, index) => {
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
                <Reveal 
                  key={pkg.id} 
                  delay={index * 0.15}
                  className={`relative bg-white rounded-[2.5rem] p-8 transition-all duration-500 hover:-translate-y-2 ${
                    isPopular 
                      ? 'border border-zinc-200 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] md:-translate-y-4 md:hover:-translate-y-6 z-10' 
                      : 'border border-zinc-200/60 shadow-sm'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute inset-0 rounded-[2.5rem] p-[2px] bg-gradient-to-b from-indigo-500/20 to-transparent -z-10 pointer-events-none"></div>
                  )}

                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-zinc-900 text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg border border-zinc-800">
                      <Star className="w-3.5 h-3.5 fill-white" />
                      Paling Populer
                    </div>
                  )}
                  
                  <div className="relative z-10">
                    <h4 className="text-xl font-bold mb-3 text-zinc-900 tracking-tight">{pkg.name}</h4>
                    <p className="text-zinc-500 mb-8 min-h-[60px] text-sm leading-relaxed font-medium">{pkg.description}</p>
                    
                    <div className="flex items-baseline gap-1 mb-8">
                      <span className="text-zinc-400 font-semibold text-lg">Rp</span>
                      <span className="text-5xl font-extrabold text-zinc-900 tracking-tighter">{pkg.price}</span>
                      <span className="text-zinc-400 font-semibold text-lg">Jt</span>
                    </div>

                    <a 
                      href={`${waLink}?text=Halo,%20saya%20tertarik%20dengan%20paket%20${pkg.name}.`}
                      className={`w-full py-4 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 mb-8 ${
                        isPopular
                          ? 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-[0_8px_20px_rgb(0,0,0,0.1)]'
                          : 'bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300'
                      }`}
                    >
                      <MessageCircle className="w-4 h-4" />
                      Pilih Paket Ini
                    </a>

                    <div className="space-y-4">
                      {features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-100">
                            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                          </div>
                          <span className="text-[14px] font-medium text-zinc-600 leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
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
      <section className="py-32 bg-zinc-950 text-center px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-indigo-900/20 to-transparent pointer-events-none blur-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(79,70,229,0.15),transparent_50%)]"></div>
        
        <Reveal direction="up" delay={0.2} className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 max-w-3xl mx-auto leading-tight tracking-tighter">
            <HighlightText text={ctaTitle} />
          </h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
            {ctaDesc}
          </p>
          <div className="flex flex-col items-center justify-center gap-4">
            <a 
              href={`${waLink}?text=Halo,%20saya%20tertarik%20untuk%20konsultasi%20website%20travel.`}
              className="inline-flex items-center gap-2 bg-white text-zinc-950 px-8 py-4 font-semibold rounded-full hover:bg-zinc-100 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] text-[15px]"
            >
              <MessageCircle className="w-5 h-5" />
              Konsultasi Gratis Sekarang
            </a>
            <div className="flex items-center gap-2 text-sm text-zinc-500 mt-4 font-medium">
              <ArrowRight className="w-4 h-4" />
              <span>Balas chat biasanya kurang dari 5 menit</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="bg-zinc-950 border-t border-white/10 pt-16 pb-8 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
            <div>
              <div className="font-bold text-2xl tracking-tighter text-white mb-2">Rafiwpsite<span className="text-indigo-500">.</span></div>
              <p className="text-zinc-500 text-sm font-medium">Spesialis Website Travel dengan WordPress & Elementor</p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm font-medium text-zinc-400">
              <a href="#filosofi" className="hover:text-white transition-colors">Tentang</a>
              <a href="#keunggulan" className="hover:text-white transition-colors">Kelebihan</a>
              <a href="#harga" className="hover:text-white transition-colors">Harga</a>
              <a href={`${waLink}`} className="hover:text-white transition-colors">Kontak</a>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm text-zinc-600 font-medium">
            © 2026 Rafiwpsite. All rights reserved.
          </div>
        </div>
      </footer>

    </main>
  )
}

