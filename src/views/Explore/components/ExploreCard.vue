<template>
  <v-hover v-slot="{ hover }">
    <v-card :elevation="hover ? 10 : 0" class="explore-card__card transition-swing">
      <div class="pl-5 pt-5 pr-5">
        <!-- <v-avatar size="50">
          <v-img :src="employer.avatar"></v-img>
        </v-avatar> -->
      </div>
      <v-btn
        v-if="isExternShip"
        class="explore-card__button font-weight-bold ml-3 mr-1 mb-1"
        rounded
        small
        readonly
        depressed
        outlined
        :color="color"
        :ripple="false"
      >
        Externship only
      </v-btn>
      <div :class="`explore-card__employer-title-${color}`">{{ employer.programName }}</div>
      <v-card flat tile :color="color">
        <div class="explore-card__text-background">
          {{ employer.programDesc }}
          <div class="mt-4">
            <div
              v-for="pathway in employer.pathways"
              :key="pathway"
              class="mr-2 mb-2 explore-card__pathway-chip"
              color="white"
              outlined
              small
            >
              {{ pathway }}
            </div>
          </div>
        </div>
      </v-card>
      <v-list-item class="justify-end">
        <v-tooltip top>
          <template #activator="{ on, attrs }">
            <v-btn v-bind="attrs" icon v-on="on" @click="bookmarkProgram">
              <v-icon :color="bookmarked ? '#fec34b' : 'grey'">mdi-bookmark</v-icon>
            </v-btn>
          </template>
          <span>Bookmark</span>
        </v-tooltip>

        <!-- <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" icon v-on="on">
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </template>
          <span>Copy Share Link</span>
        </v-tooltip> -->
      </v-list-item>

      <v-list-item class="flex-wrap">
        <v-btn
          class="explore-card__button font-weight-bold ml-1 mr-1"
          rounded
          small
          disabled
          depressed
          :ripple="false"
        >
          <v-icon left>mdi-set-none</v-icon>{{ employer.tokens }}1 Token
        </v-btn>
        <router-link
          v-if="isProgramStarted"
          style="text-decoration: none"
          :to="{
            name: 'guide',
            params: {
              programId: employer._id.toString(),
              page: 0
            }
          }"
        >
          <v-btn
            class="explore-card__button font-weight-bold ml-1 mr-1"
            dark
            rounded
            small
            depressed
            :ripple="false"
            >Continue Program</v-btn
          >
        </router-link>
        <router-link
          v-else-if="isOrganizer"
          style="text-decoration: none"
          :to="{
            name: 'Monitor',
            query: {
              program: employer._id.toString()
            }
          }"
        >
          <v-btn
            class="explore-card__button font-weight-bold ml-1 mr-1"
            outlined
            rounded
            small
            depressed
            :ripple="false"
            >Monitor Program</v-btn
          >
        </router-link>
        <router-link
          v-else
          style="text-decoration: none"
          :to="{
            name: 'guide',
            params: {
              programId: employer._id.toString(),
              page: 0
            },
            query: {
              preview: 'true'
            }
          }"
        >
          <v-btn
            class="explore-card__button font-weight-bold ml-1 mr-1"
            outlined
            rounded
            small
            depressed
            :ripple="false"
            >Start Program</v-btn
          >
        </router-link>
      </v-list-item>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from '@vue/composition-api';
import { ObjectId } from 'bson';
import { useDbState } from '@/store';

const colors = ['red', 'purple', 'orange', 'blue', 'green', 'pink', 'yellow'];

export default defineComponent({
  name: 'ExploreCard',
  props: {
    employer: {
      required: true,
      type: Object as PropType<Record<string, any>>
    },
    bookmarks: {
      required: true,
      type: Array as PropType<Array<ObjectId>>
    }
  },
  setup(props, ctx) {
    const { user } = useDbState(['user']);
    const color = colors[Math.floor(Math.random() * colors.length)];
    const bookmarked = computed(() =>
      props.bookmarks.some((id: ObjectId) => id.equals(props.employer._id))
    );
    const isProgramStarted = computed(() => {
      return props.employer?.participants.some((id: ObjectId) => id.equals(user.value?._id));
    });
    const isOrganizer = computed(() => {
      return (
        props.employer?.organizers.some((id: ObjectId) => id.equals(user.value?._id)) &&
        props.employer.published
      );
    });
    const isExternShip = computed(() => {
      return props.employer?.adks.filter(a => a.name === 'offer')[0]?.offer[0]?.externShip;
    });
    const bookmarkProgram = () => {
      ctx.emit('bookmarkProgram', props.employer._id);
    };
    return { color, bookmarkProgram, bookmarked, isProgramStarted, isOrganizer, isExternShip };
  }
});
</script>

<style lang="scss">
.explore-card {
  &__pathway-chip {
    border: 1px solid #ffffff;
    border-radius: 13px;
    font-family: 'Raleway';
    font-size: 12px;
    padding: 5px 10px 5px 10px;
    line-height: 15px;
    width: fit-content;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: 0.02em;
  }
  &__card {
    cursor: pointer;
    // transition: opacity 3s ease-in-out;
  }
  &__employer-title-red {
    font-family: Raleway;
    font-size: 22px;
    line-height: 30px;
    font-weight: 700;
    color: #ea6764;
    letter-spacing: 0.0125em;
    padding: 15px;
  }
  &__employer-title-green {
    font-family: Raleway;
    font-size: 22px;
    line-height: 30px;
    font-weight: 700;
    color: #6eba80;
    letter-spacing: 0.0125em;
    padding: 15px;
  }

  &__employer-title-blue {
    font-family: Raleway;
    font-size: 22px;
    line-height: 30px;
    font-weight: 700;
    color: #3c9dcd;
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
    color: #fec34b;
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

  &__employer-title-grey {
    font-family: Raleway;
    font-size: 22px;
    line-height: 30px;
    font-weight: 700;
    color: #404142;
    letter-spacing: 0.0125em;
    padding: 15px;
  }
}
</style>
