import { SITE_DESCRIPTION } from '@/constants/seo.constants'
import styles from './Hero.module.scss'
import Link from 'next/link'
import { PUBLIC_URL } from '@/config/url.config'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
		<div className={styles.section}>
			<h1 className={styles.heading}>Ваш шопинг, ваше удовольствие — <span className='text-primary-blue'>все в одном месте</span></h1>
      <p className={styles.description}>
        {SITE_DESCRIPTION}
      </p>
      <Link href={PUBLIC_URL.explorer()}>
        <Button variant={'primary'}>
          За покупками
          <ArrowRight />
        </Button>
      </Link>
		</div>
	)
}