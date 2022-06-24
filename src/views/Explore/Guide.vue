<template>
  <div class="explore guide__container d-flex">
    <!-- <v-dialog
      v-model="announcement5"
      persistent
      tile
      :width="$vuetify.breakpoint.xs ? '100%' : '60%'"
    >
      <template #activator="{ on, attrs }">
        <div v-bind="attrs" v-on="on"></div>
      </template>
      <v-card class="ml-auto mr-auto">
        <v-container class="d-flex justify-center flex-column">
          <div class="d-flex justify-center mt-6 mb-3">
            <v-icon x-large color="red">mdi-rocket</v-icon>
          </div>
          <div class="d-flex justify-center mb-6">
            <h2 class="text-center">New employers & projects incoming!</h2>
          </div>
          <v-divider></v-divider>
          <div
            class="d-flex justify-center mt-10 text--center"
            :class="$vuetify.breakpoint.xs ? 'pl-0 pr-0' : 'pl-10 pr-10'"
          >
            <h3 class="d-flex text--center announcement__text-body">
              Our programs have launched! Looking for a larger selection? New employers & projects
              will be added between now into March 2022 and beyond. Check-in to see new
              opportunities in the next weeks!
            </h3>
          </div>
        </v-container>

        <div class="d-flex justify-center">
          <v-btn
            class="pl-auto pr-auto mb-10 mt-10"
            x-large
            outlined
            depressed
            rounded
            :disabled="invalid"
            @click="announcement5 = false"
            >Gotcha
          </v-btn>
        </div>
      </v-card>
    </v-dialog> -->
    <div class="guide__bar">
      <guide-bar
        class="guide__bar2"
        :pathways-filter="pathwaysFilter"
        :program-filter.sync="programFilter"
        :age-filter.sync="ageFilter"
        :residence-options="residenceOptions"
        @update:residenceFilter="residenceFilter = $event"
        @update:pathwaysFilter="pathwaysFilter = $event"
      />
    </div>

    <div class="guide__table">
      <ListView
        :employers="filteredPrograms"
        :bookmarks="bookmarked"
        @bookmarkProgram="bookmarkProgram"
        v-on="$listeners"
      />
      <v-snackbar
        v-model="snackbar"
        class="snackbar-announcement2"
        color="blue"
        rounded
        timeout="-1"
        top
      >
        <span class="font-weight-bold">
          <v-icon left>mdi-podcast</v-icon>
          Deciding on an employer? Start program to preview activities.
        </span>
        <template #action="{ attrs }">
          <v-btn v-bind="attrs" icon @click="snackbar = false"><v-icon>mdi-close</v-icon></v-btn>
        </template>
      </v-snackbar>
      <!-- <component :is="currentUnit" :employers="employers" /> -->
    </div>
    <!-- </div> -->
  </div>
</template>

<script lang="ts">
import { ref, reactive, toRefs, computed, defineComponent, Ref } from '@vue/composition-api';
import { ObjectId } from 'bson';

import { useDbGetters } from '@/store';
import Bar from './Bar.vue';
import ListView from './components/TableView.vue';

export default defineComponent({
  name: 'ExploreGuide',

  components: {
    'guide-bar': Bar,
    ListView
  },

  setup(_props, ctx) {
    const { collection } = useDbGetters(['collection']);
    const employerData: Ref<any[]> = ref([]);
    const state = reactive({
      programFilter: 'All' as 'All' | 'Bookmarked',
      ageFilter: null as any,
      residenceFilter: null,
      pathwaysFilter: [{} as any],
      bookmarked: [] as ObjectId[],
      residenceOptions: [] as string[]
    });

    const savedBookmarks = localStorage.getItem('bookmarkedPrograms'); // * grab bookmarks from localStorage
    if (savedBookmarks) state.bookmarked = JSON.parse(savedBookmarks).map(id => new ObjectId(id));

    collection.value!('Program')
      .find({
        published: true
      })
      .then(programs => {
        programs.sort((a, b) => (a.programName || '').localeCompare(b.programName || ''));
        employerData.value = programs;
        programs.forEach(program => {
          if (program.requiredResidency) state.residenceOptions.push(...program.requiredResidency);
        });
      });

    if (ctx.root.$route.query) {
      let query = ctx.root.$route.query.pathway;
      if (!Array.isArray(query)) query = [query];
      query = query.filter(word => !!word);
      if (!query.length)
        state.pathwaysFilter = [
          {
            text: 'All',
            color: 'grey darken-4'
          }
        ];
      else
        state.pathwaysFilter = query.map(pathway => ({
          text: pathway as string,
          color: 'grey darken-4'
        }));
    }

    const currentUnit = ref(ListView);

    const filteredPrograms = computed(() => {
      let visiblePrograms;
      if (state.programFilter === 'Bookmarked') {
        visiblePrograms = employerData.value.filter((program: Record<string, any>) =>
          state.bookmarked.some((id: ObjectId) => id.equals(program._id))
        );
      } else {
        visiblePrograms = employerData.value;
      }

      if (state.residenceFilter && state.residenceFilter !== 'None') {
        visiblePrograms = visiblePrograms.filter(
          program =>
            program.requiredResidency && program.requiredResidency.includes(state.residenceFilter)
        );
      }

      if (state.ageFilter && state.ageFilter !== 'All') {
        visiblePrograms = visiblePrograms.filter(
          program =>
            program.ageRange[0] <= parseInt(state.ageFilter, 10) &&
            program.ageRange[1] >= parseInt(state.ageFilter, 10)
        );
      }

      if (state.pathwaysFilter.length && !state.pathwaysFilter.some(obj => obj.text === 'All')) {
        const filters = state.pathwaysFilter.map(obj => obj.text);
        visiblePrograms = visiblePrograms.filter(
          program => program.pathways && program.pathways.some(pathway => filters.includes(pathway))
        );
      }

      return visiblePrograms;
    });

    const bookmarkProgram = (programId: ObjectId) => {
      if (state.bookmarked.some((id: ObjectId) => id.equals(programId)))
        state.bookmarked = state.bookmarked.filter((id: ObjectId) => !id.equals(programId));
      else state.bookmarked.push(programId);
      localStorage.setItem('bookmarkedPrograms', JSON.stringify(state.bookmarked)); //* save bookmarks to localStorage
    };
    // const announcement5 = ref(true);

    return {
      ...toRefs(state),
      filteredPrograms,
      bookmarkProgram,
      currentUnit,
      // announcement5,
      snackbar: true
    };
  }
});
</script>

<style lang="scss">
.announcement__text-body {
  text-align: center;
}
.snackbar-announcement2 {
  margin-left: 11%;
  @media (max-width: 767px) {
    margin-left: 0 !important;
  }
}
.snackbar-text {
  color: white !important;
}
.explore .guide {
  &__activity-title-button {
    margin: 25px 25px 0px 25px;
  }

  &__activity-title {
    font-family: Raleway;
    font-size: 28px;
    font-weight: 700;
    margin: 25px;
  }

  &__container {
    width: 100%;
    height: 100vh;
    display: flex;
    background-color: transparent;
  }
  &__bar {
    width: fit-content;
    height: fit-content;
  }
  &__bar2 {
    @media (max-width: 991px) {
      height: fit-content;
    }
  }
  &__page {
    width: 100%;
    height: fit-content;
    position: relative;
  }
  &__locks {
    height: 95vh;
    width: 70px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    &--left {
      left: 0;
      top: 0;
    }
    &--right {
      right: 0;
      top: 0;
    }
  }
  &__lock {
    z-index: 99;
    color: var(--v-accent-base);
    &.unlocked {
      &:hover {
        color: var(--v-success-base);
      }
    }

    &.locked {
      &:hover {
        color: var(--v-error-base);
      }
    }
  }
  &__table {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    overflow-y: scroll;
    z-index: 1;
    @media (min-width: 992px) and (max-width: 1350px) {
      width: 70%;
      margin-left: auto;
      .explore-program__explore-card {
        grid-template-columns: auto auto;
        .explore-card__card {
          height: 100%;
        }
      }
    }
    @media (min-width: 768px) and (max-width: 991px) {
      .explore-program__explore-card {
        grid-template-columns: auto auto;
        .explore-card__card {
          height: 100%;
        }
      }
    }
    @media (max-width: 767px) {
      .explore-program__explore-card {
        grid-template-columns: unset;
        margin-top: 20px;
      }
    }
  }
}
.explore {
  flex-direction: row;
  @media (min-width: 992px) and (max-width: 1350px) {
    .program-card {
      .guide-bar__container {
        .guide-bar__list {
          width: 27vw;
        }
      }
    }
  }
  @media (max-width: 991px) {
    flex-direction: column;
    .program-card {
      max-width: 100%;
      width: 100%;
      height: fit-content;
      .guide-bar__container {
        height: fit-content;
        max-height: fit-content;
        .guide-bar__list {
          width: 100%;
          .guide-bar__explore-participants-title {
            padding-left: 0;
            br {
              display: none;
            }
          }
        }
      }
    }
  }
}
</style>
