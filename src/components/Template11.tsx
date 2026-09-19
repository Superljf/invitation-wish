import type { Template1Data } from '../utils/mapper'
import './Template11.css'

interface Props {
  data: Template1Data
}

/** 朱砂手写：米纸淡格 + 印章。 */
export function Template11({ data }: Props) {
  return (
    <div className="template11" style={{ fontFamily: data.nameFont }}>
      <div className="template11-paper">
        <div className="template11-title">{data.title}</div>
        <p>敬启者：</p>
        <p>
          谨定于{data.dateBlock.solar}（{data.dateBlock.lunar}），为
          <span style={{ fontWeight: data.nameBold ? 'bold' : 'normal' }}>{data.names.groom.replace(' 先生', '')}</span>、
          <span style={{ fontWeight: data.nameBold ? 'bold' : 'normal' }}>{data.names.bride.replace(' 女士', '')}</span>
          {data.ceremonyText}。
        </p>
        <p>{data.inviteText[0]}，{data.inviteText[1]}。</p>
        <p style={{ fontSize: data.timeLocationFontSize }}>席设于{data.location.replace('席设：', '')}，{data.time}。</p>
        <div className="template11-sign">
          <span style={{ fontWeight: data.nameBold ? 'bold' : 'normal' }}>{data.names.groom.replace(' 先生', '')}　{data.names.bride.replace(' 女士', '')}</span>　敬邀
          <span className="template11-seal" aria-hidden="true">囍</span>
        </div>
      </div>
    </div>
  )
}
