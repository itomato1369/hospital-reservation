<script setup lang="ts">
const props = defineProps<{
  policyAgreement: boolean;
  privacyAgreement: boolean;
}>();

const emit = defineEmits<{
  "update:policyAgreement": [value: boolean];
  "update:privacyAgreement": [value: boolean];
}>();
</script>

<template>
  <div class="policy-section">
    <div class="section-title">
      <i class="pi pi-file-check"></i>
      利用契約
    </div>

    <!-- 利用規約 -->
    <div class="policy-item">
      <div class="policy-content">
        <h3 class="policy-title">利用規約</h3>

        <div class="policy-box">
          <p>
              さくら総合クリニック（以下「当クリニック」といいます。）は、
                当クリニックが提供するWeb予約サービス(以下「本サービス」といいます)
                の利用について、以下のとおり利用規約を定めます
          </p>

          <p>
            <strong>第1条(本サービスについて)</strong><br>
            本サービスは、患者様がインターネットを通じて診療予約、
            予約内容の確認および予約のキャンセル等を行うためのサービスです。
          </p>
        </div>
      </div>

      <div class="policy-check">
        <input
          id="policyAgreement"
          type="checkbox"
          class="form-check-input"
          :checked="props.policyAgreement"
          @change="
            emit(
              'update:policyAgreement',
              ($event.target as HTMLInputElement).checked
            )
          "
        />

        <label for="policyAgreement">
          利用規約に同意する
        </label>
      </div>
    </div>

    <!-- プライバシーポリシー -->
    <div class="policy-item">
      <div class="policy-content">
        <h3 class="policy-title">プライバシーポリシー</h3>

        <div class="policy-box">
            <p>
                当クリニックは、本サービスの利用に必要な範囲で、
                氏名、生年月日、電話番号、メールアドレス、住所、
                健康保険証に関する情報等を取得します。
            </p>

            <p>
                取得した個人情報は、本人確認、診療予約、受付業務、
                予約に関する連絡および本サービスの提供・管理に利用します。
            </p>

            <p>
                取得した個人情報は適切に管理し、法令に基づく場合を除き、
                本人の同意なく第三者へ提供しません。
            </p>
        </div>
      </div>

      <div class="policy-check">
        <input
          id="privacyAgreement"
          type="checkbox"
          class="form-check-input"
          :checked="props.privacyAgreement"
          @change="
            emit(
              'update:privacyAgreement',
              ($event.target as HTMLInputElement).checked
            )
          "
        />

        <label for="privacyAgreement">
          プライバシーポリシーに同意する
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.policy-section {
  margin-top: 30px;
  margin-bottom: 30px;
}

.section-title {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.policy-item {
  margin-bottom: 20px;
}

.policy-title {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 8px;
}

.policy-box {
  max-height: 150px;
  overflow-y: auto;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f8f9fa;
  font-size: 0.9rem;
  line-height: 1.7;
}

.policy-box p {
  margin-bottom: 8px;
}

.policy-check {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
}

.policy-check label {
  cursor: pointer;
  font-size: 0.9rem;
}

.form-check-input {
  cursor: pointer;
}
</style>