import { useGetStatistics } from '@/hooks/queries/statistics/useGetStatistics'
import styles from './MiddleStatistics.module.scss'
import Overview from './Overview'
import LastUsers from './LastUsers'

export default function MiddleStatistics() {
  const {middle} = useGetStatistics()

  return <div className={styles.middle}>
    {middle?.monthlySales.length || middle?.lastUsers.length ? (
      <>
        <div className={styles.overview}>
          <Overview data={middle.monthlySales} />
        </div>
        <div className={styles.last_users}>
          <LastUsers data={middle.lastUsers} />
        </div>
      </>
    ): (
      <div>Нет данных для статистики</div>
    )}
  </div>
}