<script>
export default {
  name: "Roles",
  props: {
    initialize: Object,
  },
  data() {
    return {
      model: {
        selectedRules: null,
      },
      accessPermissionRuleItems: [],
    }
  },
  created() {
    this.accessPermissionRuleItems = this.initialize.accessPermissionRuleItems;
  },
  watch: {
    initialize: {
      handler() {
        console.log(this.initialize)
        // this.accessPermissionRuleItems = this.initialize['accessPermissionRuleItems'];
      }
    }
  }
}
</script>

<template>
  <v-container>
    <v-treeview
        v-model="model.selectedRules"
        :open-all="false"
        selectable
        item-text="title"
        item-key="providerKey"
        item-children="children"
        :items="accessPermissionRuleItems">
    </v-treeview>
  </v-container>
</template>

<style scoped>

</style>