<template>
  <base-modal
      :title="!data? 'تعریف آیتم جدید': 'ویرایش آیتم'"
      :visible="visible"
      @close="$emit('update:visible', false)"
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
            label="شرط نمایش"
            :items="initialize.addedForms"
            return-object
            v-model="model.visibilityCondition"
        />
      </div>
      <div
          v-if="conditionChildrenItems.length> 0"
          class="col-12">
        <base-select
            label="مقدار"
            :items="conditionChildrenItems"
            v-model="model.visibilityConditionValue"
        />
      </div>
      <div class="col-12">
        <base-select
            label="نوع فیلد"
            :items="initialize.formTypes"
            v-model="model.type"
        />
      </div>


      <template v-if="[1,2, 11].includes(model.type)">
        <div class="col-12">
          <base-text-field
              label="حدأقل تعداد کاراکتر لازم"
              v-model="model.minLength"
              type="tel"
          />
        </div>
        <div class="col-12">
          <base-text-field
              label="حدأکثر تعداد کاراکتر مجاز"
              v-model="model.maxLength"
              type="tel"
          />
        </div>
      </template>


      <template v-if="[5, 6,7, 10].includes(model.type)">
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
                  @click="removeItem(item, index)"
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
            label="این فیلد اجباری است"
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
      this.model.minLength = this.data.minimum;
      this.model.maxLength = this.data.maximum;
      this.model.isRequired = this.data.isRequired;
      this.model.visibilityCondition = this.initialize.addedForms.find(x=> x.value === this.data.visibilityCondition);
      this.model.visibilityConditionValue = this.data.visibilityConditionValue;
      if (this.data.items && this.data.items.length > 0) {
        this.model.items = this.data.items.map(f => {
          return {
            id: f.id,
            title: f.text,
          }
        });
      }

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
        minLength: null,
        maxLength: null,
        size: 12,
        isRequired: false,
        visibilityCondition: null,
        visibilityConditionValue: null,
        items: [],
      }
    }
  },
  methods: {
    submit() {
      let payload = {
        ...this.model,
        parentId: this.$route.params.parentId,
        items: this.model.items,
        visibilityCondition: this.model.visibilityCondition ? this.model.visibilityCondition.value : null,
        visibilityConditionValue: this.model.visibilityCondition ? this.model.visibilityConditionValue : null,
      }
      if (this.data) {
        this.httpPut(`/form-template-items/${this.data.id}/`, payload, result => {
          this.$emit('update', result);
        })
      } else {
        this.httpPost(`/form-template-items/`, payload, result => {
          this.$emit('add', result);
        })
      }
    },
    defineNewItem() {
      if (this.data) {
        this.httpPost(`/form-template-items/add-item/${this.data.id}`, {}, result => {
          this.model.items.push({
            id: result.id,
            title: ''
          })
        })
      } else {
        this.model.items.push({
          title: ''
        })
      }
    },
    removeItem(item, index) {
      if (this.data) {
        this.httpDelete(`/form-template-items/delete-item/${item.id}`, result => {
          this.model.items.splice(index, 1);
        })
      } else {
        this.model.items.splice(index, 1);
      }
    }
  },
  computed: {
    conditionChildrenItems() {
      if (this.model.visibilityCondition)
        return this.model.visibilityCondition.child;
      return [];
    }
  }
}
</script>

<style scoped>

</style>
