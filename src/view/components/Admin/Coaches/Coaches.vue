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
      this.modal.visible = true;
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
          {text: 'نام خانوادگی', value: 'family'}
        ],
        contents: [],
        actions: [
          {
            title: 'ویرایش',
            icon: 'mdi-pen',
            click: item => {
              this.modal.index = this.table.contents.indexOf(item);
              this.modal.visible = true;
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
    />


    <coach-modal
        v-if="modal.visible"
        :visible.sync="modal.visible"
        :data="modal.data"
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
