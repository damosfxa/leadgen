import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, HeadphonesIcon, ExternalLink } from "lucide-react"

// Supabase fetching logic for Site Settings
async function getSiteSettings() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {}, // Safe for Server Component
      },
    }
  )
  
  const { data } = await supabase.from("site_settings").select("*")
  
  if (!data) return {}
  
  // Convert array of {key, value} to object
  return data.reduce((acc, curr) => {
    acc[curr.key] = curr.value
    return acc
  }, {} as Record<string, string>)
}

export default async function LandingPage() {
  const settings = await getSiteSettings()
  
  const whatsappNumber = "6282113906629"
  
  // Fallbacks if DB is empty/migrating
  const portfolioUrl = settings.portfolio_url || "#"
  const pricingHeadline = settings.pricing_headline || "Harga Sesuai Kebutuhan"
  const pricingDesc = settings.pricing_description || "Setiap project punya kebutuhan berbeda. Konsultasikan kebutuhan Anda dan dapatkan penawaran yang sesuai."
  
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 font-sans overflow-x-clip selection:bg-blue-600 selection:text-white">
      
      {/* NAVBAR */}
      <nav className="border-b border-zinc-200 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight text-blue-600">LeadGen.</div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-600">
            <a href="#filosofi" className="hover:text-black transition-colors">Filosofi</a>
            <a href="#keunggulan" className="hover:text-black transition-colors">Keunggulan</a>
            <a href="#portofolio" className="hover:text-black transition-colors">Portofolio</a>
            <a href="#harga" className="hover:text-black transition-colors">Investasi</a>
          </div>
          <a 
            href={`https://wa.me/${whatsappNumber}?text=Halo,%20saya%20ingin%20berdiskusi%20lebih%20lanjut%20terkait%20layanan%20pengembangan%20website.`}
            className="bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded-full hover:bg-blue-700 transition-colors"
          >
            Mari Berdiskusi
          </a>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1] text-zinc-900">
          Eskalasi Bisnis Anda dengan Website & Ekosistem Digital Kelas Atas.
        </h1>
        <p className="text-lg md:text-xl text-zinc-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Tinggalkan cara konvensional. Kami merancang solusi digital premium berbasis Next.js & Supabase yang tidak hanya memukau secara visual, tapi juga dirancang khusus untuk mendongkrak konversi Anda.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href={`https://wa.me/${whatsappNumber}?text=Halo,%20saya%20tertarik%20untuk%20eskalasi%20bisnis%20saya%20dengan%20website%20premium.`}
            className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 font-semibold rounded-full hover:bg-blue-700 transition-all text-lg"
          >
            Mulai Transformasi Anda
          </a>
          <a 
            href="#harga"
            className="w-full sm:w-auto bg-white text-zinc-900 border border-zinc-300 px-8 py-4 font-semibold rounded-full hover:bg-zinc-100 transition-all text-lg"
          >
            Eksplorasi Layanan Kami
          </a>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="py-12 bg-white border-y border-zinc-200">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-zinc-200">
          <div className="pt-6 md:pt-0 px-4">
            <h3 className="font-bold text-xl mb-2">Arsitektur Modern</h3>
            <p className="text-zinc-600 text-sm">Infrastruktur skalabel dengan standar performa dan keamanan tingkat enterprise.</p>
          </div>
          <div className="pt-6 md:pt-0 px-4">
            <h3 className="font-bold text-xl mb-2">Bespoke UI/UX Design</h3>
            <p className="text-zinc-600 text-sm">Antarmuka eksklusif yang dirancang khusus untuk memancarkan identitas premium brand Anda.</p>
          </div>
          <div className="pt-6 md:pt-0 px-4">
            <h3 className="font-bold text-xl mb-2">Seamless Responsiveness</h3>
            <p className="text-zinc-600 text-sm">Pengalaman interaksi tanpa cela di seluruh variasi perangkat dan resolusi layar pengguna.</p>
          </div>
        </div>
      </section>

      {/* FILOSOFI */}
      <section id="filosofi" className="py-24 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-blue-600 font-bold mb-2 uppercase tracking-wide text-sm">Filosofi Kami</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-zinc-900">Merancang Ekosistem Digital yang Berorientasi pada Pertumbuhan</h3>
          <p className="text-zinc-600 text-lg leading-relaxed mb-6">
            Sebagai mitra digital Anda, kami tidak sekadar membuat website. Kami merakit <strong>mesin konversi otomatis</strong> yang memadukan keunggulan estetika visual dengan infrastruktur teknologi termutakhir.
          </p>
          <p className="text-zinc-600 text-lg leading-relaxed mb-8">
            Kami mengambil alih seluruh kompleksitas teknis. Mulai dari automasi sistem hingga panel admin yang sangat intuitif, semua dirancang sedemikian rupa agar Anda bisa fokus sepenuhnya pada <strong>ekspansi bisnis Anda</strong>.
          </p>
          <a 
            href={`https://wa.me/${whatsappNumber}?text=Halo,%20saya%20ingin%20berdiskusi%20tentang%20potensi%20kerjasama%20untuk%20digitalisasi%20bisnis%20saya.`}
            className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700"
          >
            Diskusikan Visi Anda <ArrowRight className="w-5 h-5" />
          </a>
        </div>
        <div className="bg-zinc-200 aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden relative shadow-inner flex items-center justify-center text-zinc-400">
          <div className="text-center p-8">
            <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-10 h-10" />
            </div>
            <p className="font-medium text-zinc-500">Premium Bespoke Design</p>
          </div>
        </div>
      </section>

      {/* 2. KEUNGGULAN KOMPETITIF */}
      <section id="keunggulan" className="py-24 bg-white border-t border-zinc-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-blue-600 font-bold mb-2 uppercase tracking-wide text-sm">Keunggulan Kompetitif</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-zinc-900">Dirancang untuk Dominasi Pasar</h3>
            <p className="text-zinc-600 text-lg">Kami menolak kompromi dalam kualitas. Pendekatan end-to-end kami memastikan Anda mendapatkan infrastruktur digital yang superior di setiap metrik.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2 text-zinc-900">Eksekusi Tangkas & Presisi</h4>
                <p className="text-zinc-600">Pengiriman proyek yang tepat waktu dengan standar akurasi tak tertandingi. Kami memfasilitasi Anda untuk mendisrupsi pasar secara masif lebih cepat.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2 text-zinc-900">Keamanan Tingkat Enterprise</h4>
                <p className="text-zinc-600">Infrastruktur data solid kami menyediakan proteksi berlapis serta autentikasi canggih, menjamin integritas mutlak dari aset digital Anda.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2 text-zinc-900">SEO & Performa Optimal</h4>
                <p className="text-zinc-600">Arsitektur web moderen yang memastikan performa rendering ekstrem. Fondasi teknis ini dirancang secara khusus untuk disukai oleh algoritma mesin pencari.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <HeadphonesIcon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2 text-zinc-900">Dukungan Pasca-Peluncuran Eksklusif</h4>
                <p className="text-zinc-600">Kemitraan sesungguhnya dimulai pasca-peluncuran. Kami berkomitmen memberikan pemeliharaan dan garansi proaktif untuk menjaga reliabilitas operasional Anda.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PORTOFOLIO CTA SECTION */}
      <section id="portofolio" className="py-24 bg-zinc-100 border-t border-zinc-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-blue-600 font-bold mb-2 uppercase tracking-wide text-sm">Portofolio</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-zinc-900">Lihat Hasil Kerja Kami</h3>
          <p className="text-zinc-600 text-lg mb-10 max-w-2xl mx-auto">
            Jelajahi berbagai mahakarya digital dan solusi teknologi yang telah kami kembangkan di halaman portofolio lengkap kami.
          </p>
          <a 
            href={portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white border border-zinc-300 text-zinc-900 px-8 py-4 font-semibold rounded-full hover:bg-zinc-50 transition-all text-lg shadow-sm"
          >
            Kunjungi Portofolio <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* 4. HARGA CTA SECTION */}
      <section id="harga" className="py-24 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-blue-600 font-bold mb-2 uppercase tracking-wide text-sm">Rencana Investasi</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-zinc-900">{pricingHeadline}</h3>
          <p className="text-zinc-600 text-lg mb-10 max-w-2xl mx-auto">
            {pricingDesc}
          </p>
          <a 
            href={`https://wa.me/${whatsappNumber}?text=Halo,%20saya%20ingin%20berkonsultasi%20mengenai%20harga%20dan%20kebutuhan%20website%20saya.`}
            className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 font-semibold rounded-full hover:bg-blue-700 transition-all text-lg"
          >
            Konsultasi Harga Sekarang
          </a>
        </div>
      </section>

      {/* 5. FOOTER CTA */}
      <section className="py-24 bg-blue-600 text-center px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 max-w-3xl mx-auto leading-tight">
          Satu Langkah Cerdas Menuju Dominasi Digital Bisnis Anda.
        </h2>
        <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Berikan kami waktu sejenak untuk mengaudit kebutuhan operasional dan visual Anda—secara eksklusif, tanpa kewajiban komitmen.
        </p>
        <a 
          href={`https://wa.me/${whatsappNumber}?text=Halo,%20saya%20ingin%20menjadwalkan%20sesi%20audit%20dan%20konsultasi%20kebutuhan%20digital%20bisnis%20saya.`}
          className="inline-block bg-white text-blue-600 px-8 py-4 font-bold rounded-full hover:bg-zinc-100 transition-colors shadow-lg text-lg"
        >
          Jadwalkan Sesi Konsultasi
        </a>
        <p className="text-blue-200 mt-6 text-sm">Respon cepat dan profesional untuk setiap pertanyaan Anda.</p>
      </section>

    </main>
  )
}
