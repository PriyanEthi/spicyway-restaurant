<template>
  <div class="contact-page bg-dark min-h-screen pt-32 pb-24">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h1 class="text-6xl md:text-8xl font-heading font-bold text-white uppercase mb-4 tracking-tighter">Contact</h1>
        <div class="w-24 h-2 bg-primary mx-auto"></div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Info -->
        <div class="space-y-12">
          <div class="bg-secondary p-12">
            <h3 class="text-2xl font-heading font-bold text-white uppercase mb-8">Visit Us</h3>
            <div class="space-y-6 text-gray-400">
              <p class="text-lg">45 Main Street<br>Trincomalee, Sri Lanka</p>
              <p class="text-lg"><a href="tel:+94261234567" class="hover:text-white transition-colors">+94 26 123 4567</a></p>
              <p class="text-lg"><a href="mailto:info@spicyway.lk" class="hover:text-white transition-colors">info@spicyway.lk</a></p>
            </div>
          </div>

          <div class="bg-secondary p-12">
            <h3 class="text-2xl font-heading font-bold text-white uppercase mb-8">Hours</h3>
            <div class="space-y-4 text-gray-400">
              <div class="flex justify-between border-b border-white/10 pb-2">
                <span>Mon - Thu</span>
                <span class="text-white font-bold">11:00 AM - 10:00 PM</span>
              </div>
              <div class="flex justify-between border-b border-white/10 pb-2">
                <span>Fri - Sat</span>
                <span class="text-white font-bold">11:00 AM - 11:00 PM</span>
              </div>
              <div class="flex justify-between border-b border-white/10 pb-2">
                <span>Sunday</span>
                <span class="text-white font-bold">12:00 PM - 10:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Form -->
        <div class="bg-secondary p-12">
          <h3 class="text-2xl font-heading font-bold text-white uppercase mb-8">Get in Touch</h3>
          <form @submit.prevent="submitForm" class="space-y-8">
            <div>
              <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Name</label>
              <input 
                v-model="form.name" 
                type="text" 
                required 
                class="w-full bg-secondary border-b-2 border-white/20 px-0 py-3 text-white focus:outline-none focus:border-primary transition-colors placeholder-transparent" 
              />
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email</label>
              <input 
                v-model="form.email" 
                type="email" 
                required 
                class="w-full bg-secondary border-b-2 border-white/20 px-0 py-3 text-white focus:outline-none focus:border-primary transition-colors placeholder-transparent" 
              />
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Message</label>
              <textarea 
                v-model="form.message" 
                required 
                rows="4" 
                class="w-full bg-secondary border-b-2 border-white/20 px-0 py-3 text-white focus:outline-none focus:border-primary transition-colors placeholder-transparent resize-none" 
              ></textarea>
            </div>

            <BaseButton type="submit" class="w-full justify-center" :disabled="isSubmitting" variant="primary">
              {{ isSubmitting ? 'Sending...' : 'Send Message' }}
            </BaseButton>
          </form>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <Modal :isOpen="showSuccessModal" @close="showSuccessModal = false">
      <template #title>Message Sent</template>
      <div class="text-center py-8">
        <h3 class="text-2xl font-heading font-bold text-white uppercase mb-4">Thanks, {{ form.name }}!</h3>
        <p class="text-gray-400">We'll get back to you shortly.</p>
      </div>
      <template #footer>
        <BaseButton @click="showSuccessModal = false" class="w-full justify-center" variant="primary">Close</BaseButton>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import Modal from '@/components/ui/Modal.vue'

const isSubmitting = ref(false)
const showSuccessModal = ref(false)

const form = reactive({
  name: '',
  email: '',
  message: ''
})

async function submitForm() {
  isSubmitting.value = true
  await new Promise(resolve => setTimeout(resolve, 1500))
  isSubmitting.value = false
  showSuccessModal.value = true
  form.name = ''
  form.email = ''
  form.message = ''
}
</script>
