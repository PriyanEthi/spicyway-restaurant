<template>
  <div class="gallery-page bg-dark min-h-screen pt-32 pb-24">
    <div class="container mx-auto px-6 mb-16 text-center">
      <h1 class="text-6xl md:text-8xl font-heading font-bold text-white uppercase mb-4 tracking-tighter">Gallery</h1>
      <div class="w-24 h-2 bg-primary mx-auto"></div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
      <div 
        v-for="(image, index) in images" 
        :key="index" 
        class="relative group cursor-pointer aspect-w-1 aspect-h-1 overflow-hidden"
        @click="openLightbox(index)"
      >
        <img 
          :src="image.url" 
          :alt="image.alt" 
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div class="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span class="text-white font-heading font-bold uppercase tracking-widest text-xl border-2 border-white px-6 py-2">View</span>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="lightboxOpen" class="fixed inset-0 z-[60] bg-black flex items-center justify-center" @click="closeLightbox">
        <button class="absolute top-6 right-6 text-white hover:text-primary transition-colors z-50" @click="closeLightbox">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div class="relative w-full h-full flex items-center justify-center p-4" @click.stop>
          <img 
            :src="images[currentImageIndex].url" 
            :alt="images[currentImageIndex].alt" 
            class="max-w-full max-h-full object-contain" 
          />
          
          <button 
            class="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors"
            @click="prevImage"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            class="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors"
            @click="nextImage"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div class="absolute bottom-8 left-0 right-0 text-center">
            <h3 class="text-xl font-heading font-bold text-white uppercase tracking-widest">{{ images[currentImageIndex].alt }}</h3>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const lightboxOpen = ref(false)
const currentImageIndex = ref(0)

const images = [
  { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', alt: 'Cozy Interior' },
  { url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', alt: 'Signature Dish' },
  { url: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', alt: 'Chef Special' },
  { url: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', alt: 'Spicy Ribs' },
  { url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', alt: 'Cocktail Bar' },
  { url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', alt: 'Outdoor Seating' },
]

function openLightbox(index) {
  currentImageIndex.value = index
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

function nextImage() {
  currentImageIndex.value = (currentImageIndex.value + 1) % images.length
}

function prevImage() {
  currentImageIndex.value = (currentImageIndex.value - 1 + images.length) % images.length
}

function handleKeydown(e) {
  if (!lightboxOpen.value) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowRight') nextImage()
  if (e.key === 'ArrowLeft') prevImage()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>
