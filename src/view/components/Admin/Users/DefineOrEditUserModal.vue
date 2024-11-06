<template>
  <base-modal
      :title="!data ? 'تعریف کاربر جدید' : 'ویرایش کاربر'"
      @close="$emit('update:visible', false)"
      @submit="nextOrSubmitAndSendToServer"
      :visible="visible">


    <base-tab-layout
        :tabs="tabs">
      <template v-slot:tab-1="{props}">
        <general
        />
      </template>

    </base-tab-layout>

  </base-modal>
</template>

<script>
import BaseSelect from "@/view/widget/Base/BaseSelect.vue";
import BaseTabLayout from "@/view/widget/Base/BaseTabLayout.vue";
import General from "@/view/components/Admin/Users/Tabs/General.vue";

export default {
  name: "DefineOrEditUserModal",
  components: {General, BaseTabLayout, BaseSelect},
  emits: ['onAddItem', 'onUpdateItem'],
  async created() {
    // this.roleItems = this.initialize['permissionGroupItems'];
    // this.initializeRuleId = this.initialize['permissionGroupItems'][0]['id'];
    this.setInitialize();
    if (!!this.data) {
      this.model.username = this.data.username;
      this.model.name = this.data.name;
      this.model.family = this.data.family;


    } else {

    }


  },
  props: {
    visible: Boolean,
    data: Object,
    initialize: Object,
  },
  methods: {
    back() {
      this.selectedTab -= 1;
    },
    async nextOrSubmitAndSendToServer() {
      if (this.selectedTab < 2) {
        this.selectedTab += 1;
        return
      }
      if (!this.$refs.form.validate()) {
        this.$swal.fire({
          icon: 'error',
          title: 'خطا',
          text: 'در معتبر بودن فیلدهای ورودی اطمینان حاصل نمایید.'
        })
        return;
      }
      if (!this.data) {
        const [err, data] = await this.to(this.http.post(`/user`, this.model));
        if (!err) {
          this.$emit('onAddItem', data);
          this.addItemSuccessToast();
        } else {
          this.addItemFailedToast();
        }
      } else {
        const [err, data] = await this.to(this.http.put(`/user/${this.data.id}`, this.model));
        if (!err) {
          this.$emit('onUpdateItem', data);
          this.updateItemSuccessToast();
        } else {
          this.updateItemFailedToast();
        }
      }
    },
    setInitialize() {
      this.tabs = [
        {
          title: 'مشخصات کلی',
          data: {}
        },
        {
          title: 'سطوح دسترسی',
          view: () => import('./Tabs/Roles.vue'),
          data: {
            initialize: this.initialize,
          },
        },
      ]
    }
  },
  data() {
    return {
      selectedTab: 0,
      roleItems: [],
      tabs: [],
    }
  },
  watch: {
    initialize: {
      handler() {
        this.setInitialize();
      }
    }
  }
}
</script>

<style scoped>

</style>