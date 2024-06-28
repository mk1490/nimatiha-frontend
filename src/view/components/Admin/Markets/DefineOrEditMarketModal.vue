<template>
  <base-modal
      :title="!data? 'تعریف بازارچه جدید': 'ویرایش بازارچه'"
      :visible.sync="visible"
      @submit="submit">
    <div class="row">
      <div class="col-12">
        <base-text-field
            label="عنوان بازارچه"
            v-model="model.title"
        />
      </div>
      <div class="col-12">
        <date-picker-input-text-field
            label="بازه فعالیت"
            v-model="model.activityRange"
        />
      </div>
      <div class="col-12">
        <base-text-field
            label="تعداد میز"
            type="number"
            :clearable="false"
            v-model="model.deskCount"
        />
      </div>
      <div class="col-12">
        <base-text-field
            label="قیمت واحد"
            v-model="model.amount"
            suffix="ریال"
        />
      </div>
      <div class="col-12">
        <base-text-field
            label="محل"
            v-model="model.location"
        />
      </div>
    </div>
  </base-modal>
</template>

<script>
import BaseDateTimeTextField from "@/view/widget/Base/BaseDateTimeTextField.vue";
import DatePickerInputTextField from "@/view/widget/DatePickerInputTextField.vue";

export default {
  name: "DefineOrEditMarketModal",
  components: {DatePickerInputTextField, BaseDateTimeTextField},
  emits: ['update', 'add'],
  props: {
    visible: Boolean,
    data: Object,
  },
  data() {
    return {
      model: {
        title: null,
        amount: null,
        deskCount: null,
        location: null,
        activityRange: [],
      }
    }
  },
  methods: {
    submit() {
      let payload = {
        title: this.model.title,
        deskCount: Number(this.model.deskCount),
        amount: this.model.amount,
        activityStartDate: this.model.activityRange.start,
        activityEndDate: this.model.activityRange.end,
        location: this.model.location
      }
      if (this.data) {
        this.httpPut(`/market/${this.data.id}`, payload, result => {
          this.$emit('update', result);
        })
      } else {
        this.httpPost(`/market`, payload, result => {
          this.$emit('add', result);
        })
      }
    }
  }
}
</script>

<style scoped>

</style>