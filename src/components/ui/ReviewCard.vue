<template>
  <div class="glass-card p-8 rounded-2xl relative group hover:border-gold/30 transition-colors duration-300">
    <!-- Quote Icon -->
    <div class="absolute top-6 right-6 text-6xl text-white/5 font-serif leading-none group-hover:text-gold/10 transition-colors">"</div>

    <!-- Header -->
    <div class="flex items-center gap-4 mb-6 relative z-10">
      <div class="relative">
        <img :src="review.avatar" :alt="review.name" class="w-14 h-14 rounded-full object-cover border-2 border-white/10 group-hover:border-gold transition-colors duration-300" />
        <div class="absolute -bottom-1 -right-1 bg-secondary rounded-full p-1">
          <span class="text-xs">🌶️</span>
        </div>
      </div>
      <div>
        <h3 class="text-lg font-bold text-white font-serif">{{ review.name }}</h3>
        <div class="flex text-gold text-sm">
          <span v-for="i in 5" :key="i">{{ i <= review.rating ? '★' : '☆' }}</span>
        </div>
      </div>
    </div>

    <!-- Content -->
    <p class="text-gray-300 italic font-light leading-relaxed mb-4 relative z-10">
      {{ review.comment }}
    </p>

    <!-- Date -->
    <div class="text-xs text-gray-500 font-medium uppercase tracking-widest">
      {{ formatDate(review.date) }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  review: {
    type: Object,
    required: true
  }
})

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}
</script>
