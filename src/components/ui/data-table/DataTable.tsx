'use client'

import {
	ColumnDef,
  ColumnFiltersState,
  getFilteredRowModel,
  SortingState,
	flexRender,
	getCoreRowModel,
	useReactTable,
  getSortedRowModel
} from '@tanstack/react-table'

import styles from './DataTable.module.scss'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { useState } from 'react'
import { Input } from '../form-elements/input'

interface DataTableProps<TData, TValue> { 
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
  filterKey?: string
}

export default function DataTable<TData, TValue>({
	columns,
	data,
  filterKey
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])

  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>([])

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting,
			columnFilters
		}
	})

	return (
		<div>
			{filterKey && (
				<div className={styles.search}>
					<Input
						placeholder='Поиск'
						value={(table.getColumn(filterKey)?.getFilterValue() as string) ?? ''}
						onChange={event =>
							table.getColumn('title')?.setFilterValue(event.target.value)
						}
						className='max-w-sm'
					/>
				</div>
			)}
			<div className={styles.table}>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map(header => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map(row => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map(cell => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center'
								>
									Ничего не найдено.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}
