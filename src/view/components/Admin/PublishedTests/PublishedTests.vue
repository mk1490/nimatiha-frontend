<script>
import PublishedTestModal from "@/view/components/Admin/PublishedTests/PublishedTestModal.vue";

export default {
  name: "PublishedTests",
  components: {PublishedTestModal},
  created() {
    this.httpGet(`/published-test/list`, result => {
      this.table.contents = result;
    })
  },
  data() {
    return {
      table: {
        headers: [
          {text: 'عنوان', value: 'title'},
          {text: 'نوع سؤال', value: 'type'}
        ],
        contents: [],
        actions: [
          {
            title: 'حذف',
            color: 'red',
            icon: 'mdi-delete',
            click: (item) => {
              this.httpDelete(`/published-test/${item.id}`, result => {

              })

            }
          }
        ],
      },
      modal: {
        visible: false,
        data: null,
        initialize: null,
      }
    }
  },
  emits: ['add', 'update'],
  methods: {
    define() {

      this.httpGet(`/published-test/initialize`, result=>{
        this.modal.initialize = result;
        this.modal.data = null;
        this.modal.visible = true;
      })

    },
    addItem(data) {
      this.table.contents.push(data);
      this.modal.visible = false;
    }
  }
}
</script>

<template>


  <base-card-layout
      @buttonClick="define"
      button-title="انتشار جدید"
      title="مدیریت آزمون‌های منتشر شده">
    <base-table
        :items="table.contents"
        :actions="table.actions"
        :headers="table.headers">
    </base-table>


    <published-test-modal
        v-if="modal.visible"
        :visible.sync="modal.visible"
        :initialize="modal.initialize"
        @add="addItem"

    />

  </base-card-layout>
</template>

<style scoped>

</style>
