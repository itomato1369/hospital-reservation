<script setup lang="ts">
/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
import InternalMedicine from "@/assets/images/internal_medicine.png";
import Pediatrics from "@/assets/images/pediatrics.png";
import Orthopedics from "@/assets/images/orthopedics.png";
import Otolaryngology from "@/assets/images/otolaryngology.png";
import Dermatology from "@/assets/images/dermatology.png";

import type { Department } from '@/types/reservation';
// Propsとして診療科のリストと、現在選択中のIDを受け取る
defineProps<{
    departments: Department[];
    modelValue: number | null;
}>();
// ReservationCard.vueへ選択されたIDを通知するためのemit
const emit = defineEmits<{
    (e: "update:modelValue", id: number): void;
}>();
// イメージをクリックした時の処理
const handleClick = (id: number) => {
    emit("update:modelValue", id);
};
//　診療科のIDや名称に応じて画像を切り替える
const getDepartmentImage = (name: string) => {
    switch (name) {
        case "内科": return InternalMedicine;
        case "小児科": return Pediatrics;
        case "整形外科": return Orthopedics;
        case "耳鼻咽喉科": return Otolaryngology;
        case "皮膚科": return Dermatology;
        default: return InternalMedicine;
    }
};
</script>
<template>
    <div class="department-grid">
        <div v-for="dept in departments"
             :key="dept.department_id"
             class="department-card"
             :class="{ active: modelValue === dept.department_id }"
             @click="handleClick(dept.department_id)">
             <!-- 画像 -->
              <img :src="getDepartmentImage(dept.name)" :alt="dept.name" class="department-icon"/>
              <div class="department-name">{{ dept.name }}</div>
        </div>
    </div>
</template>
<style scoped>
@import "@/assets/styles/patient/department.css";
</style>