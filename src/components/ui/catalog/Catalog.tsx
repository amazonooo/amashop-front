import Link from 'next/link'
import { ICatalog } from './catalog.interface'
import styles from './Catalog.module.scss'
import ProductCard from './product-card/ProductCard'

export default function Catalog({title, description, linkTitle, link, products}: ICatalog) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.info}>
          <h1>{title}</h1>
          {description && <p>{description}</p>}
        </div>
        {link && linkTitle && <Link href={link}>{linkTitle}</Link>}
      </div>

      <div className={styles.catalog}>
        <div className={styles.products}>
          {products.length ? (
            products.map(product => (
              <ProductCard key={product.id} procuct={product} />
            ))
          ) : (
            <div>Ничего не найдено</div>
          )}
        </div>
      </div>
    </div>
  )
}