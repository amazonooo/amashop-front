import { IMainStatistics } from '@/types/statistics.interface'
import CountUp from 'react-countup'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import styles from './MainStatistics.module.scss'
import { formatPrice } from '@/lib/string/formatPrice'
import { getIcon } from './statistics.utils'

interface MainStatisticsItemProps {
  item: IMainStatistics
}

export default function MainStatisticsItem({ item }: MainStatisticsItemProps) {
  const Icon = getIcon(item.id)
  
  return ( 
    <Card className={styles.card}>
      <CardHeader className={styles.header}>
        <CardTitle className='font-medium'>{item.name}</CardTitle>
        <Icon />
      </CardHeader>
      <CardContent className={styles.content}>
        <h2>
          {item.id !== 1 ? (
            <CountUp end={item.value} />
          ) : (
            <CountUp end={item.value} formattingFn={formatPrice} />
          )}
        </h2>
      </CardContent>
    </Card>
  )
}