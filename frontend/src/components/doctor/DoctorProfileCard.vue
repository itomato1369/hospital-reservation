<script setup lang="ts">
/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
import router from "@/routers";
import { doctorAnimalIcon } from "@/services//patient/usePatient";
import { doctorMessage } from "@/services/doctor/useDoctorForm";

import type { DoctorInfo } from "@/types/doctor";

const getDoctorMessage = (doctorId: number) => {
    return doctorMessage[doctorId] ?? "紹介文はありません";
};

const props = defineProps<{
    doctor: DoctorInfo;
    selected?: boolean;
}>();

const emit = defineEmits<{
    (e: "select"): void;
}>();

const openSchedule = () => {
    router.push(`/patient/doctors/${props.doctor.doctor_id}`);
};
</script>

<template>
    <div class="doctor-card" 
         :class="{ active: selected }"
         @click="emit('select')">
        <div class="doctor-avatar">
            {{ doctorAnimalIcon(doctor.doctor_id)}}
        </div>

        <div class="doctor-content">

            <div class="department-badge">
                <span v-if="doctor.department_name === '内科'">
                    🩺
                </span>

                <span v-else-if="doctor.department_name === '小児科'">
                    🧸
                </span>

                <span v-else-if="doctor.department_name === '整形外科'">
                    🦴
                </span>

                <span v-else-if="doctor.department_name === '皮膚科'">
                    🌿
                </span>

                <span v-else-if="doctor.department_name === '耳鼻咽喉科'">
                    👂
                </span>

                 {{ doctor.doctor_name }} 担当医
            </div>

            <p class="doctor-message">
                {{ getDoctorMessage(doctor.doctor_id) }}
            </p>

            <Button
                label="診療時間"
                icon="pi pi-arrow-right"
                class="detail-btn"
                @click="openSchedule"
            />

        </div>

    </div>
</template>
<style scoped>
@import "@/assets/styles/doctor/profile.css";
</style>
