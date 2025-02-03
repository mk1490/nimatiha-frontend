<template>
  <base-modal
      :title="data? 'ویرایش گروه کاربری': 'تعریف گروه کاربری جدید'"
      :visible="visible"
      @submit="submitAndSendToServer"
      @close="$emit('update:visible', false)">
    <div class="row">
      <div class="col-12">
        <v-text-field
            outlined
            dense
            hide-details
            :label="$t('accessPermissions.modal.form.title')"
            v-model="model.title"
        >
        </v-text-field>
      </div>
      <div class="col-12">
        <v-treeview
            :open-all="true"
            selectable
            v-model="model.items"
            item-text="title"
            item-key="providerKey"
            item-children="children"
            :items="accessPermissionItems">

        </v-treeview>
      </div>
    </div>
  </base-modal>
</template>

<script>
export default {
  name: "DefineOrEditAccessPermissionGroupModal",
  props: {
    visible: Boolean,
    data: undefined,
  },
  emits: ['add', 'update'],
  async created() {
    console.log(this.data)
    if (this.data.model) {

    } else {
      this.accessPermissionItems = this.data;
    }
  },
  data() {
    return {
      accessPermissionItems: [],
      model: {
        title: null,
        items: [],
      }
    }
  },
  methods: {
    async submitAndSendToServer() {
      if (this.data) {
        const [err, data] = await this.to(this.http.put(`/access-permission/${this.data.id}`, this.model));
        if (!err) {
          this.$emit('onUpdateItem', data);
          this.updateItemSuccessToast();
        } else {
          this.updateItemFailedToast();
        }
      } else {
        const [err, data] = await this.to(this.http.post(`/access-permission`, this.model));
        if (!err) {
          this.$emit('onAddItem', data);
          this.addItemSuccessToast();
        } else {
          this.addItemFailedToast();
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
