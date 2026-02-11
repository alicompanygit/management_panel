import { useRuntimeConfig } from '#app'
import { reactive } from 'vue'

interface IBanner {
  id: number
  image?: string
  is_active?: boolean
  created_at?: string
}

interface IApiResponse<T> {
  status: string
  message?: string
  count?: number
  banner?: T
  banners?: T[]
}

export class Banner {

  private get config() {
    return useRuntimeConfig()
  }

  private async fetchWithAuth<T>(
    url: string,
    options: Omit<RequestInit, 'headers'> & {
      headers?: Record<string, string>
    } = {},
    notAuthorization?: boolean
  ): Promise<T> {
    const token = localStorage.getItem('token')

    const headers: Record<string, string> = {
      ...(options.headers ?? {}),
    }

    if (!notAuthorization) {
      headers['x-access-tokens'] = token ?? ''
    }

    return await $fetch<T>(url, {
      ...options,
      headers,
      method: options.method as
        | 'get'
        | 'post'
        | 'put'
        | 'patch'
        | 'delete'
        | 'head'
        | 'options'
        | undefined,
    })
  }

  async apiAddBanner(imageFile: File) {
    if (!imageFile) return false

    try {
      const formData = new FormData()
      formData.append('image', imageFile)

      return await this.fetchWithAuth<IApiResponse<IBanner>>(
        `${this.config.public.baseUrl}/add_banner`,
        {
          method: 'POST',
          body: formData,
        }
      )
    } catch (error) {
      console.error('apiAddBanner error:', error)
      return false
    }
  }

  async apiSetBannerStatus(bannerId: number, isActive: boolean) {
    try {
      return await this.fetchWithAuth<IApiResponse<IBanner>>(
        `${this.config.public.baseUrl}/set_banner_status/${bannerId}`,
        {
          method: 'PUT',
          body: JSON.stringify({ is_active: isActive }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    } catch (error) {
      console.error('apiSetBannerStatus error:', error)
      return false
    }
  }

  async apiGetBanners() {
    try {
      return await this.fetchWithAuth<IApiResponse<IBanner>>(
        `${this.config.public.baseUrl}/banners`,
        {
          method: 'GET',
        },
        true
      )
    } catch (error) {
      console.error('apiGetBanners error:', error)
      return false
    }
  }
}

export const useBanner = reactive(new Banner())
