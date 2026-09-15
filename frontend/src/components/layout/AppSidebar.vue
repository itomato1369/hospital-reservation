<script setup lang="ts">
/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
import { useAuthStore } from "@/stores/authStore";
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const authStore = useAuthStore();

const role = computed(() => {
    if (authStore.user?.userType === "patient") {
        return "patient";
    }
    return authStore.user?.role;
});

// サイドバーのメニュー
const menuItems = computed(() => {

    switch (role.value) {

        case "patient":
            return [
                { label: "情報", route: "/patient", icon: "pi-user" },
                { label: "予約", route: "/patient/reservation", icon: "pi-calendar" },
                { label: "担当医", route: "/patient/doctor", icon: "pi-info-circle"},
                { label: "待ち時間", route: "/patient/wait", icon: "pi-clock" },
                { label: "家族", route: "/patient/family", icon: "pi-users" },
                { label: "来院履歴", route: "/patient/history", icon: "pi-history" }
            ];

        case "doctor":
            return [
                { label: "スケジュール", route: "/doctor", icon: "pi-calendar" },
                 { label: "休診日", route: "/doctor/holiday", icon: "pi-calendar" },
                { label: "担当患者", route: "/doctor/incharge", icon: "pi-user-edit" }
            ];

        case "nurse":
            return [
                { label: "当日予約", route: "/nurse", icon: "pi-calendar-plus" },
                { label: "来院", route: "/nurse/visit", icon: "pi-check-circle" },
                { label: "待ち時間を入力", route: "/nurse/wait", icon: "pi-clock" },
                { label: "病院履歴", route: "/nurse/history", icon: "pi-history" }
            ];

        case "reception":
            return [
                { label: "当日予約", route: "/nurse", icon: "pi-calendar-plus" },
                { label: "来院", route: "/nurse/visit", icon: "pi-check-circle" },
                { label: "待ち時間を入力", route: "/nurse/wait", icon: "pi-clock" },
                { label: "病院履歴", route: "/nurse/history", icon: "pi-history" }
            ];    

        default:
            return [];
    }

});
</script>
<template>
    <aside class="sidebar">
        <h4 class="menu-title">
            メニュー
        </h4>

        <div v-for="item in menuItems"
             :key="item.route"
             class="menu-item"
             :class="{ active: route.path === item.route }"
             @click="router.push(item.route)">
             <i :class="['pi', item.icon]"></i>
             <span class="menu-label">
                 {{ item.label }}
             </span>
        </div>
    </aside>
</template>
<style scoped>
@import "@/assets/styles/sidebar.css";
</style>

