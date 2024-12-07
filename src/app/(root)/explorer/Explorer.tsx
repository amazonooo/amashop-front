'use client'

import Catalog from '@/components/ui/catalog/Catalog'
import { productService } from '@/services/product.service'
import { IProduct } from '@/types/product.interface'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

interface ExplorerProps {
  products: IProduct[]
}

export default function Explorer({products}: ExplorerProps) {
  const searchParams = useSearchParams()
  const searchTerm = searchParams.get('searchTerm')
  
  const { data } = useQuery({
    queryKey: ['product explorer', searchTerm],
    queryFn: () => productService.getAll(searchTerm),
    initialData: products
  })

  return <div className='my-6'>
    <Catalog title={searchTerm ? `Поиск по запросу "${searchTerm}"` : 'Каталог товаров'} products={data} /> 
  </div>
}