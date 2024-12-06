import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import styles from './HeaderCart.module.scss'
import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/Heading'
import { ShoppingCart } from 'lucide-react'

export default function HeaderCart() {
  return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant={'ghost'}><ShoppingCart /></Button>
			</SheetTrigger>
			<SheetContent>
				<SheetTitle className='text-xl font-bold'>Корзина товаров</SheetTitle>
			</SheetContent>
		</Sheet>
	)
}