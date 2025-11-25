<template>
  <div class="reviews-page bg-dark min-h-screen pt-32 pb-24">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h1 class="text-6xl md:text-8xl font-heading font-bold text-white uppercase mb-4 tracking-tighter">Reviews</h1>
        <div class="w-24 h-2 bg-primary mx-auto"></div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Reviews List -->
        <div class="lg:col-span-2 space-y-8">
          <div v-for="review in reviews" :key="review.id" class="bg-secondary p-8 border-l-4 border-primary">
            <div class="flex items-center gap-4 mb-6">
              <img :src="review.avatar" :alt="review.name" class="w-12 h-12 rounded-full object-cover grayscale" />
              <div>
                <h3 class="text-xl font-heading font-bold text-white uppercase tracking-wide">{{ review.name }}</h3>
                <div class="flex text-primary text-lg">
                  <span v-for="i in 5" :key="i">{{ i <= review.rating ? '★' : '☆' }}</span>
                </div>
              </div>
            </div>
            <p class="text-gray-400 font-light leading-relaxed italic">"{{ review.comment }}"</p>
            <div class="mt-4 text-xs font-bold uppercase tracking-widest text-gray-600">
              {{ review.date }}
            </div>
          </div>
        </div>

        <!-- Add Review Form -->
        <div class="lg:col-span-1">
          <div class="bg-secondary p-8 sticky top-32">
            <h3 class="text-2xl font-heading font-bold text-white uppercase mb-8">Write a Review</h3>
            <form @submit.prevent="submitReview" class="space-y-6">
              <div>
                <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Name</label>
                <input 
                  v-model="form.name" 
                  type="text" 
                  required 
                  class="w-full bg-dark border-b-2 border-white/20 px-0 py-3 text-white focus:outline-none focus:border-primary transition-colors placeholder-transparent" 
                />
              </div>
              
              <div>
                <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Rating</label>
                <div class="flex space-x-2">
                  <button 
                    v-for="star in 5" 
                    :key="star" 
                    type="button"
                    @click="form.rating = star"
                    class="text-2xl focus:outline-none transition-colors"
                    :class="star <= form.rating ? 'text-primary' : 'text-gray-700 hover:text-white'"
                  >
                    ★
                  </button>
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Review</label>
                <textarea 
                  v-model="form.comment" 
                  required 
                  rows="4" 
                  class="w-full bg-dark border-b-2 border-white/20 px-0 py-3 text-white focus:outline-none focus:border-primary transition-colors placeholder-transparent resize-none" 
                ></textarea>
              </div>

              <BaseButton type="submit" class="w-full justify-center" :disabled="isSubmitting" variant="primary">
                {{ isSubmitting ? 'Submitting...' : 'Submit Review' }}
              </BaseButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import reviewsData from '@/data/reviews.json'

const reviews = ref([...reviewsData])
const isSubmitting = ref(false)

const form = reactive({
  name: '',
  rating: 5,
  comment: ''
})

async function submitReview() {
  isSubmitting.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const newReview = {
    id: Date.now(),
    name: form.name,
    rating: form.rating,
    date: new Date().toISOString().split('T')[0],
    comment: form.comment,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name)}&background=D32F2F&color=fff`
  }
  
  reviews.value.unshift(newReview)
  form.name = ''
  form.rating = 5
  form.comment = ''
  isSubmitting.value = false
}
</script>
