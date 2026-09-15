<script setup lang="ts">
/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { getPatientInfo } from "@/services/patient/usePatient";
import { setPatientForm } from "@/services/patient/usePatientForm";
import SignUpForm from "@/components/auths/SignUpForm.vue";

const authStore = useAuthStore();

onMounted(async () => {
    const patient = 
        await getPatientInfo(authStore.user!.loginId);

    if (patient) {
        setPatientForm(patient);
    }    
});
</script>
<template>
   <SignUpForm mode="edit" />
</template>