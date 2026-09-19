import type { CSSProperties } from 'react'
import type { Template4Data, LineItem, VariableItem } from '../utils/mapper'
import './Template5.css'

interface Props {
  data: Template4Data
}

const INK = '#1a1a1a'

const verticalStyle: CSSProperties = {
  writingMode: 'vertical-rl',
  textOrientation: 'upright',
}

function renderCol(
  lines: LineItem[],
  variable: VariableItem[],
  colClass: string,
  customFont?: string,
  boldPrefix?: string,
  parallelFontSize?: string,
  namesBold?: boolean,
) {
  return (
    <div className={`template5-col ${colClass}`}>
      {lines.map((line, i) => {
        const v = variable[i]
        if (Array.isArray(line)) {
          const bold = Array.isArray(v) && namesBold
          return (
            <div key={i} className="template5-line template5-line--parallel">
              <div className="template5-line-inner" style={{
                fontFamily: customFont,
                fontSize: parallelFontSize,
                ...verticalStyle,
                color: INK,
                fontWeight: bold ? 'bold' : 'normal',
              }}>{line[0]}</div>
              <div className="template5-line-inner" style={{
                fontFamily: customFont,
                fontSize: parallelFontSize,
                ...verticalStyle,
                color: INK,
                fontWeight: bold ? 'bold' : 'normal',
              }}>{line[1]}</div>
            </div>
          )
        }
        return (
          <div key={i} className="template5-line template5-line--center">
            <div className="template5-line-inner" style={{
              fontFamily: customFont,
              ...verticalStyle,
              color: INK,
            }}>
              {i === 0 && boldPrefix ? <span>{boldPrefix}</span> : null}
              {line}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function renderSimpleCol(
  lines: string[],
  variable: boolean[],
  colClass: string,
  customFont?: string,
  fontSize?: string,
  namesBold?: boolean,
) {
  return (
    <div className={`template5-col ${colClass}`}>
      {lines.map((line, i) => (
        <div key={i} className="template5-line">
          <div className="template5-line-inner" style={{
            fontFamily: customFont,
            fontSize: fontSize,
            ...verticalStyle,
            color: INK,
            fontWeight: variable[i] && namesBold ? 'bold' : 'normal',
          }}>{line}</div>
        </div>
      ))}
    </div>
  )
}

/** 白底黑字朱红双框竖排素柬 */
export function Template5({ data }: Props) {
  return (
    <div className="template5" style={{ width: '360px', height: '600px', fontFamily: data.nameFont }}>
      <div className="template5-frame">
        <div className="template5-card">
          <div className="template5-title">{data.title}</div>
          <div className="template5-body">
            {renderSimpleCol(data.recipientLines, data.recipientVariable, 'template5-col--recipient', data.nameFont, undefined, data.nameBold)}
            {renderCol(data.dateLines, data.dateVariable, 'template5-col--date', undefined, data.honoree)}
            {renderCol(data.coupleLines, data.coupleVariable, 'template5-col--couple', data.nameFont, undefined, data.coupleFontSize, data.nameBold)}
            {renderSimpleCol(data.inviteLines, data.inviteVariable, 'template5-col--invite')}
            {renderSimpleCol(data.timeLines, data.timeVariable, 'template5-col--time', undefined, data.timeLocationFontSize)}
            <div className="template5-col template5-col--location-sign">
              {renderSimpleCol(data.locationLines, data.locationVariable, 'template5-col--location', undefined, data.timeLocationFontSize)}
              <div className="template5-block template5-block--signature">
                {data.signatureLines.map((line, i) => {
                  if (Array.isArray(line)) {
                    return (
                      <div key={i} className="template5-line template5-line--parallel">
                        <div className="template5-line-inner" style={{
                          fontFamily: data.nameFont,
                          fontSize: data.inviteNameFontSize,
                          ...verticalStyle,
                          color: INK,
                          fontWeight: data.nameBold ? 'bold' : 'normal',
                        }}>{line[0]}</div>
                        <div className="template5-line-inner" style={{
                          fontFamily: data.nameFont,
                          fontSize: data.inviteNameFontSize,
                          ...verticalStyle,
                          color: INK,
                          fontWeight: data.nameBold ? 'bold' : 'normal',
                        }}>{line[1]}</div>
                      </div>
                    )
                  }
                  return (
                    <div key={i} className="template5-line template5-line--center">
                      <div className="template5-line-inner" style={{ ...verticalStyle, color: INK }}>{line}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
