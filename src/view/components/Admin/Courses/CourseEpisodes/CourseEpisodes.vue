<script>
import CourseEpisodeModal from "@/view/components/Admin/Courses/CourseEpisodes/CourseEpisodeModal.vue";

export default {
  name: "CourseEpisodes",
  components: {CourseEpisodeModal},
  props: {
    visible: Boolean,
    data: Object,
    parentId: String,
  },
  created() {
    if (this.data) {
      this.table.contents = this.data;
    }
  },
  data() {
    return {
      modal: {
        visible: false,
        data: null,
        initialize: null,
        index: -1,
      },
      table: {
        headers: [
          {text: 'عنوان', value: 'title'},
          {text: 'نوع', value: 'type'},
        ],
        contents: [],
      }
    }
  },
  methods: {
    define() {
      this.httpGet(`/course-episode/initialize`, result => {
        this.modal.initialize = result;
        this.modal.data = null;
        this.modal.visible = true
      });
    },
    addItem(data) {
      this.modal.visible = false;
      this.table.contents.push(data);
    },
    updateItem(data) {
      this.table.contents.splice(this.modal.index, 1, data);
      this.modal.visible = false;
    }
  }
}
</script>

<template>
  <base-modal
      :visible="visible"
      @close="$emit('update:visible', false)"
      full-screen
      title="آیتم‌های دوره">

    <template #toolbar-action>
      <base-button
          label="تعریف آیتم جدید"
          @click="define"
      />
    </template>

    <base-table
        :headers="table.headers"
        :items="table.contents"
    />

    <course-episode-modal
        v-if="modal.visible"
        :visible.sync="modal.visible"
        :data="modal.data"
        :initialize="modal.initialize"
        :parentId="parentId"
        @add="addItem"
        @update="updateItem"
    />

  </base-modal>
</template>

<style scoped>

</style>
