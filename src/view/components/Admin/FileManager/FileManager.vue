<script>
import {Upload} from "tus-js-client";

export default {
  name: "FileManager",
  data() {
    return {
      table: {
        headers: [
          {
            text: 'عنوان فایل',
            value: 'title'
          }
        ],
        contents: [],
        actions: [
          {
            title: 'ویرایش',
            icon: 'mdi-pen',
            click: item => {
              console.log(item)
            }
          }
        ],
      }
    }
  },
  created() {
    this.httpGet(`/file/list`, result => {
      this.table.contents = result;
    })
  },
  mounted() {
    let url = this.serverAddress + '/uploads';
    this.$refs.filePicker.onchange = (event) => {
      const file = event.target.files[0];
      console.log(url)
      this.$refs.fileForm.reset();
      const uploadInstance = new Upload(file, {
        endpoint: url,
        metadata: {
          filename: file.name,
          filetype: file.type,
        },
        onProgress: function (bytesUploaded, bytesTotal) {
          let percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2)
          console.log(bytesUploaded, bytesTotal, percentage + '%')
        },
        onSuccess: function () {

        }
      })

      this.$store.commit('ADD_FILE', {
        instance: uploadInstance
      });
      uploadInstance.start();
    }
  },
  methods: {
    uploadFile() {
      this.$refs.filePicker.click();
    }
  }
}
</script>

<template>
  <base-card-layout
      title="مدیریت فایل ها"
      button-title="بارگذاری فایل جدید"
      @buttonClick="uploadFile">
    <base-table
        :headers="table.headers"
    />


    <form ref="fileForm">
      <input
          ref="filePicker"
          type="file"
          hidden="hidden"
      />
    </form>


  </base-card-layout>
</template>

<style scoped>

</style>
