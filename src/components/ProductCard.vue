<template>
  <article
    class="card-hover group relative bg-[#18181b] rounded-2xl border border-white/5 overflow-hidden cursor-pointer"
    @click="$router.push(`/products/${product.id}`)"
  >
    <!-- Image -->
    <div class="relative aspect-square overflow-hidden bg-zinc-900">
      <img
        :src="product.image_url"
        :alt="product.name"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <!-- Out of stock overlay -->
      <div
        v-if="!product.is_active || product.stock === 0"
        class="absolute inset-0 bg-black/60 flex items-center justify-center"
      >
        <span class="bg-white/10 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10">
          {{ product.stock === 0 ? 'Out of Stock' : 'Unavailable' }}
        </span>
      </div>

      <!-- Price badge -->
      <div class="absolute top-3 right-3">
        <span class="bg-black/60 backdrop-blur-sm text-white text-sm font-bold px-3 py-1.5 rounded-xl border border-white/10">
          {{ formatPrice(product.price) }}
        </span>
      </div>
    </div>

    <!-- Info -->
    <div class="p-4">
      <h3 class="font-semibold text-white mb-1 truncate group-hover:text-indigo-400 transition-colors">{{ product.name }}</h3>
      <p class="text-sm text-zinc-500 line-clamp-2 mb-3">{{ product.description }}</p>

      <div class="flex items-center justify-between">
        <div class="flex items-center gap-1.5">
          <span
            class="w-2 h-2 rounded-full"
            :class="product.stock > 10 ? 'bg-green-400' : product.stock > 0 ? 'bg-amber-400' : 'bg-red-400'"
          />
          <span class="text-xs font-medium" :class="product.stock > 10 ? 'text-green-400' : product.stock > 0 ? 'text-amber-400' : 'text-red-400'">
            {{ product.stock > 0 ? `${product.stock} in stock` : 'Out of stock' }}
          </span>
        </div>
        <span class="text-xs text-zinc-600">ID #{{ product.id }}</span>
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({ product: { type: Object, required: true } })
function formatPrice(price) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
}
</script>
