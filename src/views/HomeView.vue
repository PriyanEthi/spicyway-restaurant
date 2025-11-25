<template>
  <div class="home bg-dark">
    <!-- Hero Section -->
    <section class="relative h-screen flex items-center">
      <div class="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" alt="Spicy Food Background" class="w-full h-full object-cover opacity-60" />
        <div class="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
      </div>

      <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-3xl">
          <h1 class="text-7xl md:text-9xl font-heading font-bold text-white uppercase leading-none mb-6 tracking-tighter">
            Spicy<br /><span class="text-primary">Way</span>
          </h1>
          <p class="text-xl md:text-2xl text-gray-300 mb-10 font-light max-w-xl leading-relaxed">
            Sri Lankan fast food restaurant in Trincomalee featuring authentic fried rice, nasi goreng, kottu, and local favorites.
          </p>
          <div class="flex gap-4">
            <BaseButton to="/order" size="lg" variant="primary">Order Online</BaseButton>
            <BaseButton to="/menu" size="lg" variant="white">View Menu</BaseButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Intro Section (Split) -->
    <section class="grid grid-cols-1 md:grid-cols-2">
      <div class="bg-primary p-12 md:p-24 flex flex-col justify-center items-start">
        <h2 class="text-4xl md:text-6xl font-heading font-bold text-white uppercase mb-6 leading-none">
          Taste the<br />Heat
        </h2>
        <p class="text-white/90 text-lg mb-8 leading-relaxed max-w-md">
          We bring authentic Sri Lankan flavors to every dish. Our chefs use traditional recipes and fresh local ingredients to create the best fast food in Trincomalee.
        </p>
        <BaseButton to="/about" variant="white" size="md">Our Story</BaseButton>
      </div>
      <div class="h-96 md:h-auto relative">
        <img src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Interior" class="w-full h-full object-cover" />
      </div>
    </section>

    <!-- Featured Grid -->
    <section class="py-24 bg-dark">
      <div class="container mx-auto px-6">
        <div class="flex justify-between items-end mb-12">
          <h2 class="text-4xl md:text-5xl font-heading font-bold text-white uppercase">Popular Items</h2>
          <RouterLink to="/menu" class="text-primary font-heading font-bold uppercase tracking-widest hover:text-white transition-colors">
            View Full Menu →
          </RouterLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <BaseCard v-for="dish in featuredDishes" :key="dish.id">
            <template #image>
              <img :src="dish.image" :alt="dish.name" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </template>
            <template #overlay>
               <BaseButton size="sm" @click="addToCart(dish)" variant="white">Add to Cart</BaseButton>
            </template>
            <template #header>
              <div class="flex justify-between items-start">
                <h3 class="text-xl font-heading font-bold text-white uppercase tracking-wide">{{ dish.name }}</h3>
                <span class="text-primary font-heading font-bold text-xl">Rs. {{ dish.price }}</span>
              </div>
            </template>
            <p>{{ dish.description }}</p>
          </BaseCard>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-32 relative bg-secondary text-center">
      <div class="container mx-auto px-6">
        <h2 class="text-5xl md:text-7xl font-heading font-bold text-white uppercase mb-8 leading-none">
          Hungry Yet?
        </h2>
        <p class="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Order now for pickup or delivery and get your spicy fix.
        </p>
        <BaseButton to="/order" variant="primary" size="lg">Start Your Order</BaseButton>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

const featuredDishes = ref([
  {
    id: 1,
    name: 'Chicken Fried Rice',
    description: 'Classic Sri Lankan style fried rice with chicken and vegetables.',
    price: 450,
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: 'Nasi Goreng',
    description: 'Indonesian-style fried rice with special spicy sauce.',
    price: 500,
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    name: 'Kottu Roti',
    description: 'Chopped roti stir-fried with vegetables and your choice of meat.',
    price: 550,
    image: 'https://images.unsplash.com/photo-1585937421612-70e008356f80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
])

function addToCart(dish) {
  cartStore.addToCart(dish)
}
</script>
