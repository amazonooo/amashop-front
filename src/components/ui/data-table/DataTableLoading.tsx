import { Card, CardContent } from '../card'
import Loader from '../Loader'
import { Skeleton } from '../skeleton'
import styles from './DataTable.module.scss'

export default function DataTableLoading() {
  return (
    <div className={styles.loading}>
      <Skeleton className={styles.loading} />
      <Skeleton className={styles.search} />
      <Card className={styles.table}>
        <CardContent>
          <div className={styles.loader_wrapper}>
            <Loader />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}