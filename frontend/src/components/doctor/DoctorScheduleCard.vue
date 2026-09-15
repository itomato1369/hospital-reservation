<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { selectDoctorScheduleSelf, updateDoctorSchedule, validateDoctorSchedule } from "@/services/doctor/useDoctor";
import { showModal } from "@/services/useModal";
import { weekDayLabel } from "@/services/patient/usePatient";
import type { DoctorInfo } from "@/types/doctor";

const doctorSchedule = ref<DoctorInfo[]>([]);
const loading = ref(false);
const saving = ref(false);

const doctorName = computed(() => doctorSchedule.value[0]?.doctor_name ?? "");

const loadSchedule = async () => {
  try {
    loading.value = true;
    doctorSchedule.value = await selectDoctorScheduleSelf();
  } catch (error: any) {
    console.error("スケジュール取得エラー", error);
    showModal("エラー", error?.message ?? "診療スケジュールの取得に失敗しました。");
  } finally {
    loading.value = false;
  }
};
// ===========
// スケジュール登録
// ===========
const saveSchedule = async () => {
  // スケジュールバリデーション
  const validationError = validateDoctorSchedule(
    doctorSchedule.value
  );
  // バリデーションのエラー
  // nullではなくメッセージStringであれば
  if (validationError) {
    showModal(
      "入力エラー",
      validationError
    );
    return;
  }

  try {
    saving.value = true;

    const payload = doctorSchedule.value.map((item) => ({
      day_of_week: item.day_of_week,
      start_time: item.start_time ?? "",
      end_time: item.end_time ?? "",
      is_closed: item.is_closed,
    }));

    const result = await updateDoctorSchedule(payload);

    showModal("保存完了", result.message ?? "スケジュールを保存しました。");

    await loadSchedule();

  } catch (error: any) {

    console.error("スケジュール更新エラー", error);

    showModal(
      "エラー", 
      error?.message ?? "スケジュールの更新に失敗しました。"
    );
  } finally {
    saving.value = false;
  }
};

const toggleClosed = (item: DoctorInfo, event: Event) => {
  const target = event.target as HTMLInputElement;
  item.is_closed = target.checked;
  if (item.is_closed) {
    item.start_time = "";
    item.end_time = "";
  }
};
// 時間選択input
const openTimePicker = (event: Event) => {
  const input = event.target as HTMLInputElement;

  if (typeof input.showPicker === "function") {
    input.showPicker();
  }
}

onMounted(loadSchedule);
</script>
<template>
  <div class="schedule-page">
    <div class="page-header">
      <div>
        <h1 class="doctor-title">{{ doctorName }} 担当医</h1>
        <p class="doctor-subtitle">曜日ごとの診療時間を管理します。</p>
      </div>
      <Button
        label="保存する"
        icon="pi pi-save"
        class="save-btn"
        :loading="saving"
        @click="saveSchedule"
      />
    </div>

    <div v-if="loading" class="empty-state">
      読み込み中です...
    </div>
    <div v-else-if="doctorSchedule.length === 0" class="empty-state">
      診療スケジュールが登録されていません。
    </div>

    <div v-else class="schedule-list">
      <div
        v-for="item in doctorSchedule"
        :key="item.day_of_week"
        class="schedule-card"
      >
        <div class="schedule-row">
          <div class="weekday">{{ weekDayLabel(item.day_of_week) }}</div>
          <div class="closed-toggle">
            <label>
              <input
                type="checkbox"
                :checked="item.is_closed"
                @change="toggleClosed(item, $event)"
              />
              休診
            </label>
          </div>
        </div>

        <div class="form-row">
          <label>開始時間</label>
          <input
            type="time"
            v-model="item.start_time"
            class="form-control"
            :disabled="item.is_closed"
            @click="openTimePicker"
          />
        </div>
        <div class="form-row">
          <label>終了時間</label>
          <InputText
            type="time"
            v-model="item.end_time"
            class="form-control"
            :disabled="item.is_closed"
            @click="openTimePicker"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/styles/doctor/schedule.css";
</style>