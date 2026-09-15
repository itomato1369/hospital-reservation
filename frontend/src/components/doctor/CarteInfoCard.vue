<script setup lang="ts">
import { ref, onMounted } from "vue";
import { selectAssignedPatient } from "@/services/doctor/useDoctor";

import type { Carte } from "@/types/doctor";

const carteInfo = ref<Carte[]>([]);

const refreshqCareteInfo = async () => {
    carteInfo.value = await selectAssignedPatient();
};

onMounted(async () => {
    refreshqCareteInfo();
});
</script>
<template>
    <div class="info-page">
        <section class="profile-card">
            <div class="page-header">
                <div>
                    <h2 class="page-title">
                        担当患者
                    </h2>
                </div>
            </div>
            <div v-if="carteInfo.length === 0" class="alert-box">
                担当患者の情報がありません
            </div>
            <div v-else class="table-responsive">
                <table class="reservation-table">
                    <thead>
                        <tr>
                            <th>氏名</th>
                            <th>フリガナ</th>
                            <th>直近の来院日</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="res in carteInfo" :key="res.patient_id">
                            <td>{{ res.patient_name }}</td>
                            <td>{{ res.name_kana }}</td>
                            <td>{{ res.recently }}</td>
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