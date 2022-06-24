<template>
  <div class="my-id__container d-flex flex-column mx-auto">
    <component :is="expComponent ? expComponent : 'general-id'" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import GeneralID from './id/GeneralID.vue';
import EmployerID from './id/EmployerID.vue';
import StudentID from './id/StudentID.vue';
import SchoolID from './id/SchoolID.vue';
import ParentID from './id/ParentID.vue';
import TeacherID from './id/TeacherID.vue';
import OrganizerID from './id/OrganizerID.vue';

export default defineComponent({
  name: 'CitizenID',

  components: {
    'general-id': GeneralID,
    'employer-id': EmployerID,
    'student-id': StudentID,
    'teacher-id': TeacherID,
    'school-id': SchoolID,
    'parent-id': ParentID,
    'organizer-id': OrganizerID
  },

  props: {
    expComponent: {
      type: String,
      default: ''
    }
  },

  setup() {}
});
export enum components {
  'general-id' = 'general-id',
  'employer-id' = 'employer-id',
  'student-id' = 'student-id',
  'teacher-id' = 'teacher-id',
  'school-id' = 'school-id',
  'parent-id' = 'parent-id',
  'organizer-id' = 'organizer-id'
}
</script>

<style lang="scss">
.my-id__content {
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  padding-right: 12%;
  padding-left: 12%;
  justify-content: center;
}

.my-id__wrapper {
  width: 50%;
  justify-content: center;
  .v-skeleton-loader {
    & > div.v-skeleton-loader__list-item,
    div.v-skeleton-loader__list-item-two-line,
    div.v-skeleton-loader__list-item-three-line {
      padding: 0px;
      height: 86px;
      justify-content: center;
      display: flex;
    }
  }
}

.my-id__title {
  font-family: Raleway;
  font-weight: 800;
  color: black;
  font-size: 25px;
}
.my-id__right-wrapper {
  flex: 1;
  height: 100%;
}

.my-id__left-wrapper {
  flex: 0 314px;
  height: 100%;
}

.my-id__container {
  max-width: 93.5%;
  margin-top: 100px;
  padding-right: 4.8%;
  padding-left: 4.8%;
  height: 100%;
}
.my-id__button--append {
  margin-left: 9px;
  min-height: 56px;
}

@media screen and (max-width: 1024px) {
  .my-id--position {
    display: flex;
    flex-direction: column;
  }
  .my-id__content {
    padding-left: 1%;
    padding-right: 1%;
    width: 100%;
  }
  .my-id__wrapper {
    width: 100%;
    padding-right: 1%;
    padding-left: 1%;
  }
}
</style>
