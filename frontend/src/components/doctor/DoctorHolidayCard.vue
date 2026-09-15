<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import { showModal } from "@/services/useModal";
import { form, errors } from "@/services/doctor/useDoctorForm";
import { createPayload } from "@/services/doctor/useDoctorPayload";
import { showCalendar } from "@/services/signup/useCalendar";
import { insertDoctorHoliday, selectDoctorScheduleSelf } from "@/services/doctor/useDoctor";

import CommonModal from "@/components/commons/CommonModal.vue"; 

const loading = ref(false);
const doctorId = ref<number | null>(null);
const router = useRouter();
// モーダルの状態管理
const modalVisible = ref(false);
const modalTitle = ref("");
const modalMessage = ref("");

const resetForm = () => {
    form.holidayDate = "";
    form.reason = "";
    errors.holidayDate = "";
    errors.reason = "";
};

// 
const validate = () => {
    errors.holidayDate = "";
    errors.reason = "";

    if (!form.holidayDate) {
        errors.holidayDate = "日付を入力してください";
    }
    if (!form.reason.trim()) {
        errors.reason = "理由を入力してください";
    }

    return !errors.holidayDate && !errors.reason;
};

const loadDoctorInfo = async () => {
    try {
        const schedule = await selectDoctorScheduleSelf();
        if (Array.isArray(schedule) && schedule.length > 0) {
            doctorId.value = schedule[0].doctor_id;
            form.doctorId = doctorId.value;
        }
    } catch (error) {
        console.error("医師情報取得エラー", error);
    }
};

const submitHoliday = async () => {
    if (!validate()) {
        return;
    }
    if (!doctorId.value) {
        showModal("エラー", "医師情報が取得できませんでした");
        return;
    }

    try {
        loading.value = true;
        const payload = createPayload();
        await insertDoctorHoliday(payload);

        // 登録成功時のモーダル表示
        modalTitle.value = "登録完了";
        modalMessage.value ="休診日を正常に登録しました";
        modalVisible.value = true;
    } catch (error: any) {
        console.error("休診日登録エラー", error);

        modalTitle.value = "失敗";
        modalMessage.value = error?.message ?? "登録失敗システム科に連絡してください";
        modalVisible.value = true;
    } finally {
        loading.value = false;
    }
};
const handleModalClose = () => {
  modalVisible.value = false;
  if (modalTitle.value === "登録完了") {
    resetForm();
    router.push("/doctor/holiday/info");
  }
};
// 日付選択

onMounted(loadDoctorInfo);
</script>
<template>
  <div class="holiday-page">
    <div class="signup-container">
      <div class="signup-card">
        <div class="signup-header">
          <h1 class="signup-title">休診日登録</h1>
          <p class="signup-description">担当医の休診日を登録してください。</p>
        </div>

        <div class="row mb-3 align-items-center">
          <label class="col-md-2 col-form-label">休診日 *</label>
          <div class="col-md-4">
            <input
              type="date"
              v-model="form.holidayDate"
              class="w-100"
              @click="showCalendar"
            />
            <div v-if="errors.holidayDate" class="text-danger small mt-1">{{ errors.holidayDate }}</div>
          </div>
        </div>

        <div class="row mb-3 align-items-start">
          <label class="col-md-2 col-form-label">理由 *</label>
          <div class="col-md-6">
            <Textarea
              v-model="form.reason"
              rows="4"
              class="w-100"
              placeholder="例：学会出席のため"
              maxlength="99"
            />
            <div v-if="errors.reason" class="text-danger small mt-1">{{ errors.reason }}</div>
          </div>
        </div>

        <div class="button-group">
          <Button
            label="リセット"
            icon="pi pi-refresh"
            class="reset-btn"
            @click="resetForm"
          />
          <Button
            label="保存する"
            icon="pi pi-save"
            class="register-btn"
            :loading="loading"
            @click="submitHoliday"
          />
        </div>
      </div>
    </div>
  </div>
  <CommonModal 
              v-model:visible="modalVisible"
              :title="modalTitle"
              :message="modalMessage"
              confirm-text="OK" 
              :show-confirm="true"
              @confirm="handleModalClose" />
</template>

<style scoped>
@import "@/assets/styles/signup.css";

.holiday-page {
  min-height: 100vh;
  padding: 40px 0;
  background: linear-gradient(135deg, #eef9f5 0%, #ffffff 60%, #f6fbff 100%);
}

.signup-card {
  max-width: 900px;
  margin: 0 auto;
}

.row {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.col-md-2 {
  width: 20%;
  min-width: 140px;
}

.col-md-4,
.col-md-6 {
  width: 80%;
}

@media (max-width: 768px) {
  .row {
    flex-direction: column;
    align-items: stretch;
  }
  .col-md-2,
  .col-md-4,
  .col-md-6 {
    width: 100%;
  }
}
</style>
