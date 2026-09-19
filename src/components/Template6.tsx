import type { Template1Data } from '../utils/mapper'
import { Bamboo, Clouds } from './ornaments'
import './Template6.css'

interface Props {
  data: Template1Data
}

/** 双囍分栏：红底竹影 + 米纸正文。 */
export function Template6({ data }: Props) {
  return (
    <div className="template6" style={{ fontFamily: data.nameFont }}>
      <div className="template6-red" aria-hidden="true">
        <Bamboo className="template6-bamboo" stroke="#2a070c" />
      </div>
      <div className="template6-paper">
        <Bamboo className="template6-bamboo-faint" stroke="#c9b79a" />
        <div className="template6-xi">囍囍</div>
        <Clouds className="template6-cloud" fill="#c4a24a" />
        <div className="template6-names">
          <span>{data.names.groom.replace(' 先生', '')}</span>
          <span className="template6-amp">&</span>
          <span>{data.names.bride.replace(' 女士', '')}</span>
        </div>
        <p className="template6-body">{data.ceremonyText}</p>
        <p className="template6-invite">{data.inviteText[0]}　{data.inviteText[1]}</p>
        <div className="template6-meta">
          <div>{data.dateBlock.solar}</div>
          <div>{data.dateBlock.lunar}</div>
          <div style={{ fontSize: data.timeLocationFontSize }}>{data.location}</div>
          <div style={{ fontSize: data.timeLocationFontSize }}>{data.time}</div>
        </div>
      </div>
    </div>
  )
}
