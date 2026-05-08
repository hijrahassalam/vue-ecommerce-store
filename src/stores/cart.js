import { defineStore } from 'pinia'
import api from '../services/api'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    itemCount: 0,
    subtotal: 0,
    loading: false,
    error: null,
  }),

  getters: {
    isEmpty: (state) => state.itemCount === 0,
    formattedSubtotal: (state) =>
      new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(state.subtotal),
  },

  actions: {
    async fetchCart() {
      this.loading = true
      this.error = null
      try {
        const res = await api.get('/cart')
        const d = res.data.data
        this.items = d.items || []
        this.itemCount = d.item_count || 0
        this.subtotal = parseFloat(d.subtotal) || 0
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to load cart'
      } finally {
        this.loading = false
      }
    },

    async addItem(productId, quantity = 1) {
      this.loading = true
      this.error = null
      try {
        await api.post('/cart/items', { product_id: productId, quantity })
        await this.fetchCart()
        return { success: true }
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to add item'
        return { success: false, message: this.error }
      } finally {
        this.loading = false
      }
    },

    async updateItem(itemId, quantity) {
      this.loading = true
      this.error = null
      try {
        await api.put(`/cart/items/${itemId}`, { quantity })
        await this.fetchCart()
        return { success: true }
      } catch (err) {
        return { success: false, message: err.response?.data?.message || 'Failed to update' }
      } finally {
        this.loading = false
      }
    },

    async removeItem(itemId) {
      this.loading = true
      try {
        await api.delete(`/cart/items/${itemId}`)
        await this.fetchCart()
        return { success: true }
      } catch (err) {
        return { success: false, message: err.response?.data?.message || 'Failed to remove' }
      } finally {
        this.loading = false
      }
    },

    async clearCart() {
      this.loading = true
      try {
        await api.delete('/cart')
        this.items = []
        this.itemCount = 0
        this.subtotal = 0
        return { success: true }
      } catch (err) {
        return { success: false, message: err.response?.data?.message || 'Failed to clear' }
      } finally {
        this.loading = false
      }
    },
  },
})
