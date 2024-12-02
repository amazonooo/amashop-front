import { API_URL } from '@/config/api.config'
import { IUser } from './../../types/user.interface';
import { axiosWithAuth } from '@/api/api.interceptors'

class UserService {
	async getProfile() {
		const repsonse = await axiosWithAuth<IUser>({
			url: API_URL.users('/profile'),
			method: 'GET'
		})

		return repsonse
	}

	async toggleFavorite(productId: string) {
		return axiosWithAuth<IUser>({
      url: API_URL.users(`/profile/favorites/${productId}`),
      method: 'PATCH'
    })
	}
}

export const userService = new UserService  