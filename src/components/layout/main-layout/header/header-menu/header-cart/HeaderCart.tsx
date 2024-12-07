'use client'

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import styles from './HeaderCart.module.scss'
import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/Heading'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/lib/string/formatPrice'
import CartItem from './cart-item/CartItem'
import { useRouter } from 'next/navigation'
import { useCheckout } from './cart-item/useCheckout'
import { useProfile } from '@/hooks/useProfile'
import { PUBLIC_URL } from '@/config/url.config'

export default function HeaderCart() {
	const router = useRouter()

	const { createPayment, isLoadingCreate } = useCheckout()
	const { user } = useProfile()

	const { items, total } = useCart()

	const handleClick = () => {
		user ? createPayment() : router.push(PUBLIC_URL.auth())
	}

  return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant={'ghost'}>
					<ShoppingCart />
				</Button>
			</SheetTrigger>
			<SheetContent className={styles.cart}>
				<Heading title='Корзина товаров' className='text-xl' />
				<div className={styles.items}>
					{items.length ? (
						items.map(item => <CartItem item={item} key={item.id} />)
					) : (
						<div className={styles.not_found}>Корзина пустая!</div>
					)}
				</div>
				{items.length ? (
					<>
						<div className={styles.total}>
							Итого к оплате: {formatPrice(total)}
						</div>
						<Button
							onClick={handleClick}
							variant={'primary'}
							disabled={isLoadingCreate}
						>
							Перейти к оплате
						</Button>
					</>
				) : null}
			</SheetContent>
		</Sheet>
	)
}