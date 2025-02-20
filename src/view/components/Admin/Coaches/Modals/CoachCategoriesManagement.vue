<script>
export default {
  name: "CoachCategoriesManagement",
  props: {
    visible: Boolean,
    data: Object,
  },
  created() {
    if (this.data) {
      this.data.map(f => {
        this.model.push({
          ...f,
          isEdit: false,
        })
      })

    }
  },
  data() {
    return {
      model: [],
    }
  },
  methods: {
    addItem() {
      this.model.push({
        title: null,
      })
    },
    deleteItem(item, index) {
      if (item.id) {
        this.httpDelete(`/coach-category/${item.id
        }`, result => {
          this.model.splice(index, 1);
        })

      } else {
        this.model.splice(index, 1);
      }

    },
    editItem(index) {
      let oldItem = {...this.model[index]}
      oldItem.isEdit = !oldItem.isEdit

      if (!oldItem.isEdit) {
        this.httpPost(`/coach-category/add-update/${oldItem.id ? oldItem.id : ''}`, {
          title: oldItem.title,
        }, result => {
          oldItem.id = result.id;
          this.model.splice(index, 1, oldItem);
        })
      } else {
        this.model.splice(index, 1, oldItem);
      }
    },
  }
}
</script>

<template>
  <base-modal
      title="دسته‌بندی مربیان"
      :visible="visible"
      hide-submit-button
      @close="$emit('update:visible', false)">
    <template #toolbar-action>
      <base-button
          @click="addItem"
          label="تعریف دسته جدید"
      />
    </template>
    <div class="row">
      <div
          v-for="(item, index) in model"
          class="col-12">
        <div class="row">

          <div class="col">
            <base-text-field
                :label="`عنوان ` + (index +1) "
                :disabled="!model[index].isEdit"
                v-model="model[index].title"
            />
          </div>
          <div class="col-auto">
            <div class="d-inline-flex">
              <base-square-button
                  text="حذف"
                  :icon="item.isEdit? 'mdi-check': 'mdi-pen'"
                  class="mx-1"
                  @click="editItem(index)"
              />

              <base-square-button
                  text="حذف"
                  color="error"
                  icon="mdi-delete"
                  @click="deleteItem(item, index)"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  </base-modal>
</template>

<style scoped>

</style>
