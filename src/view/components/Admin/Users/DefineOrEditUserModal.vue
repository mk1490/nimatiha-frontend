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
            v-model="model.general"
        />
      </template>
      <template v-slot:tab-2="{props}">
        <roles
            v-model="model.roles"
            :initialize="initialize"
        />
      </template>
      <template v-slot:tab-3="{props}">
        <available-tests
            v-model="model.availableTemplates"
            :initialize="initialize"
        />
      </template>

    </base-tab-layout>

  </base-modal>
</template>

<script>
import BaseSelect from "@/view/widget/Base/BaseSelect.vue";
import BaseTabLayout from "@/view/widget/Base/BaseTabLayout.vue";
import General from "@/view/components/Admin/Users/Tabs/General.vue";
import Roles from "@/view/components/Admin/Users/Tabs/Roles.vue";
import AvailableTests from "@/view/components/Admin/Users/Tabs/AvailableTests.vue";

export default {
  name: "DefineOrEditUserModal",
  components: {AvailableTests, Roles, General, BaseTabLayout, BaseSelect},
  emits: ['add', 'update'],
  async created() {
    this.setInitialize();
    if (!!this.data) {
      this.model.general.id = this.data.id;
      this.model.general.username = this.data.username;
      this.model.general.name = this.data.name;
      this.model.general.family = this.data.family;
      this.model.availableTemplates = this.data.availableTemplates;
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

      let payload = {
        ...this.model.general,
        tests: this.model.availableTemplates,
        selectedRules: this.model.roles
      }
      if (!this.data) {
        const [err, data] = await this.to(this.http.post(`/user`, payload));
        if (!err) {
          this.$emit('add', data);
          this.addItemSuccessToast();
        } else {
          this.addItemFailedToast();
        }
      } else {
        const [err, data] = await this.to(this.http.put(`/user/${this.data.id}`, payload));
        if (!err) {
          this.$emit('update', data);
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
          data: {
            initialize: this.initialize,
          },
        },
        {
          title: 'پرسش‌نامه‌های دسترس',
        },
      ]
    }
  },
  data() {
    return {
      selectedTab: 0,
      roleItems: [],
      tabs: [],
      model: {
        general: {},
        roles: [],
        availableTemplates: []
      }
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