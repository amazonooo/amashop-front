import { STORE_URL } from '@/config/url.config'
import { productService } from '@/services/product.service'
import { IProductInput } from '@/types/product.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

export const useDeleteProduct = () => {
	const params = useParams<{ storeId: string, productId: string }>()
	const router = useRouter()

	const queryClient = useQueryClient()

	const { mutate: deleteProduct, isPending: isLoadingDelete } = useMutation({
		mutationKey: ['delete product'],
		mutationFn: () =>
			productService.delete(params.productId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get products for store dashboard']
			})
			toast.success('Товар удален')
			router.push(STORE_URL.products(params.storeId))
		},
		onError() {
			toast.error('Ошибка при создании товара')
		}
	})

	return useMemo(
		() => ({
			deleteProduct,
			isLoadingDelete
		}),
		[deleteProduct, isLoadingDelete]
	)
}