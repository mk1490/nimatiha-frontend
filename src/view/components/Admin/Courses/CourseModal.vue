<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import BaseTabLayout from "@/view/widget/Base/BaseTabLayout.vue";

export default {
  name: "CourseModal",
  components: {BaseTabLayout},
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
      this.model.content = this.data['content'];
      this.model.joinedCategoryIds = this.data['joinedCategoryIds'];
    }
  },
  data() {
    return {
      tabs: [
        {title: 'مشخصات کلی'},
        {title: 'ویژگی‌ها'},

      ],
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
        specifications: [],
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
    <base-tab-layout :tabs="tabs">


      <template v-slot:tab-1>

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
      </template>
      <template v-slot:tab-2>
        <v-container>
          <div class="row">
            <div
                v-for="(item, index) in model.specifications"
                class="col-12">

              <div class="row">
                <div class="col-6">
                  <base-text-field
                      v-model="model.specifications[index].title"
                      label="عنوان"/>
                </div>
                <div class="col-6">
                  <base-text-field
                      v-model="model.specifications[index].value"
                      label="متن"/>
                </div>

              </div>
            </div>


          </div>
        </v-container>
      </template>

    </base-tab-layout>


  </base-modal>
</template>

<style scoped>

</style>
