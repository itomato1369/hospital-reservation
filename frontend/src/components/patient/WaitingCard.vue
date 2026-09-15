<script setup lang="ts">
/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
import { ref, onMounted } from "vue";
import { selectWaitTime } from "@/services/patient/usePatient";
import { useAuthStore } from "@/stores/authStore";
import type { WaitTime } from "@/types/patient";

const waitTime = ref<WaitTime[]>([]);
const authStore = useAuthStore();

const formatDate = (date: string) => {
  return date.slice(0, 10).replace(/-/g, "/");
};

const freshWaitTime = async () => {
  const patientId = Number(authStore.patientId);
  if (!patientId) {
    waitTime.value = [];
    return;
  }

  waitTime.value = (await selectWaitTime(patientId)) ?? [];
};

onMounted(async () => {
  await freshWaitTime();
});
</script>
<template>
  <div class="wait-time-page">
    <section class="wait-card">
      <div class="page-header">
        <div>
          <h2 class="page-title">待ち時間</h2>
          <p class="page-subtitle">現在の待ち時間を確認できます</p>
        </div>
      </div>

      <div v-if="waitTime.length === 0" class="alert-box">
        現在、待ち時間の情報はありません。
      </div>

      <div v-else class="wait-cards">
        <article v-for="item in waitTime" :key="item.reservation_id" class="wait-item-card">
          <div class="wait-card-header">
            <div>
              <p class="card-label">予約日</p>
              <p class="card-value">{{ formatDate(item.reservation_date) }}</p>
            </div>
            <div class="status-badge">受付済み</div>
          </div>

          <div class="wait-card-body">
            <div class="wait-time-box">
              <span class="wait-time-label">現在の待ち時間</span>
              <span class="wait-time-value">
                {{ item.wait_minutes }}<small>分</small>
              </span>
            </div>

            <div class="wait-info-grid">
              <div class="info-row">
                <span class="info-label">患者名</span>
                <span>{{ item.patient_name }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">診療科</span>
                <span>{{ item.department_name }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">担当医</span>
                <span>{{ item.doctor_name }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">診察開始</span>
                <span>{{ item.start_time.slice(0, 5) }}</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>
<style scoped>
@import "@/assets/styles/patient/waitTime.css";
</style>