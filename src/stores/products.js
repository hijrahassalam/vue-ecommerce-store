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
        const res = await api.get('/products', { params })
        this.products = res.data.data
        this.pagination = {
          currentPage: res.data.current_page,
          lastPage: res.data.last_page,
          perPage: res.data.per_page,
          total: res.data.total,
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
        const res = await api.get(`/products/${id}`)
        this.currentProduct = res.data.data
      } catch (err) {
        this.error = 'Product not found'
      } finally {
        this.loading = false
      }
    },
  },
})
