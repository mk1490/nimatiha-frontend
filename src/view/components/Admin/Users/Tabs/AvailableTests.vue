<script>
import BaseSelect from "@/view/widget/Base/BaseSelect.vue";

export default {
  name: "AvailableTests",
  components: {BaseSelect},
  props: {
    initialize: Object,
  },
  data() {
    return {
      model: {
        availableMembers: []
      }
    }
  },
  emits: {
    'model.availableMembers': {
      handler() {
        this.$emit('input', this.model)
      }
    }
  }
}
</script>

<template>
  <v-container>
    <base-select
        :items="initialize['availableMembers']"
        multiple
        item-text="title"
        item-value="id"
        v-model="model.availableMembers"
    />
  </v-container>
</template>

<style scoped>

</style>