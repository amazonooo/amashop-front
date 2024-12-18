import { useGetStatistics } from '@/hooks/queries/statistics/useGetStatistics'
import styles from './MainStatistics.module.scss'
import MainStatisticsItem from './MainStatisticsItem'

export default function MainStatistics() {
  const {main} = useGetStatistics()

  return (
		<div className={styles.main}>
			{main?.length ? (
				main.map((item, idx) => (
					<MainStatisticsItem key={`${item.id}-${idx}`} item={item} />
				))
			) : (
				<div>Нет данных для статистики</div>
			)}
		</div>
	)
}