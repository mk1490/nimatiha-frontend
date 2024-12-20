<script>
import xlsx from "json-as-xlsx";

export default {
  name: "TestSelectionDownloadModal",
  props: {
    visible: Boolean,
    initialize: Object,
  },
  data() {
    return {
      model: {
        test: null,
      }
    }
  },
  methods: {
    downloadExcel() {

      if (!this.model.test) {
        this.$toast.error('انتخاب آزمون اجباری است.')
        return
      }


      this.httpGet(`/answered-tests/download-excel/${this.model.test}`, result => {
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
          {label: 'ناحیه', value: 'zone'},
          // {label: 'زمان', value: 'creationTime'},
          {label: 'مجموع امتیاز', value: 'totalScore'},
        ]


        let hasDataIndex = -1;
        result.map((f, i) => {
          if (f.stringifyData && f.stringifyData.length > 0 && hasDataIndex == -1) {
            hasDataIndex = i;
          }
        })

        const questionIds = [];

        for (let i = 0 ; i < result[hasDataIndex].stringifyData.length; i++){
          questionIds.push(`index_${i}`)
        }


        result[hasDataIndex].stringifyData.map((questionItem, questionIndex) => {
          _h.push({
            label: questionItem.questionTitle,
            value: questionItem.questionTitle
          })
        })
        let _c = [...result].map((f, i) => {
          f.row = i + 1;
          return f;
        })


        result.map((f, i) => {
          f.stringifyData.map((questionItem, questionIndex) => {
            _c[i][questionItem.questionTitle] = questionItem.answerContent
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
  }
}
</script>

<template>
  <base-modal
      title="انتخاب آزمون جهت دانلود پاسخ‌نامه"
      @submit="downloadExcel()"
      :visible="visible">
    <base-select
        label="آزمون"
        :items="initialize.publishedTests"
        v-model="model.test"
        item-text="title"
        item-value="id"
    />
  </base-modal>
</template>

<style scoped>

</style>
