<template>
  <v-container fluid>
    <base-tab-layout
        :tabs="tabs">

      <template
          v-for="(item, index) in tabs"
          v-slot:[`tab-${index+1}`]>
        <users-management
            v-if="item.key === 'users'"
        />

        <access-permission-groups-management
            v-if="item.key === 'permissions'"
        />

      </template>

    </base-tab-layout>
  </v-container>
</template>

<script>
import BaseCardLayout from "@/view/widget/Base/BaseCardLayout.vue";
import BaseTabLayout from "@/view/widget/Base/BaseTabLayout.vue";
import UsersManagement from "./Users/UsersManagement.vue";
import AccessPermissionGroupsManagement
  from "./AccessPermissionsGroup/AccessPermissionGroupsManagement.vue";

export default {
  name: "Settings",
  components: {
    AccessPermissionGroupsManagement,
    UsersManagement,
    BaseTabLayout,
    BaseCardLayout
  },
  data() {
    return {
      tabs: [
        {title: 'کاربران', key: 'users'},
        {title: 'گروه کاربری', key: 'permissions'},
      ],
      tab: 0,
      model: {}
    }
  },
  created() {
  },

}
</script>

<style scoped>

</style>
