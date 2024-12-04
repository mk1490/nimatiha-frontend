<script>
import FormTemplateModal from "@/view/components/Admin/FormTemplates/FormTemplateModal.vue";
import ItemsModal from "@/view/components/Admin/FormTemplateItems/ItemsModal.vue";

export default {
  name: "FormTemplate",
  components: {ItemsModal, FormTemplateModal},
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
              await this.$router.push({
                path: `form-templates/${item.id}`
              });
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
  <base-card-layout
      @buttonClick="define"
      title="قالب فرم‌ها"
      button-title="تعریف فرم جدید">
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


  </base-card-layout>
</template>

<style scoped>

</style>
