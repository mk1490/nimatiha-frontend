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


      <template v-if="[5, 6,7].includes(model.type)">
        <div
            v-for="(item, index) in model.items"
            class="col-12">
          <div class="row">
            <div class="col">
              <base-text-field
                  v-model="model.items[index].title"
              />
            </div>
            <div class="col-auto">
              <base-square-button
                  color="red"
                  text="حذف"
                  icon="mdi-delete"
                  @click="removeItem(index)"
              />
            </div>
          </div>

        </div>
        <div class="col-12">
          <v-btn
              color="primary"
              @click="defineNewItem"
              block>
            تعریف آیتم جدید
          </v-btn>
        </div>
      </template>


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
  created() {
    if (this.data) {
      this.model.label = this.data.label;
      this.model.type = this.data.type;
      this.model.size = this.data.size;
      this.model.isRequired = this.data.isRequired;
    }
  },
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
        items: [],
      }
    }
  },
  methods: {
    submit() {
      let payload = {
        ...this.model,
        parentId: this.$route.params.parentId,
        items: this.model.items.map(f => f.title)
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
    },
    defineNewItem() {
      this.model.items.push({
        title: ''
      })
    },
    removeItem(index) {
      this.model.items.splice(index, 1);
    }
  }
}
</script>

<style scoped>

</style>
