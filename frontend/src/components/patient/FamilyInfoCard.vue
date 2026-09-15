<script setup lang="ts">
import { ref, onMounted } from "vue";
import { selectFamily, findGender, findRelationship } from "@/services/patient/usePatient";
import { useAuthStore } from "@/stores/authStore";

import type { Family } from "@/types/patient";

const patientInfo = useAuthStore();
const patientId = patientInfo.patientId;

const familyInfo = ref<Family[]>([]);

const refreshFamilyInfo = async () => {
    if (patientId === null) {
        return;
    }
    familyInfo.value = await selectFamily(patientId);
};

onMounted(async () => {
    await refreshFamilyInfo();
});
</script>
<template>
    <div class="info-page">
        <section class="profile-card">
            <div class="page-header">
                <h2 class="page-title">
                    総{{ familyInfo.length }}名
                </h2>
            </div>
            <div v-if="familyInfo.length === 0" class="alert-box">
                登録した家族情報がありません
            </div>
            <div v-else class="table-responsive">
                <table class="reservation-table">
                    <thead>
                        <tr>
                            <th>氏名</th>
                            <th>フリガナ</th>
                            <th>性別</th>
                            <th>生年月日</th>
                            <th>関係</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="res in familyInfo" :key="res.patient_id">
                            <td>{{ res.patient_name }}</td>
                            <td>{{ res.name_kana }}</td>
                            <td>{{ findGender(res.gender) }}</td>
                            <td>{{ res.birth_date }}</td>
                            <td>{{ findRelationship(res.relationship) }}</td>
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