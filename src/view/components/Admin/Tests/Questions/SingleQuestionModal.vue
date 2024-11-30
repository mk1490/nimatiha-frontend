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
  emits: ['add'],
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
      }
    }
  },
  methods: {
    submit() {
      this.httpPost(`/test-question`, {
        ...this.model,
        parentId: this.questionId,
        items: this.childItems,
      }, result => {

      })
    },
    addItem(item) {
      if (this.childItems.length !== 4) {
        for (let i = 0; i < 4; i++) {
          this.childItems.push({
            title: ''
          })
        }

      }

    }
  }
}
</script>

<template>
  <base-modal
      title="تعریف سوال جدید"
      :visible="visible"
      @close="$emit('update:visible', false)"
      @submit="submit">
    <div class="row">
      <div class="col-12">

        <base-text-field
            v-model="model.title"
            label="عنوان"/>
      </div>
      <div class="col-12">
        <base-select
            v-model="model.type"
            :items="initialize.types"
            label="نوع سوال"/>
      </div>


      <div
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


      <div
          v-if='model.type === 1'
          class="col-12">
        <v-btn
            block
            color="primary"
            @click="addItem()">
          افزودن آیتم جدید
        </v-btn>
      </div>


    </div>


  </base-modal>
</template>

<style scoped>

</style>
