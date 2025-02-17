<script>
import BaseSelect from "@/view/widget/Base/BaseSelect.vue";

export default {
  name: "SingleQuestionModal",
  components: {BaseSelect},
  props: {
    visible: Boolean,
    data: Object,
    questionId: String,
    initialize: Object
  },
  emits: ['add', 'update'],
  data() {
    return {
      childItems: [],
      modal: {
        visible: null,
        data: null,
      },
      model: {
        title: null,
        type: null,
        correctAnswer: null,
        score: null,
      }
    }
  },
  created() {
    if (this.data) {
      this.model.title = this.data.questionTitle;
      this.model.type = this.data.questionType;
      this.model.score = this.data.questionScore;
    }
  },
  methods: {
    submit() {
      if (this.data) {
        this.httpPut(`/test-question/${this.data.id}/`, {
          ...this.model,
          items: this.childItems,
        }, result => {
          this.$emit('update', result);
        })
      } else {
        this.httpPost(`/test-question/`, {
          ...this.model,
          parentId: this.questionId,
          items: this.childItems,
        }, result => {
          this.$emit('add', result);
        })
      }

    },
  },
  watch: {
    'model.type': {
      handler() {
        if (this.model.type === 1) {
          for (let i = 0; i < 4; i++) {
            this.childItems.push({
              title: ''
            })
          }
        } else {
          this.childItems = []
        }
      }
    }
  }
}
</script>

<template>
  <base-modal
      :title="data? 'ویرایش پرسش': 'تعریف پرسش جدید'"
      :visible="visible"
      @close="$emit('update:visible', false)"
      @submit="submit">
    <div class="row">
      <div class="col-12">
        <base-text-field
            v-model="model.title"
            label="عنوان پرسش"/>
      </div>
      <div class="col-12">
        <base-select
            v-model="model.type"
            :items="initialize.types"
            label="نوع سوال"/>
      </div>

      <div
          v-if='model.type === 1'
          class="col-12">
        <base-text-field
            v-model="model.score"
            label="امتیاز"/>
      </div>


      <div
          v-if='model.type === 1'
          class="col-12">
        <v-radio-group v-model="model.correctAnswer">
          <div
              v-for="(item, index) in childItems"
              class="row">
            <div class="col">
              <base-text-field
                  v-model="childItems[index].title"
                  :label="`مقدار ` + (index + 1)"
              />
            </div>
            <div class="col">
              <v-radio
                  :value="index"
              />
            </div>
          </div>
        </v-radio-group>
      </div>
    </div>


  </base-modal>
</template>

<style scoped>

</style>
