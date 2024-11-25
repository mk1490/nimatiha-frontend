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
                this.modal.index = this.table.contents.indexOf(item);
                this.modal.data = result.data;
                this.modal.initialize = result.initialize;
                this.modal.visible = true;
              })

            }

          },
          {
            title: 'حذف',
            icon: 'mdi-delete',
            color: 'red',
            click: item => {
              this.httpDelete(`/test-template/${item.id}`, result => {
                this.table.contents.splice(this.table.contents.indexOf(item));
              })
            }

          }
        ],
      },
      modal: {
        visible: false,
        initialize: null,
        index: -1,
      }
    }
  },
  methods: {
    define() {
      this.httpGet(`/test-template/initialize`, result => {
        this.modal.initialize = result;
        this.modal.data = null;
        this.modal.visible = true;
      })

    },
    addItem(data) {
      this.table.contents.push(data);
      this.modal.visible = false;
    },
    updateItem(data) {
      this.table.contents.splice(this.modal.index, 1, data)
      this.modal.visible = false;
    }
  }
}
</script>

<template>
  <base-card-layout
      @buttonClick="define"
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
        :data="modal.data"
        :initialize="modal.initialize"
        @add="addItem"
        @update="updateItem">

    </questionnaire-modal>
  </base-card-layout>
</template>

<style scoped>

</style>