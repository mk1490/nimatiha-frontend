<script>
import FormTemplateModal from "@/view/components/Admin/FormTemplates/FormTemplateModal.vue";
import ItemsModal from "@/view/components/Admin/FormTemplateItems/ItemsModal.vue";
import AnswerSheetDetailsModal from "./AnswerSheetDetailsModal.vue";

export default {
  name: "AnsweredTests",
  components: {AnswerSheetDetailsModal, ItemsModal},
  created() {
    this.httpGet(`/answered-tests/list`, result => {
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
          {text: 'پرسش‌نامه', value: 'testTitle'},
          {text: 'زمان', value: 'creationTime'},
        ],
        contents: [],
        actions: [
          {
            title: 'مشاهده جزئیات',
            icon: 'mdi-eye',
            click: (item) => {
              this.httpGet(`/answered-tests/${item.id}`, result => {
                this.modal.data = result;
                this.modal.visible = true;
              })
            }
          },
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
      title="پاسخ‌نامه آزمون‌ها">
    <base-table
        :items="table.contents"
        :headers="table.headers"
        :actions="table.actions">

      <template v-slot:item.creationTime="{item}">
        {{ getPersianTime(item.creationTime) }}
      </template>
      3
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
