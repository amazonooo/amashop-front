import { IProduct } from '@/types/product.interface'
import styles from './ProductCard.module.scss'
import Link from 'next/link'
import { PUBLIC_URL } from '@/config/url.config'
import Image from 'next/image'
import { formatPrice } from '@/lib/string/formatPrice'

interface ProductCardProps {
  procuct: IProduct
}

export default function ProductCard({procuct}: ProductCardProps) {
  return (
    <article className={styles.card}>
      <Link href={PUBLIC_URL.product(procuct.id)}>
        <Image 
          src={procuct.images[0]}
          alt={procuct.title}
          width={300}
          height={300}
        />
      </Link>

      <h3 className={styles.title}>{procuct.title}</h3>
      <Link
        href={PUBLIC_URL.category(procuct.category.id)}
        className={styles.category}
      >
        {procuct.category.title}
      </Link>
      <p className={styles.price}>{formatPrice(procuct.price)}</p>
    </article>
  )
}