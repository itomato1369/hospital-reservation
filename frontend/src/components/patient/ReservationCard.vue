<script setup lang="ts">
/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { showModal } from "@/services/useModal.ts";
import { form, resetForm } from "@/services/reservation/useReservationForm";
import { createPayload } from "@/services/reservation/useReservationPayload.ts";
import { loadFamilyMembers, loadDepartment, loadDoctor, loadAvailableTimeSlot, formatDate, submit } from "@/services/reservation/useReservation";

import VisitTypeCard from "./VisitTypeCard.vue";
import TimeSlotModal from "./TimeSlotModal.vue";
import ClinicIcon from "@/assets/images/hospital_icon.png";
import ReservationCalendar from "./ReservationCalendar.vue";
import DepartmentCard from "@/components/patient/DepartmentCard.vue";
import DoctorProfileCard from "@/components/doctor/DoctorProfileCard.vue";

import type { Department, FamilyMember, AvailableTimeSlot } from "@/types/reservation";
import type { DoctorInfo } from "@/types/doctor";
// 患者のIDを取得
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
// 患者の家族データをAPIから取得
const familyMembers = ref<FamilyMember[]>([]);
// 診療科のデータAPIから取得
const departments = ref<Department[]>([]);
// 医師のデータをAPIから取得
const doctors = ref<DoctorInfo[]>([]);
// 予約可能時間帯を取得
const timeSlots = ref<AvailableTimeSlot[]>([]);

const isModalVisible = ref(false);
const selectedDate = ref("");
const selectedTime = ref("");

const handleDateSelect = async (date: string) => {
    selectedDate.value = date;
    form.reservation_date = date;

    timeSlots.value = await loadAvailableTimeSlot(
        form.doctor_id!,
        date
    );

    isModalVisible.value = true;
};
const selectTimeSlot = (slot: AvailableTimeSlot) => {
    if (!slot.available){
        return;
    }
    
    selectedTime.value = slot.start_time;

    form.start_time = slot.start_time;

    form.end_time = slot.end_time;

    isModalVisible.value = false;
};
// ==========
// 予約登録
// ==========
const handleReserve = async () => {

    const selectedFamily = familyMembers.value.find(
        family => family.family_id === form.family_id
    );

    const selectedDepartment = departments.value.find(
        department => department.department_id === form.department_id
    );

    const selectedDoctor = doctors.value.find(
        doctor => doctor.doctor_id === form.doctor_id
    );

    showModal(
        "予約確認",
                    `予約対象者：${selectedFamily?.name ?? "本人"}

                    診療科：${selectedDepartment?.name ?? ""}

                    担当医：${selectedDoctor?.doctor_name ?? ""}

                    受診区分：${form.visitType === "first" ? "初診" : "再診"}

                    予約日：${formatDate(selectedDate.value)}

                    予約時間：${selectedTime.value.slice(0, 5)}

                    上記内容で予約しますか？`,

        async () => {
            await submit();

            router.push("/patient/reservation/cancel")
        },
        true,
        "予約する"
    );
};
// 診療科が変更されたら、担当医を自動で絞り込む
watch(
    () => form.department_id,

    async (newDeptId) => {
        form.doctor_id = null; //診療科が変わったら担当医選択をリセット
        form.visitType = ""; //診療科が変わったら初診・再診リセット
        doctors.value = [];

        if (newDeptId) {
            const data = await loadDoctor(newDeptId);
            doctors.value = data ?? [];    
        }
    }
);

onMounted(async () => {
    // 予約画面に残っている項目もリセット
    resetForm();

    const queryPatientId = route.query.patientId;

    // ログイン患者のpatientIdを利用
    // 病院側での電話対応での予約の時にも
    const patientId = queryPatientId
                        ? Number(queryPatientId)
                        : authStore.user?.patientId;
    //console.log(patientId);
    if (!patientId) {
        console.error("ログイン患者のIDが見つかりません");
        return;
    }

    form.patient_id = patientId;
    
    // 電話対応で予約を行ったスタッフ
    
    const staffId = authStore.user?.staffId;

    if (staffId) {
        form.staff_id = staffId;
    }

    const familyData = await loadFamilyMembers(patientId);
    //console.log("家族一覧", data);
    familyMembers.value = [
        {
            family_id: -1,
            name: "本人"
        },
        ...(familyData ?? [])
    ];
    // 診療科一覧の取得
    departments.value = await loadDepartment() ?? [];
    console.log(createPayload());
    // console.log("Dropdownデータ", familyMembers.value);
});
</script>
<template>
    <!-- {{ handleDateSelect }} -->
    <!-- {{ form }} -->
    <div class="reservation-page">
        <div class="reservation-container">
            <div class="reservation-card">
                <!-- ヘッダー -->
                 <div class="reservation-header">
                    <img :src="ClinicIcon" alt="さくら総合クリニックアイコン" class="clinic-icon"/>
                    <h1 class="reservation-title">
                        さくら総合クリニック
                    </h1>
                    <h2 class="reservation-subtitle">
                        診療予約
                    </h2>
                    <p class="reservation-description">
                        ご希望の診療科・担当医・日時を選択して予約してください
                    </p>
                 </div>
                 <!-- 予約対象者 -->
                  <div class="row mb-4 align-items-center">
                    <label class="col-md-2 col-form-label">
                        予約対象者 *
                    </label>
                    <div class="col-md-4">
                        <!-- Dropdown -->
                         <Dropdown v-model="form.family_id"
                                   :options="familyMembers"
                                   optionLabel="name"
                                   optionValue="family_id"
                                   placeholder="予約対象者を選択"
                                   class="w-100" />
                    </div>
                  </div>
                <!-- 診療科 -->
                  <div class="row mb-4">
                    <label class="col-md-2 col-form-label">
                        診療科選択 *
                    </label>
                    <div class="col-md-10">
                        <!-- <DoctorProfileCard v-for="doctor in doctors"/> -->
                         <DepartmentCard :departments="departments"
                                         v-model="form.department_id" />
                    </div>
                  </div>
                <!-- 担当医を選択 -->
                  <div class="row mb-4">
                    <label class="-col-md-2 col-form-label">
                        担当医を選択 *
                    </label>
                    <div class="col-md-10">
                        <DoctorProfileCard v-for="doctor in doctors"
                                            :key="doctor.doctor_id"
                                            :doctor="doctor"
                                            :selected="form.doctor_id === doctor.doctor_id"
                                            @click="form.doctor_id = doctor.doctor_id"/>
                    </div>
                  </div>
                <!-- 初診・再診 -->
                  <div v-if="form.doctor_id" class="row mb-4">
                    <label class="col-md-2 col-form-label">
                        受診区分 *
                    </label>
                    <div class="col-md-10">
                        <!-- visitType.vue -->
                         <VisitTypeCard v-model="form.visitType" />
                    </div>
                  </div>

                <!-- 日付 -->
                  <div v-if="form.visitType" class="row mb-4 align-items-center">
                    <label class="section-title">
                        ご希望の日付を選択 *
                    </label>
                    <div class="col-md-10">
                         <ReservationCalendar v-model="form.reservation_date"
                                              :doctor-id="form.doctor_id"
                                              @select="handleDateSelect"/>
                        <!-- 時間帯選択モーダル -->
                         <TimeSlotModal :visible="isModalVisible"
                                        :reservation-date="selectedDate"
                                        :time-slots="timeSlots"
                                        :selected-time="selectedTime"
                                        @update:visible="isModalVisible = $event"
                                        @select="selectTimeSlot" />
                    </div>
                  </div>
                  
                  <div v-if="selectedDate && selectedTime"
                       class="reservation-summary">
                      <h5>日付・時間帯を確認 *</h5>
                      <p>予約日: {{ formatDate(selectedDate) }}</p>
                      <p>時間: {{ selectedTime.slice(0, 5) }}</p>
                  </div>
                    <!-- 上記の内容を確認してください -->
                    <!-- 予約を確認するボタン -->
                     <div v-if="selectedDate && selectedTime" 
                          class="button-group">
                        <Button
                                label="予約"
                                icon="pi pi-check"
                                @click="handleReserve" />
                     </div>
            </div>
        </div>
    </div>

</template>
<style scoped>
@import "@/assets/styles/reservation.css";
</style>