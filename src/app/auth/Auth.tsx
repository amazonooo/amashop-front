'use client'

import { useAuthForm } from '@/hooks/useAuthForm'
import { useState } from 'react'
import styles from './Auth.module.scss'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form-elements/form'
import { Button } from '@/components/ui/button'
import AuthFields from './AuthFields'
import Social from './Social'

export default function Auth() {
  const [isReg, setIsReg] = useState(false)

  const { onSubmit, form, isPending } = useAuthForm(isReg)

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <Image src='/images/auth.svg' alt='amaShop auth' width={100} height={100} />
      </div>
      <div className={styles.right}>
        <Card className={styles.card}>
          <CardHeader className={styles.header}>
            <CardTitle>{isReg ? 'Создать аккаунт' : 'Войти в аккаунт'}</CardTitle>
            <CardDescription>
              Войдите или создайте учетную запись, чтобы оформлять покупки!
            </CardDescription>
          </CardHeader>
          <CardContent className={styles.content}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <AuthFields form={form} isPending={isPending} isReg={isReg} />

                <Button disabled={isPending}>Продолжить</Button>
              </form>
            </Form>
            <Social />
          </CardContent>
          <CardFooter className={styles.footer}>
            {isReg ? 'Уже есть аккаунт?' : 'Еще нет аккаунта?'}
            <button onClick={() => setIsReg(!isReg)}>
              {isReg ? 'Войти' : 'Создать'}
            </button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}