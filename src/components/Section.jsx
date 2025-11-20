export default function Section({ title, items = [], variant = 'grid' }) {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <button className="text-sm text-blue-600 hover:underline">View all</button>
      </div>
      {variant==='vendors' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {items.map((v)=> (
            <div key={v.id} className="border rounded-xl p-3 hover:shadow transition shadow-sm">
              <div className="font-medium">{v.name}</div>
              <div className="text-sm text-gray-500">⭐ {v.rating} • {v.delivery_eta}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {items.map((p)=> (
            <div key={p.id || p.slug} className="border rounded-xl overflow-hidden bg-white hover:shadow transition shadow-sm">
              {p.image && <img src={p.image} alt={p.title} className="w-full h-28 object-cover" />}
              <div className="p-3">
                <div className="text-sm font-medium line-clamp-1">{p.title || p.name}</div>
                {p.price !== undefined && (
                  <div className="text-blue-600 font-semibold mt-1">₹{p.price}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
