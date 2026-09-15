<script setup lang="ts">
/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
import router from "@/routers";
import { form, login } from "@/services/login/useLogin";
import ClinicIcon from "@/assets/images/hospital_icon.png";
</script>

<template>
  <div class="login-page">
    <main class="login-container">
      <section class="login-card" style="max-width:700px;">

        <div class="login-header">
          <img :src="ClinicIcon" alt="さくら総合クリニックアイコン" class="clinic-icon"/>
          <h1 class="login-title">
            さくら総合クリニック
          </h1>
          <h2 class="login-subtitle">ログイン</h2>
        </div>

          <!-- ID -->
          <div class="row mb-4 align-items-center">
            <label class="col-md-3 col-form-label">
              ID
            </label>

            <div class="col-md-7">
              <InputText
                v-model="form.loginId"
                class="w-100"
                placeholder="ユーザーIDを入力してください"
              />
            </div>
          </div>

          <!-- パスワード -->
          <div class="row mb-4 align-items-center">
            <label class="col-md-3 col-form-label">
              パスワード
            </label>

            <div class="col-md-7">
              <Password
                v-model="form.password"
                toggleMask
                :feedback="false"
                class="w-100"
                placeholder="パスワードを入力してください"
              />
            </div>
          </div>

          <!-- ボタン -->
          <div class="button-group">
            <Button
              class="back-btn"
              label="戻る"
              icon="pi pi-arrow-left"
              outlined
              @click="router.push('/')"
            />

            <Button
              class="login-btn"
              label="ログイン"
              icon="pi pi-sign-in"
              @click="login"
            />
          </div>
        </section>
      </main>
    </div>
</template>
<style scoped>
@import "@/assets/styles/login.css";
</style>