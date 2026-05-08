<template>
  <div class="min-h-screen flex flex-col bg-[#09090b]">
    <AppHeader />
    <main class="flex-1">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
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

<style>
.page-enter-active,
.page-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.page-enter-from { opacity: 0; transform: translateY(8px); }
.page-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
