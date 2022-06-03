<template>
  <div>
    <InputText
      :placeholder="t('AppInput.inputPlaceholder')"
      autofocus="true"
      class="custom-input"
      v-model="newTodo"
      type="text"
    />
    <Button
      :label="t('AppInput.buttonLabel')"
      @click="handleClick"
      class="p-button-outlined p-button-primary"
    />
  </div>
</template>

<script setup>
  import Button from "primevue/button";
  import InputText from "primevue/inputtext";
  import { ref } from "vue";

  import { useI18n } from "vue-i18n";
  const { t } = useI18n({ useScope: "global" });
  const emit = defineEmits(["newtodo"]);
  const newTodo = ref(null);

  function handleClick() {
    emit("newtodo", newTodo.value);
    newTodo.value = "";
  }
</script>

<style>
  div {
    width: 100%;
  }
  .custom-input {
    width: 100%;
    margin-bottom: 10px;
  }
</style>
