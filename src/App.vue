<script setup>
import SkeletonLoader from './components/SkeletonLoader/SkeletonLoader';
</script>

<template>
  <div class="container px-4 text-slate-900 dark:text-white bg-white dark:bg-slate-800">
    <h1 class="text-3xl font-bold px-6 py-8">Hello world!</h1>
    <SkeletonLoader type="agenda-card" />
  </div>
</template>
