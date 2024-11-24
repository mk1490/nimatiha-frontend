<template>
  <base-modal
      :title="!data? 'تعریف فرم جدید': 'ویرایش فرم'"
      :visible.sync="visible"
      @submit="submit">
    <div class="row">
      <div class="col-12">
        <base-text-field
            label="عنوان فرم"
            v-model="model.title"
        />
      </div>


    </div>
  </base-modal>
</template>

<script>

export default {
  name: "FormTemplateModal",
  emits: ['update', 'add'],
  props: {
    visible: Boolean,
    data: Object,
  },
  data() {
    return {
      model: {
        title: null,
      }
    }
  },
  methods: {
    submit() {
      let payload = {
        title: this.model.title,
      }
      if (this.data) {
        this.httpPut(`/form-template/${this.data.id}`, payload, result => {
          this.$emit('update', result);
        })
      } else {
        this.httpPost(`/form-template`, payload, result => {
          this.$emit('add', result);
        })
      }
    }
  }
}
</script>

<style scoped>

</style>