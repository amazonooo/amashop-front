import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import Sidebar from './Sidebar'

export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger className='lg:hidden pr-4 hover:opacity-80 transition-opacity duration-300'>
        <Menu />
      </SheetTrigger>
      <SheetContent side='left' className='p-0 bg-white'>
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}