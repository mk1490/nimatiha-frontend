<template>
  <base-modal
      :title="data? 'ویرایش میز' : 'تعریف میز جدید'"
      :visible="visible"

      @submit="submit"
      @close="$emit('update:visible' ,false)"
  >
    <div class="row">
      <div class="col-12">
        <base-text-field
            label="عنوان"
            v-model="model.title"
        />
      </div>
      <div class="col-12">
        <base-text-field
            label="شماره"
            readonly
            dir="ltr"
            v-model="model.number"
        />
      </div>
      <div class="col-12">
        <base-text-field
            label="قیمت رزرو"
            dir="ltr"
            v-model="model.amount"
        />
      </div>
    </div>

  </base-modal>

</template>
<script>
export default {
  name: "DefineOrEditDeskModal",
  emits: ['add', 'update'],
  props: {
    visible: Boolean,
    data: Object,
  },
  created() {
    if (this.data) {
      this.model = this.data;
    }
  },
  methods: {
    submit() {
      if (this.data) {
        this.httpPut(`/market-desk/${this.data.id}`, this.model, result => {
          this.$emit('update', result);
        });
      } else {
        this.httpPost(`/market-desk`, this.model, result => {
          this.$emit('add', result);
        });
      }

    }
  },
  data() {
    return {
      model: {
        title: null,
        number: null,
        amount: null,
      }
    }
  }
}
</script>

<style scoped>

</style>