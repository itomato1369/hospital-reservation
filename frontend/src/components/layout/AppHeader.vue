<script setup lang="ts">
/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
import { ref, onMounted, onUnmounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { form } from "@/services/login/useLoginForm";
import router from "@/routers";
import ClinicIcon from "@/assets/images/hospital_icon.png";

// 時計用
const currentTime = ref<string>("");
let timerId: number | null = null;

// 現在時刻をフォーマットする
const updateCuurentTime = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    };
    currentTime.value = new Intl.DateTimeFormat("ja-JP", options).format(now);
};

const authStore = useAuthStore();

const logout = () => {
    authStore.logout();
    // ログイン時に入力した値を初期化する
    form.loginId = "";
    form.password = "";
    
    router.push("/login");
};

onMounted(() => {
    updateCuurentTime();
    // 1秒ごとに時刻を更新
    timerId = window.setInterval(updateCuurentTime, 1000);
});
onUnmounted(() => {
    // コンポーネント破棄時にタイマーをクリアしてメモリリークを防ぐ
    if (timerId !== null) {
        clearInterval(timerId);
    }
});
</script>
<template>
    <header class="app-header">
        <div class="header-left">
            <img :src="ClinicIcon" alt="さくら総合クリニックアイコン" class="header-logo"/>
            <h1 class="header-title">さくら総合クリニック</h1>
            <p class="header-subtitle">予約システム</p>
        </div>

        <div class="header-center">
            <div class="header-clock">
                <i class="pi pi-clock"></i>
                <span>{{ currentTime }}</span>
            </div>
        </div>

        <div class="header-right">
            <div class="header-user">
                <i class="pi pi-user"></i>
                <span class="user-name">
                    {{ authStore.userName }}  様
                </span>
            </div>
            <Button label="ログアウト"
                    icon="pi pi-sign-out"
                    class="logout-btn"
                    @click="logout" />
        </div>
        <!-- <pre>{{ authStore.user }}</pre> -->
    </header>
</template>
<style scoped>
@import "@/assets/styles/header.css";
</style>
