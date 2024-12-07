import { Button } from '@/components/ui/button'
import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'
import { ICartItem } from '@/types/cart.interface'
import { Minus, Plus } from 'lucide-react'
import styles from '../HeaderCart.module.scss'

interface CartActionProps {
  item: ICartItem
}

export default function CartActions({ item }: CartActionProps) {
  const { changeQuantity } = useActions()

  const { items } = useCart()
  const quality = items.find(cartItem => cartItem.id === item.id)?.quantity

	return (
		<div className={styles.actions}>
			<Button
				onClick={() => changeQuantity({ id: item.id, type: 'minus' })}
				variant={'ghost'}
				size={'icon'}
				disabled={quality === 1}
			>
				<Minus />
			</Button>

			<input disabled readOnly value={quality} />

			<Button
				onClick={() => changeQuantity({ id: item.id, type: 'plus' })}
				variant={'ghost'}
				size={'icon'}
			>
				<Plus />
			</Button>
		</div>
	)
}