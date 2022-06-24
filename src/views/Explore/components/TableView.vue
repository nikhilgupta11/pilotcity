<template>
  <v-container>
    <v-container v-if="employers.length" class="explore-program__explore-card">
      <ExploreCard
        v-for="employer in employers"
        :key="employer.name"
        :employer="employer"
        :bookmarks="bookmarks"
        v-on="$listeners"
      />
    </v-container>

    <v-container v-if="!employers.length" class="justify-center align-center d-flex flex-column">
      <v-sparkline
        class="mt-10"
        :value="value"
        :gradient="gradient"
        :smooth="radius || false"
        :padding="padding"
        :line-width="width"
        :stroke-linecap="lineCap"
        :gradient-direction="gradientDirection"
        :fill="fill"
        :type="type"
        :auto-line-width="autoLineWidth"
        auto-draw
      ></v-sparkline>

      <div class="explore-program__no-programs text-center mt-10 d-flex flex-column align-center">
        No programs on the menu
      </div></v-container
    >
  </v-container>
</template>

<script lang="ts">
import { ref, PropType } from '@vue/composition-api';
import { ObjectId } from 'bson';
import { LIST_VIEW_ITEMS, LIST_VIEW_HEADER } from '@/constants/explore';
import ExploreCard from './ExploreCard.vue';

const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'pink'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea']
];

export default {
  name: 'TableView',
  components: {
    ExploreCard
  },
  props: {
    employers: {
      required: true,
      type: Array as PropType<Array<Record<string, any>>>
    },
    bookmarks: {
      required: true,
      type: Array as PropType<Array<ObjectId>>
    }
  },

  setup() {
    return {
      header: ref(LIST_VIEW_HEADER),
      items: ref(LIST_VIEW_ITEMS),

      width: 2,
      radius: 10,
      padding: 8,
      lineCap: 'round',
      gradient: gradients[5],
      value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 15, 0],
      gradientDirection: 'top',
      gradients,
      fill: false,
      type: 'trend',
      autoLineWidth: false,
      carousel: [
        {
          src: 'https://picsum.photos/510/1000?random'
        },
        {
          src: 'https://picsum.photos/510/1000?random'
        },
        {
          src: 'https://picsum.photos/510/1000?random'
        },
        {
          src: 'https://picsum.photos/510/1000?random'
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.monitor {
  &__activities {
    width: 100%;
  }
}

.explore-program {
  &__no-programs {
    color: #dedede;
    font-size: 32px;
    font-style: italic;
    font-weight: 400;
  }
  &__entire-body {
    width: 100%;
  }

  &__title {
    display: flex;
    justify-content: center;
    margin-top: 126px;
    margin-bottom: 47px;
  }

  &__explore-card {
    margin-top: 50px;
    margin-right: 25px;
    margin-bottom: 25px;
    display: grid;
    grid-template-columns: repeat(3, 325px);
    grid-column-gap: 25px;
    grid-row-gap: 25px;
    justify-content: center;
    align-items: center;
  }

  &__filter {
    margin-top: 50px;
  }

  &__filter-buttons {
    margin-left: 0.5%;
    margin-right: 0.5%;
  }
}

.explore-card {
  &__employer-title-red {
    font-family: Raleway;
    font-size: 22px;
    line-height: 30px;
    font-weight: 700;
    color: #ff6666;
    letter-spacing: 0.0125em;
    padding: 15px;
  }
  &__text-background {
    font-family: Raleway;
    font-size: 18px;
    line-height: 26px;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: 0.02em;
    padding: 20px;
  }

  &__employer-title-green {
    font-family: Raleway;
    font-size: 22px;
    line-height: 30px;
    font-weight: 700;
    color: #6fc284;
    letter-spacing: 0.0125em;
    padding: 15px;
  }

  &__employer-title-blue {
    font-family: Raleway;
    font-size: 22px;
    line-height: 30px;
    font-weight: 700;
    color: #3ea7d9;
    letter-spacing: 0.0125em;
    padding: 15px;
  }

  &__employer-title-orange {
    font-family: Raleway;
    font-size: 22px;
    line-height: 30px;
    font-weight: 700;
    color: #f79961;
    letter-spacing: 0.0125em;
    padding: 15px;
  }

  &__employer-title-yellow {
    font-family: Raleway;
    font-size: 22px;
    line-height: 30px;
    font-weight: 700;
    color: #fdd35a;
    letter-spacing: 0.0125em;
    padding: 15px;
  }

  &__employer-title-purple {
    font-family: Raleway;
    font-size: 22px;
    line-height: 30px;
    font-weight: 700;
    color: #ae92b0;
    letter-spacing: 0.0125em;
    padding: 15px;
  }

  &__employer-title-pink {
    font-family: Raleway;
    font-size: 22px;
    line-height: 30px;
    font-weight: 700;
    color: #eda1bf;
    letter-spacing: 0.0125em;
    padding: 15px;
  }

  &__entire-body {
    height: 100%;
  }
  &__card {
    &.v-sheet.v-card {
      border: 1px solid #d1d3d4;
      padding-bottom: 12px;
      height: fit-content;
    }
  }
  &__title {
    display: flex;
    font-family: 'Raleway';
  }
  &__button {
    background: transparent;
  }

  &__duration {
    display: flex;
  }

  &__timeline {
    box-shadow: none !important;
  }

  &__timeline-step {
    font-family: Raleway;
    font-weight: 800;
  }
}
</style>
