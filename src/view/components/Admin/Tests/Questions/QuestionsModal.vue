<script>
import SingleQuestionModal from "@/view/components/Admin/Tests/Questions/SingleQuestionModal.vue";

export default {
  name: "QuestionsModal",
  components: {SingleQuestionModal},
  props: {
    visible: Boolean,
    data: Object,
    questionId: String,
  },
  created() {
    this.table.contents = this.data.questions.map(f => {
      return f;
    });
  },
  data() {
    return {
      table: {
        headers: [
          {text: 'عنوان', value: 'questionTitle'},
          {text: 'نوع سؤال', value: 'questionType'},
        ],
        contents: [],
        actions: [
          {
            title: 'ویرایش',
            icon: 'mdi-pen',
            click: (item) => {
              this.httpGet(`/test-question/${item.id}`, result => {
                this.modal.initialize = result.initialize;
                this.modal.index = this.table.contents.indexOf(item);
                this.modal.data = result.data;
                this.modal.visible = true;
              })

            }
          }
        ]
      },
      modal: {
        visible: false,
        data: null,
        index: -1,
        initialize: null,
      }
    }
  },
  methods: {
    define() {
      this.httpGet(`/test-question/initialize`, result => {
        this.modal.data = null;
        this.modal.initialize = result;
        this.modal.visible = true;
      })
    },
    add(item) {
      this.modal.visible = false;
      this.table.contents.push(item)
    },
    update(item) {
      this.modal.visible = false;
      this.table.contents.splice(this.modal.index, 1, item);
    },
  }
}
</script>

<template>
  <base-modal
      title="مدیریت سوالات"
      :visible="visible"
      @close="$emit('update:visible', false)"
      full-screen>

    <base-card-layout
        button-title="تعریف سوال جدید"
        @buttonClick="define"
    >

      <base-table
          :headers="table.headers"
          :items="table.contents"
          :actions="table.actions"
      />
    </base-card-layout>

    <single-question-modal
        v-if="modal.visible"
        :visible.sync="modal.visible"
        :data="modal.data"
        :questionId="questionId"
        :initialize="modal.initialize"
        @add="add"
        @update="update"
    />
  </base-modal>
</template>

<style scoped>

</style>
