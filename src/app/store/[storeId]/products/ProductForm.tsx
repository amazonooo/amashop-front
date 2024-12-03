import { useDeleteProduct } from '@/hooks/queries/products/useDeleteProducts'
import { useCreateProduct } from '@/hooks/queries/products/useCreateProducts'
import { useUpdateProduct } from '@/hooks/queries/products/useUpdateProduct'
import { ICategory } from '@/types/category.interface'
import { IColor } from '@/types/color.interface'
import { IProduct, IProductInput } from '@/types/product.interface'
import { SubmitHandler, useForm } from 'react-hook-form'
import styles from '../Store.module.scss'
import Heading from '@/components/ui/Heading'
import ConfirmModal from '@/components/ui/modals/ConfirmModal'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form-elements/form'
import { Input } from '@/components/ui/form-elements/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

interface ProductFormProps {
  product: IProduct | null
  categories: ICategory[]
  colors: IColor[]
}

export default function ProductForm({ product, categories, colors }: ProductFormProps) {
  const { createProduct, isLoadingCreate } = useCreateProduct()
  const { updateProduct, isLoadingUpdate } = useUpdateProduct()
  const { deleteProduct, isLoadingDelete } = usedeleteProduct()

  const title = product ? 'Изменить данные' : 'Создать товар'
  const description = product ? 'Изменить данные о товаре' : 'Добавить новый товар в магазин'
  const action = product ? 'Сохранить' : 'Создать'

  const form = useForm<IProductInput>({
		mode: 'onChange',
		values: {
			title: product?.title || '',
			description: product?.description || '',
			images: product?.images || [],
			price: product?.price || 0,
			categoryId: product?.category.id || '',
			colorId: product?.color.id || ''
		}
	})

  const onSubmit:SubmitHandler<IProductInput> = data => {
    data.price = Number(data.price)
    if (product) updateProduct(data)
    else createProduct(data)
  }

  return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<Heading title={title} description={description} />\
				{product && (
					<ConfirmModal handleClick={() => deleteProduct()}>
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
					{/* ImagesUpload */}
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
										placeholder='Название товара'
										disabled={isLoadingCreate || isLoadingUpdate}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='price'
						rules={{
							required: 'Цена обязательна'
						}}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Цена</FormLabel>
								<FormControl>
									<Input
										placeholder='Название товара'
										disabled={isLoadingCreate || isLoadingUpdate}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='categoryId'
						rules={{
							required: 'Категория обязательна'
						}}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Категория</FormLabel>
								<Select
									disabled={isLoadingCreate || isLoadingUpdate}
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Категория товара' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectGroup>
											{categories.map(category => (
												<SelectItem key={category.id} value={category.id}>
													{category.title}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='colorId'
						rules={{
							required: 'Цвет обязателен'
						}}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Цвет</FormLabel>
								<Select
									disabled={isLoadingCreate || isLoadingUpdate}
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Цвет товара' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectGroup>
											{colors.map(color => (
												<SelectItem key={color.id} value={color.id}>
													{color.name}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
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
										placeholder='Описание магазина'
										disabled={isLoadingUpdate || isLoadingCreate}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

          <Button variant={'primary'} disabled={isLoadingCreate || isLoadingUpdate}>{action}</Button>
				</form>
			</Form>
		</div>
	)
}