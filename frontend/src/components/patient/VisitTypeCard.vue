<script setup lang="ts">
/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
import First from "@/assets/images/first.png";
import Followup from "@/assets/images/followup.png";

// Propsとして初診・再診のリストと、現在選択中のIDを受け取る
defineProps<{
    modelValue: string | null;
}>();
// ReservationCard.vueへ選択されたIDを通知するためのemit
const emit = defineEmits<{
    (e: "update:modelValue", value: string): void;
}>();
const handleClick = (value: string) => {
    emit("update:modelValue", value);
};
</script>
<template>
    <div class="visit-grid">
        <!-- 初診 -->
        <div class="visit-card"
             :class="{ active: modelValue === 'first' }"
             @click="handleClick('first')">
             <img :src="First" alt="初診" class="visit-icon"/>
             <div class="visit-name">初診</div>
        </div>

        <!-- 再診 -->
         <div class="visit-card"
              :class="{ active: modelValue === 'followup' }"
              @click="handleClick('followup')">
              <img :src="Followup" alt="再診" class="visit-icon" />
              <div class="visit-name">再診</div>
        </div>
    </div>
</template>

<style scoped>
@import "@/assets/styles/patient/visit.css";
</style>