<script>
import TestModal from "@/view/components/Admin/Tests/TestModal.vue";
import QuestionsModal from "@/view/components/Admin/Tests/Questions/QuestionsModal.vue";

export default {
  name: "TestsManagement",
  components: {QuestionsModal, TestModal},
  created() {
    this.httpGet(`/test/list`, result => {
      this.table.contents = result;
    })
  },
  data() {
    return {
      table: {
        headers: [
          {text: 'عنوان', value: 'title'},
          {text: 'نوع سؤال', value: 'type'}
        ],
        contents: [],
        actions: [
          {
            title: 'ویرایش',
            icon: 'mdi-pen',
            click: (item) => {
              this.developing()
            }
          },
          {
            title: 'سوالات',
            icon: 'mdi-comment-question-outline',
            click: (item) => {
              this.httpGet(`/test/${item.id}`, result => {
                this.modal.questions.data = result;
                this.modal.questions.id = item.id;
                this.modal.questions.visible = true;
              })

            }
          }
        ],
      },
      modal: {
        visible: false,
        data: null,
        questions: {
          visible: false,
          id: null,
          data: null,
        }
      }
    }
  },
  emits: ['add', 'update'],
  methods: {
    define() {
      this.modal.data = null;
      this.modal.visible = true;
    },
    addItem(data) {
      this.table.contents.push(data);
      this.modal.visible = false;
    },
    updateItem() {

    }
  }
}
</script>

<template>


  <base-card-layout
      @buttonClick="define"
      button-title="تعریف آزمون جدید"
      title="مدیریت آزمون‌ها">
    <base-table
        :items="table.contents"
        :actions="table.actions"
        :headers="table.headers">
    </base-table>

    <test-modal
        v-if="modal.visible"
        :visible.sync="modal.visible"
        :data="modal.data"
        :initialize="modal.initialize"
        @add="addItem"
        @update="updateItem">

    </test-modal>


    <questions-modal
        v-if="modal.questions.visible"
        :visible.sync="modal.questions.visible"
        :data="modal.questions.data"
        :question-id="modal.questions.id">

    </questions-modal>

  </base-card-layout>
</template>

<style scoped>

</style>
