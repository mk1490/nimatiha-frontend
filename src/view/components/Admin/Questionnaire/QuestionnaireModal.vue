<script>
import BaseSelect from "@/view/widget/Base/BaseSelect.vue";

export default {
  name: "QuestionnaireModal",
  components: {BaseSelect},
  props: {
    visible: Boolean,
    data: Object,
    initialize: Object,
  },
  emits: ['add', 'update'],
  created() {
    if (this.data) {
      this.model.title = this.data.title;
      this.model.slug = this.data.slug;
      this.items = [...this.data.items];

    }

  },
  methods: {
    submit() {
      let payload = {
        ...this.model,
        items: this.items
      }
      if (this.data) {
        this.httpPut(`/test-template/${this.data.id}/`, payload, result => {
          this.$emit('update', result);
        })
      } else {
        this.httpPost(`/test-template/`, payload, result => {
          this.$emit('add', result);
        })
      }

    },
    addItem() {
      if (this.data) {
        this.httpPost(`/test-template/add-level-item/${this.data.id}/`, {}, result => {
          this.items.push({
            id: result.id,
            levelTitle: result.levelTitle,
            formId: null
          })
        })
      } else {
        this.items.push({
          levelTitle: '',
          formId: null
        })
      }

    },
    removeItem(item, index) {
      this.httpDelete(`/test-template/delete-level-item/${item.id}`, result => {
        this.items.splice(index, 1);
      })
    },
    changeForm(item, id) {
      if (this.data) {
        this.httpPut(`/test-template/update-level-item-form/${item.id}`, {
          newId: id,
        }, result => {

        })
      }

    }
  },
  data() {
    return {
      disabledValues: [],
      model: {
        title: null,
        slug: null,
      },
      selectedItems: [],
      selectedChildItem: [],
      items: [],
    }
  }
}
</script>

<template>
  <base-modal
      :title="data? 'ویرایش پرسش‌نامه ': 'تعریف پرسش‌نامه جدید'"
      @close="$emit('update:visible',false)"
      @submit="submit"
      width="800"
      :visible="visible">
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-12">
            <base-text-field
                label="عنوان"
                v-model="model.title"
            />
          </div>
          <div class="col-12">
            <base-text-field
                label="اسلاگ"
                dir="ltr"
                v-model="model.slug"
            />
          </div>
        </div>

      </div>

      <div class="col-8">
        <div class="row">
          <div
              v-for="(item, index) in items "
              class="col-12">
            <div class="row">
              <div class="col">
                <base-select
                    :items="initialize.formTemplates"
                    v-model="items[index].formId"
                    @input="changeForm(items[index], $event)"
                    label="فرم"
                />
              </div>
              <div class="col">
                <base-text-field
                    label="عنوان"
                    v-model="items[index].levelTitle"
                />
              </div>
              <div class="col-auto">
                <base-square-button
                    @click="removeItem(items[index], index)"
                    color="error"
                    icon="mdi-delete"
                    text="حذف"
                />
              </div>
            </div>
          </div>
          <div class="col-12 d-flex justify-center">
            <v-btn
                @click="addItem"
                color="primary">
              افزودن مرحله جدید
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </base-modal>
</template>

<style scoped>

</style>
