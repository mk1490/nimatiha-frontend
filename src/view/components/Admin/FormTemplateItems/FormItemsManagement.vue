<script>
import FormTemplateModal from "@/view/components/Admin/FormTemplates/FormTemplateModal.vue";
import ItemsModal from "@/view/components/Admin/FormTemplateItems/ItemsModal.vue";

export default {
  name: "FormItemsManagement",
  components: {ItemsModal},
  created() {
    this.httpGet(`/form-template-items/list/${this.$route.params.parentId}`, result => {
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
          {text: 'عنوان', value: 'label'}
        ],
        contents: [],
        actions: [
          {
            title: 'ویرایش',
            icon: 'mdi-pen',
            click: (item) => {
              this.httpGet(``, result => {
                this.modal.data = {}
                this.modal.initialize = {}
                this.modal.visible = true;
              })

            }
          },
          {
            title: 'حذف',
            click: (item) => {

            }
          }
        ],
      }
    }
  },
  methods: {
    define() {
      this.httpGet(`/form-template-items/initialize`, result => {
        this.modal.initialize = result;
        this.modal.visible = true;
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
      title="آیتم های فیلد"
      :back-route="`/form-templates`"
      button-title="تعریف فرم جدید"
  >
    <base-table
        :items="table.contents"
        :headers="table.headers"
        :actions="table.actions">

    </base-table>

    <items-modal
        v-if="modal.visible"
        :visible.sync=" modal.visible"
        :initialize="modal.initialize"
        @add="addItem"
        @update="updateItem"
    />


  </base-card-layout>
</template>

<style scoped>

</style>