<script>
import QuestionsModal from "@/view/components/Admin/Tests/Questions/QuestionsModal.vue";
import BaseTextArea from "@/view/widget/Base/BaseTextArea.vue";

export default {
  name: "PublishedTestModal",
  components: {BaseTextArea, QuestionsModal},
  emits: ['add'],
  props: {
    visible: Boolean,
    data: Object,
    initialize: Object,
  },
  methods: {
    submit() {
      this.httpPost(`/published-test/`, this.model, result => {
        this.$emit('add', result);
      })
    },
    addItem() {
      this.model.items.push({
        testId: null,
        isRandom: false,
        randomCount: 0,
      })
    },
    deleteItem(index) {
      this.model.items.splice(index, 1);
    }
  },
  data() {
    return {
      model: {
        title: null,
        description: null,
        endDescription: null,
        items: [],
      }
    }
  }

}
</script>

<template>
  <base-modal v-if="visible"
              title="انتشار آزمون جدید"
              @close="$emit('update:visible', false)" @submit="submit"
              :visible="visible">

    <div class="row">
      <div class="col-12">


        <base-text-field label="عنوان نمایشی" v-model="model.title"/>
      </div>

      <div class="col-12">
        <base-text-area
            label="توضیحات"
            v-model="model.description"/>
      </div>

      <div class="col-12">
        <base-text-area
            label="توضیحات پس از پایان آزمون"
            v-model="model.endDescription"
        />
      </div>


      <div
          v-for="(item, index) in model.items" class="col-12">

        <v-card>
          <v-card-text>
            <div class="row">

              <div class="col align-self-">
                <div class="row">
                  <div class="col-12">
                    <base-select
                        :items="initialize.tests"
                        v-model="model.items[index].testId"
                        label="بانک آزمون"
                    />
                  </div>

                  <div class="col-auto align-self-center">
                    <v-checkbox
                        hide-details
                        label="سوالات تصادفی"
                        v-model="model.items[index].isRandom"/>
                  </div>

                  <div class="col">
                    <base-text-field
                        label="تعداد سؤالات تصادفی"
                        type="number"
                        v-model="model.items[index].randomCount"/>
                  </div>
                </div>
              </div>
              <div class="col-auto align-self-center">
                <v-btn
                    @click="deleteItem(index)"
                    icon>
                  <v-icon
                      color="red">
                    mdi-delete
                  </v-icon>
                </v-btn>
              </div>
            </div>
          </v-card-text>


        </v-card>
      </div>

    </div>


    <div class="col-12">
      <v-btn
          @click="addItem"
          block
          color="primary"
      >
        اضافه نمودن بانک آزمون جدید
      </v-btn>
    </div>


    </div>

  </base-modal>
</template>

<style scoped></style>
