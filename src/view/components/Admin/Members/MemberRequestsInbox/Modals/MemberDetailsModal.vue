<template>
  <base-modal
      width="800"
      title="مشاهده جزئیات کاربر"
      hide-submit-button
      @close="$emit('update:visible', false)"
      :visible="visible">

    <template v-slot:footer-submit-area>
      <v-btn
          color="primary"
          @click="$emit('onEditClick')">
        ویرایش مشخصات
      </v-btn>
    </template>

    <v-tabs
        align-with-title
        centered
        fixed-tabs
        v-model="tab">
      <v-tab>
        اطلاعات فردی
      </v-tab>
      <v-tab>
        مشخّصات والدین
      </v-tab>
      <v-tab>
        وضعیت تحصیلی - آموزشی
      </v-tab>
      <v-tab>
        سوابق اجرایی
      </v-tab>
      <v-tab>
        سوابق آموزشی - فرهنگی
      </v-tab>
      <v-tab>
        دوره‌های آموزشی
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-container>
        <v-tab-item
            v-if="tab === 0"
            :key="0"
            :value="0">

          <base-key-value-simple-table
              :items="model.personal.items"
          />

        </v-tab-item>
        <v-tab-item
            v-if="tab === 1"
            :key="1"
            :value="1">

          <base-key-value-simple-table
              :items="model.parents.items"
          />

        </v-tab-item>
        <v-tab-item
            v-if="tab === 2"
            :key="2"
            :value="2">

          <base-key-value-simple-table
              :items="model.educational.items"
          />

        </v-tab-item>
      </v-container>

    </v-tabs-items>


  </base-modal>
</template>

<script>
import {addCommas} from "@persian-tools/persian-tools";
import BaseKeyValueSimpleTable from "@/view/widget/Base/BaseKeyValueSimpleTable.vue";

export default {
  name: "MemberDetailsModal",
  components: {BaseKeyValueSimpleTable},
  props: {
    data: Object,
    visible: Boolean,
  },
  emits: ['onEditClick'],
  created() {
    if (this.data) {
      this.model.personal.headers.map(f => {
        this.model.personal.items.push({
          title: f.title,
          value: this.data.model[f.key]
        })
      })
      this.model.parents.headers.map(f => {
        this.model.parents.items.push({
          title: f.title,
          value: this.data.model[f.key]
        })
      })
      this.model.educational.headers.map(f => {
        this.model.educational.items.push({
          title: f.title,
          value: this.data.model.educational[f.key]
        })
      })

    }
  },
  data() {
    return {
      tab: 0,
      model: {
        personal: {
          headers: [
            {title: 'شماره تلفن', key: 'mobileNumber'},
            {title: 'نام', key: 'name'},
            {title: 'نام خانوادگی', key: 'family'},
            {title: 'نام پدر', key: 'fatherName'},
            {title: 'کد ملّی', key: 'nationalCode'},
            {title: 'تاریخ تولّد', key: 'birthDate'},
            {title: 'وضعیت معلولیت', key: 'disabilityStatus'},
            {title: 'شرح معلولیت', key: 'disabilityDescription'},
            {title: 'مذهب', key: 'religion'},
            {title: 'سابقه بیماری', key: 'diseaseBackground'},
            {title: 'شهرستان محل سکونت', key: 'city'},
            {title: 'نشانی محلّ سکونت', key: 'address'},
          ],
          items: [],
        },
        parents: {
          headers: [
            {title: 'نام پدر', key: 'fatherName'},
            {title: 'نام خانوادگی پدر', key: 'fatherFamily'},
            {title: 'تحصیلات پدر', key: 'fatherEducationLevel'},
            {title: 'وضعیت حیات پدر', key: 'fatherEducationLevelFifeSituation'},
            {title: 'نام مادر', key: 'motherName'},
            {title: 'نام خانوادگی مادر', key: 'motherFamily'},
            {title: 'تحصیلات مادر', key: 'motherEducationLevel'},
            {title: 'وضعیت حیات مادر', key: 'motherEducationLevelFifeSituation'},
            {title: 'وضعیت تک فرزندی', key: 'singleChild'},
            {title: 'تعداد اعضای خانواده', key: 'familyMembers'},
          ],
          items: [],
        },
        educational: {
          headers: [
            {title: 'مقطع', key: 'educationGrade'},
            {title: 'پایه', key: 'schoolGrade'},
            {title: 'رشته تحصیلی', key: 'educationField'},
            {title: 'محل تحصیل', key: 'educationField'},
            {title: 'معدل', key: 'educationField'},
            {title: 'نام مدرسه', key: 'schoolName'},
            {title: 'نام مدیر', key: 'managerName'},
            {title: 'نام معاون پرورشی', key: 'breedingAssistantName'},
          ],
          items: [],
        },
        information: {},
        products: {
          headers: [
            {text: 'عنوان', value: 'title'},
            {text: 'تولید بومی', value: 'ownProduct'},
          ],
          items: [],
        }
      }
    }
  },
  methods: {
    async downloadItem(item) {
      window.open(this.serverAddress + item.url)
    },
  }
}
</script>

<style scoped>
.details--attachments span {
  font-family: VazirmatnUIFD, serif;
}

a {
  font-family: VazirmatnUIFD, serif;
}
</style>