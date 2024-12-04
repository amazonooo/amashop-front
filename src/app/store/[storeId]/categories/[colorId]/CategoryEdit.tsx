'use client'

import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import CategoriesForm from '../CategoriesForm'
import { categoryService } from '@/services/category.service'

export default function CategoryEdit() {
	const params = useParams<{ categoryId: string }>()

	const { data } = useQuery({
		queryKey: ['get category'],
		queryFn: () => categoryService.getById(params.categoryId)
	})

	return <CategoriesForm category={data} />
}