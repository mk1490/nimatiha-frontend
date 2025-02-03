<template>


  <base-card-layout
      @buttonClick="defineOrEditModal"
      title="مدیریت گروه های کاربری">

    <base-table
        :items="table.contents"
        :headers="table.headers"
        :actions="table.actions">

    </base-table>

    <define-or-edit-access-permission-group-modal
        v-if="modal.visible"
        :visible.sync="modal.visible"
        :data="modal.data"
        @add="addItem"
        @update="updateItem"/>
  </base-card-layout>

</template>

<script>
import DefineOrEditAccessPermissionGroupModal
  from "./DefineOrEditAccessPermissionGroupModal.vue";

export default {
  name: "AccessPermissionGroupsManagement",
  components: {DefineOrEditAccessPermissionGroupModal},
  async created() {
    const [err, data] = await this.to(this.http.get(`/access-permission/list`));
    if (!err) {
      this.table.contents = data;
    }

    if (
        !this.checkPermission("access_permissions.update") &&
        !this.checkPermission("access_permissions.delete")) {
      this.table.headers.splice(this.table.headers.length - 1, 1)
    }

  },
  data() {
    return {
      modal: {
        visible: false,
        data: null,
        index: 0,
      },
      table: {
        headers: [
          {
            text: this.$t('accessPermissions.table.title'),
            value: 'title',
            align: 'center',
          },
          {
            text: this.$t('ui.actions'),
            value: 'actions',
            align: 'center',
            sortable: false,

          }
        ],
        contents: [],
        actions: [
          {
            title: 'ویرایش',
            icon: 'mdi-pen',
            click: item => {

            }
          },
          {
            title: 'حذف',
            icon: 'mdi-delete',
            color: 'error',
            click: item => {
              this.httpDelete(`/access-permission/${item.id}`, result => {
                this.table.contents.splice(this.table.contents.indexOf(item), 1);
              }, error => {

              })
            }
          }
        ],
      }
    }
  },
  methods: {
    async defineOrEditModal() {
      const [err, data] = await this.to(this.http.get(`/access-permission/initialize`));
      if (!err) {
        this.modal.data = data;
        this.modal.visible = true;
      }
    },
    addItem(data) {
      this.table.contents.push(data);
      this.modal.visible = false;
    },
    updateItem(data) {
      this.table.contents.splice(this.modal.index, 1, data);
      this.modal.visible = false;
    },
    async itemEdit(item, index) {
      const [err, data] = await this.to(this.http.get(`/access-permission/${item.id}`));
      if (!err) {
        this.modal.data = data;
        this.modal.visible = true;
        this.modal.index = index;
      }

    },
    async itemDelete(item) {
      const modal = await this.deleteModal.show();
      if (!modal)
        return;

    }
  }
}
</script>

<style scoped>

</style>
