import { useRuntimeConfig } from '#app';
import { reactive } from 'vue';

interface IProductImage {
  url: string;
  type: string;
}

interface IProductSummary {
  id: number;
  brand_name: string;
  tire_name: string;
  product_code: string;
  cover: string;
}

interface IProductFull extends IProductSummary {
  tire_size?: string;
  width?: string;
  color?: string;
  quality?: string;
  bolt?: string;
  cb?: string;
  type: string;
  images: IProductImage[];
  created_at: string;
}

interface IApiResponse<T = any> {
  status: string;
  message?: string;
  count?: number;
  product_id?: number;
  product?: T;
  products?: T[];
  brands?: string[];
}

type TSearchProductModel = {
  status: string;
  page: number;
  per_page: number;
  total_items: number;
  total_pages: number;
  products: [
    {
      id: number;
      brand_name: string;
      tire_name: string;
      product_code: string;
      tire_size: number;
      color: string;
      type: string;
      is_active: boolean;
      is_new: boolean;
    },
  ];
};

type TSearchNewProduct = {
  status: string;
  count: number;
  products: {
    id: number;
    brand_name: string;
    tire_name: string;
    product_code: string;
    tire_size: string;
    width: string;
    color: string;
    quality: string;
    bolt: string;
    cb: string;
    type: string;
    cover: string;
    images: { url: string; type: string }[];
    is_active: boolean;
    is_new: boolean;
    created_at: string;
  }[];
};

export class Product {
  fullProductData = {};
  dashboardData = {};
  searchedProductData: TSearchProductModel = {};
  searchNewProducts: TSearchNewProduct = {};
  folders = {};
  foldersProduct = {};
  detail = {};

  productSummery = {};

  private get config() {
    return useRuntimeConfig();
  }

  private async fetchWithAuth<T>(
    url: string,
    options: Omit<RequestInit, 'headers'> & {
      headers?: Record<string, string>;
    } = {},
    notAuthorization?: boolean
  ): Promise<T> {
    const token = localStorage.getItem('token');

    const headers: Record<string, string> = {
      ...(options.headers ?? {}),
    };

    if (!notAuthorization) {
      headers['x-access-tokens'] = token ?? '';
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
    });
  }

  async apiAddProduct(data: {
    brand_name: string;
    tire_name: string;
    product_code: string;
    type: string;
    tire_size?: string;
    width?: string;
    color?: string;
    quality?: string;
    bolt?: string;
    cb?: string;
    cover: File;
    gallery?: File[];
    is_active: boolean;
    is_new: boolean;
  }) {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (!value) return;

        if (key === 'gallery' && Array.isArray(value)) {
          value.forEach((file) => formData.append('gallery', file));
        } else if (key !== 'gallery') {
          formData.append(key, value as any);
        }
      });

      return await this.fetchWithAuth<IApiResponse>(
        `${this.config.public.baseUrl}/add_product`,
        {
          method: 'POST',
          body: formData,
        }
      );
    } catch (error) {
      console.error('apiAddProduct error:', error);
      return false;
    }
  }

  async apiEditProduct(
    productId: number,
    data: Partial<{
      brand_name: string;
      tire_name: string;
      product_code: string;
      type: string;
      tire_size: string;
      width: string;
      color: string;
      quality: string;
      bolt: string;
      cb: string;
      cover: File;
      gallery: File[];
      is_active: boolean;
      is_new: boolean;
    }>
  ) {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (!value) return;

        if (key === 'gallery' && Array.isArray(value)) {
          value.forEach((file) => formData.append('gallery', file));
        } else {
          formData.append(key, value as any);
        }
      });

      return await this.fetchWithAuth<IApiResponse>(
        `${this.config.public.baseUrl}/edit_product/${productId}`,
        {
          method: 'PUT',
          body: formData,
        }
      );
    } catch (error) {
      console.error('apiEditProduct error:', error);
      return false;
    }
  }

  async apiRemoveProduct(productId: number) {
    try {
      return await this.fetchWithAuth<IApiResponse>(
        `${this.config.public.baseUrl}/remove_product/${productId}`,
        {
          method: 'DELETE',
        }
      );
    } catch (error) {
      console.error('apiRemoveProduct error:', error);
      return false;
    }
  }

  async apiGetAllBrands() {
    try {
      return await this.fetchWithAuth<IApiResponse<string[]>>(
        `${this.config.public.baseUrl}/get_all_brands`,
        { method: 'GET' },
        true
      );
    } catch (error) {
      console.error('apiGetAllBrands error:', error);
      return false;
    }
  }

  async apiGetProductsSummary() {
    try {
      const res = await this.fetchWithAuth<IApiResponse<IProductSummary>>(
        `${this.config.public.baseUrl}/get_products_summary`,
        { method: 'GET' },
        true
      );

      if (res) this.productSummery = res;
    } catch (error) {
      console.error('apiGetProductsSummary error:', error);
      return false;
    }
  }

  async apiGetProductsFull() {
    try {
      const res = await this.fetchWithAuth<IApiResponse<IProductFull>>(
        `${this.config.public.baseUrl}/get_products_full`,
        { method: 'GET' },
        true
      );

      console.log(res);

      if (res && res.count && res.count > 0) this.fullProductData = res;
      else this.fullProductData = {};
      console.log(this.fullProductData);
    } catch (error) {
      console.error('apiGetProductsFull error:', error);
      return false;
    }
  }

  async apiGetProductDetail(productId: number) {
    try {
      const res = await this.fetchWithAuth<IApiResponse<IProductFull>>(
        `${this.config.public.baseUrl}/get_product_detail/${productId}`,
        { method: 'GET' },
        true
      );
      if (res && res.status === 'success') {
        this.detail = res;
      } else this.detail = {};
    } catch (error) {
      console.error('apiGetProductDetail error:', error);
      this.detail = {};
      return false;
    }
  }

  async apiDashboardData() {
    try {
      const res = await this.fetchWithAuth<IApiResponse<IProductFull>>(
        `${this.config.public.baseUrl}/dashboard_stats`,
        { method: 'GET' }
      );

      if (res) this.dashboardData = res;
      else this.dashboardData = {};
    } catch (error) {
      console.error('apiGetProductDetail error:', error);
      return false;
    }
  }

  async apiChangeActive(productId: number, isActive: boolean) {
    try {
      return await this.fetchWithAuth<IApiResponse<IProductFull>>(
        `${this.config.public.baseUrl}/set_product_status/${productId}`,
        { method: 'PUT', body: JSON.stringify({ is_active: isActive }) }
      );
    } catch (error) {
      console.error('apiChangeActive error:', error);
      return false;
    }
  }

  async apiChangeNew(productId: number, isNew: boolean) {
    try {
      return await this.fetchWithAuth<IApiResponse<IProductFull>>(
        `${this.config.public.baseUrl}/set_product_new/${productId}`,
        { method: 'PUT', body: JSON.stringify({ is_new: isNew }) }
      );
    } catch (error) {
      console.error('apiChangeNew error:', error);
      return false;
    }
  }

  async apiSearchProducts(data: {
    brand_name?: string;
    tire_name?: string;
    product_code?: string;
    tire_size?: string;
    color?: string;
    type?: string;
    page: number;
    per_page: number;
  }) {
    try {
      const filtered = Object.fromEntries(
        Object.entries(data).filter(
          ([_, v]) => v !== undefined && v !== null && v !== ''
        )
      );

      const res = await this.fetchWithAuth<TSearchProductModel>(
        `${this.config.public.baseUrl}/search_products`,
        {
          method: 'POST',
          body: JSON.stringify(filtered),
          headers: {
            'Content-Type': 'application/json',
          },
        },
        true
      );

      if (res && res.status) this.searchedProductData = res;
      else this.searchedProductData = {};
    } catch (error) {
      console.error('apiSearchProducts error:', error);
      return false;
    }
  }

  async apiSearchProductsNew() {
    try {
      const res = await this.fetchWithAuth<IApiResponse<TSearchNewProduct>>(
        `${this.config.public.baseUrl}/get_new_products_full`,
        { method: 'GET' },
        true
      );

      if (res && res.status) this.searchNewProducts = res;
      else this.searchNewProducts = {};
    } catch (error) {
      console.error('apiSearchProducts error:', error);
      return false;
    }
  }

  async apiGetFolders(data?: any) {
    try {
      const res = await this.fetchWithAuth<IApiResponse<TSearchNewProduct>>(
        `${this.config.public.baseUrl}/get_brand_tire_tree`,
        { method: 'POST', body: { ...data } },
        true
      );

      if (res && res.status === 'success') this.folders = res;
      else this.folders = {};
    } catch (error) {
      console.error('apiGetFolders error:', error);
      this.folders = {};
    }
  }
  async apiGetFolderProduct(data?: any) {
    try {
      const res = await this.fetchWithAuth<IApiResponse<TSearchNewProduct>>(
        `${this.config.public.baseUrl}/get_products_by_brand_and_tire`,
        { method: 'POST', body: { ...data } },
        true
      );

      if (res && res.status === 'success') this.foldersProduct = res;
      else this.foldersProduct = {};
    } catch (error) {
      console.error('apiGetFolderProduct error:', error);
      this.foldersProduct = {};
    }
  }
}

export const useProduct = reactive(new Product());
