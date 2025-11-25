<template>
  <footer class="bg-secondary pt-20 pb-10 border-t border-white/5">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <!-- Brand -->
        <div class="col-span-1 md:col-span-1">
          <RouterLink to="/" class="flex items-center gap-1 mb-6">
            <img src="@/assets/logo.png" alt="SpicyWay" class="h-16 w-auto object-contain" />
          </RouterLink>
          <p class="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
            Sri Lankan fast food restaurant featuring authentic fried rice, nasi goreng, kottu, and local favorites in Trincomalee.
          </p>
        </div>

        <!-- Links -->
        <div>
          <h3 class="text-white font-heading font-bold uppercase tracking-widest text-sm mb-6">Explore</h3>
          <ul class="space-y-3">
            <li><RouterLink to="/menu" class="text-gray-400 hover:text-white transition-colors text-sm">Menu</RouterLink></li>
            <li><RouterLink to="/about" class="text-gray-400 hover:text-white transition-colors text-sm">Our Story</RouterLink></li>
            <li><RouterLink to="/contact" class="text-gray-400 hover:text-white transition-colors text-sm">Locations & Hours</RouterLink></li>
            <li><RouterLink to="/gallery" class="text-gray-400 hover:text-white transition-colors text-sm">Gallery</RouterLink></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-white font-heading font-bold uppercase tracking-widest text-sm mb-6">Contact</h3>
          <ul class="space-y-3 text-gray-400 text-sm">
            <li>45 Main Street</li>
            <li>Trincomalee, Sri Lanka</li>
            <li class="pt-2"><a href="tel:+94261234567" class="hover:text-white transition-colors">+94 26 123 4567</a></li>
            <li><a href="mailto:info@spicyway.lk" class="hover:text-white transition-colors">info@spicyway.lk</a></li>
          </ul>
        </div>

        <!-- Social -->
        <div>
          <h3 class="text-white font-heading font-bold uppercase tracking-widest text-sm mb-6">Follow Us</h3>
          <div class="flex space-x-4">
            <a href="#" class="w-10 h-10 bg-white/5 flex items-center justify-center text-white hover:bg-primary transition-colors duration-200">
              <span class="sr-only">Instagram</span>
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a href="#" class="w-10 h-10 bg-white/5 flex items-center justify-center text-white hover:bg-primary transition-colors duration-200">
              <span class="sr-only">Facebook</span>
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-gray-600 text-xs uppercase tracking-widest">
          &copy; {{ new Date().getFullYear() }} Spicyway. All rights reserved.
        </p>
        <div class="flex space-x-6">
          <a href="#" class="text-gray-600 hover:text-white text-xs uppercase tracking-widest transition-colors">Privacy</a>
          <a href="#" class="text-gray-600 hover:text-white text-xs uppercase tracking-widest transition-colors">Terms</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
