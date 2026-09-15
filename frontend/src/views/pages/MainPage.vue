<script setup lang="ts">
/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
import router from "@/routers";
import ClinicIcon from "@/assets/images/hospital_icon.png";
</script>

<!-- Bootstrap5 = レイアウト（最小限） -->
<!-- PrimeVue　= 部品 -->
<template>
  <div class="landing-page">

    <main class="landing-container">

      <section class="hero-card">
        <img :src="ClinicIcon" alt="さくら総合クリニックアイコン" class="clinic-icon" />

        <h1 class="hero-title">さくら総合クリニック</h1>
        <p class="hero-subtitle">ご自宅から簡単に診療予約。<br>
        予約確認や患者情報の管理もスムーズにご利用いただけます。
        </p>
        
        <div class="button-group">
          <Button label="新規登録"
                  icon="pi pi-user-plus"
                  outlined
                  class="signup-btn"
                  @click="router.push('/signup')" />

          <Button label="ログイン"
                  icon="pi pi-sign-in"
                  class="login-btn"
                  @click="router.push('/login')" />        
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
@import "../../assets/styles/mainpage.css";
</style>