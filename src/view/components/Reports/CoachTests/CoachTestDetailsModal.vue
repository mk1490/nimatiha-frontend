<script setup>
import {onMounted, ref} from "vue";

const props = defineProps({
  visible: Boolean,
  data: Object,
})
defineEmits(['close'])


onMounted(() => {
  table.value.contents = props.data;
})
const table = ref({
  headers: [
    {text: 'عنوان سؤال', value: 'questionTitle'},
    {text: 'پاسخ', value: 'answerContent'},
  ],
  contents: [],
  actions: [],
})
</script>

<template>
  <base-modal
      title="مشاهده پاسخ‌نامه"
      :visible="visible"
      width="800"
      hide-submit-button
      block-close-button
      @close="$emit('close')">
    <base-table
        :headers="table.headers"
        :items="table.contents"
        :actions="table.actions"
        items-per-page="-1"
        hide-default-footer>
      <template v-slot:item.answerContent="{item}">
        <div>{{ item.answerContent ? item.answerContent : 'بدون پاسخ'}}</div>
      </template>
    </base-table>
  </base-modal>
</template>

<style scoped>

</style>