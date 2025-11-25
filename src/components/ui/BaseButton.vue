<template>
  <component 
    :is="to ? 'router-link' : 'button'"
    :to="to"
    :class="[
      'inline-flex items-center justify-center font-heading font-bold uppercase tracking-widest transition-all duration-200 focus:outline-none',
      variantClasses,
      sizeClasses,
      { 'opacity-50 cursor-not-allowed': disabled }
    ]"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <slot></slot>
  </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline', 'white'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  to: {
    type: String,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-primary text-white hover:bg-primary-dark shadow-sharp border-2 border-transparent'
    case 'secondary':
      return 'bg-secondary text-white hover:bg-gray-900 border-2 border-transparent'
    case 'outline':
      return 'bg-transparent text-white border-2 border-white hover:bg-white hover:text-black'
    case 'white':
      return 'bg-white text-black hover:bg-gray-200 shadow-sharp-white border-2 border-transparent'
    default:
      return 'bg-primary text-white'
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-6 py-2 text-xs'
    case 'md':
      return 'px-8 py-3 text-sm'
    case 'lg':
      return 'px-10 py-4 text-base'
    default:
      return 'px-8 py-3 text-sm'
  }
})
</script>
