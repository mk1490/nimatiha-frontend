<template>
  <base-modal
      width="800"
      title="مشاهده جزئیات پاسخ‌نامه"
      hide-submit-button
      @close="$emit('update:visible', false)"
      :visible="visible">

    <v-tabs
        align-with-title
        centered
        fixed-tabs
        v-model="tab">
      <v-tab>
        اطلاعات فردی
      </v-tab>
    </v-tabs>


    <v-tabs-items v-model="tab">
      <v-container>
        <v-tab-item
            v-if="tab === 0"
            :key="0"
            :value="0">

          <base-key-value-simple-table
          />

        </v-tab-item>
      </v-container>

    </v-tabs-items>


  </base-modal>
</template>

<script>
import {addCommas} from "@persian-tools/persian-tools";
import BaseKeyValueSimpleTable from "@/view/widget/Base/BaseKeyValueSimpleTable.vue";

export default {
  name: "AnswerSheetDetailsModal",
  components: {BaseKeyValueSimpleTable},
  props: {
    data: Object,
    visible: Boolean,
  },
  created() {
    if (this.data) {

    }
  },
  data() {
    return {
      tab: 0,
    }
  },
  methods: {
    async downloadItem(item) {

    },
  }
}
</script>

<style scoped>
.details--attachments span {
  font-family: VazirmatnUIFD, serif;
}

a {
  font-family: VazirmatnUIFD, serif;
}
</style>
