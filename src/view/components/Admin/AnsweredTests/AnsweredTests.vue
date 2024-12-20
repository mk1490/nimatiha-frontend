<script>
import FormTemplateModal from "@/view/components/Admin/FormTemplates/FormTemplateModal.vue";
import ItemsModal from "@/view/components/Admin/FormTemplateItems/ItemsModal.vue";
import AnswerSheetDetailsModal from "./AnswerSheetDetailsModal.vue";
import xlsx from "json-as-xlsx";
import TestSelectionDownloadModal from "@/view/components/Admin/AnsweredTests/TestSelectionDownloadModal.vue";

export default {
  name: "AnsweredTests",
  components: {TestSelectionDownloadModal, AnswerSheetDetailsModal, ItemsModal},
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
        downloadExcel: {
          data: null,
          initialize: null,
          visible: false,
        },
      },
      table: {
        headers: [
          {text: 'شماره تلفن', value: 'mobileNumber'},
          {text: 'نام و نام خانوادگی', value: 'fullName'},
          {text: 'مدرسه', value: 'fullName'},
          {text: 'پایه', value: 'educationLevel'},
          {text: 'شهرستان', value: 'city'},
          {text: 'ناحیه', value: 'zone'},
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
    downloadExcel() {
      this.httpGet(`/answered-tests/initialize`, result => {
        this.modal.downloadExcel.initialize = result;
        this.modal.downloadExcel.visible = true;
      })

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

    <template v-slot:button-area>
      <v-btn
          color="primary"
          @click="downloadExcel">
        دانلود اکسل
      </v-btn>
    </template>


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


    <test-selection-download-modal
        v-if="modal.downloadExcel.visible"
        :visible.sync="modal.downloadExcel.visible"
        :initialize="modal.downloadExcel.initialize"
    />


  </base-card-layout>
</template>

<style scoped>

</style>
