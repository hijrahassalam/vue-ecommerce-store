import { defineStore } from 'pinia'
import api from '../services/api'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
    currentProduct: null,
    loading: false,
    error: null,
    pagination: null,
  }),

  actions: {
    async fetchProducts(page = 1, search = '') {
      this.loading = true
      this.error = null
      try {
        const params = { page }
        if (search) params.search = search
        const response = await api.get('/products', { params })
        this.products = response.data.data
        this.pagination = {
          currentPage: response.data.current_page,
          lastPage: response.data.last_page,
          perPage: response.data.per_page,
          total: response.data.total,
        }
      } catch (err) {
        this.error = 'Failed to load products'
      } finally {
        this.loading = false
      }
    },

    async fetchProduct(id) {
      this.loading = true
      this.error = null
      this.currentProduct = null
      try {
        const response = await api.get(`/products/${id}`)
        this.currentProduct = response.data.data
      } catch (err) {
        this.error = 'Product not found'
      } finally {
        this.loading = false
      }
    },
  },
})
