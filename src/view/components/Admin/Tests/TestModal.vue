<script>
import QuestionsModal from "@/view/components/Admin/Tests/Questions/QuestionsModal.vue";

export default {
  name: "TestModal",
  components: {QuestionsModal},
  emits: ['add', 'update'],
  props: {
    visible: Boolean,
    data: Object,
  },
  created() {
    if (this.data) {
      this.model.title = this.data.title;
      this.model.time = Number(this.data.time);
    }
  },
  methods: {
    submit() {
      if (this.data) {
        this.httpPut(`/test/${this.data.id}`, this.model, result => {
          this.$emit('update', result);
        })
      } else {
        this.httpPost(`/test`, this.model, result => {
          this.$emit('add', result);
        })
      }

    },
    questionItems() {
      this.modal.questions.visible = true;
    }
  },
  data() {
    return {
      model: {
        title: null,
        time: null,
      },
    }
  }

}
</script>

<template>
  <base-modal
      style="z-index: 220"
      v-if="visible"
      :title="data? 'ویرایش آزمون': 'تعریف آزمون جدید'"
      @close="$emit('update:visible', false)"
      @submit="submit"
      :visible="visible">

    <div class="row">
      <div class="col-12">
        <base-text-field
            label="عنوان آزمون"
            v-model="model.title"
        />
      </div>
      <div class="col-12">
        <base-text-field
            label="مدّت زمان آزمون (دقیقه)"
            type="number"
            v-model="model.time"
        />
      </div>
    </div>

  </base-modal>
</template>

<style scoped>

</style>
