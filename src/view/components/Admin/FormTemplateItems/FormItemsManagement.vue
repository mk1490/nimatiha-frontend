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
          {text: 'عنوان', value: 'label'},
          {text: 'نوع فیلد', value: 'type'}
        ],
        contents: [],
        actions: [
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
      this.table.contents.splice(this.modal.index, 1, data);
      this.modal.visible = false;
    }
  }
}
</script>

<template>
  <base-card-layout
      @buttonClick="define"
      title="آیتم‌های فیلد"
      :back-route="`/form-templates`"
      button-title="تعریف فیلد جدید"
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
        :data="modal.data"
        @add="addItem"
        @update="updateItem"
    />


  </base-card-layout>
</template>

<style scoped>

</style>
