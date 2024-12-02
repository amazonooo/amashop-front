import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form-elements/form'
import { Input } from '@/components/ui/form-elements/input'
import { IAuthForm } from '@/types/auth.interface'
import { validEmail } from '@/valid/regex'
import { UseFormReturn } from 'react-hook-form'

interface AuthFieldsProps {
  form: UseFormReturn<IAuthForm, any, undefined>
  isPending: boolean
  isReg?: boolean
}

export default function AuthFields({ form, isPending, isReg = false }: AuthFieldsProps) {
  return (
		<>
			{isReg && (
				<FormField
					control={form.control}
					name='name'
					rules={{
						required: 'Имя обязательно'
					}}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input placeholder='Иван' disabled={isPending} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			)}
			<FormField
				control={form.control}
				name='email'
				rules={{
					required: 'Почта обязательно',
					pattern: {
						value: validEmail,
						message: 'Введите корректную почту'
					}
				}}
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input
								placeholder='ivan@example.com'
								type='email'
								disabled={isPending}
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name='password'
				rules={{
					required: 'Пароль обязателен',
          minLength: {
            value: 6,
            message: 'Минимум 6 символов'
          }
				}}
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input placeholder='******' type='password' disabled={isPending} {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	)
}