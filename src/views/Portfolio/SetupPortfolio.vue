<template>
  <validation-observer
    slim
    class="setup-profile__content d-flex flex-column justify-center"
    :class="computedClasses"
  >
    <v-slide-x-transition hide-on-leave>
      <general-id
        v-if="step < 1 && (selectedTypes === undefined || selectedTypes.length == 0)"
        v-model="selectedTypes"
        style="margin-top: 70px"
        @input="selectedTypes.length == step ? finish() : step++"
      ></general-id>
    </v-slide-x-transition>

    <v-slide-x-transition>
      <v-stepper v-if="step > 0" v-model="step">
        <v-stepper-header>
          <template v-for="(type, index) in selectedTypes">
            <v-stepper-step
              :key="'step' + index"
              :step="index + 1"
              :complete="step - 1 > index"
              :editable="step - 1 > index"
              >{{ `${type}` }}
            </v-stepper-step>
          </template>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content :step="step">
            <v-slide-x-transition hide-on-leave>
              <component v-if="$route.params.slug" :is="idSections[step - 1]" @input="changeStep" />
              <component v-else :is="idSections[step - 1]" @input="step++" />
            </v-slide-x-transition>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-slide-x-transition>
  </validation-observer>
</template>
<script lang="ts">
import { ref, Ref, computed, watch } from '@vue/composition-api';

import { breakpoints } from '@/utils';

import GeneralId from './views/id/GeneralID.vue';
import StudentId from './views/id/StudentID.vue';
import SchoolId from './views/id/SchoolID.vue';
import ParentId from './views/id/ParentID.vue';
import TeacherId from './views/id/TeacherID.vue';
import EmployerId from './views/id/EmployerID.vue';
import OrganizerId from './views/id/OrganizerID.vue';

export default {
  name: 'SetupPortfolio',
  components: {
    GeneralId,
    EmployerId,
    StudentId,
    TeacherId,
    SchoolId,
    ParentId,
    OrganizerId
  },

  props: {
    userTypeList: {
      type: Array,
      default: () => []
    }
  },

  setup(_props, ctx) {
    const step = ref(0);
    const selectedTypes: Ref<string[]> = ref([]);
    const idSections = computed(() => selectedTypes.value.map(type => `${type.toLowerCase()}-id`));
    const computedClasses = computed(() =>
      (breakpoints[ctx.root.$vuetify.breakpoint.name] as unknown as string) >
      (breakpoints.md as unknown as string)
        ? ['profile__container', 'pc-container']
        : []
    );

    function changeStep(val) {
      if (step.value < selectedTypes.value.length) {
        step.value++;
      }

      if (val === selectedTypes.value[selectedTypes.value.length - 1]) {
        ctx.emit('closeModal');
      }
    }

    if (_props.userTypeList.length > 0) {
      selectedTypes.value = _props.userTypeList as any;
      step.value++;
    }

    watch(step, step => {
      if (step > selectedTypes.value.length) ctx.root.$router.go(0);
      // OLD FUNCTION THAT DIDNT REFRESH AFTER PORTFOLIO SETUP WHICH REMOVED THE NAVBAR WHEN PUSHED TO PORTFOLIO
      // if (step > selectedTypes.value.length) ctx.root.$router.push({ name: 'portfolio' });
    });
    return { step, selectedTypes, idSections, computedClasses, changeStep };
  }
};
</script>

<style lang="scss" scoped>
.setup-profile {
  &__content {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    padding-top: 70px;
    padding-right: 8%;
    padding-left: 8%;

    .v-stepper {
      border-radius: 0px;
      box-shadow: none;

      &__header {
        flex-wrap: unset;
        max-width: 400px;
        overflow: hidden;
        overflow-x: auto;
      }

      &__step {
        padding-left: 0px;
        padding-right: 0px;
        margin-left: 12px;
        margin-right: 12px;
        display: inline-flex;
        min-width: 128px;
        @media (max-width: 767px) {
          min-width: unset;
        }
      }

      &__content {
        display: block !important;
        padding: 24px 0;
      }
    }

    .v-stepper__step__step {
      margin-right: 5px;
    }
  }
}
</style>
