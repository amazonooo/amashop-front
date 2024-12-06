import type { Metadata } from 'next'
import Home from './Home'
import { productService } from '@/services/product.service'

export const metadata: Metadata = {
	description: 'Ваш шоппинг, ваше удовольствие — все в одном месте!'
}

export const revalidate = 60

async function getProducts() {
  const data = (await productService.getMostPopular()).slice(0, 6)

  return data
}

export default async function Page() {
  const data = await getProducts()

  return <Home products={data} />
}
