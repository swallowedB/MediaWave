import defaultImg from '@/assets/mediawaveS.png'
import { ChevronDown } from 'lucide-react'


export default function Profile() {
  return (
    <div className='flex items-center bg-gradient-to-b from-[#777c8b]/10 to-[#f9faff]/30 
                  backdrop-blur-xl border border-white/10 rounded-full px-2 py-1'>
      <img src={defaultImg} alt="" className='w-8 aspect-auto rounded-full ' />
      <p className='ml-2 text-white text-sm'>Nickname</p>
      <ChevronDown className='w-4 text-gray-400 ml-1' />
    </div>
  )
}
