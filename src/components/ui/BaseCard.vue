<template>
  <div class="group relative bg-secondary overflow-hidden transition-all duration-300 hover:shadow-sharp">
    <!-- Image Section -->
    <div v-if="$slots.image" class="relative aspect-w-16 aspect-h-12 overflow-hidden">
      <slot name="image"></slot>
      <!-- Overlay Action -->
      <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <slot name="overlay"></slot>
      </div>
    </div>

    <!-- Content Section -->
    <div class="p-6">
      <div v-if="$slots.header" class="mb-2">
        <slot name="header"></slot>
      </div>
      
      <div class="text-gray-400 text-sm leading-relaxed mb-4">
        <slot></slot>
      </div>
      
      <div v-if="$slots.footer" class="pt-4 border-t border-white/10 flex items-center justify-between">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>
