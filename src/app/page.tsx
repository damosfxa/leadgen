import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, HeadphonesIcon } from "lucide-react"

// Supabase fetching logic
async function getPackages() {
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
  
  const { data } = await supabase.from("pricing_packages").select("*")
  
  if (!data) return []
  
  // Sort to match order
  const order = ["starter", "populer", "professional"]
  return data.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id))
}

export default async function LandingPage() {
  const packages = await getPackages()
  
  const whatsappNumber = "6282113906629"
  
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 font-sans overflow-x-clip selection:bg-blue-600 selection:text-white">
      
      {/* NAVBAR */}
      <nav className="border-b border-zinc-200 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight text-blue-600">LeadGen.</div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-600">
            <a href="#tentang" className="hover:text-black transition-colors">Tentang Kami</a>
            <a href="#portofolio" className="hover:text-black transition-colors">Showcase</a>
            <a href="#kelebihan" className="hover:text-black transition-colors">Keunggulan</a>
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

      {/* HERO SECTION */}
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

      {/* TENTANG */}
      <section id="tentang" className="py-24 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
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

      {/* PORTOFOLIO */}
      <section id="portofolio" className="py-24 bg-zinc-100 border-t border-zinc-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-blue-600 font-bold mb-2 uppercase tracking-wide text-sm">Showcase Kinerja</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-zinc-900">Bukan Sekadar Estetika, Tapi Dampak Nyata.</h3>
            <p className="text-zinc-600 text-lg">Deretan mahakarya digital yang telah membantu para klien kami memenangkan pasar dan secara signifikan melipatgandakan return of investment (ROI).</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Portfolio 1 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-zinc-200 group">
              <div className="aspect-[16/9] bg-zinc-200 overflow-hidden relative">
                <div className="absolute inset-0 bg-zinc-300 group-hover:scale-105 transition-transform duration-500"></div>
              </div>
              <div className="p-8">
                <h4 className="text-xl font-bold mb-2 text-zinc-900">Platform Perjalanan Umrah Premium</h4>
                <p className="text-zinc-600">Transformasi kapabilitas digital melalui sistem booking terintegrasi dan automasi komunikasi cerdas yang mempercepat konversi prospek seketika.</p>
              </div>
            </div>
            
            {/* Portfolio 2 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-zinc-200 group">
              <div className="aspect-[16/9] bg-zinc-200 overflow-hidden relative">
                <div className="absolute inset-0 bg-zinc-300 group-hover:scale-105 transition-transform duration-500"></div>
              </div>
              <div className="p-8">
                <h4 className="text-xl font-bold mb-2 text-zinc-900">Aesthetic Clinic Reservation</h4>
                <p className="text-zinc-600">High-converting landing page yang dilengkapi sistem manajemen reservasi waktu nyata yang terkelola dalam ekosistem dashboard yang mulus.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KELEBIHAN */}
      <section id="kelebihan" className="py-24 bg-white border-t border-zinc-200">
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
                <p className="text-zinc-600">Infrastruktur data solid kami menyediakan proteksi berlapis (Row Level Security) serta autentikasi canggih, menjamin integritas mutlak dari aset digital Anda.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2 text-zinc-900">SEO & Core Web Vitals Optimal</h4>
                <p className="text-zinc-600">Arsitektur web moderen yang memastikan performa rendering ekstrem. Fondasi teknis ini dirancang secara khusus untuk memanjakan algoritma mesin pencari.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <HeadphonesIcon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2 text-zinc-900">Dukungan Pasca-Peluncuran Eksklusif</h4>
                <p className="text-zinc-600">Kemitraan sesungguhnya dimulai pasca-peluncuran. Kami berkomitmen memberikan pemeliharaan dan garansi proaktif untuk menjaga reliabilitas operasional Anda tetap prima.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HARGA */}
      <section id="harga" className="py-24 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-blue-600 font-bold mb-2 uppercase tracking-wide text-sm">Rencana Investasi</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-zinc-900">Solusi Berkelas untuk Skala Bisnis Anda</h3>
            <p className="text-zinc-600 text-lg">Transparan, terukur, dan berdampak tinggi. Pilih rencana strategis yang paling sesuai untuk mengakselerasi pertumbuhan bisnis tanpa biaya terselubung.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {packages.length > 0 ? packages.map((pkg) => {
              const isPopular = pkg.id === "populer";
              return (
                <div key={pkg.id} className={`bg-white rounded-3xl p-8 relative flex flex-col ${isPopular ? 'border-2 border-blue-600 shadow-xl scale-105 z-10' : 'border border-zinc-200 shadow-sm'}`}>
                  {isPopular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 text-sm font-bold rounded-full uppercase tracking-wider">
                      Pilihan Terfavorit
                    </div>
                  )}
                  
                  <h4 className="text-2xl font-bold text-zinc-900 mb-2">{pkg.name}</h4>
                  <p className="text-zinc-600 text-sm mb-6 h-10">{pkg.description}</p>
                  <div className="text-3xl font-bold text-zinc-900 mb-8">{pkg.price}</div>
                  
                  <div className="flex-grow space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${isPopular ? 'text-blue-600' : 'text-zinc-400'}`} />
                      <span className="text-zinc-700 text-sm">Desain Eksklusif & Responsif Sempurna</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${isPopular ? 'text-blue-600' : 'text-zinc-400'}`} />
                      <span className="text-zinc-700 text-sm">Integrasi Smart WhatsApp (CTA)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${isPopular ? 'text-blue-600' : 'text-zinc-400'}`} />
                      <span className="text-zinc-700 text-sm">Optimasi Performa Tingkat Lanjut</span>
                    </div>
                    {pkg.id !== "starter" && (
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-blue-600" />
                        <span className="text-zinc-700 text-sm font-medium">Advanced Admin Panel (Didukung Supabase)</span>
                      </div>
                    )}
                    {pkg.id === "professional" && (
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-blue-600" />
                        <span className="text-zinc-700 text-sm font-medium">Sistem Automasi WhatsApp Terintegrasi</span>
                      </div>
                    )}
                  </div>
                  
                  <a 
                    href={`https://wa.me/${whatsappNumber}?text=Halo,%20saya%20ingin%20berinvestasi%20pada%20paket%20${pkg.name}%20dengan%20nilai%20${pkg.price}.%20Mohon%20informasi%20selanjutnya.`}
                    className={`w-full py-4 rounded-full font-semibold text-center transition-colors ${isPopular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'}`}
                  >
                    Mulai Proyek Anda
                  </a>
                </div>
              )
            }) : (
              <div className="col-span-3 text-center text-zinc-500 p-12 bg-white rounded-3xl border border-zinc-200">
                Struktur harga sedang dalam proses kalibrasi. Silakan akses panel admin untuk konfigurasi.
              </div>
            )}
            
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-24 bg-blue-600 text-center px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 max-w-3xl mx-auto leading-tight">
          Satu Langkah Cerdas Menuju Dominasi Digital Bisnis Anda.
        </h2>
        <p className="text-blue-100 text-lg md:text-xl mb-10">
          Berikan kami waktu 15 menit untuk mengaudit kebutuhan operasional dan visual Anda—secara eksklusif, tanpa kewajiban komitmen.
        </p>
        <a 
          href={`https://wa.me/${whatsappNumber}?text=Halo,%20saya%20ingin%20menjadwalkan%20sesi%20audit%20dan%20konsultasi%20kebutuhan%20digital%20bisnis%20saya.`}
          className="inline-block bg-white text-blue-600 px-8 py-4 font-bold rounded-full hover:bg-zinc-100 transition-colors shadow-lg text-lg"
        >
          Jadwalkan Sesi Konsultasi
        </a>
        <p className="text-blue-200 mt-4 text-sm">Tingkat respons eksekutif (Fast-Track Support) di bawah 5 menit.</p>
      </section>

    </main>
  )
}
