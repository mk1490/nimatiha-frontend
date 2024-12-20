<script>
import FormTemplateModal from "@/view/components/Admin/FormTemplates/FormTemplateModal.vue";
import ItemsModal from "@/view/components/Admin/FormTemplateItems/ItemsModal.vue";
import AnswerSheetDetailsModal from "./AnswerSheetDetailsModal.vue";
import xlsx from "json-as-xlsx";

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
      this.httpGet(`/answered-tests/download-excel`, result => {
        if (result.length == 0)
          this.$swal.fire({
            icon: 'warning',
            text: 'موردی جهت دانلود وجود ندارد!'
          })
        const _h = [
          {label: 'ردیف', value: 'row'},
          {label: 'شماره تلفن همراه', value: 'mobileNumber'},
          {label: 'نام', value: 'name'},
          {label: 'نام خانوادگی', value: 'family'},
          {label: 'کد ملّی', value: 'nationalCode'},
          {label: 'نام مدرسه', value: 'schoolName'},
          {label: 'پایه تحصیلی', value: 'educationLevel'},
          {label: 'شهرستان', value: 'city'},
          {label: 'ناحیه', value: 'city'},
          // {label: 'زمان', value: 'creationTime'},
          {label: 'مجموع امتیاز', value: 'totalScore'},
        ]

        result[0].stringifyData.map((questionItem, questionIndex) => {
          _h.push({
            label: questionItem.questionTitle,
            value: questionItem.id
          })
        })
        let _c = [...result].map((f, i) => {
          f.row = i + 1;
          return f;
        })


        result.map((f, i) => {
          f.stringifyData.map((questionItem, questionIndex) => {
            _c[i][questionItem.id] = questionItem.answerContent
          })
        })

        try {
          let settings = {
            fileName: `Nimkatiha_survey_response_template_${this.faToEn(this.getPersianTime(new Date(), 'YYYY_MM_DD_HH_mm_ss'))}`,
            writeMode: "writeFile",
            RTL: true,
            writeOptions: {},
          }
          xlsx([{
            sheet: 'Main',
            content: _c,
            columns: _h,
          }], settings);
        } catch (e) {
          console.error(e)
        }
      })

    },
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


  </base-card-layout>
</template>

<style scoped>

</style>
