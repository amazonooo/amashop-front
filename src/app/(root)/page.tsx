import type { Metadata } from 'next'
import Home from './Home'

export const metadata: Metadata = {
	description: 'Ваш шоппинг, ваше удовольствие — все в одном месте!'
}

export default function Page() {
  return <Home />
}
