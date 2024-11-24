<template>
  <base-modal
      :title="!data? 'تعریف آیتم جدید': 'ویرایش آیتم'"
      :visible.sync="visible"
      @submit="submit">
    <div class="row">
      <div class="col-12">
        <base-text-field
            label="عنوان"
            v-model="model.label"
        />
      </div>
      <div class="col-12">
        <base-select
            label="نوع فیلد"
            :items="initialize.formTypes"
            v-model="model.type"
        />
      </div>
      <div class="col-12">
        <base-select
            label="اندازه"
            :items="[1,2,3,4,5,6,7,8,9,10,11,12]"
            v-model="model.size"
        />
      </div>
      <div class="col-12">
        <v-checkbox
            label="این فرم اجباری است"
            v-model="model.isRequired"
        />
      </div>


    </div>
  </base-modal>
</template>

<script>

import BaseSelect from "@/view/widget/Base/BaseSelect.vue";

export default {
  name: "ItemsModal",
  components: {BaseSelect},
  emits: ['update', 'add'],
  props: {
    visible: Boolean,
    data: Object,
    initialize: Object,
  },
  data() {
    return {
      model: {
        label: null,
        type: null,
        size: 12,
        isRequired: false,
      }
    }
  },
  methods: {
    submit() {
      let payload = {
        ...this.model,
        parentId: this.$route.params.parentId,
      }
      if (this.data) {
        this.httpPut(`/form-template-items/${this.data.id}`, payload, result => {
          this.$emit('update', result);
        })
      } else {
        this.httpPost(`/form-template-items`, payload, result => {
          this.$emit('add', result);
        })
      }
    }
  }
}
</script>

<style scoped>

</style>