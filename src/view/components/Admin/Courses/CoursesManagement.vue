<script>
import CourseModal from "@/view/components/Admin/Courses/CourseModal.vue";
import CourseEpisodes from "@/view/components/Admin/Courses/CourseEpisodes/CourseEpisodes.vue";

export default {
  name: "CoursesManagement",
  components: {CourseEpisodes, CourseModal},
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
            title: 'آیتم‌های دوره',
            icon: 'mdi-playlist-check',
            click: item => {
              this.httpGet(`/course-episode/${item.id}`, result => {
                this.modal.courseEpisodes.parentId = item.id;
                this.modal.courseEpisodes.data = result;
                this.modal.courseEpisodes.visible = true;
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
        courseEpisodes: {
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
      title="مدیریت دوره‌ها">`


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

    <course-episodes
        v-if="modal.courseEpisodes.visible"
        :visible.sync="modal.courseEpisodes.visible"
        :data="modal.courseEpisodes.data"
        :parent-id="modal.courseEpisodes.parentId"
    />

  </base-card-layout>
</template>

<style scoped>

</style>
