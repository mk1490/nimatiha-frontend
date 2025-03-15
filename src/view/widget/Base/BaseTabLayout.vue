<script>
export default {
  name: "BaseTabLayout",
  props: {
    tabs: Array,
    value: Number,
    vertical: {
      type: Boolean,
      default: false,
    },
    buttonTitle: String,
    buttonVisible: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['buttonClick'],
  components: {},
  data() {
    return {
      selectedTab: this.value || 0,
    }
  },
  watch: {
    selectedTab: {
      handler() {
        this.$emit('input', this.selectedTab)
      }
    }
  }
}
</script>

<template>
  <v-container fluid>
    <div class="row pa-0" style="margin: 0!important;">
      <div class="col pa-0 ma-0">
        <v-tabs
            :vertical="vertical"
            v-model="selectedTab">
          <v-tab v-for="item in tabs">
            <v-badge
                v-if="item.count"
                :content="item.count">
              {{ item.title }}
            </v-badge>
            <template v-else>
              {{ item.title }}
            </template>
          </v-tab>


          <v-tab-item
              v-if="vertical === true"
              v-for="(item, index) in tabs">
            <slot :name="`tab-${index + 1}`"></slot>
            <component
                v-if="item.view"
                v-bind="item.data"
                :is="item.view">
            </component>
          </v-tab-item>
        </v-tabs>
      </div>
      <div
          v-if="buttonTitle && buttonVisible"
          class="col-auto">
        <v-btn
            @click="$emit('buttonClick')"
            color="primary">
          {{ buttonTitle }}
        </v-btn>
      </div>

      <div class="col-12 pa-0">
        <v-tabs-items
            color="transparent"
            v-if="!vertical "
            v-model="selectedTab">
          <v-tab-item v-for="(item, index) in tabs">
            <v-container>
              <slot :name="`tab-${index + 1}`"></slot>
              <component
                  v-if="item.view"
                  v-bind="item.data"
                  :is="item.view">
              </component>
            </v-container>
          </v-tab-item>
        </v-tabs-items>
      </div>

    </div>


    <slot></slot>
  </v-container>
</template>

<style scoped>
.v-window {
  border-radius: 1rem !important;
}

::v-deep .v-tabs {
  background-color: transparent !important;
}
</style>

