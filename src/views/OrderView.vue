<template>
  <div class="order-page bg-dark min-h-screen pt-32 pb-24">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h1 class="text-6xl md:text-8xl font-heading font-bold text-white uppercase mb-4 tracking-tighter">Checkout</h1>
        <div class="w-24 h-2 bg-primary mx-auto"></div>
      </div>

      <div v-if="cartStore.items.length === 0" class="text-center py-24 max-w-2xl mx-auto border-2 border-white/10">
        <h2 class="text-3xl font-heading font-bold text-white uppercase mb-4">Cart Empty</h2>
        <p class="text-gray-400 mb-8">Add some items to get started.</p>
        <BaseButton to="/menu" variant="primary" size="lg">View Menu</BaseButton>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Cart Items -->
        <div class="lg:col-span-2 space-y-0 border-t border-white/10">
          <div v-for="item in cartStore.items" :key="item.id" class="flex items-center gap-6 py-6 border-b border-white/10">
            <img :src="item.image" :alt="item.name" class="w-24 h-24 object-cover" />
            
            <div class="flex-grow">
              <div class="flex justify-between items-start mb-2">
                <h3 class="text-xl font-heading font-bold text-white uppercase tracking-wide">{{ item.name }}</h3>
                <span class="font-heading font-bold text-lg text-primary">Rs. {{ (item.price * item.quantity).toFixed(2) }}</span>
              </div>
              
              <div class="flex items-center justify-between mt-4">
                <div class="flex items-center border border-white/20">
                  <button @click="cartStore.updateQuantity(item.id, item.quantity - 1)" class="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 transition-colors">-</button>
                  <span class="w-8 text-center text-white font-bold font-heading">{{ item.quantity }}</span>
                  <button @click="cartStore.updateQuantity(item.id, item.quantity + 1)" class="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 transition-colors">+</button>
                </div>
                <button @click="cartStore.removeFromCart(item.id)" class="text-sm text-gray-400 hover:text-primary uppercase tracking-widest font-bold transition-colors">
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary & Form -->
        <div class="lg:col-span-1">
          <div class="bg-secondary p-8 sticky top-32">
            <h3 class="text-2xl font-heading font-bold text-white uppercase mb-8">Summary</h3>
            
            <div class="space-y-4 mb-8 border-b border-white/10 pb-8">
              <div class="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>Rs. {{ cartStore.totalPrice.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-gray-400">
                <span>Tax (8%)</span>
                <span>Rs. {{ (cartStore.totalPrice * 0.08).toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-gray-400">
                <span>Delivery</span>
                <span>$5.00</span>
              </div>
            </div>
            
            <div class="flex justify-between text-3xl font-heading font-bold text-white mb-8">
              <span>Total</span>
              <span class="text-primary">Rs. {{ (cartStore.totalPrice * 1.08 + 5).toFixed(2) }}</span>
            </div>

            <form @submit.prevent="submitOrder" class="space-y-6">
              <div>
                <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                <input 
                  v-model="form.name" 
                  type="text" 
                  required 
                  class="w-full bg-dark border-b-2 border-white/20 px-0 py-3 text-white focus:outline-none focus:border-primary transition-colors placeholder-transparent" 
                />
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email</label>
                <input 
                  v-model="form.email" 
                  type="email" 
                  required 
                  class="w-full bg-dark border-b-2 border-white/20 px-0 py-3 text-white focus:outline-none focus:border-primary transition-colors placeholder-transparent" 
                />
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Address</label>
                <textarea 
                  v-model="form.address" 
                  required 
                  rows="2" 
                  class="w-full bg-dark border-b-2 border-white/20 px-0 py-3 text-white focus:outline-none focus:border-primary transition-colors placeholder-transparent resize-none" 
                ></textarea>
              </div>
              
              <BaseButton type="submit" class="w-full justify-center" :disabled="isSubmitting" variant="primary" size="lg">
                {{ isSubmitting ? 'Processing...' : 'Place Order' }}
              </BaseButton>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <Modal :isOpen="showSuccessModal" @close="closeModal">
      <template #title>Order Confirmed</template>
      <div class="text-center py-8">
        <h3 class="text-3xl font-heading font-bold text-white uppercase mb-4">Thanks, {{ form.name }}!</h3>
        <p class="text-gray-400 mb-8">Your order has been received and is being prepared.</p>
        <div class="border-2 border-primary p-4 inline-block">
          <p class="text-xs text-gray-500 uppercase tracking-widest mb-1">Order #</p>
          <p class="text-white font-heading font-bold text-2xl">{{ Math.floor(Math.random() * 100000) }}</p>
        </div>
      </div>
      <template #footer>
        <BaseButton @click="closeModal" class="w-full justify-center" variant="primary">Back to Menu</BaseButton>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import Modal from '@/components/ui/Modal.vue'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const cartStore = useCartStore()

const isSubmitting = ref(false)
const showSuccessModal = ref(false)

const form = reactive({
  name: '',
  email: '',
  address: ''
})

async function submitOrder() {
  isSubmitting.value = true
  await new Promise(resolve => setTimeout(resolve, 1500))
  isSubmitting.value = false
  showSuccessModal.value = true
}

function closeModal() {
  showSuccessModal.value = false
  cartStore.clearCart()
  router.push('/menu')
}
</script>
