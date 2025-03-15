<script setup>
import {onMounted, ref} from "vue";
import {httpGet} from "@/plugins/httpRequest";

const modal = ref({
  visible: false,
  data: null,
})

const table = ref({
  headers: [
    {title: 'نام و نام خانوادگی', value: 'fullName'},
  ],
  contents: [],
  actions: [
    {
      title: 'جزئیات',
      icon: 'mdi-eye',
      click: (item) => {
        httpGet(`/report/coach-test/initialize`, result=>{
          modal.value.visible =true;
        })
      }
    }
  ],
})


onMounted(() => {
  httpGet(`/report/`, result => {
    table.value.contents = result;
  })
})

</script>

<template>
  <base-card-layout
      title="عملکرد مربیان">

    <base-table
        :actions="table.actions"
        :items="table.contents"
        :headers="table.headers"
    />
  </base-card-layout>
</template>

<style scoped>

</style>