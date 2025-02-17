<script>
import AnswerSheetDetailsModal from "@/view/components/Admin/AnswerSheets/AnswerSheetDetailsModal.vue";

export default {
  name: "AnswerSheets",
  components: {AnswerSheetDetailsModal},
  created() {
    this.httpGet(`/answer-sheet/list`, result => {
      this.table.contents = result;
    })
  },
  data() {
    return {
      modal: {
        data: null,
        initialize: null,
        visible: false,
      },
      table: {
        headers: [
          {text: 'شماره تلفن', value: 'mobileNumber'},
          {text: 'پرسش‌نامه', value: 'questionnaireTitle'},
          {text: 'زمان', value: 'time'},
        ],
        contents: [],
        actions: [
          {
            title: 'مشاهده جزئیات',
            icon: 'mdi-eye',
            click: (item) => {
              this.httpGet(`/answer-sheet/${item.questionnaireId}/${item.memberId}`, result => {
                this.modal.data = result;
                this.modal.visible = true;
              })
            }
          },
          {
            title: 'حذف',
            icon: 'mdi-delete',
            color: 'error',
            click: (item) => {

            }
          }
        ],
      }
    }
  },
  methods: {
    define() {
    },
    addItem(data) {
      this.table.contents.push(data);
      this.modal.visible = false;
    },
    updateItem(data) {

    }
  }
}
</script>

<template>
  <base-card-layout
      @buttonClick="define"
      title="پاسخ‌نامه">
    <base-table
        :items="table.contents"
        :headers="table.headers"
        :actions="table.actions">

    </base-table>

    <answer-sheet-details-modal
        v-if="modal.visible"
        :visible.sync=" modal.visible"
        :initialize="modal.initialize"
        :data="modal.data"
        @add="addItem"
        @update="updateItem"
    />


  </base-card-layout>
</template>

<style scoped>

</style>
