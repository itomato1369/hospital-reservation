<script setup lang="ts">
/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
import router from "@/routers";
import { genderLabel } from "@/services/patient/usePatient"
import { formatJapaneseDate, formatWarekiDate } from "@/services/signup/useCalendar";

import type { PatientInfo } from '@/types/patient';

defineProps<{
    patientInfo: PatientInfo | null;
}>();
</script>
<template>
    <!-- {{ patientInfo }} -->
    <div class="info-page">
        <section class="profile-card">
            <div class="page-header">
                <div>
                    <h2 class="page-title">
                        マイページ
                    </h2>
                    <p class="page-subtitle">
                        登録した情報を確認できます
                    </p>
                </div>
                <Button label="情報更新"
                        icon="pi pi-user-edit"
                        class="edit-btn"
                        @click="router.push('/patient/info')" />
            </div>
            <div class="info-grid">
                <div class="info-item">
                    <span class="label">氏名</span>
                    <span>{{ patientInfo?.name }}</span>
                </div>

                <div class="info-item">
                    <span class="label">フリガナ</span>
                    <span>{{ patientInfo?.name_kana }}</span>
                </div>

                <div class="info-item">
                    <span class="label">性別</span>
                    <span>{{ genderLabel(patientInfo?.gender) }}</span>
                </div>

                <div class="info-item">
                    <span class="label">生年月日</span>
                    <div class="birth-date-info">
                        <span>{{ formatJapaneseDate(patientInfo?.birth_date) }}</span>
                        <small class="wareki-text">{{ formatWarekiDate(patientInfo?.birth_date) }}</small>
                    </div>
                </div>

                <div class="info-item">
                    <span class="label">電話番号</span>
                    <span>{{ patientInfo?.phone }}</span>
                </div>

                <div class="info-item">
                    <span class="label">メールアドレス</span>
                    <span>{{ patientInfo?.email }}</span>
                </div>

                <div class="info-item">
                    <span class="label">郵便番号</span>
                    <span>{{ patientInfo?.postal_code }}</span>
                </div>

                <div class="info-item">
                    <span class="label">建物名</span>
                    <span>{{ patientInfo?.building }}</span>
                </div>

                <div class="info-item">
                    <span class="label">保険者番号</span>
                    <span>{{ patientInfo?.insurer_number }}</span>
                </div>

                <div class="info-item">
                    <span class="label">記号</span>
                    <span>{{ patientInfo?.insurer_symbol }}</span>
                </div>

                <div class="info-item">
                    <span class="label">番号</span>
                    <span>{{ patientInfo?.insurer_number2 }}</span>
                </div>

                <div class="info-item">
                    <span class="label">枝番</span>
                    <span>{{ patientInfo?.insurer_branch }}</span>
                </div>
            </div>
        </section>
    </div>
</template>
<style scoped>
@import "@/assets/styles/patient/myinfo.css";
</style>