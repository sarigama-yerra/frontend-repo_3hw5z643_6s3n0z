import { useEffect, useState } from 'react'
import Section from './Section'

export default function Home({ vertical }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(()=>{ fetchHome() }, [vertical])

  async function fetchHome(){
    setLoading(true)
    try{
      const res = await fetch(`${baseUrl}/home`)
      const json = await res.json()
      setData(json)
    }catch(e){
      console.error(e)
    }finally{
      setLoading(false)
    }
  }

  if(loading || !data) return <div className="p-6 text-gray-600">Loading...</div>

  const v = data[vertical]

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 gap-6">
        <Section title={`Top Picks in ${vertical}`} items={v.products} />
        <Section title="Popular Categories" items={v.categories} />
        <Section title="Best Vendors" items={v.vendors} variant="vendors" />
      </div>
    </div>
  )
}
