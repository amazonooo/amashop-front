'use client'

import { IProduct } from '@/types/product.interface'
import Image from 'next/image'
import { useState } from 'react'
import styles from './ProductGallery.module.scss'
import { cn } from '@/lib/utils'

interface IProductGallery {
  product: IProduct
}

export default function ProductGallery({ product }: IProductGallery) {
  const [currentIndex, setCurrentIndex] = useState(0)

	return (
    <div>
      <Image 
        src={product.images[currentIndex]}
        alt={product.title}
        width={500}
        height={500}
        className={styles.image}
      />
      <div className={styles.gallery}>
        {product.images.map((image, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={cn(
              styles.item,
              idx === currentIndex
                ? 'border-neutral-400'
                : 'border-transparent'
            )}
          >
            <Image 
              src={image}
              alt={product.title}
              width={100}
              height={100}
            />
          </button>
        ))}
      </div>
    </div>
  )
}