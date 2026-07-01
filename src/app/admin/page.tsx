"use client"
import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"
import { 
  LogOut, 
  Save, 
  LayoutTemplate, 
  DollarSign, 
  Home, 
  MessageSquare, 
  Star, 
  Settings,
  Menu,
  X,
  Smartphone
} from "lucide-react"

type SiteSetting = {
  key: string
  label: string
  value: string
}

type Package = {
  id: string
  name: string
  price: string
  description: string
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<string>("hero")
  const [settings, setSettings] = useState<SiteSetting[]>([])
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const router = useRouter()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    const [settingsRes, packagesRes] = await Promise.all([
      supabase.from("site_settings").select("*").order("key"),
      supabase.from("pricing_packages").select("*").order("id")
    ])

    if (settingsRes.data) {
      setSettings(settingsRes.data)
    }
    if (packagesRes.data) {
      const order = ["starter", "populer", "professional"]
      const sorted = packagesRes.data.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id))
      setPackages(sorted)
    }
    setLoading(false)
  }

  const handleUpdateSetting = (key: string, newValue: string) => {
    setSettings(settings.map(s => s.key === key ? { ...s, value: newValue } : s))
  }

  const handleUpdatePackage = (id: string, field: keyof Package, value: string) => {
    setPackages(packages.map(p => p.id === id ? { ...p, [field]: value } : p))
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage("")
    let hasError = false
    
    // Save everything at once
    for (const setting of settings) {
      const { error } = await supabase.from("site_settings").update({ value: setting.value }).eq("key", setting.key)
      if (error) hasError = true
    }
    for (const pkg of packages) {
      const { error } = await supabase.from("pricing_packages").update(pkg).eq("id", pkg.id)
      if (error) hasError = true
    }

    if (!hasError) {
      setMessage("✅ Berhasil menyimpan perubahan!")
      setTimeout(() => setMessage(""), 3000)
    } else {
      setMessage("❌ Gagal menyimpan perubahan. Coba lagi.")
    }
    setSaving(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
    router.refresh()
  }

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50">
      <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-zinc-500 font-medium animate-pulse">Memuat Panel Admin...</p>
    </div>
  )

  const TABS = [
    { id: "hero", label: "Hero & Kontak", icon: Home },
    { id: "filosofi", label: "Tentang Kami", icon: MessageSquare },
    { id: "keunggulan", label: "Kelebihan", icon: Star },
    { id: "pricing_headline", label: "Headline Harga", icon: LayoutTemplate },
    { id: "pricing_cards", label: "Paket Harga (Kartu)", icon: DollarSign },
    { id: "cta", label: "Footer CTA", icon: Smartphone },
  ]

  const currentSettings = settings.filter(s => {
    if (activeTab === "hero") return s.key.startsWith("hero_") || s.key === "whatsapp_number"
    if (activeTab === "filosofi") return s.key.startsWith("filosofi_")
    if (activeTab === "keunggulan") return s.key.startsWith("keunggulan_")
    if (activeTab === "pricing_headline") return s.key.startsWith("pricing_")
    if (activeTab === "cta") return s.key.startsWith("cta_")
    return false
  })

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col md:flex-row font-sans">
      
      {/* MOBILE HEADER */}
      <div className="md:hidden bg-[#10037a] text-white p-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <h1 className="font-bold text-lg">Rafiwpsite Admin</h1>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 bg-indigo-900 rounded-lg">
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* SIDEBAR */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-72 bg-[#10037a] text-white flex-shrink-0 md:sticky md:top-0 md:h-screen md:overflow-y-auto shadow-xl z-40`}>
        <div className="p-6 hidden md:block">
          <h1 className="text-2xl font-black tracking-tight mb-1 text-white">Rafiwpsite</h1>
          <p className="text-indigo-300 text-xs font-medium tracking-wider uppercase">Content Management</p>
        </div>
        
        <div className="px-4 py-4 md:py-0 space-y-1">
          <p className="px-4 text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3 mt-4">Menu Konten</p>
          {TABS.map(tab => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  setMobileMenuOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? "bg-white text-[#10037a] font-bold shadow-md" 
                    : "text-indigo-100 hover:bg-indigo-900 font-medium"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-[#10037a]" : "text-indigo-300"}`} />
                {tab.label}
              </button>
            )
          })}
        </div>

        <div className="p-4 mt-8">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-950 text-indigo-200 rounded-xl hover:bg-red-950 hover:text-red-400 transition-colors font-medium text-sm border border-indigo-900"
          >
            <LogOut className="w-4 h-4" />
            Keluar (Logout)
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col md:h-screen md:overflow-y-auto relative">
        
        {/* HEADER BAR */}
        <div className="bg-white border-b border-zinc-200 px-8 py-5 flex items-center justify-between sticky top-0 z-30 shadow-sm hidden md:flex">
          <div>
            <h2 className="text-xl font-bold text-zinc-800">
              {TABS.find(t => t.id === activeTab)?.label}
            </h2>
            <p className="text-sm text-zinc-500 mt-1">Sesuaikan konten yang akan ditampilkan di halaman utama.</p>
          </div>
          
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-[#10037a] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-950 disabled:opacity-50 transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <Save className="w-4 h-4" />
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>

        <div className="p-6 md:p-8 max-w-4xl w-full mx-auto pb-32 md:pb-12">
          
          {message && (
            <div className={`p-4 rounded-xl mb-6 text-sm font-semibold flex items-center gap-3 shadow-sm ${
              message.includes("Berhasil") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
            }`}>
              {message}
            </div>
          )}

          {activeTab !== "pricing_cards" ? (
            <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm p-6 md:p-8 space-y-8">
              {currentSettings.length === 0 && (
                <div className="text-center py-12 text-zinc-400">Belum ada pengaturan untuk bagian ini.</div>
              )}
              {currentSettings.map(setting => (
                <div key={setting.key} className="group">
                  <label className="block text-sm font-bold text-zinc-700 mb-2 group-focus-within:text-[#10037a] transition-colors">{setting.label}</label>
                  {setting.key.includes("desc") || setting.key.includes("value") ? (
                    <textarea 
                      value={setting.value}
                      onChange={(e) => handleUpdateSetting(setting.key, e.target.value)}
                      placeholder={`Masukkan ${setting.label.toLowerCase()}...`}
                      className="w-full border-2 border-zinc-200 rounded-xl p-4 text-zinc-800 bg-zinc-50 focus:bg-white focus:outline-none focus:border-[#10037a] focus:ring-4 focus:ring-indigo-500/10 transition-all min-h-[120px] text-[15px] leading-relaxed resize-y" 
                    />
                  ) : (
                    <input 
                      type="text" 
                      value={setting.value}
                      onChange={(e) => handleUpdateSetting(setting.key, e.target.value)}
                      placeholder={`Masukkan ${setting.label.toLowerCase()}...`}
                      className="w-full border-2 border-zinc-200 rounded-xl p-4 text-zinc-800 font-medium bg-zinc-50 focus:bg-white focus:outline-none focus:border-[#10037a] focus:ring-4 focus:ring-indigo-500/10 transition-all text-[15px]" 
                    />
                  )}
                  {setting.key === "hero_title" && (
                    <p className="text-xs text-zinc-400 mt-2 font-medium">✨ Tip: Gunakan tanda **bintang dua** untuk menyorot teks (contoh: Website **Profesional**).</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map(pkg => (
                <div key={pkg.id} className="bg-white border-2 border-zinc-200 rounded-2xl p-6 shadow-sm hover:border-[#10037a] transition-colors focus-within:border-[#10037a] focus-within:shadow-lg focus-within:-translate-y-1 relative">
                  
                  <div className="absolute top-0 right-0 bg-indigo-100 text-[#10037a] text-[10px] font-black px-3 py-1 rounded-bl-xl rounded-tr-xl uppercase tracking-widest">
                    ID: {pkg.id}
                  </div>

                  <div className="mb-5 mt-2">
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Nama Paket</label>
                    <input 
                      type="text" 
                      value={pkg.name}
                      onChange={(e) => handleUpdatePackage(pkg.id, "name", e.target.value)}
                      className="w-full border-b-2 border-zinc-200 pb-2 text-zinc-900 font-extrabold text-xl focus:outline-none focus:border-[#10037a] transition-colors bg-transparent" 
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Harga (Tanpa Rp / Jt)</label>
                    <div className="flex items-baseline gap-2 border-b-2 border-zinc-200 focus-within:border-[#10037a] transition-colors pb-2">
                      <span className="text-zinc-400 font-bold">Rp</span>
                      <input 
                        type="text" 
                        value={pkg.price}
                        onChange={(e) => handleUpdatePackage(pkg.id, "price", e.target.value)}
                        className="w-full text-zinc-900 font-black text-3xl focus:outline-none bg-transparent" 
                      />
                      <span className="text-zinc-400 font-bold">Jt</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Deskripsi Singkat</label>
                    <textarea 
                      value={pkg.description}
                      onChange={(e) => handleUpdatePackage(pkg.id, "description", e.target.value)}
                      className="w-full border-2 border-zinc-200 rounded-xl p-3 text-zinc-600 text-sm focus:outline-none focus:border-[#10037a] bg-zinc-50 focus:bg-white transition-colors h-28 resize-none" 
                    />
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 text-blue-700 text-xs rounded-lg border border-blue-100">
                    ℹ️ Daftar fitur terperinci untuk paket ini (centang biru) sudah diset otomatis di dalam kode agar layout presisi dengan desain Anda.
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* MOBILE SAVE BUTTON FIXED AT BOTTOM */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-40">
          <button 
            onClick={handleSave}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 bg-[#10037a] text-white px-6 py-3.5 rounded-xl font-bold hover:bg-indigo-950 disabled:opacity-50 transition-all shadow-md active:scale-95 text-[15px]"
          >
            <Save className="w-5 h-5" />
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>

      </div>
    </div>
  )
}
