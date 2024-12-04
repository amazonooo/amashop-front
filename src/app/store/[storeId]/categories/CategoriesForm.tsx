import { SubmitHandler, useForm } from 'react-hook-form'
import styles from '../Store.module.scss'
import Heading from '@/components/ui/Heading'
import ConfirmModal from '@/components/ui/modals/ConfirmModal'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form-elements/form'
import { Input } from '@/components/ui/form-elements/input'
import { ICategory, ICategoryInput } from '@/types/category.interface'
import { useCreateCategory } from '@/hooks/queries/categories/useCreateCategory'
import { useDeleteCategory } from '@/hooks/queries/categories/useDeleteCategory'
import { useUpdateCategory } from '@/hooks/queries/categories/useUpdateCategory'
import { Textarea } from '@/components/ui/textarea'

interface ICategoriesForm {
	category?: ICategory | null
}

export default function CategoriesForm({ category }: ICategoriesForm) {
	const { createCategory, isLoadingCreate } = useCreateCategory()
	const { updateCategory, isLoadingUpdate } = useUpdateCategory()
	const { deleteCategory, isLoadingDelete } = useDeleteCategory()

	const title = category ? 'Изменить данные' : 'Создать категорию'
	const description = category
		? 'Изменить данные о категории'
		: 'Добавить новую категорию в магазин'
	const action = category ? 'Сохранить' : 'Создать'

	const form = useForm<ICategoryInput>({
		mode: 'onChange',
		values: category || {
			title: '',
			description: ''
		}
	})

	const onSubmit: SubmitHandler<ICategoryInput> = data => {
		if (category) updateCategory(data)
		else createCategory(data)
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<Heading title={title} description={description} />
				{category && (
					<ConfirmModal handleClick={() => deleteCategory()}>
						<Button
							size={'icon'}
							variant={'primary'}
							disabled={isLoadingDelete}
						>
							<Trash2 className='size-4' />
						</Button>
					</ConfirmModal>
				)}
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className={styles.fields}>
						<FormField
							control={form.control}
							name='title'
							rules={{
								required: 'Название обязательно'
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Название</FormLabel>
									<FormControl>
										<Input
											placeholder='Название категории'
											disabled={isLoadingCreate || isLoadingUpdate}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name='description'
						rules={{
							required: 'Описание обязательно'
						}}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Описание</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										placeholder='Описание категории'
										disabled={isLoadingCreate || isLoadingUpdate}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						variant={'primary'}
						disabled={isLoadingCreate || isLoadingUpdate}
					>
						{action}
					</Button>
				</form>
			</Form>
		</div>
	)
}