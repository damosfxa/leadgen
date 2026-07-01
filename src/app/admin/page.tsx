"use client"
import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

type Package = {
  id: string
  name: string
  price: string
  description: string
}

export default function AdminDashboard() {
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
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    const { data } = await supabase.from("pricing_packages").select("*").order("id")
    if (data) {
      // Sort to match Starter, Populer, Professional
      const order = ["starter", "populer", "professional"]
      const sorted = data.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id))
      setPackages(sorted)
    }
    setLoading(false)
  }

  const handleUpdate = async (id: string, field: keyof Package, value: string) => {
    setPackages(packages.map(p => p.id === id ? { ...p, [field]: value } : p))
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage("")
    let hasError = false
    
    for (const pkg of packages) {
      const { error } = await supabase.from("pricing_packages").update(pkg).eq("id", pkg.id)
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
      <div className="max-w-4xl mx-auto">
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
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-black">Kelola Harga Paket</h2>
            <button 
              onClick={handleSave}
              disabled={saving}
              className="bg-black text-white px-6 py-2 font-medium hover:bg-zinc-800 disabled:opacity-50"
            >
              {saving ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
          
          {message && (
            <div className={`p-3 mb-6 text-sm ${message.includes("Berhasil") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
              {message}
            </div>
          )}

          <div className="space-y-8">
            {packages.map(pkg => (
              <div key={pkg.id} className="grid md:grid-cols-3 gap-6 p-6 border border-zinc-100 bg-zinc-50/50">
                <div>
                  <label className="block text-sm font-semibold text-zinc-900 mb-1">Nama Paket</label>
                  <input 
                    type="text" 
                    value={pkg.name}
                    onChange={(e) => handleUpdate(pkg.id, "name", e.target.value)}
                    className="w-full border border-zinc-300 p-2 text-black focus:outline-none focus:border-zinc-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-zinc-900 mb-1">Harga</label>
                  <input 
                    type="text" 
                    value={pkg.price}
                    onChange={(e) => handleUpdate(pkg.id, "price", e.target.value)}
                    className="w-full border border-zinc-300 p-2 text-black focus:outline-none focus:border-zinc-500 font-mono" 
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-sm font-semibold text-zinc-900 mb-1">Deskripsi Singkat</label>
                  <input 
                    type="text" 
                    value={pkg.description}
                    onChange={(e) => handleUpdate(pkg.id, "description", e.target.value)}
                    className="w-full border border-zinc-300 p-2 text-black focus:outline-none focus:border-zinc-500" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
