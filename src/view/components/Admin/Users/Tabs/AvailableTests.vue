<script>
import BaseSelect from "@/view/widget/Base/BaseSelect.vue";

export default {
  name: "AvailableTests",
  components: {BaseSelect},
  props: {
    initialize: Object,
    value: Object,
  },
  created() {
    if (this.value) {
      this.model.availableTemplates = this.value;
    }
  },
  data() {
    return {
      model: {
        availableTemplates: []
      }
    }
  },
  watch: {
    'model.availableTemplates': {
      handler() {
        this.$emit('input', this.model.availableTemplates)
      },
      deep: false,
    }
  }
}
</script>

<template>
  <v-container>
    <base-select
        :items="initialize['availableTemplates']"
        multiple
        item-text="title"
        item-value="id"
        v-model="model.availableTemplates"
    />
  </v-container>
</template>

<style scoped>

</style>