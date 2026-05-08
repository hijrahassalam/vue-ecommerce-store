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
    formattedSubtotal: (state) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(state.subtotal)
    },
  },

  actions: {
    async fetchCart() {
      this.loading = true
      this.error = null
      try {
        const response = await api.get('/cart')
        const data = response.data.data
        this.items = data.items || []
        this.itemCount = data.item_count || 0
        this.subtotal = parseFloat(data.subtotal) || 0
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
        const response = await api.post('/cart/items', {
          product_id: productId,
          quantity,
        })
        await this.fetchCart()
        return { success: true, message: response.data.message }
      } catch (err) {
        const msg = err.response?.data?.message || 'Failed to add item'
        this.error = msg
        return { success: false, message: msg }
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
        const msg = err.response?.data?.message || 'Failed to update item'
        this.error = msg
        return { success: false, message: msg }
      } finally {
        this.loading = false
      }
    },

    async removeItem(itemId) {
      this.loading = true
      this.error = null
      try {
        await api.delete(`/cart/items/${itemId}`)
        await this.fetchCart()
        return { success: true }
      } catch (err) {
        const msg = err.response?.data?.message || 'Failed to remove item'
        this.error = msg
        return { success: false, message: msg }
      } finally {
        this.loading = false
      }
    },

    async clearCart() {
      this.loading = true
      this.error = null
      try {
        await api.delete('/cart')
        this.items = []
        this.itemCount = 0
        this.subtotal = 0
        return { success: true }
      } catch (err) {
        const msg = err.response?.data?.message || 'Failed to clear cart'
        this.error = msg
        return { success: false, message: msg }
      } finally {
        this.loading = false
      }
    },
  },
})
