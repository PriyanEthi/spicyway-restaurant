<template>
  <Transition name="toast">
    <div v-if="show" class="fixed bottom-4 right-4 z-50 flex items-center gap-3 px-6 py-4 bg-white border-l-4 shadow-2xl rounded-r-lg min-w-[300px]" :class="typeClasses">
      <div class="flex-shrink-0">
        <svg v-if="type === 'success'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <svg v-else-if="type === 'error'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <div class="flex-1">
        <p class="font-heading font-bold uppercase tracking-wider text-sm text-gray-800">{{ title }}</p>
        <p class="text-sm text-gray-600">{{ message }}</p>
      </div>
      <button @click="close" class="text-gray-400 hover:text-gray-600 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </Transition>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  show: Boolean,
  title: {
    type: String,
    default: 'Success'
  },
  message: String,
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'error', 'info'].includes(value)
  },
  duration: {
    type: Number,
    default: 3000
  }
})

const emit = defineEmits(['close'])

const typeClasses = computed(() => {
  switch (props.type) {
    case 'success':
      return 'border-green-500'
    case 'error':
      return 'border-red-500'
    default:
      return 'border-blue-500'
  }
})

let timer

onMounted(() => {
  if (props.show && props.duration > 0) {
    startTimer()
  }
})

function startTimer() {
  timer = setTimeout(() => {
    close()
  }, props.duration)
}

function close() {
  emit('close')
}

onUnmounted(() => {
  clearTimeout(timer)
})
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
