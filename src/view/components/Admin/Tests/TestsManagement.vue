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
          {text: 'تعداد سوالات', value: 'questionsCount'},
          {text: 'مدّت زمان آزمون (دقیقه)', value: 'time'},
        ],
        contents: [],
        actions: [
          {
            title: 'ویرایش',
            icon: 'mdi-pen',
            click: (item) => {
              this.modal.data = item;
              this.modal.index = this.table.contents.indexOf(item);
              this.modal.visible = true;
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
    updateItem(data) {
      this.table.contents.splice(this.modal.index, 1, data);
      this.modal.visible = false;
    }
  }
}
</script>

<template>
  <base-card-layout
      @buttonClick="define"
      button-title="تعریف آزمون جدید"
      title="مدیریت قالب آزمون‌ها">
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
