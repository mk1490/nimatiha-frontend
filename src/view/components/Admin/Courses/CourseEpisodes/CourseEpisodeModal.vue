<script>
import BaseDateTimeTextField from "@/view/widget/Base/BaseDateTimeTextField.vue";

export default {
  name: "CourseEpisodeModal",
  components: {BaseDateTimeTextField},
  props: {
    visible: Boolean,
    data: Object,
    initialize: Object,
    parentId: String,
  },
  emits: ['add', 'update'],
  created() {
    this.items.types = this.initialize.types;
  },
  data() {
    return {
      model: {
        title: null,
        type: null,
        metaData: null,
      },
      items: {
        types: [],
        testBanks: [],
      }
    }
  },
  methods: {
    submit() {
      let payload = {
        ...this.model,
        parentId: this.parentId
      }
      if (this.data) {
        this.httpPut(`/course-episode/${this.data.id}`, payload, result => {
          this.$emit('update', result);
        })
      } else {
        this.httpPost(`/course-episode`, payload, result => {
          this.$emit('add', result);
        })
      }

    }
  }
}
</script>

<template>
  <base-modal
      title="تعریف آیتم جدید"
      @close="$emit('update:visible', false)"
      @submit="submit"
      :visible="visible">
    <div class="row">
      <div class="col-12">
        <base-text-field
            label="عنوان"
            v-model="model.title"
        />
      </div>
      <div class="col-12">
        <base-select
            label="نوع"
            :items="items.types"
            v-model="model.type"
        />
      </div>
      <div
          v-if="model.type === 1"
          class="col-12">
        <base-text-field
            label="آدرس Url ویدئو"
            v-model="model.metaData"
            dir="ltr"
        />
      </div>
      <div
          v-if="model.type === 2"
          class="col-12">
        <base-select
            label="بانک آزمون"
            :items="items.testBanks"
            v-model="model.metaData"
            dir="ltr"
        />
      </div>
    </div>
  </base-modal>
</template>

<style scoped>

</style>
