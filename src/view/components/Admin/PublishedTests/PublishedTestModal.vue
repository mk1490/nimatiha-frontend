<script>
import QuestionsModal from "@/view/components/Admin/Tests/Questions/QuestionsModal.vue";

export default {
  name: "انتشار آزمون جدید",
  components: {QuestionsModal},
  emits: ['add'],
  props: {
    visible: Boolean,
    data: Object,
    initialize: Object,
  },
  methods: {
    submit() {
      this.httpPost(`/published-test`, {
        testId: this.model.test,
        isRandom: this.model.isRandom,
      }, result => {
        this.$emit('add', result);
      })
    }
  },
  data() {
    return {
      model: {
        test: null,
        isRandom: false,
      }
    }
  }

}
</script>

<template>
  <base-modal
      v-if="visible"
      title="تعریف آزمون جدید"
      @close="$emit('update:visible', false)"
      @submit="submit"
      :visible="visible">

    <div class="row">
      <div class="col-12">
        <base-select
            label="آزمون"
            :items="initialize.tests"
            v-model="model.test"
        />
      </div>
      <div class="col-12">
        <v-checkbox
            label="سوالات تصادفی"
            v-model="model.isRandom"
        />
      </div>
    </div>

  </base-modal>
</template>

<style scoped>

</style>
