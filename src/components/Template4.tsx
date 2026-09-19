import type { CSSProperties } from 'react'
import type { Template4Data, LineItem, VariableItem } from '../utils/mapper'
import './Template4.css'

interface Props {
  data: Template4Data
}

const verticalStyle: CSSProperties = {
  writingMode: 'vertical-rl',
  textOrientation: 'upright',
}

function lineColor(v: VariableItem, i?: number): string {
  if (typeof v === 'boolean') return v ? '#1a1a1a' : '#F5D26B'
  return v[i!] ? '#1a1a1a' : '#F5D26B'
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
    <div className={`template4-col ${colClass}`}>
      {lines.map((line, i) => {
        const v = variable[i]
        if (Array.isArray(line)) {
          const bold = Array.isArray(v) && namesBold
          return (
            <div key={i} className="template4-line template4-line--parallel">
              <div className="template4-line-inner" style={{
                fontFamily: customFont,
                fontSize: parallelFontSize,
                ...verticalStyle,
                color: lineColor(v, 0),
                fontWeight: bold ? 'bold' : 'normal',
              }}>{line[0]}</div>
              <div className="template4-line-inner" style={{
                fontFamily: customFont,
                fontSize: parallelFontSize,
                ...verticalStyle,
                color: lineColor(v, 1),
                fontWeight: bold ? 'bold' : 'normal',
              }}>{line[1]}</div>
            </div>
          )
        }
        return (
          <div key={i} className="template4-line template4-line--center">
            <div className="template4-line-inner" style={{
              fontFamily: customFont,
              ...verticalStyle,
              color: lineColor(v),
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
    <div className={`template4-col ${colClass}`}>
      {lines.map((line, i) => (
        <div key={i} className="template4-line">
          <div className="template4-line-inner" style={{
            fontFamily: customFont,
            fontSize: fontSize,
            ...verticalStyle,
            color: variable[i] ? '#1a1a1a' : '#F5D26B',
            fontWeight: variable[i] && namesBold ? 'bold' : 'normal',
          }}>{line}</div>
        </div>
      ))}
    </div>
  )
}

export function Template4({ data }: Props) {
  return (
    <div className="template4" style={{ width: '360px', height: '600px', fontFamily: data.nameFont }}>
      <div className="template4-card">
        <div className="template4-title">{data.title}</div>
        <div className="template4-body">
          {renderSimpleCol(data.recipientLines, data.recipientVariable, 'template4-col--recipient', data.nameFont, undefined, data.nameBold)}
          {renderCol(data.dateLines, data.dateVariable, 'template4-col--date', undefined, data.honoree)}
          {renderCol(data.coupleLines, data.coupleVariable, 'template4-col--couple', data.nameFont, undefined, data.coupleFontSize, data.nameBold)}
          {renderSimpleCol(data.inviteLines, data.inviteVariable, 'template4-col--invite')}
          <div className="template4-group-time-location-signature">
            <div className="template4-row-time-location">
              {renderSimpleCol(data.timeLines, data.timeVariable, 'template4-col--time', undefined, data.timeLocationFontSize)}
              {renderSimpleCol(data.locationLines, data.locationVariable, 'template4-col--location', undefined, data.timeLocationFontSize)}
            </div>
            <div className="template4-block template4-block--signature">
              {data.signatureLines.map((line, i) => {
                const v = data.signatureVariable[i]
                if (Array.isArray(line)) {
                  return (
                    <div key={i} className="template4-line template4-line--parallel">
                      <div className="template4-line-inner" style={{
                        fontFamily: data.nameFont,
                        fontSize: data.inviteNameFontSize,
                        ...verticalStyle,
                        color: lineColor(v, 0),
                        fontWeight: data.nameBold ? 'bold' : 'normal',
                      }}>{line[0]}</div>
                      <div className="template4-line-inner" style={{
                        fontFamily: data.nameFont,
                        fontSize: data.inviteNameFontSize,
                        ...verticalStyle,
                        color: lineColor(v, 1),
                        fontWeight: data.nameBold ? 'bold' : 'normal',
                      }}>{line[1]}</div>
                    </div>
                  )
                }
                return (
                  <div key={i} className="template4-line template4-line--center">
                    <div className="template4-line-inner" style={{ ...verticalStyle, color: lineColor(v) }}>{line}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
