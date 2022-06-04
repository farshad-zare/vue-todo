<template>
  <div class="appheader">
    <h2 class="app-title">{{ t("AppHeaderTitle") }}</h2>
    <el-popover v-model:visible="openLangSelect" :width="160">
      <div style="text-align: right; margin: 0">
        <el-button size="small" type="primary" @click="changeLangTo('en')">
          English
        </el-button>
        <el-button size="small" type="primary" @click="changeLangTo('fa')">
          Farsi
        </el-button>
      </div>
      <template #reference>
        <ElButton @click="togglePopover" type="info" circle size="large">
          <ElIcon size="25px"> <TheLanguage /> </ElIcon>
        </ElButton>
      </template>
    </el-popover>
  </div>
</template>
<script setup>
  import { ref } from "vue";

  import { useI18n } from "vue-i18n";
  import { ElButton, ElPopover, ElIcon } from "element-plus";

  import TheLanguage from "./TheLanguage.vue";

  const openLangSelect = ref(false);
  const { t, locale } = useI18n({ useScope: "global" });

  function togglePopover() {
    openLangSelect.value = !openLangSelect.value;
  }

  function changeLangTo(lang) {
    if (locale.value === lang) return;
    locale.value = lang;
    togglePopover();
  }
</script>
<style scoped>
  .appheader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 5px;
  }
  .app-title {
    color: #8bcf75;
  }
</style>
