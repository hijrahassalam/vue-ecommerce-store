<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
    <LoadingSpinner v-if="cartStore.loading && cartStore.items.length === 0" />
    <div v-else-if="cartStore.isEmpty" class="text-center py-16">
      <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/></svg>
      <h2 class="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
      <RouterLink to="/products" class="btn-primary inline-block mt-4">Browse Products</RouterLink>
    </div>
    <div v-else>
      <div class="space-y-4 mb-8">
        <CartItem v-for="item in cartStore.items" :key="item.id" :item="item" @update-quantity="handleUpdateQuantity" @remove="handleRemove" />
      </div>
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-6">
          <span class="text-gray-600">Subtotal</span>
          <span class="text-2xl font-bold text-gray-900">{{ cartStore.formattedSubtotal }}</span>
        </div>
        <div class="flex space-x-4">
          <button @click="handleClear" class="btn-secondary flex-1">Clear Cart</button>
          <RouterLink to="/checkout" class="btn-primary flex-1 text-center">Checkout</RouterLink>
        </div>
      </div>
    </div>
    <Toast :show="toast.show" :message="toast.message" :type="toast.type" />
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useCartStore } from '../stores/cart'
import CartItem from '../components/CartItem.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import Toast from '../components/Toast.vue'

const cartStore = useCartStore()
const toast = reactive({ show: false, message: '', type: 'success' })

function showToast(message, type = 'success') {
  toast.message = message; toast.type = type; toast.show = true
  setTimeout(() => { toast.show = false }, 3000)
}

async function handleUpdateQuantity(itemId, quantity) {
  const result = await cartStore.updateItem(itemId, quantity)
  if (!result.success) showToast(result.message, 'error')
}

async function handleRemove(itemId) {
  const result = await cartStore.removeItem(itemId)
  if (result.success) showToast('Item removed')
  else showToast(result.message, 'error')
}

async function handleClear() { await cartStore.clearCart(); showToast('Cart cleared') }

onMounted(() => { cartStore.fetchCart() })
</script>
