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
          {text: 'فعال بودن', value: 'active'}
        ],
        contents: [],
        actions: [
          {
            title: 'ویرایش',
            icon: 'mdi-pen',
            click: (item) => {
              this.httpGet(`/published-test/${item.id}`, result => {
                this.modal.visible = true;
                this.modal.initialize = result.initialize;
                this.modal.data = result.data;
              })
            }
          },
          {
            title: 'حذف',
            color: 'red',
            icon: 'mdi-delete',
            click: (item) => {
              this.httpDelete(`/published-test/${item.id}`, result => {
                this.table.contents.splice(this.table.contents.indexOf(item), 1);
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
      this.httpGet(`/published-test/initialize`, result => {
        this.modal.initialize = result;
        this.modal.data = null;
        this.modal.visible = true;
      })

    },
    addItem(data) {
      this.table.contents.push(data);
      this.modal.visible = false;
    },
    changeStatus(item, event) {
      this.httpPut(`/published-test/change-status/${item.id}`, {
        status: event
      }, result => {
        this.$toast.success('تغییر وضعیت با موفقیت انجام شد.')
      })
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

      <template v-slot:item.active="{item}">
        <div class="d-flex justify-center">
          <v-switch
              inset
              @change="changeStatus(item, $event)"
              v-model="item.isActive"

          />
        </div>
      </template>
    </base-table>


    <published-test-modal
        v-if="modal.visible"
        :visible.sync="modal.visible"
        :initialize="modal.initialize"
        :data="modal.data"
        @add="addItem"

    />

  </base-card-layout>
</template>

<style scoped>

</style>
