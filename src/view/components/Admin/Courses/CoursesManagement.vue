<script>
import CourseModal from "@/view/components/Admin/Courses/CourseModal.vue";

export default {
  name: "CoursesManagement",
  components: {CourseModal},
  methods: {
    define() {
      this.httpGet(`/course/initialize`, result => {
        this.modal.data = null;
        this.modal.initialize = null;
        this.modal.visible = true;
      });
    }
  },
  data() {
    return {
      table: {
        headers: [],
        contents: [],
      },
      modal: {
        data: null,
        initialize: null,
        visible: false,
      }
    }
  }
}
</script>

<template>
  <base-card-layout
      @buttonClick="define"
      button-title="تعریف دوره جدید"
      title="مدیریت دوره‌ها">`


    <base-table
        :headers="table.headers"
    />


    <course-modal
        v-if="modal.visible"
        :visible.sync="modal.visible"
        :data="modal.data"
        :initialize="modal.initialize"
    />
  </base-card-layout>
</template>

<style scoped>

</style>
