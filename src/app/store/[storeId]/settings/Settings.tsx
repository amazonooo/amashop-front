'use client'

import { useDeleteStore } from '@/hooks/queries/stores/useDeleteStore'
import { useUpdateStore } from '@/hooks/queries/stores/useUpdateStore'
import { IStoreEdit } from '@/types/store.interface'
import { SubmitHandler, useForm } from 'react-hook-form'
import styles from '../Store.module.scss'
import Heading from '@/components/ui/Heading'
import ConfirmModal from '@/components/ui/modals/ConfirmModal'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form-elements/form'
import { Input } from '@/components/ui/form-elements/input'
import { Textarea } from '@/components/ui/textarea'

export default function Settings() {
  const { store, updateStore, isLoadingUpdate } = useUpdateStore()
  const { deleteStore, isLoadingDelete } = useDeleteStore()

  const form = useForm<IStoreEdit>({
    mode: 'onChange',
    values: {
      title: store?.title || '',
      description: store?.description || ''
    }
  })

  const onSubmit: SubmitHandler<IStoreEdit> = data => {
    updateStore(data)
  }

  return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<Heading
					title='Настройки'
					description='Управление настройками магазина'
				/>
				<ConfirmModal handleClick={() => deleteStore()}>
					<Button variant={'primary'} size={'icon'} disabled={isLoadingDelete}>
						<Trash2 className='size-5' />
					</Button>
				</ConfirmModal>
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
											placeholder='Название магазина'
											disabled={isLoadingUpdate}
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
						render={({ field }) => (
							<FormItem>
								<FormLabel>Описание</FormLabel>
								<FormControl>
									<Textarea
										placeholder='Описание магазина'
										disabled={isLoadingUpdate}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button variant={'primary'} disabled={isLoadingUpdate}>
						Сохранить
					</Button>
				</form>
			</Form>
		</div>
	)
}