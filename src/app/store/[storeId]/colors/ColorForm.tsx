import { SubmitHandler, useForm } from 'react-hook-form'
import styles from '../Store.module.scss'
import Heading from '@/components/ui/Heading'
import ConfirmModal from '@/components/ui/modals/ConfirmModal'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form-elements/form'
import { Input } from '@/components/ui/form-elements/input'
import { useUpdateColor } from '@/hooks/queries/colors/useUpdateColor'
import { useCreateColor } from '@/hooks/queries/colors/useCreateColor'
import { useDeleteColor } from '@/hooks/queries/colors/useDeleteColor'
import { IColor, IColorInput } from '@/types/color.interface'

interface colorFormProps {
  color?: IColor
}

export default function ColorForm({ color }: colorFormProps) {
  const { createColor, isLoadingCreate } = useCreateColor()
  const { updateColor, isLoadingUpdate } = useUpdateColor()
  const { deleteColor, isLoadingDelete } = useDeleteColor()

  const title = color ? 'Изменить данные' : 'Создать цвет'
  const description = color ? 'Изменить данные о цвете' : 'Добавить новый цвет в магазин'
  const action = color ? 'Сохранить' : 'Создать'

  const form = useForm<IColorInput>({
		mode: 'onChange',
		values: {
			name: color?.name || '',
			value: color?.value || '',
		}
	})

  const onSubmit:SubmitHandler<IColorInput> = data => {
    if (color) updateColor(data)
    else createColor(data)
  }

  return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<Heading title={title} description={description} />
				{color && (
					<ConfirmModal handleClick={() => deleteColor()}>
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
							name='name'
							rules={{
								required: 'Название обязательно'
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Название</FormLabel>
									<FormControl>
										<Input
											placeholder='Название цвета'
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
							name='value'
							rules={{
								required: 'Значение обязательно'
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Значение</FormLabel>
									<FormControl>
										<Input
											placeholder='Значение цвета'
											disabled={isLoadingCreate || isLoadingUpdate}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
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