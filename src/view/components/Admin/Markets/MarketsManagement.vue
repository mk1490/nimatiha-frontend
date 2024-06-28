<template>
  <base-card-layout
      button-title="تعریف بازارچه جدید"
      @buttonClick="defineMarkets"
      title="مدیریت بازارچه‌ها">

    <base-table
        :actions="table.actions"
        :items="table.contents"
        :headers="table.headers">

    </base-table>
    <define-or-edit-market-modal
        v-if="modal.visible"
        :visible.sync="modal.visible"
        :data="modal.data"
        @add="addItem"
        @update="updateItem"
    />
  </base-card-layout>


</template>
<script>
import DefineOrEditMarketModal from "@/view/components/Admin/Markets/DefineOrEditMarketModal.vue";

export default {
  name: "MarketsManagement",
  components: {DefineOrEditMarketModal},
  created() {
    this.httpGet(`/market/list`, result => {
      this.table.contents = result;
    })
  },
  data() {
    return {
      table: {
        headers: [
          {text: 'عنوان', value: 'title'},
          {text: 'تعداد میز', value: 'desksCount'},
        ],
        contents: [],
        actions: [
          // {
          //   icon: 'mdi-eye',
          //   title: 'مشاهده جزئیات',
          //   click: (event) => {
          //
          //   }
          // },
          {
            icon: 'mdi-sofa',
            title: 'مشاهده میزها',
            click: (item) => {
              this.$router.push({
                name: 'desks',
                params: {
                  marketId: item.id
                }
              })
            }
          },
          {
            icon: 'mdi-delete',
            title: 'حذف',
            color: 'red',
            click: (item) => {
              this.httpDelete(`/market/${item.id}`, result => {
                this.table.contents.splice(this.table.contents.indexOf(item), 1);
              })
            }
          },
        ],
      },
      modal: {
        visible: false,
        data: null,
      }
    }
  },
  methods: {
    defineMarkets() {
      this.modal.data = null;
      this.modal.visible = true;
    },
    addItem(data) {
      this.modal.visible = false;
      this.table.contents.push(data);
    },
    updateItem(data) {
      this.table.contents.splice(this.modal.index, 1, data);
    },

  }
}
</script>
<style scoped>

</style>