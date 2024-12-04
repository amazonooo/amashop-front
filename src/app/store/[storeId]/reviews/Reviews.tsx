'use client'

import { useGetReviews } from '@/hooks/queries/reviews/useGetReviews'
import { formatDate } from '@/lib/date/formatDate'
import styles from '../Store.module.scss'
import DataTableLoading from '@/components/ui/data-table/DataTableLoading'
import Heading from '@/components/ui/Heading'
import { IReviewColumn, ReviewColumns } from './ReviewColumn'
import DataTable from '@/components/ui/data-table/DataTable'

export default function Reviews() {
  const { reviews, isLoading } = useGetReviews()

  const formattedReviews: IReviewColumn[] = reviews
    ? reviews.map(review => ({
      id: review.id,
      createdAt: formatDate(review.createdAt),
      rating: Array.from({ length: review.rating })
        .map(() => '⭐')
        .join(' '),
      username: review.user.name
    }))
  : []

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <DataTableLoading />
      ) : (
        <>
          <div className={styles.header}>
            <Heading 
              title={`Отзывы (${reviews?.length})`}
              description='Все отзывы в вашем магазине'
            />
          </div>
          <div className={styles.table}>
            <DataTable 
              columns={ReviewColumns}
              data={formattedReviews}
            />
          </div>
        </>
      )}
    </div>
  )
}