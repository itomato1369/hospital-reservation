<script setup lang="ts">
import { onMounted } from "vue";
import { familyForm, relationship, submitFamily } from "@/services/patient/usePatient";
import { formatWarekiDate } from "@/services/signup/useCalendar";
import { maxDate, showCalendar } from "@/services/signup/useCalendar";
import { reset, errors, genders } from "@/services/signup/useSignUp";
import { useAuthStore } from "@/stores/authStore";
import ClinicIcon from "@/assets/images/hospital_icon.png";

const authStore = useAuthStore();

onMounted(() => {
    familyForm().patient_id = authStore.patientId;
});
</script>

<template>
    <div class="signup-page">
        <div class="signup-container">
            <div class="signup-card">
                <div class="signup-header">
                    <img :src="ClinicIcon" alt="さくら総合クリニックアイコン" class="clinic-icon" />
                    <h1 class="signup-title">さくら総合クリニック</h1>
                    <h2 class="signup-subtitle">
                        家族登録
                    </h2>
                </div>
                <!-- 氏名 -->
                <div class="row mb-3 align-items-center">
                    <label class="col-md-2 col-form-label">氏名 *</label>
                    <div class="col-md-3">
                        <InputText v-model="familyForm.lastName" placeholder="山田" class="w-100" />
                        <div v-if="errors.lastName" class="text-danger small mt-1">{{ errors.lastName }}</div>
                    </div>
                    <div class="col-md-3">
                        <InputText v-model="familyForm.firstName" placeholder="太郎" class="w-100" />
                        <div v-if="errors.firstName" class="text-danger small mt-1">{{ errors.firstName }}</div>
                    </div>
                </div>

                <!-- フリガナ -->
                <div class="row mb-3 align-items-center">
                    <label class="col-md-2 col-form-label">フリガナ *</label>
                    <div class="col-md-3">
                        <InputText v-model="familyForm.lastNameKana" placeholder="やまだ" class="w-100" />
                        <div v-if="errors.lastNameKana" class="text-danger small mt-1">{{ errors.lastNameKana }}</div>
                    </div>
                    <div class="col-md-3">
                        <InputText v-model="familyForm.firstNameKana" placeholder="たろう" class="w-100" />
                        <div v-if="errors.firstNameKana" class="text-danger small mt-1">{{ errors.firstNameKana }}</div>
                    </div>
                </div>
                <!-- 性別 -->
                <div class="row mb-3 align-items-center">
                    <label class="col-md-2 col-form-label">性別 *</label>
                    <div class="col-md-4">
                        <Dropdown v-model="familyForm.gender" 
                                    :options="genders" 
                                    optionLabel="label" 
                                    optionValue="value"
                                    placeholder="選択" 
                                    class="w-100" />
                        <div v-if="errors.gender" class="text-danger small mt-1">{{ errors.gender }}</div>
                    </div>
                </div>
                <!-- 生年月日 -->
                <div class="row mb-3 align-items-center">
                    <label for="birthDate" class="col-md-2 col-form-label">生年月日 *</label>
                    <div class="col-md-4">
                        <input id="birthDate" 
                                v-model="familyForm.birth_date" 
                                type="date" 
                                class="form-control"
                                :max="maxDate"
                                @click="showCalendar" />
                        <div v-if="errors.birthDate" class="text-danger small mt-1">{{ errors.birthDate }}</div>
                    <!-- 和暦 -->
                        <div class="small text-muted">和暦：{{ formatWarekiDate(familyForm.birth_date) }}</div>
                    </div>
                </div>

                    <!-- 関係 -->
                <div class="row mb-3 align-items-center">
                    <label class="col-md-2 col-form-label">関係 *</label>
                    <div class="col-md-4">
                    <Dropdown v-model="familyForm.relationship" 
                                :options="relationship" 
                                optionLabel="label" 
                                optionValue="value"
                                placeholder="選択" 
                                class="w-100" />
                    <div v-if="errors.gender" class="text-danger small mt-1">{{ errors.gender }}</div>
                    </div>
                </div>

            <!-- ボタン -->
          <div class="button-group">
            <Button 
                    label="リセット" 
                    icon="pi pi-refresh" 
                    class="reset-btn" 
                    @click="reset" />

            <Button label="登録"
                    class="register-btn" 
                    @click="submitFamily" />
          </div>
                
            </div>
        </div>
    </div>
</template>
<style scoped>
@import "@/assets/styles/signup.css";
</style>