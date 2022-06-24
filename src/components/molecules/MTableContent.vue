<template>
  <li
    class="invite-list-item flex flex-row align-center justify-start pt-auto pb-auto"
    :class="[
      index === 0 && type === 'interview' ? 'pointer-none' : '',
      index === length - 1 && type === 'interview' ? 'pointer-none' : '',
      index === length - 2 && type === 'interview' ? 'pointer-none' : ''
    ]"
  >
    <div class="align-end mr-2">
      <AImage
        class="drag"
        width="20px"
        height="20px"
        src="/img/icons/drag.svg"
        style="cursor: pointer"
      />
    </div>

    <div class="ma-2 pointer-view">
      <AButton rounded depressed outlined @click="$emit('view', item.media_url)"> View </AButton>
    </div>

    <div class="ma-1">
      <AButton small icon @click="$emit('reRecord', item)">
        <v-icon small>mdi-restart</v-icon>
      </AButton>
    </div>

    <div class="ma-1">
      <AButton small icon @click="$emit('edit', item)">
        <v-icon small>mdi-pencil</v-icon>
      </AButton>
    </div>
    <div v-if="item" class="ma-2">
      <h4 style="text-align: left" v-if="item.title">{{ item.title }}</h4>
      <h4 style="text-align: left" v-else>{{ item.label }}</h4>
    </div>

    <div class="ma-1">
      <AButton small icon @click="$emit('delete', item)">
        <v-icon small color="red">mdi-trash-can-outline</v-icon>
      </AButton>
    </div>
  </li>
</template>

<script>
import AButton from '@/components/atoms/AButton.vue';
import AImage from '@/components/atoms/AImage.vue';

export default {
  components: {
    AButton,
    AImage
  },
  props: {
    type: {
      type: String,
      default: ''
    },
    item: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: null
    },
    length: {
      type: Number,
      default: null
    }
  }
};
</script>

<style lang="scss">
.pointer-none {
  pointer-events: none;
  opacity: 0.4;
  display: none !important;
}
.pointer-view {
  pointer-events: all;
}

.invite-list-item {
  display: list-item;
}

.invite-list-item > div {
  display: inline-flex;
}
</style>
