<script setup lang="ts">
// 既存の SignUpForm.vueを再利用
import ClinicIcon from "@/assets/images/hospital_icon.png";
import { sameDayForm, 
          errorsSameDay, 
          resetSameday, 
          maxDate, 
          showCalendar, 
          formatWarekiDate, 
          sameDayFormPhone,
          submitSameDay } from "@/services/signup/useSignUp";

</script>

<template>
    <div class="signup-page">
        <div class="signup-container">
            <div class="signup-header">
                <img :src="ClinicIcon" alt="さくら総合クリニックアイコン" class="clinic-icon"/>
                <h1 class="signup-title">さくら総合クリニック</h1>
                <h2 class="signup-subtitle">
                    電話対応での新規登録
                </h2>
            </div>

            <!-- 氏名 -->
            <div class="row mb-3 align-items-center">
                <label class="col-md-2 col-form-label">氏名 *</label>
                <div class="col-md-3">
                    <InputText v-model="sameDayForm.lastName" 
                                placeholder="山田" 
                                maxlength="49"
                                class="w-100" />
                    <div v-if="errorsSameDay.lastName" class="text-danger small mt-1"{{ errors.lastName }}></div>
                </div>
                <div class="col-md-3">
                    <InputText v-model="sameDayForm.firstName" 
                                placeholder="太郎"
                                maxlength="49"
                                class="w-100" />
                    <div v-if="errorsSameDay.firstName" class="text-danger small mt-1">{{ errorsSameDay.firstName }}</div>
                </div>
            </div>  
            
            <!-- フリガナ -->
          <div class="row mb-3 align-items-center">
                <label class="col-md-2 col-form-label">フリガナ *</label>
                <div class="col-md-3">
                    <InputText v-model="sameDayForm.lastNameKana" 
                                placeholder="やまだ" 
                                maxlength="99"
                                class="w-100" />
                    <div v-if="errorsSameDay.lastNameKana" class="text-danger small mt-1">{{ errorsSameDay.lastNameKana }}</div>
                </div>
                <div class="col-md-3">
                    <InputText v-model="sameDayForm.firstNameKana" 
                    placeholder="たろう"
                    maxlength="99" 
                    class="w-100" />
                    <div v-if="errorsSameDay.firstNameKana" class="text-danger small mt-1">{{ errorsSameDay.firstNameKana }}</div>
                </div>
          </div>

            <!-- 生年月日 -->
          <div class="row mb-3 align-items-center">
            <label for="birthDate" class="col-md-2 col-form-label">生年月日 *</label>
            <div class="col-md-4">
              <input id="birthDate" 
                    v-model="sameDayForm.birthDate" 
                    type="date" 
                    class="form-control"
                    :max="maxDate"
                    @click="showCalendar" />
              <div v-if="errorsSameDay.birthDate" class="text-danger small mt-1">{{ errorsSameDay.birthDate }}</div>
            <!-- 和暦 -->
              <div class="small text-muted">和暦：{{ formatWarekiDate(sameDayForm.birthDate) }}</div>
            </div>
          </div>

          <!-- 電話番号 -->
          <div class="row mb-3 align-items-center">
            <label class="col-md-2 col-form-label">電話番号 *</label>
            <div class="col-md-4">
              <InputText  v-model="sameDayForm.phone" 
                          placeholder="080-1234-5678" 
                          maxlength="13"
                          class="w-100" 
                          @input="sameDayFormPhone()"/>
              <div v-if="errorsSameDay.phone" class="text-danger small mt-1">{{ errorsSameDay.phone }}</div>
            </div>
          </div>

            <!-- ボタン -->
          <div class="button-group">
            <Button 
                    label="リセット" 
                    icon="pi pi-refresh" 
                    class="reset-btn" 
                    @click="resetSameday" />
                    
            <Button label="新規登録"
                    icon="pi pi-save"
                    class="register-btn"
                    @click="submitSameDay" />
          </div>
        </div>
    </div>
</template>
<style scoped>
@import "@/assets/styles/signup.css";
</style>