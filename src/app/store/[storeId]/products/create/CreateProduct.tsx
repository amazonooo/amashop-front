'use client'

import { useGetCategory } from '@/hooks/queries/categories/useGetCategory'
import { useGetColor } from '@/hooks/queries/colors/useGetColor'
import ProductForm from '../ProductForm'

export default function CreateProduct() {
  const { categories } = useGetCategory()
  const { colors } = useGetColor()

  return (
    <ProductForm categories={categories || []} colors={colors || []} />
  )
}