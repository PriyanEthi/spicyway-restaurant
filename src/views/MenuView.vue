<template>
  <div class="menu-page bg-dark min-h-screen pt-32 pb-24">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h1 class="text-6xl md:text-8xl font-heading font-bold text-white uppercase mb-4 tracking-tighter">Menu</h1>
        <div class="w-24 h-2 bg-primary mx-auto"></div>
      </div>

      <!-- Categories -->
      <div class="flex flex-wrap justify-center gap-4 mb-16 sticky top-12 z-30 bg-dark/95 backdrop-blur py-4 border-b border-white/10">
        <button 
          v-for="category in categories" 
          :key="category"
          @click="activeCategory = category"
          :class="[
            'px-6 py-2 font-heading font-bold uppercase tracking-widest text-sm transition-all duration-200 border-2',
            activeCategory === category 
              ? 'bg-white text-black border-white' 
              : 'bg-transparent text-gray-400 border-transparent hover:text-white hover:border-white'
          ]"
        >
          {{ category }}
        </button>
      </div>

      <!-- Menu Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        <BaseCard v-for="item in filteredItems" :key="item.id">
          <template #image>
            <img :src="item.image" :alt="item.name" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </template>
          <template #overlay>
              <BaseButton size="sm" @click="addToCart(item)" variant="white">Add to Cart</BaseButton>
          </template>
          <template #header>
            <div class="flex justify-between items-start">
              <h3 class="text-xl font-heading font-bold text-white uppercase tracking-wide">{{ item.name }}</h3>
              <span class="text-primary font-heading font-bold text-xl">Rs. {{ item.price.toFixed(2) }}</span>
            </div>
          </template>
          <p class="mb-2">{{ item.description }}</p>
          <template #footer>
            <span class="text-xs font-bold uppercase tracking-widest text-gray-500">{{ item.category }}</span>
          </template>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import { useCartStore } from '@/stores/cart'
import menuData from '@/data/menu.json'

const cartStore = useCartStore()
const activeCategory = ref('All')

const categories = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks']

const filteredItems = computed(() => {
  if (activeCategory.value === 'All') {
    return menuData
  }
  return menuData.filter(item => item.category === activeCategory.value)
})

function addToCart(item) {
  cartStore.addToCart(item)
}
</script>
