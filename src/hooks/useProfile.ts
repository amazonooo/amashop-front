import { userService } from '@/services/auth/user.service'
import { useQuery } from '@tanstack/react-query'

export function useProfile() {
  const { data: user, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => userService.getProfile()
  })

  return { user, isLoading }
}