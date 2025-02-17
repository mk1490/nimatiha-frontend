<script>
import AnswerSheetDetailsModal from "./AnswerSheetDetailsModal.vue";
import TestSelectionDownloadModal from "@/view/components/Admin/AnsweredTests/TestSelectionDownloadModal.vue";

export default {
  name: "AnsweredTests",
  components: {TestSelectionDownloadModal, AnswerSheetDetailsModal},
  created() {
    this.fetchData();
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
      },
      items: {
        tests: [],
      },
      filter: {
        test: null,
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

    },
    fetchData() {
      let url = `/answered-tests/list`;
      if (this.filter.test) {
        url += `?id=${this.filter.test}`
      }

      this.httpGet(url, result => {
        this.items.tests = result.initialize.tests;
        this.table.contents = result.list;
      })
    }
  },
  watch: {
    'filter.test': {
      handler() {
        this.fetchData();
      }
    }
  }
}
</script>

<template>
  <base-card-layout
      title="پاسخ‌نامه آزمون‌ها">
    <template v-slot:button-area>
      <div class="d-inline-flex">
        <base-select
            class="mx-2"
            style="max-width: 180px"
            color="primary"
            :items="items.tests"
            v-model="filter.test"
            clearable
            label="فیلتر آزمون">
        </base-select>
        <v-btn
            color="primary"
            @click="downloadExcel">
          دانلود اکسل
        </v-btn>
      </div>
    </template>


    <base-table
        :items="table.contents"
        :headers="table.headers"
        :actions="table.actions">

      <template v-slot:item.creationTime="{item}">
        {{ getPersianTime(item.creationTime) }}
      </template>
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
