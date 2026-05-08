<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-3xl font-bold text-white mb-8">Shopping Cart</h1>

    <LoadingSpinner v-if="cartStore.loading && cartStore.items.length === 0" />

    <div v-else-if="cartStore.isEmpty" class="text-center py-20">
      <div class="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center">
        <svg class="w-10 h-10 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/></svg>
      </div>
      <h2 class="text-xl font-semibold text-zinc-400 mb-2">Your cart is empty</h2>
      <p class="text-zinc-600 mb-6">Looks like you haven't added anything yet.</p>
      <RouterLink to="/products" class="inline-flex items-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-medium transition-colors">
        Browse Products
      </RouterLink>
    </div>

    <div v-else>
      <div class="space-y-3 mb-8">
        <TransitionGroup name="list">
          <CartItem
            v-for="item in cartStore.items"
            :key="item.id"
            :item="item"
            @update-quantity="handleUpdateQuantity"
            @remove="handleRemove"
          />
        </TransitionGroup>
      </div>

      <div class="bg-[#18181b] rounded-2xl border border-white/5 p-6">
        <div class="flex items-center justify-between mb-6">
          <span class="text-zinc-500">Subtotal ({{ cartStore.itemCount }} items)</span>
          <span class="text-2xl font-bold text-white">{{ cartStore.formattedSubtotal }}</span>
        </div>
        <div class="flex gap-3">
          <button @click="handleClear" class="px-6 py-3 rounded-xl font-medium text-zinc-400 hover:text-white border border-white/10 hover:border-white/20 transition-all">
            Clear
          </button>
          <RouterLink to="/checkout" class="flex-1 text-center px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all">
            Checkout
          </RouterLink>
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

async function handleClear() {
  await cartStore.clearCart()
  showToast('Cart cleared')
}

onMounted(() => { cartStore.fetchCart() })
</script>

<style scoped>
.list-enter-active, .list-leave-active { transition: all 0.3s ease; }
.list-enter-from { opacity: 0; transform: translateX(-20px); }
.list-leave-to { opacity: 0; transform: translateX(20px); }
</style>
