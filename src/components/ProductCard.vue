<template>
  <div class="card group cursor-pointer" @click="$router.push(`/products/${product.id}`)">
    <div class="relative aspect-square overflow-hidden bg-gray-100">
      <img
        :src="product.image_url"
        :alt="product.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
      <div
        v-if="!product.is_active || product.stock === 0"
        class="absolute inset-0 bg-black/40 flex items-center justify-center"
      >
        <span class="bg-white text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
          {{ product.stock === 0 ? 'Out of Stock' : 'Unavailable' }}
        </span>
      </div>
    </div>
    <div class="p-4">
      <h3 class="font-semibold text-gray-900 mb-1 truncate">{{ product.name }}</h3>
      <p class="text-sm text-gray-500 mb-2 line-clamp-2">{{ product.description }}</p>
      <div class="flex items-center justify-between">
        <span class="text-lg font-bold text-indigo-600">{{ formatPrice(product.price) }}</span>
        <span
          class="text-xs font-medium"
          :class="product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-amber-600' : 'text-red-500'"
        >
          {{ product.stock > 0 ? `${product.stock} in stock` : 'Out of stock' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
})

function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}
</script>
