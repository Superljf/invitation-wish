import type { Template1Data } from '../utils/mapper'
import { Bouquet, Flourish, WaxSeal } from './ornaments'
import './Template8.css'

interface Props {
  data: Template1Data
}

/** 法式简约：自绘花束与火漆。 */
export function Template8({ data }: Props) {
  const groom = data.names.groom.replace(' 先生', '')
  const bride = data.names.bride.replace(' 女士', '')
  return (
    <div className="template8" style={{ fontFamily: data.nameFont }}>
      <div className="template8-photo" aria-hidden="true">
        <Bouquet className="template8-bouquet" />
      </div>
      <div className="template8-body">
        <p className="template8-en">Wedding Invitation</p>
        <Flourish className="template8-flourish" />
        <p className="template8-sub">{data.title}</p>
        <WaxSeal className="template8-seal" />
        <div className="template8-names">
          {groom}<span>　</span>{bride}
        </div>
        <div className="template8-meta">
          <div>{data.dateBlock.solar.replace('公历 ', '')}</div>
          <div>{data.dateBlock.lunar}</div>
          <p className="template8-place">{data.location.replace('席设：', '')}</p>
        </div>
      </div>
    </div>
  )
}
