<script setup lang="ts">
/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
import { ref } from "vue";
import { updateWaitTime } from "@/services/nurse/useNurse";

const props = defineProps<{
  visible: boolean;
  reservationId: number | null;
}>();

const emit = defineEmits<{
  (e: "update:visible", value: boolean): void;
  (e: "updated"): void;
}>();

const waitOptions = [5, 10, 15, 20, 25, 30] as const;
const selectedWaitMinutes = ref<number | null>(null);
const customWait = ref("");
const statusMessage = ref("");
const isUpdating = ref(false);

const selectWait = (minutes: number) => {
  selectedWaitMinutes.value = minutes;
  customWait.value = "";
  statusMessage.value = "";
};

const handleCustomInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  customWait.value = target.value.replace(/\D/g, "");
  selectedWaitMinutes.value = null;
  statusMessage.value = "";
};

const getWaitMinutes = () => {
  if (selectedWaitMinutes.value) {
    return selectedWaitMinutes.value;
  }
  const parsed = Number(customWait.value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
};

const submitWaitTime = async () => {
  if (!props.reservationId) {
    statusMessage.value = "予約IDがありません";
    return;
  }

  const waitMinutes = getWaitMinutes();
  if (!waitMinutes) {
    statusMessage.value = "待ち時間を入力してください";
    return;
  }

  isUpdating.value = true;
  statusMessage.value = "";
  try {
    await updateWaitTime(props.reservationId, waitMinutes);
    statusMessage.value = `待ち時間を ${waitMinutes} 分に設定しました`;
    emit("updated");
  } catch (error) {
    const err = error as any;
    statusMessage.value =
      err?.response?.data?.error ??
      err?.message ??
      "待ち時間の設定に失敗しました";
  } finally {
    isUpdating.value = false;
  }
};

const closeModal = () => {
  selectedWaitMinutes.value = null;
  customWait.value = "";
  statusMessage.value = "";
  emit("update:visible", false);
};

const updateVisible = (value: boolean) => {
  emit("update:visible", value);
};
</script>

<template>
  <Dialog
    :visible="props.visible"
    modal
    :closable="false"
    :style="{ width: '560px' }"
    header="待ち時間を設定"
    @update:visible="updateVisible"
  >
    <div class="waiting-content">
      <div class="waiting-options">
        <button
          v-for="minutes in waitOptions"
          :key="minutes"
          type="button"
          class="waiting-button"
          :class="{ selected: selectedWaitMinutes === minutes }"
          @click="selectWait(minutes)"
        >
          {{ minutes }}分
        </button>
      </div>

      <div class="custom-input-group">
        <label for="wait-input">直接入力</label>
        <div class="input-wrapper">
          <input
            id="wait-input"
            type="text"
            inputmode="numeric"
            pattern="[0-9]*"
            v-model="customWait"
            @input="handleCustomInput"
            placeholder="分"
          />
          <span>分</span>
        </div>
      </div>

      <div class="status-message">
        <p v-if="statusMessage">{{ statusMessage }}</p>
      </div>
    </div>

    <template #footer>
      <div class="modal-footer-buttons">
        <Button
          label="戻る"
          @click="closeModal"
          :disabled="isUpdating"
        />
        <Button
          label="設定する"
          @click="submitWaitTime"
          :disabled="isUpdating"
        />
      </div>
    </template>
  </Dialog>
</template>

<style scoped>
@import "@/assets/styles/nurse/changeWaiting.css";
</style>

