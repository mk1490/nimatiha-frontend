<script setup>
import {onMounted, ref} from "vue";
import {httpGet, httpPost} from "../../../../../plugins/httpRequest";
import CourseEpisodeModal from "./CourseEpisodes/CourseEpisodeModal.vue";
import CourseEpisodes from "./CourseEpisodes/CourseEpisodes.vue";

const props = defineProps({
  visible: Boolean,
  parentCourseId: String,
  data: Array,
})
const emits = defineEmits(['close'])

const items = ref([])

const modal = ref({
  courseEpisodes: {
    data: null,
    parentId: null,
    visible: false,
  }

})

onMounted(() => {
  if (props.data) {
    props.data.map((item) => {
      items.value.push({
        ...item,
        isEdit: false,
      })
    })
  }

})


function addItem() {
  items.value.push({
    title: null,
    isEdit: true,
  })
}

function editCourseEpisodes(index) {
  httpGet(`/course-episode/${items.value[index].id}`, result => {
    modal.value.courseEpisodes.parentId = items.value[index].id;
    modal.value.courseEpisodes.data = result;
    modal.value.courseEpisodes.visible = true;
  })

}

function toggleEdit(index) {
  if (items.value[index].isEdit) {
    const singleItem = items.value[index];
    httpPost(`/course-items/${singleItem.id ? singleItem.id : ''}`, {
      title: items.value[index].title,
      parentCourseId: props.parentCourseId
    }, result => {
      items.value[index].isEdit = !items.value[index].isEdit;
    })
  } else {
    items.value[index].isEdit = true;
  }


}


</script>

<template>
  <base-modal
      title="سرفصل‌های دوره"
      @close="$emit('close')"
      :visible="props.visible">


    <template #toolbar-action>
      <base-button
          @click="addItem"
          label="افزودن آیتم جدید"
      />
    </template>

    <div class="row">
      <div
          v-for="(item, index)  in items"
          class="col-12">

        <div class="row">

          <div class="col">
            <base-text-field
                v-model="items[index].title"
                label="عنوان"
                :disabled="!items[index].isEdit"
            />
          </div>
          <div class="col-auto">
            <div class="d-inline-flex">
              <base-square-button
                  @click="toggleEdit(index)"
                  :icon="items[index].isEdit? `mdi-check`: `mdi-pen`"
                  text="ویرایش"
              />

              <div
                  class="mx-1"
              />
              <base-square-button
                  @click="editCourseEpisodes(index)"
                  icon="mdi-format-list-bulleted"
                  text="قسمت‌های این آیتم"
              />

              <div
                  class="mx-1"
              />
              <base-square-button
                  color="error"
                  icon="mdi-delete"
                  text="حذف"
              />
            </div>
          </div>
        </div>

      </div>
    </div>


    <course-episodes
        v-if="modal.courseEpisodes.visible"
        :visible.sync="modal.courseEpisodes.visible"
        :data="modal.courseEpisodes.data"
        :parent-id="modal.courseEpisodes.parentId"
    />

  </base-modal>
</template>

<style scoped>

</style>