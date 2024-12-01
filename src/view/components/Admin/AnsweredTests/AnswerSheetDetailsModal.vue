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
      <v-tab v-for="tabItem in tabItems">
        {{ tabItem.title }}
      </v-tab>
    </v-tabs>


    <v-tabs-items v-model="tab">
      <v-container>
        <v-tab-item
            v-for="(tabItem, tabIndex) in tabItems"
            :key="tabIndex"
            :value="tabIndex">
          <base-key-value-simple-table
              :items="getTableContent(tabItem)"
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
      this.tabItems = this.data.tabs;
    }
  },
  data() {
    return {
      tab: 0,
      tabItems: []
    }
  },
  methods: {
    async downloadItem(item) {

    },
    getTableContent(item) {
      return item.answers.map(f => {
        return {
          title: f.label,
          value: f.value,
        };
      })
    }
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
