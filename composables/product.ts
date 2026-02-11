import { useRuntimeConfig } from '#app'
import { reactive } from 'vue'

interface IProductImage {
  url: string
  type: string
}

interface IProductSummary {
  id: number
  brand_name: string
  tire_name: string
  product_code: string
  cover: string
}

interface IProductFull extends IProductSummary {
  tire_size?: string
  width?: string
  color?: string
  quality?: string
  bolt?: string
  cb?: string
  type: string
  images: IProductImage[]
  created_at: string
}

interface IApiResponse<T = any> {
  status: string
  message?: string
  count?: number
  product_id?: number
  product?: T
  products?: T[]
  brands?: string[]
}

export class Product {

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

  async apiAddProduct(data: {
    brand_name: string
    tire_name: string
    product_code: string
    type: string
    tire_size?: string
    width?: string
    color?: string
    quality?: string
    bolt?: string
    cb?: string
    cover: File
    gallery?: File[]
  }) {
    try {
      const formData = new FormData()

      Object.entries(data).forEach(([key, value]) => {
        if (!value) return

        if (key === 'gallery' && Array.isArray(value)) {
          value.forEach((file) => formData.append('gallery', file))
        } else if (key !== 'gallery') {
          formData.append(key, value as any)
        }
      })

      return await this.fetchWithAuth<IApiResponse>(
        `${this.config.public.baseUrl}/add_product`,
        {
          method: 'POST',
          body: formData,
        }
      )
    } catch (error) {
      console.error('apiAddProduct error:', error)
      return false
    }
  }

  async apiEditProduct(
    productId: number,
    data: Partial<{
      brand_name: string
      tire_name: string
      product_code: string
      type: string
      tire_size: string
      width: string
      color: string
      quality: string
      bolt: string
      cb: string
      cover: File
      gallery: File[]
    }>
  ) {
    try {
      const formData = new FormData()

      Object.entries(data).forEach(([key, value]) => {
        if (!value) return

        if (key === 'gallery' && Array.isArray(value)) {
          value.forEach((file) => formData.append('gallery', file))
        } else {
          formData.append(key, value as any)
        }
      })

      return await this.fetchWithAuth<IApiResponse>(
        `${this.config.public.baseUrl}/edit_product/${productId}`,
        {
          method: 'PUT',
          body: formData,
        }
      )
    } catch (error) {
      console.error('apiEditProduct error:', error)
      return false
    }
  }

  async apiRemoveProduct(productId: number) {
    try {
      return await this.fetchWithAuth<IApiResponse>(
        `${this.config.public.baseUrl}/remove_product/${productId}`,
        {
          method: 'DELETE',
        }
      )
    } catch (error) {
      console.error('apiRemoveProduct error:', error)
      return false
    }
  }

  async apiGetAllBrands() {
    try {
      return await this.fetchWithAuth<IApiResponse<string[]>>(
        `${this.config.public.baseUrl}/get_all_brands`,
        { method: 'GET' },
        true
      )
    } catch (error) {
      console.error('apiGetAllBrands error:', error)
      return false
    }
  }

  async apiGetProductsSummary() {
    try {
      return await this.fetchWithAuth<IApiResponse<IProductSummary>>(
        `${this.config.public.baseUrl}/get_products_summary`,
        { method: 'GET' },
        true
      )
    } catch (error) {
      console.error('apiGetProductsSummary error:', error)
      return false
    }
  }

  async apiGetProductsFull() {
    try {
      return await this.fetchWithAuth<IApiResponse<IProductFull>>(
        `${this.config.public.baseUrl}/get_products_full`,
        { method: 'GET' },
        true
      )
    } catch (error) {
      console.error('apiGetProductsFull error:', error)
      return false
    }
  }

  async apiGetProductDetail(productId: number) {
    try {
      return await this.fetchWithAuth<IApiResponse<IProductFull>>(
        `${this.config.public.baseUrl}/get_product_detail/${productId}`,
        { method: 'GET' },
        true
      )
    } catch (error) {
      console.error('apiGetProductDetail error:', error)
      return false
    }
  }
}

export const useProduct = reactive(new Product())
