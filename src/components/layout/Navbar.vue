<template>
  <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" :class="{ 'bg-dark/95 backdrop-blur-sm py-2 border-b border-white/10': isScrolled, 'bg-transparent py-6': !isScrolled }">
    <nav class="container mx-auto px-6 flex justify-between items-center">
      <!-- Logo -->
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-1 group">
        <img src="@/assets/logo.png" alt="SpicyWay" class="h-12 w-auto object-contain" />
      </RouterLink>

      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center space-x-8">
        <RouterLink v-for="link in links" :key="link.path" :to="link.path" 
          class="text-sm font-heading font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors duration-200">
          {{ link.name }}
        </RouterLink>
        
        <!-- Cart Icon -->
        <RouterLink to="/order" class="relative group flex items-center gap-2 text-sm font-heading font-bold uppercase tracking-widest text-white hover:text-primary transition-colors">
          <span>Cart</span>
          <div class="relative">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span v-if="cartStore.totalItems > 0" class="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
              {{ cartStore.totalItems }}
            </span>
          </div>
        </RouterLink>

        <BaseButton to="/order" variant="primary" size="sm">Order Now</BaseButton>
      </div>

      <!-- Mobile Menu Button -->
      <button @click="isOpen = !isOpen" class="md:hidden text-white hover:text-primary transition-colors focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path v-if="!isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>

    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform -translate-y-full opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-full opacity-0"
    >
      <div v-if="isOpen" class="md:hidden absolute top-full left-0 right-0 bg-dark border-b border-white/10 shadow-2xl">
        <div class="container mx-auto px-6 py-8 flex flex-col space-y-6 text-center">
          <RouterLink v-for="link in links" :key="link.path" :to="link.path" 
            @click="isOpen = false"
            class="text-xl font-heading font-bold uppercase tracking-widest text-white hover:text-primary transition-colors duration-200">
            {{ link.name }}
          </RouterLink>
          <RouterLink to="/order" @click="isOpen = false" class="text-xl font-heading font-bold uppercase tracking-widest text-white hover:text-primary transition-colors duration-200">
            Cart ({{ cartStore.totalItems }})
          </RouterLink>
          <BaseButton to="/order" variant="primary" class="w-full" @click="isOpen = false">Order Now</BaseButton>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import BaseButton from '@/components/ui/BaseButton.vue'

const cartStore = useCartStore()
const isOpen = ref(false)
const isScrolled = ref(false)

const links = [
  { name: 'Menu', path: '/menu' },
  { name: 'About', path: '/about' },
  { name: 'Locations', path: '/contact' },
]

function handleScroll() {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
