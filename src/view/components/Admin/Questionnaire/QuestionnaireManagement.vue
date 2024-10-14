<script>
import QuestionnaireModal from "@/view/components/Admin/Questionnaire/QuestionnaireModal.vue";

export default {
  name: "QuestionnaireManagement",
  components: {QuestionnaireModal},
  data() {
    return {
      table: {
        headers: [],
        contents: [],
      },
      modal: {
        visible: false,
      }
    }
  },
  methods: {
    defineNew() {
      this.modal.visible = true;
    }
  }
}
</script>

<template>
  <base-card-layout
      @buttonClick="defineNew"
      button-title="تعریف پرسش نامه جدید"
      title="مدیریت پرسش نامه ها">
    <base-table
        :items="table.contents"
        :headers="table.headers">
    </base-table>

    <questionnaire-modal
        v-if="modal.visible"
        :visible.sync="modal.visible">

    </questionnaire-modal>
  </base-card-layout>
</template>

<style scoped>

</style>