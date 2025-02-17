<script>
import QuestionnaireModal from "@/view/components/Admin/Questionnaire/QuestionnaireModal.vue";
import FormTemplate from "@/view/components/Admin/Questionnaire/FormBankModal/FormTemplate.vue";

export default {
  name: "QuestionnaireManagement",
  components: {FormTemplate, QuestionnaireModal},
  created() {
    this.httpGet(`/test-template/list`, result => {
      this.table.contents = result;
    })
  },
  data() {
    return {
      table: {
        headers: [
          {text: 'عنوان', value: 'title'},
          {text: 'نمایش عمومی در پروفایل', value: 'visible'},
          {text: 'اسلاگ', value: 'slug'},
        ],
        contents: [],
        actions: [
          {
            title: 'ویرایش',
            icon: 'mdi-pen',
            click: item => {
              this.httpGet(`/test-template/${item.id}`, result => {
                this.modal.index = this.table.contents.indexOf(item);
                this.modal.data = result.data;
                this.modal.initialize = result.initialize;
                this.modal.visible = true;
              })

            }

          },
          {
            title: 'حذف',
            icon: 'mdi-delete',
            color: 'red',
            click: item => {
              this.httpDelete(`/test-template/${item.id}`, result => {
                this.table.contents.splice(this.table.contents.indexOf(item));
              });
            }
          }
        ],
      },
      modal: {
        visible: false,
        initialize: null,
        index: -1,
        formBanks: {
          visible: false,
          initialize: null,
          data: null,
        }
      }
    }
  },
  methods: {
    define() {
      this.httpGet(`/test-template/initialize`, result => {
        this.modal.initialize = result;
        this.modal.data = null;
        this.modal.visible = true;
      })
    },
    addItem(data) {
      this.table.contents.push(data);
      this.modal.visible = false;
    },
    updateItem(data) {
      this.table.contents.splice(this.modal.index, 1, data)
      this.modal.visible = false;
    },
    changeStatus(item, event) {
      this.httpPut(`/test-template/change-status/${item.id}`, {
        status: event
      }, result => {
        this.$toast.success('تغییر وضعیت با موفقیت انجام شد.')
      })
    },
    formBanks() {
      this.modal.formBanks.visible = true;
    }
  }
}
</script>

<template>
  <base-card-layout
      @buttonClick="define"
      button-title="انتشار پرسش نامه جدید"
      title="فرم‌ساز">

    <template v-slot:button-area>
      <base-button
          @click="formBanks"
          class="mx-1"
          label="بانک فرم‌ها"
      />
    </template>

    <base-table
        :items="table.contents"
        :actions="table.actions"
        :headers="table.headers">
      <template v-slot:item.visible="{item}">
        <div class="d-flex justify-center">
          <v-switch
              inset
              @change="changeStatus(item, $event)"
              v-model="item.visible"

          />
        </div>
      </template>
    </base-table>

    <questionnaire-modal
        v-if="modal.visible"
        :visible.sync="modal.visible"
        :data="modal.data"
        :initialize="modal.initialize"
        @add="addItem"
        @update="updateItem"/>


    <form-template
        v-if="modal.formBanks.visible"
        :visible.sync="modal.formBanks.visible"
    />

  </base-card-layout>
</template>

<style scoped>

</style>
