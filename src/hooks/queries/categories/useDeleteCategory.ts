import { STORE_URL } from '@/config/url.config'
import { categoryService } from '@/services/category.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

export const useDeleteCategory = () => {
	const params = useParams<{ storeId: string, categoryId: string }>()
	const router = useRouter()

	const queryClient = useQueryClient()

	const { mutate: deleteCategory, isPending: isLoadingDelete } = useMutation({
		mutationKey: ['delete Category'],
		mutationFn: () => categoryService.delete(params.categoryId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get categories for store dashboard']
			})
			toast.success('Категория удалена')
			router.push(STORE_URL.categories(params.storeId))
		},
		onError() {
			toast.error('Ошибка при создании категории')
		}
	})

	return useMemo(
		() => ({
			deleteCategory,
			isLoadingDelete
		}),
		[deleteCategory, isLoadingDelete]
	)
}
