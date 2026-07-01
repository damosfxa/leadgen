"use client"
import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"
import { LogOut, Save, LayoutTemplate, DollarSign } from "lucide-react"

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
  const [activeTab, setActiveTab] = useState<"content" | "pricing">("content")
  const [settings, setSettings] = useState<SiteSetting[]>([])
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  
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
      // Grouping logic for UI can be done inline, but we'll just sort them roughly
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
    
    if (activeTab === "content") {
      for (const setting of settings) {
        const { error } = await supabase.from("site_settings").update({ value: setting.value }).eq("key", setting.key)
        if (error) hasError = true
      }
    } else {
      for (const pkg of packages) {
        const { error } = await supabase.from("pricing_packages").update(pkg).eq("id", pkg.id)
        if (error) hasError = true
      }
    }

    if (!hasError) {
      setMessage("Berhasil menyimpan perubahan!")
      setTimeout(() => setMessage(""), 3000)
    } else {
      setMessage("Gagal menyimpan perubahan. Coba lagi.")
    }
    setSaving(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
    router.refresh()
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-zinc-600">Memuat data panel admin...</div>

  // Group settings by section
  const heroSettings = settings.filter(s => s.key.startsWith("hero_") || s.key === "whatsapp_number")
  const filosofiSettings = settings.filter(s => s.key.startsWith("filosofi_"))
  const keunggulanSettings = settings.filter(s => s.key.startsWith("keunggulan_"))
  const portfolioSettings = settings.filter(s => s.key.startsWith("portfolio_"))
  const pricingSettings = settings.filter(s => s.key.startsWith("pricing_"))
  const ctaSettings = settings.filter(s => s.key.startsWith("cta_"))

  const renderSettingsGroup = (title: string, group: SiteSetting[]) => (
    <div className="mb-10 bg-white border border-zinc-200 shadow-sm rounded-xl overflow-hidden">
      <div className="bg-zinc-50 border-b border-zinc-200 px-6 py-4">
        <h3 className="font-bold text-zinc-900">{title}</h3>
      </div>
      <div className="p-6 space-y-6">
        {group.map(setting => (
          <div key={setting.key}>
            <label className="block text-sm font-semibold text-zinc-700 mb-2">{setting.label}</label>
            {setting.key.includes("desc") || setting.key.includes("value") ? (
              <textarea 
                value={setting.value}
                onChange={(e) => handleUpdateSetting(setting.key, e.target.value)}
                className="w-full border border-zinc-300 rounded-lg p-3 text-black focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 min-h-[100px]" 
              />
            ) : (
              <input 
                type="text" 
                value={setting.value}
                onChange={(e) => handleUpdateSetting(setting.key, e.target.value)}
                className="w-full border border-zinc-300 rounded-lg p-3 text-black focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="bg-white border-b border-zinc-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-zinc-900">LeadGen Admin</h1>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex bg-zinc-200/50 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("content")}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "content" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              <LayoutTemplate className="w-4 h-4" />
              Konten Website
            </button>
            <button
              onClick={() => setActiveTab("pricing")}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "pricing" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              <DollarSign className="w-4 h-4" />
              Paket Harga
            </button>
          </div>

          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors w-full sm:w-auto justify-center"
          >
            <Save className="w-4 h-4" />
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>

        {message && (
          <div className={`p-4 rounded-lg mb-8 text-sm font-medium ${message.includes("Berhasil") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
            {message}
          </div>
        )}

        {activeTab === "content" && (
          <div className="space-y-8">
            {renderSettingsGroup("Pengaturan Hero & Kontak", heroSettings)}
            {renderSettingsGroup("Pengaturan Filosofi", filosofiSettings)}
            {renderSettingsGroup("Pengaturan Keunggulan", keunggulanSettings)}
            {renderSettingsGroup("Pengaturan Portofolio", portfolioSettings)}
            {renderSettingsGroup("Pengaturan Headline Harga", pricingSettings)}
            {renderSettingsGroup("Pengaturan Footer CTA", ctaSettings)}
          </div>
        )}

        {activeTab === "pricing" && (
          <div className="bg-white border border-zinc-200 shadow-sm rounded-xl overflow-hidden">
             <div className="bg-zinc-50 border-b border-zinc-200 px-6 py-4">
              <h3 className="font-bold text-zinc-900">Kelola Kartu Harga</h3>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                {packages.map(pkg => (
                  <div key={pkg.id} className="border border-zinc-200 rounded-xl p-6 bg-zinc-50/30">
                    <div className="mb-4">
                      <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Nama Paket</label>
                      <input 
                        type="text" 
                        value={pkg.name}
                        onChange={(e) => handleUpdatePackage(pkg.id, "name", e.target.value)}
                        className="w-full border border-zinc-300 rounded-lg p-2.5 text-black font-semibold focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Harga</label>
                      <input 
                        type="text" 
                        value={pkg.price}
                        onChange={(e) => handleUpdatePackage(pkg.id, "price", e.target.value)}
                        className="w-full border border-zinc-300 rounded-lg p-2.5 text-black font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Deskripsi Fitur</label>
                      <textarea 
                        value={pkg.description}
                        onChange={(e) => handleUpdatePackage(pkg.id, "description", e.target.value)}
                        className="w-full border border-zinc-300 rounded-lg p-2.5 text-black text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-24" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
