import { formatPrice } from '@/lib/string/formatPrice'
import { IProduct } from '@/types/product.interface'
import styles from './ProductInfo.module.scss'
import Link from 'next/link'
import { PUBLIC_URL } from '@/config/url.config'
import AddToCartButton from './AddToCartButton'
import FavoriteButton from './FavoriteButton'
import { getReviewWordWithEnding } from '@/lib/string/getReviewWordWithEnding'

interface IProductInfo {
	product: IProduct
}

export default function ProductInfo({ product }: IProductInfo) {
	const rating = Math.round(product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length) || 0

	return (
		<div className={styles.product_info}>
			<h1 className={styles.title}>{product.title}</h1>
			<div className={styles.price}>{formatPrice(product.price)}</div>
			<hr />
			<p className={styles.description}>{product.description}</p>
			<div className={styles.label}>
				<h3>Цвет: </h3>
				<div
					className={styles.color}
					style={{
						backgroundColor: product.color.value
					}}
				/>
			</div>
			<div className={styles.label}>
				<h3>Категория: </h3>
				<Link
					className='text-sm'
					href={PUBLIC_URL.category(product.category.id)}
				>
					{product.category.title}
				</Link>
			</div>
			<div className={styles.label}>
				<h3>Средний рейтинг: </h3>
				<div className='text-sm'>
					⭐ {rating.toFixed(1)} |{' '}
					{getReviewWordWithEnding(product.reviews.length)}					
				</div>
			</div>
			<hr />
			<div className={styles.actions}>
				<AddToCartButton product={product} />
				<FavoriteButton product={product} />
			</div>
		</div>
	)
}