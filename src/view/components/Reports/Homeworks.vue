<script setup>

import {onMounted, ref} from "vue";
import {httpGet, httpPost} from "@/plugins/httpRequest";

const modal = ref({
  visible: false,
  data: null,
})

const table = ref({
  headers: [
    {text: 'نام و نام خانوادگی', value: 'fullName'},
    {text: 'زمان ارسال', value: 'creationTime'},
  ],
  contents: [],
  actions: [
    {
      title: 'مشاهده جزئیات',
      icon: 'mdi-eye',
      click: (item) => {
        httpGet(`/report/coach-test/${item['reportId']}`, result => {
          modal.value.data = result;
          modal.value.visible = true;
        })
      }
    }
  ],
})

const items = ref({
  courses: [],
})

onMounted(() => {
  httpPost(`/report/coach-test/list`, {}, result => {
    table.value.contents = result;
  })
})

</script>

<template>
  <base-card-layout
      title="تکالیف ارسالی">

    <!--    <template #button-area>-->
    <!--      <base-select-->
    <!--          :items="items.courses"-->
    <!--          label="دوره"-->
    <!--      />-->
    <!--    </template>-->

    <base-table
        :headers="table.headers"
        :actions="table.actions"
        :items="table.contents"

    />

  </base-card-layout>
</template>

<style scoped>

</style>