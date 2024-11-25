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
        <v-tab-item
            v-if="tab === 3"
            :key="3"
            :value="3">

          <base-key-value-simple-table
              :items="model.executive.items"
          />

        </v-tab-item>
        <v-tab-item
            v-if="tab === 4"
            :key="4"
            :value="4">


          <v-expansion-panels multiple>

            <v-expansion-panel>
              <v-expansion-panel-header>
                رشته‌های قرآنی
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <base-table
                    hide-default-footer
                    :headers="model.culturalAndEducational.headers"
                    :items="model.culturalAndEducational.qurani.items"
                    :items-per-page="-1"
                />
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>
                رشته‌های هنری
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <base-table
                    hide-default-footer
                    :headers="model.culturalAndEducational.headers"
                    :items="model.culturalAndEducational.artistic.items"
                    :items-per-page="-1"
                />
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>
                رشته‌های ورزشی
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <base-table
                    hide-default-footer
                    :headers="model.culturalAndEducational.headers"
                    :items="model.culturalAndEducational.sport.items"
                    :items-per-page="-1"
                />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

        </v-tab-item>
        <v-tab-item
            v-if="tab === 5"
            :key="5"
            :value="5">


          <base-key-value-simple-table
              :items="model.educationalCourses.items"
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
        let value = this.data.model[f.key];
        switch (f.key) {
          case 'disabilityStatus':
            value = this.getTitleFromInitialize('disabilityStatus', value);
            break;
          case 'diseaseBackground':
            value = this.getTitleFromInitialize('diseaseBackgroundItems', value);
            break;
        }


        this.model.personal.items.push({
          title: f.title,
          value: value
        })
      })
      this.model.parents.headers.map(f => {

        let value = this.data.model[f.key];


        switch (f.key) {
          case 'fatherEducationLevel':
            value = this.getTitleFromInitialize('educationLevels', value);
            break;
          case 'motherEducationLevel':
            value = this.getTitleFromInitialize('educationLevels', value);
            break;
          case 'fatherEducationLevelFifeSituation':
            value = this.getTitleFromInitialize('lifeSituationItems', value);
            break;
          case 'motherEducationLevelFifeSituation':
            value = this.getTitleFromInitialize('lifeSituationItems', value);
            break;
        }


        this.model.parents.items.push({
          title: f.title,
          value: value
        })
      })
      this.model.educational.headers.map(f => {
        let value = this.data.model.educational[f.key];


        switch (f.key) {
          case 'educationGrade':
            value = this.getTitleFromInitialize('educationGrades', value);

            break;
          case 'schoolGrade':
            value = this.getTitleFromInitialize('schoolGrades', value);
            break;
        }
        this.model.educational.items.push({
          title: f.title,
          value: value
        })
      })


      this.data.model.executiveHistory.map(f => {
        this.model.executive.items.push(f)
      })

      this.data.model.educationalAndHistorical.map(f => {

        if (f.category === 'qurani') {
          this.model.culturalAndEducational.qurani.items.push(f)
        }
        if (f.category === 'sport') {
          this.model.culturalAndEducational.sport.items.push(f)
        }

        if (f.category === 'artistic') {
          this.model.culturalAndEducational.artistic.items.push(f)
        }
      })

      this.model.educationalCourses.headers.map(f => {
        this.model.educationalCourses.items.push({
          title: f.text,
          value: this.data.model.educationalCourses[f.value]
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
            {title: 'محل تحصیل', key: 'educationCity'},
            {title: 'معدل', key: 'average'},
            {title: 'نام مدرسه', key: 'schoolName'},
            {title: 'نام مدیر', key: 'managerName'},
            {title: 'نام معاون پرورشی', key: 'breedingAssistantName'},
          ],
          items: [],
        },
        executive: {
          items: [],
        },
        educationalCourses: {
          headers: [
            {text: 'طرح ولایت', value: 'tarheVelayat'},
            {text: 'آستان قدس', value: 'astaneQods'},
            {text: 'اوقاف', value: 'oqaf'},
          ],
          items: [],
        },
        culturalAndEducational: {
          headers: [
            {text: 'عنوان رشته', value: 'fieldTitle'},
            {text: 'رتبه', value: 'rank'},
            {text: 'سطح', value: 'level'},
          ],
          qurani: {
            items: [],
          },
          artistic: {
            items: [],
          },
          sport: {
            items: [],
          },

        },
      }
    }
  },
  methods: {
    async downloadItem(item) {
      window.open(this.serverAddress + item.url)
    },
    getTitleFromInitialize(key, targetValue) {
      const item = this.data.initialize[key].find(x => x.value === targetValue)
      return item ? item.title : '';
    }
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
