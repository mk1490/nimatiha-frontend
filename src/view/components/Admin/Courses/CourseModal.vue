<script>
export default {
  name: "CourseModal",
  props: {
    visible: Boolean,
    data: Object,
    initialize: Object,
  },
  created() {
    this.items.categories = this.initialize['coachCategories'];
  },
  data() {
    return {
      items: {
        categories: [],
      },
      model: {
        title: null,
        joinedCategoryIds: [],
      }
    }
  },
  methods: {
    submit() {
      this.httpPost(`/course`, this.model, result => {

      })
    }
  }
}
</script>

<template>
  <base-modal
      :title="data? 'ویرایش دوره': 'تعریف دوره جدید'"
      @close="$emit('update:visible', false)"
      @submit="submit"
      :visible="visible">

    <div class="row">
      <div class="col-12">
        <base-text-field
            label="عنوان دوره"
            v-model="model.title"
        />
      </div>

      <div class="col-12">
        <base-select
            label="دسته بندی"
            multiple
            chips
            small-chips
            deletable-chips
            :items="items.categories"
            v-model="model.joinedCategoryIds"
        />
      </div>

    </div>

  </base-modal>
</template>

<style scoped>

</style>
