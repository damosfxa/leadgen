"use client"
import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

type SiteSetting = {
  key: string
  label: string
  value: string
}

export default function AdminDashboard() {
  const [settings, setSettings] = useState<SiteSetting[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    const { data } = await supabase.from("site_settings").select("*").order("key")
    if (data) {
      setSettings(data)
    }
    setLoading(false)
  }

  const handleUpdate = async (key: string, newValue: string) => {
    setSettings(settings.map(s => s.key === key ? { ...s, value: newValue } : s))
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage("")
    let hasError = false
    
    for (const setting of settings) {
      const { error } = await supabase.from("site_settings").update({ value: setting.value }).eq("key", setting.key)
      if (error) hasError = true
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

  if (loading) return <div className="p-8 text-black">Loading admin...</div>

  return (
    <div className="min-h-screen bg-zinc-50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-zinc-900">Admin Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-200 text-zinc-900 font-medium hover:bg-zinc-300 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        <div className="bg-white border border-zinc-200 p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl font-bold text-black">Pengaturan Konten Website</h2>
            <button 
              onClick={handleSave}
              disabled={saving}
              className="bg-black text-white px-6 py-2 font-medium hover:bg-zinc-800 disabled:opacity-50 w-full sm:w-auto"
            >
              {saving ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
          
          {message && (
            <div className={`p-3 mb-6 text-sm ${message.includes("Berhasil") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
              {message}
            </div>
          )}

          <div className="space-y-6">
            {settings.map(setting => (
              <div key={setting.key} className="p-6 border border-zinc-100 bg-zinc-50/50">
                <label className="block text-sm font-bold text-zinc-900 mb-2">{setting.label}</label>
                {setting.key.includes("description") ? (
                  <textarea 
                    value={setting.value}
                    onChange={(e) => handleUpdate(setting.key, e.target.value)}
                    className="w-full border border-zinc-300 p-3 text-black focus:outline-none focus:border-zinc-500 min-h-[100px]" 
                  />
                ) : (
                  <input 
                    type="text" 
                    value={setting.value}
                    onChange={(e) => handleUpdate(setting.key, e.target.value)}
                    className="w-full border border-zinc-300 p-3 text-black focus:outline-none focus:border-zinc-500" 
                  />
                )}
              </div>
            ))}
            
            {settings.length === 0 && (
              <div className="text-zinc-500 italic p-4">Tidak ada data pengaturan. Pastikan migrasi SQL telah dijalankan.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
