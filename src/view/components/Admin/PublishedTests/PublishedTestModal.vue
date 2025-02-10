<script>
import QuestionsModal from "@/view/components/Admin/PublishedTests/QuestionsBank/Questions/QuestionsModal.vue";
import BaseTextArea from "@/view/widget/Base/BaseTextArea.vue";
import BaseAutoComplete from "@/view/widget/Base/BaseAutoComplete.vue";

export default {
  name: "PublishedTestModal",
  components: {BaseAutoComplete, BaseTextArea, QuestionsModal},
  emits: ['add', 'update'],
  created() {
    if (this.data) {
      this.model.title = this.data.title;
      this.model.description = this.data.description;
      this.model.endDescription = this.data.endDescription;
      this.model.slug = this.data.slug;
      this.model.authenticationRequired = this.data.authenticationRequired;
      if (this.data.educationalConditions) {
        this.model.educationalConditions = this.data.educationalConditions.split(',').map(f => {
          return Number(f);
        })
      }
      this.model.slug = this.data.slug;
      this.model.time = Number(this.data.time);
      this.model.items = this.data.items.map(f => {
        return {
          testId: f.testTemplateId,
          isRandom: f.isRandom,
          randomCount: f.questionRandomNumbers,
        }
      });
    }
  },
  props: {
    visible: Boolean,
    data: Object,
    initialize: Object,
  },
  methods: {
    submit() {
      let payload = {...this.model}
      payload.time = Number(this.model.time);

      if (this.data) {
        this.httpPut(`/published-test/${this.data.id}/`, payload, result => {
          this.$emit('update', result);
          this.$toast.success('بروزرسانی آزمون با موفقیت انجام شد.')
        })
      } else {
        this.httpPost(`/published-test/`, payload, result => {
          this.$emit('add', result);
          this.$toast.success('انتشار آزمون با موفقیت انجام شد.')
        })
      }


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
        slug: null,
        authenticationRequired: false,
        educationalConditions: null,
        items: [],
      }
    }
  }

}
</script>

<template>
  <base-modal
      v-if="visible"
      :title="data ?'ویرایش آزمون جدید': 'انتشار آزمون جدید'"
      @close="$emit('update:visible', false)"
      @submit="submit"
      :visible="visible">

    <div class="row">
      <div class="col-12">
        <base-text-field
            required-symbol
            label="عنوان نمایشی"
            v-model="model.title"/>
      </div>


      <div class="col-12">
        <base-text-field
            required-symbol
            type="number"
            dir="ltr"
            label="مدّت زمان آزمون (دقیقه)"
            v-model="model.time"/>
      </div>


      <div class="col-12">
        <base-text-field
            required-symbol
            dir="ltr"
            label="اسلاگ"
            v-model="model.slug"/>
      </div>

      <div class="col-12">
        <base-select
            label="شرط پایه"
            :items="initialize['educationGrade']"
            multiple
            v-model="model.educationalConditions"/>
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

      <div class="col-12">
        <v-checkbox
            label="این آزمون نیاز به احراز هویت دارد"
            hide-details
            v-model="model.authenticationRequired"
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
                    <base-auto-complete
                        :items="initialize.tests"
                        v-model="model.items[index].testId"
                        chips
                        small-chips
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

  </base-modal>
</template>

<style scoped></style>
