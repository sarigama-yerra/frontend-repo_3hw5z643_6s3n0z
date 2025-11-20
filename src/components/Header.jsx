import { useState } from 'react'

export default function Header({ active, onSearch, onTabChange }) {
  const [query, setQuery] = useState('')
  const tabs = [
    { key: 'grocery', label: 'Grocery' },
    { key: 'food', label: 'Food' },
    { key: 'shopping', label: 'Shopping' },
  ]

  const submit = (e) => {
    e.preventDefault()
    onSearch?.(query)
  }

  return (
    <div className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="text-xl font-extrabold tracking-tight text-gray-900">HyperCommerce</div>
          <form onSubmit={submit} className="flex-1">
            <div className="relative">
              <input
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
                placeholder="Search for items, restaurants, products..."
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 pl-10 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔎</span>
            </div>
          </form>
        </div>
        <div className="mt-3 flex items-center gap-2">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={()=>onTabChange?.(t.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${active===t.key? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
