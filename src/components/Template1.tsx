import type { Template1Data } from '../utils/mapper'
import { Clouds, CornerCloud } from './ornaments'

interface Props {
  data: Template1Data
}

export function Template1({ data }: Props) {
  return (
    <div className="w-[360px] h-[600px] bg-zhong-red rounded-xl shadow-xl p-6 flex flex-col items-center justify-between font-serif text-zhong-gold overflow-hidden relative">
      <CornerCloud className="absolute top-3 left-3 w-10 h-10 text-zhong-gold/70" />
      <CornerCloud className="absolute top-3 right-3 w-10 h-10 text-zhong-gold/70 scale-x-[-1]" />
      <CornerCloud className="absolute bottom-3 left-3 w-10 h-10 text-zhong-gold/70 scale-y-[-1]" />
      <CornerCloud className="absolute bottom-3 right-3 w-10 h-10 text-zhong-gold/70 scale-[-1]" />
      <div className="text-6xl font-bold mt-4">囍</div>
      <div className="text-2xl font-semibold">{data.title}</div>
      <Clouds className="w-28 h-5 opacity-70" fill="#d4af37" />
      <div className="text-center space-y-1">
        <div>谨定于</div>
        <div className="text-base">{data.dateBlock.solar}</div>
        <div className="text-base">{data.dateBlock.lunar}</div>
      </div>
      <div className="text-center">为</div>
      <div className="text-center space-y-1">
        <div className="text-lg font-bold">{data.names.groom}</div>
        <div className="text-lg font-bold">{data.names.bride}</div>
      </div>
      <div>{data.ceremonyText}</div>
      <div className="text-center space-y-1">
        <div>{data.inviteText[0]}</div>
        <div>{data.inviteText[1]}</div>
      </div>
      <div className="text-sm text-center space-y-0.5 mt-2" style={{ fontSize: data.timeLocationFontSize }}>
        <div>{data.location}</div>
        <div>{data.time}</div>
      </div>
      <Clouds className="w-32 h-6 mb-1 opacity-50" fill="#d4af37" />
    </div>
  )
}
