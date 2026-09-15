<script setup lang="ts">
/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { getDoctorSchedule } from "@/services/patient/usePatientApi";
import { weekDayLabel, formatTime, goBack } from "@/services/patient/usePatient";
import type { DoctorInfo } from "@/types/doctor";
const route = useRoute();

const schedules = ref<DoctorInfo[]>([]);
const doctorName = computed(() => {
    return schedules.value[0]?.doctor_name ?? "";
});

onMounted(async () => {

    schedules.value =
        await getDoctorSchedule(
            Number(route.params.doctorId)
        );

});
</script>
<template>
    <div class="schedule-page">
        <div class="schedule-header">
            <div>
                <h1 class="doctor-title">
                    {{ doctorName }}  担当医
                </h1>
                <p class="doctor-subtitle">
                    診療スケジュール
                </p>
            </div>
            <Button
                label="戻る"
                icon="pi pi-arrow-left"
                class="back-btn"
                outlined
                @click="goBack"
            />
        </div>
        <div
            v-for="schedule in schedules"
            :key="schedule.day_of_week"
            class="schedule-card"
        >

            <div class="weekday">
                {{ weekDayLabel(schedule.day_of_week) }}
            </div>

            <div v-if="schedule.is_closed">
                休診
            </div>

            <div v-else>
                {{ formatTime(schedule.start_time) }}
                 ~
                {{ formatTime(schedule.end_time) }}
            </div>
        </div>
    </div>
</template>
<style scoped>
@import "@/assets/styles/patient/schedule.css";
</style>