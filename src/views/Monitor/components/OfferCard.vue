<template>
  <div class="">
    <v-card flat class="">
      <v-card-title class="pl-12 pr-12 pt-12"
        ><v-icon class="mdi-offer-large" color="purple">mdi-offer</v-icon>
        <div class="ml-auto">
          <v-btn x-large icon @click="closeMakeOfferForm"><v-icon>mdi-close</v-icon></v-btn>
        </div></v-card-title
      >
      <v-card-title class="pl-12 pr-12">
        <h2 class="font-weight-bold mr-3">Make position offer</h2>
        <h2 class="font-weight-light">for {{ selectedStudent.name }}</h2>
      </v-card-title>
      <!-- for edit the offer page -->

      <v-card-title class="pl-12 pr-12">
        <v-btn
          class="mb-3"
          small
          depressed
          rounded
          outlined
          @click="
            $router.push({
              name: 'guide',
              params: { programId: selectedStudent.program_id.toHexString(), page: 15 }
            })
          "
        >
          Edit Offer Presets
        </v-btn>
      </v-card-title>
      <ValidationObserver v-slot="{ validate, failed }" class="d-flex flex-column pa-12 mb-12">
        <AcceptStudentDialog
          v-model="selectedStudent.newOffer"
          :default-offer="selectedStudent.defaultOffer"
        />
        <!-- for sending the offer -->
        <v-btn
          x-large
          class="mt-10 font-weight-bold"
          depressed
          dark
          rounded
          color="purple"
          :loading="selectedStudent.loadingResolveApplication"
          @click="validate().then(valid => onValidation(valid))"
        >
          <v-icon large class="mr-5" left>mdi-telegram</v-icon>Send Offer Now
        </v-btn>

        <!-- error message -->
        <div
          v-if="errorCode == 400 || failed"
          class="mt-5 text-h6 red--text text--lighten-1 text-center"
        >
          Please fill all required fields
        </div>
      </ValidationObserver>
    </v-card>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, reactive, computed } from '@vue/composition-api';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import AcceptStudentDialog from './acceptStudentDialog.vue';

momentDurationFormatSetup(moment);

export default defineComponent({
  name: 'OfferCard',
  components: {
    AcceptStudentDialog
  },
  props: {
    value: {
      required: true,
      type: Object as PropType<Record<string, any>>
    },
    errorCode: {
      required: true,
      type: Number
    }
  },
  setup(props, ctx) {
    const selectedStudent = computed<Record<string, any>>({
      get: () => props.value,
      set: newValue => ctx.emit('input-value', newValue)
    });

    function closeMakeOfferForm() {
      selectedStudent.value.showMakeOfferForm = false;
    }

    const onValidation = (valid: boolean) => {
      if (valid)
        ctx.emit('resolveStudentApplication', {
          studentId: selectedStudent.value._id,
          accept: true,
          newOffer: selectedStudent.value.newOffer
        });
    };

    return {
      selectedStudent,
      closeMakeOfferForm,
      onValidation
    };
  }
});
</script>

<style lang="scss">
$stepper-step-step-width: 100px;
$stepper-step-step-height: 50px;

.mdi-offer-large {
  font-size: 50px !important;
  size: 40px;
}

.completion-text {
  font-family: 'Roboto';
  font-size: 12px;
}

.program-card {
  max-width: 25vw;
}

.guide-bar {
  &__monitor-category {
    background-color: #404142;
    color: white;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    width: fit-content;
    height: 22px;
    // font-family: Raleway;
    // font-weight: 700;
    // font-size: 12px;
  }
  // height: fit-content;
  display: flex;
  height: 100vh;
  border-right: 1px dashed #dedede;
  &__monitor-participants-title {
    font-family: Raleway;
    font-size: 28px;
    font-weight: 800;
    padding: 12px;
  }

  &__cta1 {
    margin-right: auto;
    margin-top: 15px;
  }

  &__cta2 {
    margin-bottom: 25px;
    margin-right: auto;
    margin-top: 15px;
  }

  &__stepper-content {
    height: 110vh;
  }

  &__timeline-item {
    text-transform: uppercase;
    font-size: 9px;
    color: #939598;
    letter-spacing: 1.5px;
    font-weight: 900;
    flex-direction: row;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
  }

  &__timeline-item-setup {
    margin-left: 10px;
    margin-right: 10px;
  }
  .v-card.v-sheet {
    display: block;
    -webkit-transition: display 0.35s ease-out;
    transition: display 0.5s ease-in-out;
    border-radius: 0;
    box-shadow: none !important;
  }
  .v-stepper {
    box-shadow: none;
    overflow-x: hidden;
    background-color: transparent !important;

    .v-stepper__step:first-child {
      padding: 0 0 16px 0;
    }
    .v-stepper__step {
      padding: 24px 0 16px 0;
      background-color: transparent !important;
    }
  }

  &__container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
  }

  &__list-item {
    font-family: Raleway;
    font-size: 12px;
    font-weight: 700;
  }

  &__list-item-title {
    font-family: Raleway;
    font-weight: 700;
    font-size: 14px !important;
    padding: 0px !important;
  }

  &__list {
    width: 25vw;
    overflow-y: auto;
  }
}

.guide-bar {
  &__sub {
    width: 280px;
    padding-left: 67px;
  }
  &__container {
    height: 100vh;
  }
  &__highlight {
    height: 9px;
    width: 90%;
    border-radius: 0 0 5px 5px;
    background-color: #3c9dcd;
  }
  &__title {
    max-width: 100%;
    padding-right: 5%;
    display: flex;
    font-family: Raleway;
    font-weight: 800;
    margin-top: 12px;
    margin-bottom: 12px;
    font-size: 18px;
    text-align: left !important;
  }
  &__stepper {
    flex: 1 1 auto;
    width: 100%;
    justify-content: center;
    overflow-y: auto;
    background-color: transparent !important;

    &-content {
      width: 100%;
      min-height: webkit-min-content;
      display: flex;
    }
  }

  &__expand {
    height: fit-content;
    height: 100vh;
    padding: 12px;
    flex-direction: column;
    display: flex;
    background: #eeeeee;
  }

  &__expand-icon {
    margin-top: 10px;
    cursor: pointer;
  }

  &__sidebar-icon {
    cursor: pointer;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  &__actions {
    width: 90%;
    display: flex;
    justify-content: center;
    background-color: #3c9dcd;
    margin: 10px 10px 10px 10px;
    border-radius: 10px;
    padding: 15px 0 15px 0;

    &-list {
      width: 100%;
      max-width: 80%;
      display: flex;
      justify-content: space-around;
      min-width: 200px;
    }
  }
}
</style>
