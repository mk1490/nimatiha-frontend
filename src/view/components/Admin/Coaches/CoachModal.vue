<script>
export default {
  name: "CoachModal",
  props: {
    visible: Boolean,
    data: Object,
  },
  emits: ['add', 'update'],
  data() {
    return {
      model: {
        name: null,
        family: null,
        nationalCode: null,
        mobileNumber: null,
        username: null,
        password: null,
      }
    }
  },
  methods: {
    submit() {
      if (this.data) {
        this.httpPut(``, this.model, result => {
          this.$emit('update', result);
        }, error => {
        })
      } else {
        this.httpPost(``, this.model, result => {
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
      title="تعریف مربی جدید"
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
        <base-text-field
            v-model="model.username"
            label="نام کاربری"
            dir="ltr"
        />
      </div>
      <div class="col-12">
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
