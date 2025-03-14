<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  name: "CourseModal",
  props: {
    visible: Boolean,
    data: Object,
    initialize: Object,
  },
  emits: ['add', 'update'],
  created() {
    this.items.categories = this.initialize['coachCategories'];
    if (this.data) {
      this.model.title = this.data['title'];
      this.model.joinedCategoryIds = this.data['joinedCategoryIds'];
    }
  },
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        language: {
          ui: 'fa',
          content: 'fa'
        },
        toolbar: {
          items: [
            'undo', 'redo',
            '|', 'heading',
            '|', 'bold', 'italic',
            '|', 'bulletedList', 'numberedList', 'outdent', 'indent'
          ]
        },
        cloudServices: {}
      },
      items: {
        categories: [],
      },
      model: {
        title: null,
        content: null,
        joinedCategoryIds: [],
      }
    }
  },
  methods: {
    submit() {
      if (this.data) {
        this.httpPut(`/course/${this.data.id}`, this.model, result => {
          this.$emit('update', result);
        })
      } else {
        this.httpPost(`/course`, this.model, result => {
          this.$emit('add', result);
        })
      }

    }
  }
}
</script>

<template>
  <base-modal
      :title="data? 'ویرایش دوره': 'تعریف دوره جدید'"
      @close="$emit('update:visible', false)"
      @submit="submit"
      fullscreen
      :visible="visible">

    <div class="row">
      <div class="col-12">
        <base-text-field
            label="عنوان دوره"
            v-model="model.title"
        />
      </div>
      <div class="col-12">
        <ckeditor
            :editor="editor"
            v-model="model.content" :config="editorConfig"/>
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
