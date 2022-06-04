<template>
  <div class="app-input">
    <el-input
      :placeholder="t('AppInput.inputPlaceholder')"
      autofocus="true"
      class="input-field"
      v-model="newTodo"
      type="text"
    />

    <el-button type="primary" @click="handleClick">
      {{ t("AppInput.buttonLabel") }}
    </el-button>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { useI18n } from "vue-i18n";
  import { ElInput, ElButton } from "element-plus";

  const { t } = useI18n({ useScope: "global" });
  const emit = defineEmits(["newtodo"]);
  const newTodo = ref(null);

  function handleClick() {
    emit("newtodo", newTodo.value);
    newTodo.value = "";
  }
</script>

<style scoped>
  .app-input {
    width: 100%;
  }

  .input-field {
    margin-bottom: 5px;
  }
</style>
