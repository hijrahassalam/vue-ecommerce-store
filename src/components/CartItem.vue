<template>
  <div class="flex items-center gap-4 bg-[#18181b] rounded-2xl p-4 border border-white/5">
    <img
      :src="item.product_image || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200'"
      :alt="item.product_name"
      class="w-20 h-20 rounded-xl object-cover bg-zinc-800"
    />
    <div class="flex-1 min-w-0">
      <h4 class="font-semibold text-white truncate">{{ item.product_name }}</h4>
      <p class="text-indigo-400 font-medium text-sm mt-0.5">{{ formatPrice(item.price) }}</p>
    </div>
    <div class="flex items-center gap-2">
      <button
        @click.stop="decrement"
        class="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center transition-all"
        :disabled="quantity <= 1"
      >
        <svg class="w-3 h-3 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/></svg>
      </button>
      <span class="w-8 text-center text-white font-medium">{{ quantity }}</span>
      <button @click.stop="increment" class="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center transition-all">
        <svg class="w-3 h-3 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
      </button>
    </div>
    <div class="text-right min-w-[80px]">
      <p class="font-bold text-white">{{ formatPrice(item.subtotal) }}</p>
      <button @click.stop="$emit('remove', item.id)" class="text-xs text-red-400/60 hover:text-red-400 mt-1 transition-colors">Remove</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({ item: { type: Object, required: true } })
const emit = defineEmits(['update-quantity', 'remove'])
const quantity = computed(() => props.item.quantity)
function increment() { emit('update-quantity', props.item.id, quantity.value + 1) }
function decrement() { if (quantity.value > 1) emit('update-quantity', props.item.id, quantity.value - 1) }
function formatPrice(price) { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price) }
</script>
