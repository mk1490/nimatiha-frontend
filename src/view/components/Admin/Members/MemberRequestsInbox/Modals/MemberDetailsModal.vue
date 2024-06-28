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
          <v-simple-table>
            <template v-slot:default>
              <tbody>
              <tr
                  v-for="item in model.information.table.items">
                <td>{{ item.title }}</td>
                <td>{{ item.value }}</td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-tab-item>
        <v-tab-item
            v-if="tab === 1"
            :key="1"
            :value="1">

          <base-key-value-simple-table
              :items="model.personal"
          />

        </v-tab-item>
        <v-tab-item
            v-if="tab === 2"
            :key="2"
            :value="2">
          <v-simple-table>
            <template v-slot:default>
              <tbody>
              <tr
                  v-for="item in model.documents"
                  :key="item.value">
                <td>{{ item.title }}</td>
                <td>

                  <div v-if="item.url">
                    <a
                        @click="downloadItem(item)">
                      دانلود
                    </a>
                  </div>
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>

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
      this.model.products.items = this.data.model.productItems
      this.model.documents = this.data.model.uploadedDocuments;

      this.model.information.table.items = this.model.information.table.headers.map(f => {
        let content = this.data.model[f.key];
        switch (f.key) {
          case 'creationTime':
            content = this.getPersianTime(content);
            break;
          case 'disabilityStatus': {
            content = this.data.initialize.disabilityStatus.find(x => x.value === content).title
            break;
          }
          case 'maritalStatus': {
            content = this.data.initialize.maritalStatus.find(x => x.value === content).title
            break;
          }
          case 'educationLevel': {
            content = this.data.initialize.educationLevels.find(x => x.value === content).title
            break;
          }
          case 'birthDate':
            const date = new Date(content);
            content = this.getPersianTime(date, 'DD MMMM YYYY');
            break;
        }
        return {
          title: f.title,
          value: content,
        }
      })

    }
  },
  data() {
    return {
      tab: 0,
      model: {
        personal: [

        ]
        information: {
          table: {
            headers: [
              {title: 'شماره تلفن', key: 'mobileNumber'},
              {title: 'نام', key: 'name'},
              {title: 'نام خانوادگی', key: 'family'},
              {title: 'نام پدر', key: 'fatherName'},
              {title: 'کد ملّی', key: 'nationalCode'},
              {title: 'وضعیت ازدواج', key: 'maritalStatus'},
              {title: 'تعداد فرزندان', key: 'childrenCounts'},
              {title: 'میزان تحصیلات', key: 'educationLevel'},
              {title: 'وضعیت معلولیت', key: 'disabilityStatus'},
              {title: 'شرح معلولیت', key: 'disabilityDescription'},
              {title: 'نشانی محلّ سکونت', key: 'address'},
            ],
            items: [],
          }
        },
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