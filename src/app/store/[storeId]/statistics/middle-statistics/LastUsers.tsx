import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ILastUsers } from '@/types/statistics.interface'
import styles from './MiddleStatistics.module.scss'
import Image from 'next/image'
import { formatPrice } from '@/lib/string/formatPrice'

interface LastUsersProps {
  data: ILastUsers[]
}

export default function LastUsers({ data }: LastUsersProps) {
  return (
    <Card>
			<CardHeader className={styles.header}>
				<CardTitle>Покупатели</CardTitle>
			</CardHeader>
      <CardContent>
        {data.length ? (
          data.map(user => (
            <div key={user.name} className={styles.user}>
              <Image src={user.picture} alt={user.name} width={40} height={40} />
              <div className={styles.info}>
                <p className={styles.name}>{user.name}</p>
                <p>{user.email}</p>
              </div>
              <div className={styles.total}>
                +{formatPrice(user.total)}
              </div>
            </div>
          ))
        ) : (
          <div>Нет покупателей</div>
        )}
      </CardContent>
    </Card>
  )
}