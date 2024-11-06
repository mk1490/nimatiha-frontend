<script>
import QuestionnaireModal from "@/view/components/Admin/Questionnaire/QuestionnaireModal.vue";

export default {
  name: "QuestionnaireManagement",
  components: {QuestionnaireModal},
  created() {
    this.httpGet(`/test-template/list`, result => {
      this.table.contents = result;
    })
  },
  data() {
    return {
      table: {
        headers: [
          {text: 'عنوان', value: 'title'},
          {text: 'اسلاگ', value: 'slug'},
        ],
        contents: [],
        actions: [
          {
            title: 'ویرایش',
            icon: 'mdi-pen',
            click: item => {
              this.httpGet(`/test-template/${item.id}`, result => {
                this.modal.data = result;
                this.modal.visible = true;
              })

            }

          },
          {
            title: 'حذف',
            icon: 'mdi-delete',
            color: 'red',
            click: item => {
            }

          }
        ],
      },
      modal: {
        visible: false,
      }
    }
  },
  methods: {
    defineNew() {
      this.modal.data = null;
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
        :actions="table.actions"
        :headers="table.headers">
    </base-table>

    <questionnaire-modal
        v-if="modal.visible"
        :visible.sync="modal.visible"
        :data="modal.data">

    </questionnaire-modal>
  </base-card-layout>
</template>

<style scoped>

</style>