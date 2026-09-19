import type { FormData } from '../types/formData'
import { mapToTemplate1, mapToTemplate2, mapToTemplate3, mapToTemplate4, mapToTemplate5 } from '../utils/mapper'
import { Template1 } from './Template1'
import { Template2 } from './Template2'
import { Template3 } from './Template3'
import { Template4 } from './Template4'
import { Template5 } from './Template5'
import { Template6 } from './Template6'
import { Template8 } from './Template8'
import { Template11 } from './Template11'

export type TemplateId = 1 | 2 | 3 | 4 | 5 | 6 | 8 | 11

export const TEMPLATE_LABEL: Record<TemplateId, string> = {
  1: '古典传统',
  2: '红金对称',
  3: '祥云边框',
  4: '竖排中式',
  5: '素柬红框',
  6: '双囍分栏',
  8: '法式简约',
  11: '朱砂手写',
}

interface Props {
  formData: FormData
  templateId: TemplateId
}

export function Preview({ formData, templateId }: Props) {
  if (templateId === 1) return <Template4 data={mapToTemplate4(formData)} />
  if (templateId === 2) return <Template1 data={mapToTemplate1(formData)} />
  if (templateId === 3) return <Template3 data={mapToTemplate3(formData)} />
  if (templateId === 5) return <Template5 data={mapToTemplate5(formData)} />
  if (templateId === 6) return <Template6 data={mapToTemplate1(formData)} />
  if (templateId === 8) return <Template8 data={mapToTemplate1(formData)} />
  if (templateId === 11) return <Template11 data={mapToTemplate1(formData)} />
  return <Template2 data={mapToTemplate2(formData)} />
}
