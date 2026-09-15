<script setup lang="ts">
/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { getPatientInfo } from "@/services/patient/usePatient";
import PatientInfoCard from "@/components/patient/PatientInfoCard.vue";
import type { PatientInfo } from "@/types/patient";

const authStore = useAuthStore();

const patientInfo = ref<PatientInfo | null>(null);

onMounted(async() => {
    patientInfo.value = 
        await getPatientInfo(authStore.user!.loginId);
});
</script>


<template>
    <PatientInfoCard :patient-info="patientInfo"/>
    <!-- {{ patientInfo }} -->

</template>
