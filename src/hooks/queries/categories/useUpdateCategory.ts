import { categoryService } from '@/services/category.service'
import { ICategoryInput } from '@/types/category.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

export const useUpdateCategory = () => {
	const params = useParams<{ storeId: string; categoryId: string }>()
	const queryClient = useQueryClient()

	const { mutate: updateCategory, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update category'],
		mutationFn: (data: ICategoryInput) => categoryService.update(params.categoryId, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get categories for store dashboard']
			})
			toast.success('Категория обновлена')
		},
		onError() {
			toast.error('Ошибка при обновлении категории')
		}
	})

	return useMemo(
		() => ({
			updateCategory,
			isLoadingUpdate
		}),
		[updateCategory, isLoadingUpdate]
	)
}
