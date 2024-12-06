import { IProduct } from '@/types/product.interface'

interface ProductCardProps {
  procuct: IProduct
}

export default function ProductCard({procuct}: ProductCardProps) {
  return <div>{procuct.title}</div>
}