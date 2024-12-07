import { Button } from '@/components/ui/button'
import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'
import { IProduct } from '@/types/product.interface'
import toast from 'react-hot-toast'

interface AddToCartButtonProps {
  product: IProduct
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart, removeFromCart } = useActions()
  const { items } = useCart()

  const currentElement = items.find(
    cartItem => cartItem.product.id === product.id
  )

  const toggleButton = () => {
    currentElement
			? removeFromCart({ id: currentElement.id })
			: addToCart({
					product,
					quantity: 1,
					price: product.price
				})
    toast.success(currentElement ? 'Удалено из корзины' : 'Добавлено в корзину')
  }

  return (
    <Button variant={'primary'} size={'lg'} className='w-full' onClick={toggleButton}>
      {currentElement ? 'Удалить из корзины' : 'Добавить в корзину'}
    </Button>
  )
}