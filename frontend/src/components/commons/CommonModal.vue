<script setup lang="ts">
/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
interface Props {
    visible: boolean;

    title: string;

    message?: string;

    confirmText?: string;
    
    showConfirm?: boolean;
}
const props = defineProps<Props>();

const emit = defineEmits<{
    (e: "update:visible", value: boolean): void;
    (e: "confirm"): void;
}>();
</script>

<template>
    <Dialog
        :visible="props.visible"
        modal
        :closable="false"
        :style="{ width: '450px'}"
        :header="props.title"
        @update:visible="emit('update:visible', $event)">
        <div class="modal-message">
            <i class="pi pi-info-circle"></i>
            <p v-if="props.message" style="white-space: pre-line">{{ props.message }}</p>
            <slot />
        </div>

        <template #footer>
            <Button
                    label="閉じる"
                    class="modal-ok-button"
                    @click="emit('update:visible', false)" />
                    
            <Button
                    v-if="props.showConfirm"
                    :label="props.confirmText ?? 'OK'"
                    @click="emit('confirm')" />        
        </template>
    </Dialog>
</template>
<style scoped>
@import "@/assets/styles/modal.css";
</style>