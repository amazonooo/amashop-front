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
import { IColor } from '@/types/color.interface'
import { formatDate } from '@/lib/date/formatDate'
import { useGetCategory } from '@/hooks/queries/categories/useGetCategory'
import { CategoriesColumns, ICategoriesColumn } from './CategoriesColumns'
import { ICategory } from '@/types/category.interface'

export default function Categories() {
	const params = useParams<{ storeId: string }>()

	const { categories, isLoading } = useGetCategory()

	const formattedCategories: ICategoriesColumn[] = categories
		? categories.map(category => ({
				id: category.id,
				createdAt: formatDate(category.createdAt),
				title: category.title,
				storeId: category.storeId
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
							title={`Цвета (${categories?.length})`}
							description='Все категории вашего магазина'
						/>
						<div className={styles.buttons}>
							<Link href={STORE_URL.categoryCreate(params.storeId)}>
								<Button variant={'primary'}>
									<Plus />
									Создать
								</Button>
							</Link>
						</div>
					</div>
					<div className={styles.table}>
						<DataTable
							columns={CategoriesColumns}
							data={formattedCategories}
							filterKey='title'
						/>
					</div>
				</>
			)}
		</div>
	)
}