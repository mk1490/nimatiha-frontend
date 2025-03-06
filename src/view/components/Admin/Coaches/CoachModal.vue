<script>
export default {
  name: "CoachModal",
  props: {
    visible: Boolean,
    data: Object,
    initialize: Object,
  },
  emits: ['add', 'update'],
  created() {
    this.items.categories = this.initialize['coachCategories'];
    if (this.data) {
      this.model.name = this.data.name;
      this.model.family = this.data.family;
      this.model.mobileNumber = this.data.mobileNumber;
      this.model.nationalCode = this.data.nationalCode;
      this.model.username = this.data.username;
      this.model.categories = this.data.categories;
    }
  },
  data() {
    return {
      model: {
        name: null,
        family: null,
        nationalCode: null,
        mobileNumber: null,
        username: null,
        password: null,
      },
      items: {
        categories: [],
      }
    }
  },
  methods: {
    submit() {
      if (this.data) {
        this.httpPut(`/coach/${this.data.id}`, this.model, result => {
          this.$emit('update', result);
        }, error => {
        })
      } else {
        this.httpPost(`/coach`, this.model, result => {
          this.$emit('add', result);
        }, error => {

        })
      }

    }
  }
}
</script>

<template>
  <base-modal
      :title="data? 'ویرایش مربی': 'تعریف مربی جدید'"
      @submit="submit"
      @close="$emit('update:visible', false)"
      :visible="visible">
    <div class="row">
      <div class="col-12">
        <base-text-field
            v-model="model.name"
            label="نام"
        />
      </div>
      <div class="col-12">
        <base-text-field
            v-model="model.family"
            label="نام خانوادگی"
        />
      </div>
      <div class="col-12">
        <base-text-field
            v-model="model.nationalCode"
            dir="ltr"
            label="کد ملّی"
        />
      </div>
      <div class="col-12">
        <base-text-field
            v-model="model.mobileNumber"
            label="تلفن همراه"
            type="tel"
            dir="ltr"
        />
      </div>
      <div class="col-12">
        <base-select
            :items="items.categories"
            v-model="model.categories"
            deletable-chips
            chips
            multiple
            small-chips
            label="دسته بندی"
        />
      </div>
      <div class="col-12">
        <base-text-field
            v-model="model.username"
            label="نام کاربری"
            dir="ltr"
        />
      </div>
      <div
          v-if="!data"
          class="col-12">
        <base-text-field
            dir="ltr"
            v-model="model.password"
            label="کلمۀ عبور"
        />
      </div>
    </div>
  </base-modal>
</template>

<style scoped>

</style>
7
