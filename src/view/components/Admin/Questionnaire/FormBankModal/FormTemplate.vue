<script>
import FormTemplateModal from "@/view/components/Admin/Questionnaire/FormBankModal/FormTemplateModal.vue";
import FormBankQuestionItems
  from "@/view/components/Admin/Questionnaire/FormBankModal/FormBankQuestionItems/FormBankQuestionItems.vue";

export default {
  name: "FormTemplate",
  components: {FormBankQuestionItems, FormTemplateModal},
  props: {
    visible: Boolean
  },
  created() {
    this.httpGet(`/form-template/list`, result => {
      this.table.contents = result;
    })
  },
  data() {
    return {
      modal: {
        data: null,
        visible: false,
        formBankQuestionItems: {
          visible: false,
          data: null,
          parentId: null,
        }
      },
      table: {
        headers: [
          {text: 'عنوان', value: 'title'}
        ],
        contents: [],
        actions: [
          {
            title: 'آیتم های فیلد',
            icon: 'mdi-format-list-bulleted-type',
            click: async (item) => {
              this.httpGet(`/form-template-items/list/${item.id}`, result => {
                this.modal.formBankQuestionItems.parentId = item.id;
                this.modal.formBankQuestionItems.data = result;
                this.modal.formBankQuestionItems.visible = true
              })

            }
          },
          {
            title: 'حذف',
            icon: 'mdi-delete',
            color: 'error',
            click: (item) => {
              this.httpDelete(`/form-template/${item.id}`, result => {
                this.table.contents.splice(this.table.contents.indexOf(item), 1);
              })
            }
          }
        ],
      }
    }
  },
  methods: {
    define() {
      this.modal.visible = true;
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
  <base-modal
      title="بانک فرم‌ها"
      :visible="visible"
      @close="$emit('update:visible', false)"
      width="800"
  >

    <template v-slot:toolbar-action>

      <base-button
          label="تعریف فرم جدید"
          @click="define"
      />

    </template>


    <template v-slot:button-area>
      <base-button
          label="بانک سؤالات"
      />
    </template>


    <base-table
        :items="table.contents"
        :headers="table.headers"
        :actions="table.actions">

    </base-table>


    <form-template-modal
        v-if="modal.visible"
        :visible.sync="modal.visible"
        @add="addItem"
        @update="updateItem"
    />


    <form-bank-question-items
        v-if="modal.formBankQuestionItems.visible"
        :visible.sync="modal.formBankQuestionItems.visible"
        :data="modal.formBankQuestionItems.data"
        :parent-id="modal.formBankQuestionItems.parentId"
    />


  </base-modal>
</template>

<style scoped>

</style>
