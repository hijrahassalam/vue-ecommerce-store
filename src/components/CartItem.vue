<template>
  <div class="flex items-center space-x-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
    <img
      :src="item.product_image || 'https://via.placeholder.com/80'"
      :alt="item.product_name"
      class="w-20 h-20 object-cover rounded-lg"
    />
    <div class="flex-1 min-w-0">
      <h4 class="font-semibold text-gray-900 truncate">{{ item.product_name }}</h4>
      <p class="text-indigo-600 font-medium">{{ formatPrice(item.price) }}</p>
    </div>
    <div class="flex items-center space-x-3">
      <button
        @click.stop="decrement"
        class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
        :disabled="quantity <= 1"
      >
        <MinusIcon class="w-4 h-4" />
      </button>
      <span class="w-8 text-center font-medium">{{ quantity }}</span>
      <button
        @click.stop="increment"
        class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
      >
        <PlusIcon class="w-4 h-4" />
      </button>
    </div>
    <div class="text-right">
      <p class="font-semibold text-gray-900">{{ formatPrice(item.subtotal) }}</p>
      <button
        @click.stop="$emit('remove', item.id)"
        class="text-sm text-red-500 hover:text-red-700 mt-1 transition-colors"
      >
        Remove
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { MinusIcon, PlusIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update-quantity', 'remove'])

const quantity = computed(() => props.item.quantity)

function increment() {
  emit('update-quantity', props.item.id, quantity.value + 1)
}

function decrement() {
  if (quantity.value > 1) {
    emit('update-quantity', props.item.id, quantity.value - 1)
  }
}

function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}
</script>
