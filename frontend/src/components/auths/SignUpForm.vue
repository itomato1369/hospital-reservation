<script setup lang="ts">
/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
import router from "@/routers";
import ClinicIcon from "@/assets/images/hospital_icon.png";
import PolicyForm from "@/components/auths/PolicyForm.vue";
import { form,
        genders,
        reset,
        submit,
        errors,
        maxDate,
        submitEdit,
        policyForm,
        formatPhone,
        showCalendar,
        formatWarekiDate,
        checkDuplicateID,
        autoSearchAddress,
        checkDuplicateEmail,
         } from "@/services/signup/useSignUp";
const props = defineProps<{ mode?: "create" | "edit" }>();

// ページを離れると初期化
const goBack = () => {
  reset();
};
</script>
<!-- 新規登録 form -->
<template>
  <div class="signup-page">
    <div class="signup-container">
      <div class="signup-card">
          <div class="signup-header">
              <img :src="ClinicIcon" alt="さくら総合クリニックアイコン" class="clinic-icon"/>
              <h1 class="signup-title">さくら総合クリニック</h1>
              <h2 class="signup-subtitle">
                {{ mode === "edit" ? "情報編集" : "新規登録" }}
              </h2>
          </div>
          <!-- ユーザーID -->
          <div class="row mb-3 align-items-start">
            <label class="col-md-2 col-form-label">使用するID *
            </label>
            <div class="col-md-4">
              <InputText v-model="form.loginId" 
                         placeholder="使用するIDを入力" 
                         class="w-100"
                         maxlength="31"
                         :disabled="mode === 'edit'" />
              <div v-if="errors.loginId" class="text-danger small mt-1">{{ errors.loginId }}</div>
            </div>
            <!-- ユーザーIDチェック -->
            <div class="col-md-3" v-if="mode !== 'edit'">
              <Button label="IDチェック" icon="pi pi-search" class="idcheck-btn" @click="checkDuplicateID" />
            </div>
          </div>
          <template v-if="mode !== 'edit'">
            <!-- パスワード -->
            <div class="row mb-3 align-items-center">
              <label class="col-md-2 col-form-label">パスワード *
              </label>
              <div class="col-md-4">
                <Password v-model="form.password" 
                          toggleMask 
                          :feedback="false"
                          :inputProps="{ maxlength: 13 }"
                          placeholder="使用するパスワードを入力"
                          class="w-100" />
                <div v-if="errors.password" class="text-danger small mt-1">{{ errors.password }}</div>
              </div>
            </div>
            <!-- パスワード確認 -->
            <div class="row mb-3 align-items-center">
              <label class="col-md-2 col-form-label">パスワード確認 *</label>
              <div class="col-md-4">
                <Password v-model="form.passwordConfirm" 
                          toggleMask 
                          :feedback="false" 
                          :inputProps="{ maxlength: 13 }"
                          placeholder="パスワードを確認"
                          class="w-100" />
                <div v-if="errors.passwordConfirm" class="text-danger small mt-1">{{ errors.passwordConfirm }}</div>
              </div>
            </div>
          </template>
          <!-- 氏名 -->
          <div class="row mb-3 align-items-center">
            <label class="col-md-2 col-form-label">氏名 *</label>
            <div class="col-md-3">
              <InputText v-model="form.lastName" 
                          placeholder="山田" 
                          maxlength="49"
                          class="w-100" />
              <div v-if="errors.lastName" class="text-danger small mt-1">{{ errors.lastName }}</div>
            </div>
            <div class="col-md-3">
              <InputText v-model="form.firstName" 
                          placeholder="太郎" 
                          maxlength="49"
                          class="w-100" />
              <div v-if="errors.firstName" class="text-danger small mt-1">{{ errors.firstName }}</div>
            </div>
          </div>
          <!-- フリガナ -->
          <div class="row mb-3 align-items-center">
            <label class="col-md-2 col-form-label">フリガナ *</label>
            <div class="col-md-3">
              <InputText v-model="form.lastNameKana" 
                          placeholder="やまだ" 
                          maxlength="99"
                          class="w-100" />
              <div v-if="errors.lastNameKana" class="text-danger small mt-1">{{ errors.lastNameKana }}</div>
            </div>
            <div class="col-md-3">
              <InputText v-model="form.firstNameKana" 
                          placeholder="たろう"
                          maxlength="99"
                          class="w-100" />
              <div v-if="errors.firstNameKana" class="text-danger small mt-1">{{ errors.firstNameKana }}</div>
            </div>
          </div>
          <!-- 性別 -->
          <div class="row mb-3 align-items-center">
            <label class="col-md-2 col-form-label">性別 *</label>
            <div class="col-md-4">
              <Dropdown v-model="form.gender" 
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
                    v-model="form.birthDate" 
                    type="date" 
                    class="form-control"
                    :max="maxDate"
                    @click="showCalendar" />
              <div v-if="errors.birthDate" class="text-danger small mt-1">{{ errors.birthDate }}</div>
          <!-- 和暦 -->
              <div class="small text-muted">和暦：{{ formatWarekiDate(form.birthDate) }}</div>
            </div>
          </div>
          <!-- 電話番号 -->
          <div class="row mb-3 align-items-center">
            <label class="col-md-2 col-form-label">電話番号 *
              <br><small class="text-muted">(半角数字のみ)</small>
            </label>
            <div class="col-md-4">
              <InputText  v-model="form.phone" 
                          placeholder="080-1234-5678" 
                          maxlength="13"
                          class="w-100" 
                          @input="formatPhone"/>
              <div v-if="errors.phone" class="text-danger small mt-1">{{ errors.phone }}</div>
            </div>
          </div>
          <!-- メールアドレス -->
          <div class="row mb-3 align-items-center">
            <label class="col-md-2 col-form-label">メールアドレス *
              <br><small class="text-muted">(半角英数字のみ)</small>
            </label>
            <div class="col-md-4">
              <InputText  v-model="form.email" 
                          placeholder="sakura@cal.com"
                          class="w-100"
                          maxlength="250"  />
            <!-- メールアドレスチェック -->                           
              <div v-if="errors.email" class="text-danger small mt-1">{{ errors.email }}</div>
            </div>
            <div class="col-md-3">
              <Button label="メールアドレスチェック"
                      class="emailcheck-btn"
                      icon="pi pi-envelope"
                      @click="checkDuplicateEmail" />
            </div>
          </div>
          <!-- 郵便番号 -->
          <div class="row mb-3 align-items-center">
            <label class="col-md-2 col-form-label">郵便番号 *</label>
            <div class="col-md-4">
              <InputText  v-model="form.postalCode" 
                          placeholder="000-0000" 
                          class="w-100"
                          maxlength="8" 
                          @input="autoSearchAddress"/>
              <div v-if="errors.postalCode" class="text-danger small mt-1">{{ errors.postalCode }}</div>
            </div>
          </div>
          <!-- 都道府県 -->
          <div class="row mb-3 align-items-center">
            <label class="col-md-2 col-form-label">都道府県</label>
            <div class="col-md-4">
              <InputText v-model="form.prefecture" readonly class="w-100" />
            </div>
          </div>
          <!-- 市・区・町・村 -->  
          <div class="row mb-3 align-items-center">
            <label class="col-md-2 col-form-label">市・区・町・村</label>
            <div class="col-md-4">
              <InputText v-model="form.city" readonly class="w-100" />
            </div>
          </div>
          <!-- 町名・番地 --> 
          <div class="row mb-3 align-items-center">
            <label class="col-md-2 col-form-label">町名・番地</label>
            <div class="col-md-4">
              <InputText v-model="form.address" 
                      placeholder="〇丁目〇番地"
                      maxlength="99"
                      class="w-100" />
            </div>
          </div>
          <!-- 建物名（任意） --> 
          <div class="row mb-3 align-items-center">
            <label class="col-md-2 col-form-label">建物名（任意）</label>
            <div class="col-md-4">
              <InputText v-model="form.building" 
                          placeholder="さくらビル" 
                          maxlength="99"
                          class="w-100" />
            </div>
          </div>

          <div class="row mb-2">
            <div class="section-title">
              <i class="pi pi-id-card"></i>  健康保険証の情報
            </div>
          </div>
          <!-- 保険者番号 --> 
          <div class="row mb-3 align-items-center">
            <label class="col-md-2 col-form-label">保険者番号 *</label>
            <div class="col-md-3">
              <InputText v-model="form.insurerNumber" class="w-100" maxlength="8"/>
              <div v-if="errors.insurerNumber" class="text-danger small mt-1">{{ errors.insurerNumber }}</div>
            </div>
          <!-- 記号 -->   
            <label class="col-md-2 col-form-label">記号</label>
            <div class="col-md-3">
              <InputText v-model="form.insurerSymbol" class="w-100" maxlength="6"/>
            </div>
          </div>
          <!-- 番号 -->
          <div class="row mb-3 align-items-center">
            <label class="col-md-2 col-form-label">番号</label>
            <div class="col-md-3">
              <InputText v-model="form.insurerNumber2" class="w-100" maxlength="6" />
            </div>
          <!-- 枝番 -->  
            <label class="col-md-2 col-form-label">枝番
            <br><small class="text-muted">(お持ちの方のみ)</small></label>
            <div class="col-md-3">
              <InputText v-model="form.insurerBranch" class="w-100"  maxlength="2"/>
            </div>
          </div>
          <!-- 利用契約 -->
          <PolicyForm
            v-if="mode !== 'edit'"
            v-model:policyAgreement="policyForm.policyAgreement"
            v-model:privacyAgreement="policyForm.privacyAgreement" />

          <!-- ボタン -->
          <div class="button-group">
            <Button label="戻る" 
                    icon="pi pi-arrow-left" 
                    class="back-btn" 
                    @click="router.push(mode === 'edit' ? '/patient' : '/')" />
            <Button v-if="mode !== 'edit'" 
                    label="リセット" 
                    icon="pi pi-refresh" 
                    class="reset-btn" 
                    @click="reset" />
            <Button :label="mode === 'edit' ? '更新する' : '新規登録'" 
                    :icon="mode === 'edit' ? 'pi pi-save' : 'pi pi-user-plus'" 
                    class="register-btn" 
                    @click="mode === 'edit' ? submitEdit() : submit(policyForm.policyAgreement, policyForm.privacyAgreement)" />
          </div>
        </div>
      </div>
    </div>
</template>
<style scoped>
@import "@/assets/styles/signup.css";
</style>