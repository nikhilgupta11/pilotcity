<template>
  <div class="select__entire-body">
    <pc-select-card class="mt-6 ml-auto mr-auto mb-6" @license="createProgram">
      <template #title>{{ item.title }}</template>
    </pc-select-card>
  </div>
</template>

<script lang="ts">
import { useDbGetters, useUserGetters } from '@/store';
import PCSelectCard from './PCSelectCard.vue';

export default {
  name: 'Select',

  components: {
    'pc-select-card': PCSelectCard
  },

  setup(_props, ctx) {
    const { collection } = useDbGetters(['collection']);
    const { getObjectId } = useUserGetters(['getObjectId']);

    async function createProgram() {
      await collection.value!('Program')
        .insertOne({
          organizers: [getObjectId.value],
          participants: [],
          dateCreated: new Date(),
          licensed: false
        })
        .then(result => {
          ctx.root.$router.push({
            name: 'guide',
            params: { programId: result.insertedId, page: '0' }
          });
        });
    }

    return { createProgram };
  }
};
</script>

<style lang="scss">
.v-stepper--alt-labels .v-stepper__header .v-divider {
  margin-top: 45px !important;
}

.v-stepper__step.v-stepper__step {
  .v-stepper__step__step {
    border: 2px solid #e0e0e0;
  }
}
.select {
  &__entire-body {
    height: 100%;
  }

  &__timeline {
    &.v-stepper {
      box-shadow: none;
    }
  }

  &__stepper {
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 5vh;
  }
}

@media only screen and (min-width: 1024px) and (max-width: 1440px) {
  .select {
    &__cards {
      display: grid;
      justify-content: center;
      align-items: center;
      grid-template-columns: repeat(1, 475px);
      grid-template-rows: repeat(1, 1000px);
      grid-column-gap: 47px;
      grid-row-gap: 43px;
    }
  }
}

@media only screen and (max-width: 1024px) {
  .select {
    &__cards {
      display: grid;
      justify-content: center;
      align-items: center;
      grid-template-columns: repeat(1, 475px);
      grid-template-rows: repeat(1, 375px);
      grid-column-gap: 47px;
      grid-row-gap: 43px;
    }
  }
}
</style>
