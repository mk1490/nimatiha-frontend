<script>
import QuestionsModal from "@/view/components/Admin/Tests/Questions/QuestionsModal.vue";

export default {
  name: "TestModal",
  components: {QuestionsModal},
  props: {
    visible: Boolean,
    data: Object,
  },
  methods: {
    submit() {
      this.httpPost(`/test`, this.model, result => {
        this.$emit('add', result);
      })
    },
    questionItems() {
      this.modal.questions.visible = true;
    }
  },
  data() {
    return {
      model: {
        title: null,
        slug: null,
      },
    }
  }

}
</script>

<template>
  <base-modal
      style="z-index: 220"
      v-if="visible"
      title="تعریف آزمون جدید"
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
            label="اسلاگ"
            v-model="model.slug"
        />
      </div>
    </div>

  </base-modal>
</template>

<style scoped>

</style>
