<script setup lang="ts">
import AppHeader from "@/components/layout/AppHeader.vue";
import AppSidebar from "@/components/layout/AppSidebar.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
</script>
<template>
    <div class="app-layout">
        <AppHeader />

        <div class="layout-container">
            <AppSidebar />

            <main class="content">
                <RouterView />
            </main>
        </div>

        <AppFooter />
    </div>
</template>
<style scoped>
@import "@/assets/styles/layout.css";
</style>