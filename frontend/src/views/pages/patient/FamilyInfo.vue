<script setup lang="ts">
/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
import router from "@/routers";
import ClinicIcon from "@/assets/images/hospital_icon.png";
</script>

<template>
    <div class="reservation-page-wrapper">
        <main class="container">
            <section class="reservation-card">
                <img :src="ClinicIcon" alt="さくら総合クリニックアイコン" class="clinic-icon" />
                <h2 class="section-subtitle">
                    家族の情報を登録・確認を選択してください
                </h2>
                <div class="button-group">
                    <Button label="登録"
                          icon="pi pi-user-plus"
                          outlined
                          class="signup-btn"
                          @click="router.push('/patient/family/register')" />
            
                    <Button label="確認"
                          icon="pi pi-user-plus"
                          outlined
                          class="signup-btn"
                          @click="router.push('/patient/family/info')" />
                </div>
            </section>
        </main>
    </div>
</template>
<style scoped>
@import "@/assets/styles/mainpage.css";
/* mainpage.css の構造を参考にした中央配置レイアウト */
/* 背景グラデーションと全体の中央配置 */
.reservation-page-wrapper {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(
        135deg,
        #eef9f5 0%,
        #ffffff 60%,
        #f6fbff 100%
    );
    padding: 24px;
}

.container {
    width: 100%;
    display: flex;
    justify-content: center;
}

/* メインカードのレイアウト（mainpage.cssのhero-cardと統一） */
.reservation-card {
    width: 100%;
    max-width: 760px;
    background: white;
    border-radius: 32px;
    padding: clamp(32px, 5vw, 64px) clamp(24px, 4vw, 28px);
    text-align: center;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
}

/* クリニックアイコンのデザイン（mainpage.cssと統一） */
.clinic-icon {
    width: clamp(100px, 15vw, 140px);
    height: clamp(100px, 15vw, 140px);
    object-fit: contain;
    margin-bottom: 24px;
    border-radius: 50%;
    padding: 10px;
    background: white;
    box-shadow: 0 8px 24px rgba(69, 161, 125, 0.15);
}

/* サブタイトルのデザイン（mainpage.cssと統一） */
.section-subtitle {
    color: #61726b;
    line-height: 1.9;
    font-size: clamp(0.95rem, 2vw, 1.05rem);
    margin-bottom: 48px;
}

/* ボタンを綺麗に並べるグループ */
.button-group {
    display: flex;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
}

/* レスポンシブ対応（画面が狭いときはボタンを縦並びに） */
@media (max-width: 576px) {
    .button-group {
        flex-direction: column;
        align-items: center;
    }
    
    :deep(.signup-btn) {
        width: 100%;
        max-width: 280px;
    }
}
</style>