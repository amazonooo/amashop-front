'use client'

import { useParams } from 'next/navigation'
import styles from '../Store.module.scss'
import DataTableLoading from '@/components/ui/data-table/DataTableLoading'
import Heading from '@/components/ui/Heading'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { STORE_URL } from '@/config/url.config'
import DataTable from '@/components/ui/data-table/DataTable'
import { useGetColor } from '@/hooks/queries/colors/useGetColor'
import { IColor } from '@/types/color.interface'
import { formatDate } from '@/lib/date/formatDate'
import { ColorColumns } from './ColorColumns'

export default function Colors() {
  const params = useParams<{ storeId: string }>()

  const {colors, isLoading} = useGetColor()

  const formattedColors: IColor[] = colors
		? colors.map(color => ({
				id: color.id,
				createdAt: formatDate(color.createdAt),
				name: color.name,
				value: color.value,
				storeId: color.storeId
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
							title={`Цвета (${Colors?.length})`}
							description='Все цвета вашего магазина'
						/>
						<div className={styles.buttons}>
							<Link href={STORE_URL.colorCreate(params.storeId)}>
								<Button variant={'primary'}>
									<Plus />
									Создать
								</Button>
							</Link>
						</div>
					</div>
					<div className={styles.table}>
						<DataTable
							columns={ColorColumns}
							data={formattedColors}
							filterKey='name'
						/>
					</div>
				</>
			)}
		</div>
	)
}