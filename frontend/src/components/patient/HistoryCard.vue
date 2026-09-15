<script setup lang="ts">
import { ref, onMounted } from "vue";
import { selectHistory } from "@/services/patient/usePatient";
import { useAuthStore } from "@/stores/authStore";
import { visitType } from "@/services/nurse/useNurse";

import type { History } from "@/types/patient";

const patientInfo = useAuthStore();

const patientId = patientInfo.patientId;

const historyForm = ref<History[]>([]);

const refreshHisotry = async () => {
    if (patientId == null) return;
    historyForm.value = await selectHistory(patientId);
};

onMounted(async() => {
    await refreshHisotry();
});

</script>
<template>
    <div class="info-page">
        <section class="profile-card">
            <div class="page-header">
                <div>
                    <h2 class="page-title">
                        来院履歴
                    </h2>
                </div>
            </div>
            <div v-if="historyForm.length === 0" class="alert-box">
                さくら総合クリニックに来院した履歴がありません
            </div>

            <div v-else class="table-responsive">
                <table class="reservation-table">
                    <thead>
                        <tr>
                            <th>日付</th>
                            <th>診療科</th>
                            <th>担当医</th>
                            <th>診察時間</th>
                            <th>区分</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="res in historyForm" :key="res.reservation_id">
                            <td>{{ res.reservation_date }}</td>
                            <td>{{ res.department_name }}</td>
                            <td>{{ res.doctor_name }}</td>
                            <td>{{ res.start_time.slice(0, 5) }}</td>
                            <td>{{ visitType(res.visit_type) }}</td>   
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </div>
</template>
<style scoped>
@import "@/assets/styles/nurse/todayReservation.css";
</style>