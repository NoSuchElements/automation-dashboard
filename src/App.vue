<template>
  <div id="app">
    <div class="dashboard-layout">
      <!-- Sidebar -->
      <Sidebar />

      <!-- Main Content -->
      <main class="main-content">
        <Transition name="fade" mode="out-in">
          <router-view />
        </Transition>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import { useAutomationStore } from '@/stores/automation'

const automationStore = useAutomationStore()

onMounted(async () => {
  await automationStore.loadData()
})
</script>

<style>
/* Global styles are imported via main.ts */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
