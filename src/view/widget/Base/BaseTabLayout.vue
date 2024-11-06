<script>
export default {
  name: "BaseTabLayout",
  props: {
    tabs: Array,
  },
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes
    },
  },
  data() {
    return {
      selectedTab: 0,
    }
  }
}
</script>

<template>
  <v-container fluid>
    <v-tabs v-model="selectedTab">
      <v-tab v-for="item in tabs">
        {{ item.title }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="selectedTab">
      <v-tab-item v-for="(item, index) in tabs">
        <slot :name="`tab-${index + 1}`"></slot>
        <component
            v-if="item.view"
            v-bind="item.data"
            :is="item.view">
          <!--          <slot :name="'tab'+ index"></slot>-->
          Pass data
        </component>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<style scoped>

</style>
