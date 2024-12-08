<template>
  <base-modal
      width="100%"
      title="مشاهده جزئیات پاسخ‌نامه"
      hide-submit-button
      @close="$emit('update:visible', false)"
      :visible="visible">
    <base-table
        hide-default-footer
        :items-per-page="100"
        :headers="headers"
        :items="contents"
    />

  </base-modal>
</template>

<script>
import {addCommas} from "@persian-tools/persian-tools";
import BaseKeyValueSimpleTable from "@/view/widget/Base/BaseKeyValueSimpleTable.vue";

export default {
  name: "AnswerSheetDetailsModal",
  components: {BaseKeyValueSimpleTable},
  props: {
    data: Object,
    visible: Boolean,
  },
  created() {
    if (this.data) {
      Object.keys(this.data).map(f => {
        this.contents.push({
          questionTitle: this.data[f]['questionTitle'],
          answerContent: this.data[f]['answerContent'],
          isCorrect: this.data[f]['isCorrect'] === true ? 'بلی' : 'خیر',
          score: this.data[f]['score'],
        })
      })
    }
  },
  data() {
    return {
      headers: [
        {text: 'سؤال', value: 'questionTitle'},
        {text: 'پاسخ', value: 'answerContent'},
        {text: 'پاسخ صحیح', value: 'isCorrect'},
        {text: 'امتیاز', value: 'score'},

      ],
      contents: [],
    }
  },
  methods: {}
}
</script>

<style scoped>
.details--attachments span {
  font-family: VazirmatnUIFD, serif;
}

a {
  font-family: VazirmatnUIFD, serif;
}
</style>
