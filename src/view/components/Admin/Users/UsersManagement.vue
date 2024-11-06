<template>
  <base-card-layout
      title="مدیریت کاربران"
      button-title="تعریف کاربر جدید"
      @buttonClick="defineNewUser"
  >
    <base-table
        :actions="table.actions"
        :items="table.contents"
        :headers="table.headers">

    </base-table>


    <define-or-edit-user-modal
        v-if="modal.visible"
        :visible.sync="modal.visible"
        :data="modal.data"
        :initialize="modal.initialize"
    />
  </base-card-layout>
</template>

<script>
import DefineOrEditUserModal from "@/view/components/Admin/Users/DefineOrEditUserModal.vue";
import ChangePassword from "@/view/components/Admin/Users/ChangePassword.vue";

export default {
  name: "UsersManagement",
  components: {ChangePassword, DefineOrEditUserModal},
  async created() {
    const [err, data] = await this.to(this.http.get(`/user/list`));
    if (!err) {
      this.table.contents = data;
    }

    if (
        !this.checkPermission("users.change_password") &&
        !this.checkPermission("users.update") &&
        !this.checkPermission("users.delete")) {
      this.table.headers.splice(this.table.headers.length - 1, 1)
    }
  },
  methods: {
    defineNewUser() {
      this.httpGet(`/user/initialize${!!this.data ? `?userId=${this.data.id}` : ``}`, result => {
        this.modal.initialize = result;
        this.modal.data = null;
        this.modal.visible = true;
      })

    },
    passwordChange(userItem) {
      this.modal.changePassword.data = userItem;
      this.modal.changePassword.visible = true;
    },
    passwordChanged() {
      this.modal.changePassword.visible = false;
      this.$toast.success(this.$t('user.messages.changePasswordSuccess'))
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
      const [err, data] = await this.to(this.http.get(`/user/${item.id}`));
      if (!err) {
        this.modal.index = index;
        this.modal.data = data;
        this.modal.visible = true;
      }

    },
    async itemDelete(item) {
      const modal = await this.deleteModal.show();
      if (!modal)
        return;
      const [err] = await this.to(this.http.delete(`/user/${item.id}`,));
      if (!err) {
        this.table.contents.splice(this.table.contents.indexOf(item), 1);
      }
    }
  },
  data() {
    return {
      modal: {
        visible: false,
        data: null,
        initialize: null,
        changePassword: {
          visible: false,
          data: null,
        }
      },
      table: {
        headers: [
          {
            text: this.$t('user.table.username'),
            value: 'username',
            align: 'center',
            sortable: true,
          },
          {
            text: this.$t('user.table.nameAndFamily'),
            value: 'nameAndFamily',
            align: 'center',
            sortable: true,
          },
          {
            text: this.$t('user.table.roleTitle'),
            value: 'roleTitle',
            align: 'center',
            sortable: true,
          },
          {
            text: this.$t('user.table.createDate'),
            value: 'createDate',
            align: 'center',
            sortable: true,
          },
          {
            text: this.$t('ui.actions'),
            value: 'actions',
            align: 'center',
            sortable: false,
          }
        ],
        contents: [],
      }
    }
  },
}
</script>

<style scoped>

</style>