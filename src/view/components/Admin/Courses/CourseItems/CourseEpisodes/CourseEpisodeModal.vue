<script>
import BaseDateTimeTextField from "@/view/widget/Base/BaseDateTimeTextField.vue";
import DefineOrEditQuestionBankModal
  from "@/view/components/Admin/PublishedTests/QuestionsBank/DefineOrEditQuestionBankModal.vue";
import QuestionsBankModal from "@/view/components/Admin/PublishedTests/QuestionsBank/QuestionsBanksManagementModal.vue";

export default {
  name: "CourseEpisodeModal",
  components: {
    QuestionsBankModal,
    DefineOrEditQuestionBankModal,
    BaseDateTimeTextField
  },
  props: {
    visible: Boolean,
    data: Object,
    initialize: Object,
    parentId: String,
  },
  emits: ['add', 'update'],
  created() {
    this.items.types = this.initialize.types;
    this.items.prerequisites = this.initialize.prerequisites;
    this.items.questionsBank = this.initialize.questionsBank;
    if (this.data) {
      this.model.title = this.data.title;
      this.model.type = this.data.type;
      this.model.metaData = this.data.metaData;
      this.model.prerequisites = this.data.prerequisites;
    }
  },
  data() {
    return {
      modal: {
        visible: false,
        data: null,
      },
      model: {
        title: null,
        type: null,
        metaData: null,
        prerequisites: null,
        file: null,
      },
      items: {
        types: [],
        questionsBank: [],
        prerequisites: [],
      }
    }
  },
  methods: {
    submit() {
      let payload = {
        title: this.model.title,
        type: this.model.type,
        metaData: this.model.metaData,
        prerequisites: this.model.prerequisites,
        parentId: this.parentId
      }
      if (this.data) {
        this.httpPut(`/course-episode/${this.data.id}`, payload, result => {
          this.$emit('update', result);
        })
      } else {
        this.httpPost(`/course-episode`, payload, result => {
          if (this.model.file) {
            this.uploadFile(result.id, callback => {
              this.$emit('add', result);
            })
          } else {
            this.$emit('add', result);
          }
        })
      }

    },
    filePicked(file) {
      this.model.file = file;
      this.formData = new FormData();
      this.formData.append("file", file);
      if (this.data && this.model.file) {
        this.uploadFile(this.data.id)
      }
    },
    uploadFile(id, callback) {
      this.httpPost(`/course-episode/upload-file/${id}`, this.formData, result => {
        callback(result);
      })
    },
    testQuestionsBankModal() {
      this.modal.data = [];
      this.modal.visible = true;
    },
    pickQuestionBank(item) {
      this.model.metaData = item.id;
      this.modal.visible = false;
    }
  }
}
</script>

<template>
  <base-modal
      :title="data ?'ویرایش آیتم' : 'تعریف آیتم جدید'"
      @close="$emit('update:visible', false)"
      @submit="submit"
      :visible="visible">
    <div class="row">
      <div class="col-12">
        <base-text-field
            label="عنوان"
            v-model="model.title"
        />
      </div>
      <div class="col-12">
        <base-select
            label="نوع"
            :items="items.types"
            v-model="model.type"
        />
      </div>
      <div
          v-if="model.type === 1"
          class="col-12">
        <base-text-field
            label="آدرس Config ابرآروان"
            v-model="model.metaData"
            dir="ltr"
        />
      </div>
      <div
          v-if="model.type === 2"
          class="col-12">
        <div class="row">
          <div class="col-12">
            <div class="row">
              <div class="col">
                <base-select
                    label="بانک سؤال"
                    :items="items.questionsBank"
                    v-model="model.metaData"
                />
              </div>
              <div class="col-auto">
                <base-button
                    @click="testQuestionsBankModal"
                    label="سوالات"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
      <div
          v-if="model.type === 3"
          class="col-12">
        <base-file-picker
            label="فایل پیوست"
            v-model="model.file"
            @change="filePicked"
        />
      </div>
      <div
          class="col-12">
        <base-select
            label="پیش‌نیاز"
            :items="items.prerequisites"
            v-model="model.prerequisites"
            clearable
        />
      </div>
    </div>

    <questions-bank-modal
        v-if="modal.visible"
        :visible.sync="modal.visible"
        picker
        @pick="pickQuestionBank"
    />
  </base-modal>
</template>

<style scoped>

</style>
