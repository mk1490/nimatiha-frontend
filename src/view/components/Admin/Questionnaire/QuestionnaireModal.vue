<script>
export default {
  name: "QuestionnaireModal",
  created(){
    this.httpGet(`/`, result=>{

    })
  },
  methods: {
    toggleSelection(index) {
      const selectedItem = this.items[index].value;
      const findIndex = this.selectedItems.findIndex(x => x === selectedItem);
      if (findIndex !== -1) {
        this.selectedItems.splice(findIndex, 1);
      } else {
        this.selectedItems.push(selectedItem);
      }
    },
    toggleChildSelection(parentIndex, childrenIndex) {
      const selectedItem = this.items[parentIndex].children[childrenIndex].value;
      const findIndex = this.selectedChildItem.findIndex(x => x === selectedItem);
      if (findIndex !== -1) {
        this.selectedChildItem.splice(findIndex, 1);
      } else {
        this.selectedChildItem.push(selectedItem);
      }
    },
    submit() {
      const disableItems = []
      this.items.map(f => {
        return f.children.map(f2 => {
          if (!this.selectedChildItem.includes(f2.value)) {
            disableItems.push(f2.value);
          }
        });
      });


      this.httpPost(`/test-template `, {
        title: this.model.title,
        slug: this.model.slug,
        keys: disableItems,
      })
    }
  },
  props: {
    visible: Boolean,
  },
  data() {
    return {
      model: {
        title: null,
        slug: null,
      },
      selectedItems: [],
      selectedChildItem: [],
      items: [
        {
          title: 'مشخصات فردی',
          value: 'personalInfo',
          children: [
            {
              title: 'نام',
              value: 'name'
            },
            {
              title: 'نام خانوادگی',
              value: 'family'
            },
            {
              title: 'نام پدر',
              value: 'fatherName'
            },
            {
              title: 'کد ملّی',
              value: 'nationalCode'
            },
            {
              title: 'تاریخ تولد',
              value: 'birthDate'
            },
            {
              title: 'وضعیت معلولیت',
              value: 'disabilityStatus'
            },
            {
              title: 'مذهب',
              value: 'religion'
            },
            {
              title: 'سابقه بیماری',
              value: 'illnessHistory'
            },
            {
              title: 'شهرستان محل سکونت',
              value: 'city'
            },
            {
              title: 'نشانی محل سکونت',
              value: 'address'
            },
          ],
        }
      ],
    }
  }
}
</script>

<template>
  <base-modal
      title="تعریف پرسش نامه جدید"
      @close="$emit('update:visible',false)"
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
        <base-text-field
            label="اسلاگ"
            dir="ltr"
            v-model="model.slug"
        />
      </div>

      <div
          v-for="(item, index) in items "
          class="col-12">
        <v-checkbox
            @change="toggleSelection(index)"
            :label="item.title"
        />
        <v-switch
            v-if="selectedItems.find(x=> x === item.value)"
            class="mr-4 mb-1"
            v-for="(childrenItem, childrenIndex) in item.children"
            inset
            hide-details
            @change="toggleChildSelection(index, childrenIndex)"
            :label="childrenItem.title">
        </v-switch>
      </div>
    </div>
  </base-modal>
</template>

<style scoped>

</style>