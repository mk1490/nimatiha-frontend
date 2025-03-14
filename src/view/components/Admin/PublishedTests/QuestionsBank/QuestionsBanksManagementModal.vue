<template>
  <base-modal
      title="بانک سؤالات آزمون"
      width="600"
      @close="$emit('update:visible', false)"
      :visible="visible">

    <template v-slot:toolbar-action>
      <base-button
          @click="define"
          label="تعریف بانک سؤال جدید"
      />
    </template>


    <base-table
        :headers="table.headers"
        :items="table.contents"
        :actions="actions"
    />


    <define-or-edit-question-bank-modal
        v-if="modal.questions.visible"
        :visible.sync="modal.questions.visible"
        :data="modal.questions.data"
        :question-id="modal.questions.id"
        @add="addItem"
    />

  </base-modal>
</template>

<script>
import QuestionsModal from "@/view/components/Admin/PublishedTests/QuestionsBank/DefineOrEditQuestionBankModal.vue";
import DefineOrEditQuestionBankModal
  from "@/view/components/Admin/PublishedTests/QuestionsBank/DefineOrEditQuestionBankModal.vue";

export default {
  name: "QuestionsBankModal",
  components: {DefineOrEditQuestionBankModal, QuestionsModal},
  props: {
    visible: Boolean,
    picker: {
      type: Boolean,
      default: false
    },
  },
  emits: ['pick'],
  created() {
    this.httpGet(`/question-bank/list`, result => {
      this.table.contents = result;
    })
  },
  computed: {
    actions() {

      const final = [
        {
          title: 'ویرایش',
          icon: 'mdi-pen',
          click: (item) => {
            this.httpGet(`/question-bank/${item.id}`, result => {
              this.modal.questions.data = result;
              this.modal.questions.id = item.id;
              this.modal.questions.visible = true;
            })
          }
        }
      ];

      if (this.picker) {
        final.push({
          title: 'انتخاب',
          icon: 'mdi-cursor-pointer',
          click: (item) => {
            this.$emit('pick', item);
          }
        })
      }


      return final;
    }
  },
  data() {
    return {
      table: {
        headers: [
          {text: 'عنوان', value: 'title'},
          {text: 'تعداد سوالات', value: 'questionsCount'},
        ],
        contents: [],

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
  methods: {
    define() {
      this.httpGet(`/question-bank/initialize`, result => {
        this.modal.questions.id = result.id;
        this.modal.questions.visible = true;
      })
    },
    addItem(data) {
      this.modal.visible = false;
      this.table.contents.push(data);
    }
  }
}
</script>

<style scoped>

</style>