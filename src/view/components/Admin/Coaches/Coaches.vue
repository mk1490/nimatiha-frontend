<script>
import CoachModal from "@/view/components/Admin/Coaches/CoachModal.vue";
import CoachCategoriesManagement from "@/view/components/Admin/Coaches/Modals/CoachCategoriesManagement.vue";

export default {
  name: "Coaches",
  components: {CoachCategoriesManagement, CoachModal},
  created() {
    this.httpGet(`/coach/list`, result => {
      this.table.contents = result;
    })
  },
  methods: {
    define() {
      this.httpGet(`/coach/initialize`, result => {
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
      this.table.contents.splice(this.modal.index, 1, data);
      this.modal.visible = false;
    },
    showCategoryModal() {
      this.httpGet(`/coach-category/list`, result => {
        this.modal.category.data = result;
        this.modal.category.visible = true;
      })

    }
  },
  data() {
    return {
      table: {
        headers: [
          {text: 'نام', value: 'name'},
          {text: 'نام خانوادگی', value: 'family'},
          {text: 'کد ملّی', value: 'nationalCode'},
          {text: 'شماره همراه', value: 'mobileNumber'}
        ],
        contents: [],
        filters: [
          {
            type: 'text',
            value: 'name',
          },
          {
            type: 'text',
            value: 'family',
          },
          {
            type: 'text',
            value: 'nationalCode',
          },
          {
            type: 'text',
            value: 'mobileNumber',
          }
        ],
        actions: [
          {
            title: 'ویرایش',
            icon: 'mdi-pen',
            click: item => {
              this.httpGet(`/coach/${item.id}`, result => {
                this.modal.index = this.table.contents.indexOf(item);
                this.modal.initialize = result.initialize;
                this.modal.data = result.data;
                this.modal.visible = true;
              })

            }
          },
          {
            title: 'حذف',
            icon: 'mdi-delete',
            color: 'error',
            click: item => {

            }
          }
        ],
      },
      modal: {
        visible: false,
        data: null,
        initialize: null,
        category: {
          visible: false,
          data: null,
        }
      }
    }
  }
}
</script>

<template>
  <base-card-layout
      button-title="تعریف مربی جدید"
      @buttonClick="define"
      title="مربیان">

    <template #button-area>
      <base-button
          class="mx-1"
          @click="showCategoryModal"
          label="دسته‌بندی مربیان"
      />
    </template>

    <base-table
        :items="table.contents"
        :headers="table.headers"
        :actions="table.actions"
        :filters="table.filters"
    />


    <coach-modal
        v-if="modal.visible"
        :visible.sync="modal.visible"
        :data="modal.data"
        :initialize="modal.initialize"
        @add="addItem"
        @update="updateItem"
    />


    <coach-categories-management
        v-if="modal.category.visible"
        :visible.sync="modal.category.visible"
        :data="modal.category.data"

    />

  </base-card-layout>
</template>

<style scoped>

</style>
