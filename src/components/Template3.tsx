import type { Template3Data } from '../utils/mapper'
import { Clouds, CornerCloud } from './ornaments'

interface Props {
  data: Template3Data
}

export function Template3({ data }: Props) {
  return (
    <div className="w-[360px] h-[600px] bg-white rounded-xl shadow-xl p-6 flex flex-col items-center justify-between font-serif border-4 border-zhong-red overflow-hidden relative text-zhong-red">
      <CornerCloud className="absolute top-2 left-2 w-9 h-9 text-zhong-red/70" />
      <CornerCloud className="absolute top-2 right-2 w-9 h-9 text-zhong-red/70 scale-x-[-1]" />
      <CornerCloud className="absolute bottom-2 left-2 w-9 h-9 text-zhong-red/70 scale-y-[-1]" />
      <CornerCloud className="absolute bottom-2 right-2 w-9 h-9 text-zhong-red/70 scale-[-1]" />
      <Clouds className="w-28 h-5 mt-2 opacity-80" fill="#c4a24a" />
      <div className="text-2xl font-bold mt-2">{data.title}</div>
      <div className="text-lg text-zhong-gold font-semibold">{data.namesLine}</div>
      <div className="text-center space-y-1 text-sm">
        <div>谨定于</div>
        <div>{data.solar}</div>
        <div>{data.lunar}</div>
      </div>
      <div className="text-center text-sm">
        <div style={{ fontSize: data.timeLocationFontSize }}>{data.locationLine}</div>
        <div>{data.ceremonyText}</div>
      </div>
      <div className="text-zhong-gold font-medium">{data.inviteLine}</div>
      <div className="text-sm" style={{ fontSize: data.timeLocationFontSize }}>{data.time}</div>
      <Clouds className="w-32 h-6 mb-1 opacity-70" fill="#c4a24a" />
    </div>
  )
}
