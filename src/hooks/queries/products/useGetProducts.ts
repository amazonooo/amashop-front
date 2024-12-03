import { productService } from '@/services/product.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

export const useGetProducts = () => {
  const params = useParams<{ storeId: string }>()

  const { data: products, isLoading } = useQuery({
    queryKey: ['get products for store dashboard'],
    queryFn: () => productService.getStoreById(params.storeId)
  })

  return useMemo(
    () => ({
      products,
      isLoading
    }), 
    [products, isLoading]
  )
}