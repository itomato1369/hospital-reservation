<script setup lang="ts">
/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
import CommonModal from "./components/commons/CommonModal.vue";
import { modalOk,
         closeModal, 
         modalTitle, 
         modalVisible, 
         modalMessage,
         modalShowConfirm,
         modalConfirmText, 
} from "./services/useModal";
</script>
<template>
    <router-view />
    <CommonModal 
        :visible="modalVisible"
        :title="modalTitle"
        :message="modalMessage"
        :show-confirm="modalShowConfirm"
        :confirm-text="modalConfirmText"
        @update:visible="closeModal"
        @confirm="modalOk" />        
</template>

