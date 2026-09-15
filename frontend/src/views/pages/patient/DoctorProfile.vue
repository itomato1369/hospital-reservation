<script setup lang="ts">
/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
import { ref, onMounted } from "vue";
import DoctorProfileCard from "@/components/doctor/DoctorProfileCard.vue";
import { getDoctors } from "@/services/patient/usePatientApi";
import type { DoctorInfo } from "@/types/doctor";

const doctors = ref<DoctorInfo[]>([]);

onMounted(async () => {
    doctors.value = await getDoctors();
});
</script>

<template>
        <DoctorProfileCard
            v-for="doctor in doctors"
            :key="doctor.doctor_id"
            :doctor="doctor"
        />
</template>

