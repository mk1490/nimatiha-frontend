<script>
import CourseItems from "./CourseItems/CourseItems.vue";
import CourseModal from "./CourseModal.vue";

export default {
  name: "CoursesManagement",
  components: {CourseModal, CourseItems},
  created() {
    this.httpGet(`/course/list`, result => {
      this.table.contents = result;
    })
  },
  methods: {
    define() {
      this.httpGet(`/course/initialize`, result => {
        this.modal.data = null;
        this.modal.initialize = result;
        this.modal.visible = true;
      });
    },
    addItem(data) {
      this.table.contents.push(data);
      this.modal.visible = false;
    },
    updateItem(data) {
      this.table.contents.splice(this.modal.index, 1, data);
      this.modal.visible = false;
    }
  },
  data() {
    return {
      table: {
        headers: [
          {text: 'عنوان', value: 'title'}
        ],
        contents: [],
        actions: [
          {
            title: 'ویرایش',
            icon: 'mdi-pen',
            click: item => {
              this.httpGet(`/course/${item.id}`, result => {
                this.modal.index = this.table.contents.indexOf(item);
                this.modal.data = result.data;
                this.modal.initialize = result.initialize;
                this.modal.visible = true;
              });

            }
          },
          {
            title: 'سرفصل‌های دوره',
            icon: 'mdi-playlist-check',
            click: item => {
              this.httpGet(`/course-items/list/${item.id}`, result => {
                this.modal.courseItems.parentId = item.id;
                this.modal.courseItems.data = result;
                this.modal.courseItems.visible = true;
              })

            }
          },
          {
            title: 'حذف',
            color: 'error',
            icon: 'mdi-delete',
            click: item => {

            }
          }
        ],
      },
      modal: {
        data: null,
        initialize: null,
        visible: false,
        courseItems: {
          data: null,
          parentId: null,
          visible: false,
        }
      }
    }
  }
}
</script>

<template>
  <base-card-layout
      @buttonClick="define"
      button-title="تعریف دوره جدید"
      title="مدیریت دوره‌ها">

    <base-table
        :headers="table.headers"
        :items="table.contents"
        :actions="table.actions"
    />


    <course-modal
        v-if="modal.visible"
        :visible.sync="modal.visible"
        :data="modal.data"
        :initialize="modal.initialize"
        @add="addItem"
        @update="updateItem"
    />


    <course-items
        v-if="modal.courseItems.visible"
        :visible="modal.courseItems.visible"
        :data="modal.courseItems.data"
        :parentCourseId="modal.courseItems.parentId"
        @close="modal.courseItems.visible= false"
    />

  </base-card-layout>
</template>

<style scoped>

</style>
