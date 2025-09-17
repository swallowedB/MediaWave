import { Search } from 'lucide-react'

export default function SearchBar() {
  return (
    <div className='relative'>
      <input type="text" className='w-full h-9 bg-gradient-to-b from-[#777c8b]/10 to-[#f9faff]/30 
                  backdrop-blur-xl border border-white/10 rounded-full focus:outline-none px-3.5 text-white ' />
      <Search className='absolute top-1.5 right-3.5 w-5 text-white' />
    </div>
  )
}
