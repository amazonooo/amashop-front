import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import ColorEdit from './CategoryEdit'
import CategoryEdit from './CategoryEdit'

export const metadata: Metadata = {
  title: 'Настройки категории',
  ...NO_INDEX_PAGE
}

export default function CategoryEditPage() {
	return <CategoryEdit />
}
