<template>
  <base-card-layout
      button-title="تعریف میز جدید"
      @buttonClick="defineNewDeskItem"
      back-route="/markets"
      title="مدیریت میزها">
    <base-table
        :headers="table.headers"
        :items="table.contents"
        :actions="table.actions"
    >

      <template v-slot:item.amount="{ item , index}">
        <div> {{ addCommas(item.amount) }}</div>
      </template>
    </base-table>

    <define-or-edit-desk-modal
        v-if="modal.visible"
        :visible.sync="modal.visible"
        :data="modal.data"
        @add="addItem"
        @update="updateItem"
    />

  </base-card-layout>
</template>
<script>
import DefineOrEditDeskModal from "@/view/components/Admin/Markets/Desks/DefineOrEditDeskModal.vue";

export default {
  name: "DesksManagement",
  components: {DefineOrEditDeskModal},
  created() {
    this.httpGet(`/market-desk/list/${this.$route.params.marketId}`, result => {
      this.table.contents = result;
    })
  },
  data() {
    return {
      modal: {
        visible: false,
        data: null,
        index: -1,
      },
      table: {
        headers: [
          {text: 'عنوان', value: 'title'},
          {text: 'قیمت', value: 'amount'},
          {text: 'شماره', value: 'number'},
          {text: 'رزرو شده', value: 'isReserved'},
        ],
        contents: [],
        actions: [
          {
            icon: 'mdi-pen',
            title: 'ویرایش',
            click: (item) => {
              this.modal.data = item;
              this.modal.index = this.table.contents.indexOf(item);
              this.modal.visible = true;
            }
          },
          {
            icon: 'mdi-delete',
            title: 'حذف',
            color: 'red',
            click: (item) => {
              this.httpDelete(`/market-desk/${item.id}`, result => {
                this.table.contents.splice(this.table.contents.indexOf(item), 1);
              })
            }
          },
        ],
      }
    }
  },
  methods: {
    defineNewDeskItem() {
      this.modal.data = null;
      this.modal.visible = true;
    },
    addItem(item) {
      this.table.contents.push(item)
      this.modal.visible = false;
    },
    updateItem(item) {
      this.table.contents.splice(this.modal.index, 1, item);
      this.modal.visible = false;
    }
  }
}
</script>
<style scoped>

</style>