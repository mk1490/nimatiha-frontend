<script>

import FormBankQuestionItemModal
  from "@/view/components/Admin/Questionnaire/FormBankModal/FormBankQuestionItems/FormBankQuestionItemModal.vue";

export default {
  name: "FormBankQuestionItems",
  components: {FormBankQuestionItemModal},
  props: {
    visible: Boolean,
    data: Object,
    parentId: String,
  },
  created() {
    this.table.contents = this.data;
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
          {text: 'عنوان', value: 'label'},
          {text: 'نوع فیلد', value: 'type'}
        ],
        contents: [],
      }
    }
  },
  methods: {
    define() {
      this.httpGet(`/form-template-items/initialize`, result => {
        this.modal.data = null;
        this.modal.initialize = result;
        this.modal.visible = true;
      })

    },
    addItem(data) {
      this.table.contents.push(data);
      this.modal.visible = false;
    },
    updateItem(data) {
      this.table.contents.splice(this.modal.index, 1, data);
      this.modal.visible = false;
    }
  },
  computed: {
    actions() {
      return [
        {
          title: 'حرکت به بالا',
          icon: 'mdi-arrow-up',
          click: (item) => {
            const index = this.table.contents.indexOf(item);
            if (index === 0)
              return;
            this.httpPut(`/form-template-items/move/${this.parentId}/${item.id}/1`, {}, result => {
              this.table.contents.splice(index, 1, this.table.contents[index - 1]);
              this.table.contents.splice(index - 1, 1, item);
            })
          }
        },
        {
          title: 'حرکت به پایین',
          icon: 'mdi-arrow-down',
          click: (item) => {
            const index = this.table.contents.indexOf(item);
            if (index === this.table.contents.length - 1)
              return;
            this.httpPut(`/form-template-items/move/${this.parentId}/${item.id}/0`, {}, result => {

              this.table.contents.splice(index, 1, this.table.contents[index + 1]);
              this.table.contents.splice(index + 1, 1, item);
            })
          }
        },
        {
          title: 'ویرایش',
          icon: 'mdi-pen',
          click: (item) => {
            this.httpGet(`/form-template-items/${item.id}`, result => {
              this.modal.data = result.data
              this.modal.initialize = result.initialize;
              this.modal.index = this.table.contents.indexOf(item);
              this.modal.visible = true;
            })

          }
        },
        {
          title: 'حذف',
          icon: 'mdi-delete',
          color: 'error',
          click: (item) => {
            this.httpDelete(`/form-template-items/${item.id}`, result => {
              this.table.contents.splice(this.table.contents.indexOf(item));
            })
          }
        },

      ]
    }
  }
}
</script>

<template>
  <base-modal
      :visible.sync="visible"
      @close="$emit('update:visible', false)"
      full-screen
      title="آیتم‌های فیلد">

    <template v-slot:toolbar-action>
      <base-button
          label="تعریف فیلد جدید"
          @click="define"
      />
    </template>


    <base-table
        :items="table.contents"
        :headers="table.headers"
        :actions="actions">
    </base-table>

    <form-bank-question-item-modal
        v-if="modal.visible"
        :visible.sync="modal.visible"
        :initialize="modal.initialize"
        :data="modal.data"
        :parent-id="parentId"
        @add="addItem"
        @update="updateItem"
    />


  </base-modal>
</template>

<style scoped>

</style>
