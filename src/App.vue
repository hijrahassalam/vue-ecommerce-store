<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-1">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCartStore } from './stores/cart'
import { ensureSession } from './services/api'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

const cartStore = useCartStore()
onMounted(() => {
  ensureSession()
  cartStore.fetchCart()
})
</script>
