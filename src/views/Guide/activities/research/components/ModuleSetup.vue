<template>
  <ValidationObserver v-slot="{ invalid }" slim>
    <v-container class="module-edit">
      <div :ref="body" class="module-edit__body">
        <div class="module-edit__container">
          <!-- <div class="module-edit__video">Name</div>
          <div class="module-edit__link">Link</div>
          <div class="module-edit__required">Required</div> -->
        </div>

        <div class="d-flex justify-center mb-6 flex-column">
          <div class="mb-3">
            <h3 class="text-center">
              Insert links &amp; resources for students to research. Please use unique resource
              links for each row
            </h3>
          </div>
        </div>

        <div
          v-for="(i, itemIndex) in programDoc.data.adks[index].researchLinks"
          :key="itemIndex"
          class="module-edit__inputs"
        >
          <div class="module-edit__inputs-link" style="margin-right: 3%; margin-left: 0">
            <validation-provider
              v-slot="{ errors }"
              :rules="{
                required: true,
                regex:
                  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
              }"
              slim
            >
              <v-text-field
                v-model="i.link"
                :error-messages="errors"
                label="Enter Link"
                outlined
                rounded
                @change="fetchMetaInfo(i.link, itemIndex)"
              ></v-text-field>
            </validation-provider>
          </div>
          <div class="module-edit__inputs-video">
            <validation-provider v-slot="{ errors }" slim rules="required">
              <v-text-field
                v-model="i.resource"
                class="student-research-link-input"
                :error-messages="errors"
                label="Resource Name"
                outlined
                rounded
              >
                <template #append-outer>
                  <loader
                    v-show="isSearching && currentIndex === itemIndex"
                    style="position: absolute; right: 16px; margin-top: -3px"
                  />
                </template>
              </v-text-field>
              <!-- <div>{{ i.name }}</div> -->
            </validation-provider>
          </div>
          <div class="module-edit__inputs-required">
            <v-checkbox
              v-model="i.required"
              :class="$vuetify.breakpoint.xs ? 'mt-0' : ' '"
              label="Required?"
            ></v-checkbox>
          </div>
          <div class="module-edit__inputs-required">
            <!-- <v-checkbox v-model="i.required"></v-checkbox> -->
            <v-btn
              :disabled="itemIndex === 0"
              rounded
              x-large
              outlined
              @click="removeItem(itemIndex)"
              >Delete</v-btn
            >
          </div>
        </div>

        <div class="module-edit__add">
          <v-btn
            :disabled="invalid"
            :ripple="false"
            x-large
            rounded
            class="module-edit__add-button white--text font-weight-bold"
            depressed
            color="red"
            @click="populate()"
          >
            <v-icon class="module-edit__add-icon font-weight-bold mr-1"> mdi-plus</v-icon>Add New
            Link
          </v-btn>
          <!-- <v-btn :loading="loading" @click="save">Save</v-btn>
          <p>{{ errormsg }}</p> -->
        </div>

        <div>
          <v-btn
            :disabled="invalid"
            :loading="loading"
            class="mt-12 setup-adk-research"
            x-large
            rounded
            outlined
            depressed
            @click="process()"
            >Save</v-btn
          >
        </div>
        <v-alert
          v-if="success || error"
          :color="success ? 'green' : 'red'"
          dense
          class="mt-3 white--text presets__alert"
          >{{ message }}</v-alert
        >
      </div>
    </v-container>
  </ValidationObserver>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from '@vue/composition-api';
import { loading } from 'pcv4lib/src';
import axios from 'axios';
import _ from 'lodash';
import MongoDoc from './types';
import loader from './loaderSvg.vue';

// import gql from 'graphql-tag';
// TODO: move this to @pilocity/shared
const enum ProgramActivityStatus {
  NeedSetup = 'need_setup',
  CompleteSetup = 'complete_setup',
  Standard = 'standard'
}

export default defineComponent({
  name: 'ModuleSetup',
  components: {
    loader
  },
  props: {
    value: {
      required: true,
      type: Object as PropType<MongoDoc>
    }
  },
  setup(props, ctx) {
    const programDoc = computed({
      get: () => props.value,
      set: newVal => {
        ctx.emit('input', newVal);
      }
    });

    let index = programDoc.value.data.adks.findIndex(obj => {
      if (obj) {
        return obj.name === 'research';
      }
      return false;
    });
    if (index === -1)
      index =
        programDoc.value.data.adks.push({
          name: 'research'
        }) - 1;
    const initResearchSetup = {
      researchLinks: [
        {
          resource: '',
          link: '',
          required: true
        }
      ]
    };

    programDoc.value.data.adks[index] = {
      ...initResearchSetup,
      ...programDoc.value.data.adks[index]
    };

    // Fetch Metainfo
    const isSearching = ref(false);
    const currentIndex = ref(-1);
    const fetchMetaInfo = _.debounce(async (val, indx) => {
      currentIndex.value = indx;
      const API_ENDPOINT = process.env.VUE_APP_META_GRABBER_ENDPOINT;
      try {
        isSearching.value = true;
        const resp = await axios.get(API_ENDPOINT, {
          params: {
            url: val
          },
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (resp.data.data) {
          programDoc.value.data.adks[index].researchLinks[indx].resource = resp.data.data.title;
        }
        isSearching.value = false;
      } catch (err) {
        console.log(err);
        isSearching.value = false;
      }
    }, 500);

    // Handle Save
    const body = ref(0);
    function populate() {
      programDoc.value.data.adks[index].researchLinks.push({
        resource: '',
        link: '',
        required: true
      });
      body.value += 1;
    }
    function removeItem(itemIndex: number) {
      programDoc.value.data.adks[index].researchLinks.splice(itemIndex, 1);
      body.value += 1;
    }
    return {
      populate,
      fetchMetaInfo,
      isSearching,
      currentIndex,
      index,
      programDoc,
      body,
      removeItem,
      ...loading(
        () =>
          programDoc.value.update(() => ({
            isComplete: true,
            adkIndex: index,
            status: ProgramActivityStatus.CompleteSetup
          })),
        'Success',
        'Try again later'
      )
    };
  }
});
</script>

<style lang="scss">
.module-edit {
  &__body {
    width: 100%;
    display: flex;
    flex-direction: column;
    // padding-left: 5%;
    justify-content: center;
    align-items: center;
  }
  &__video {
    width: 100%;
  }
  &__link {
    // margin-right: 15%;
    width: 100%;
  }
  &__required {
    // padding-left: 20%;
    width: 100%;
  }
  &__inputs {
    width: 100%;
    margin-top: 1%;
    display: flex;
    flex-direction: row;
    &-video {
      display: flex;
      width: 100%;
      // margin-right: 9%;
    }
    &-link {
      display: flex;
      width: 100%;
      margin-left: 3%;
    }
    &-required {
      display: flex;
      // width: 100%;
      margin-left: 3%;
      justify-content: center;
    }
  }
  &__add {
    display: flex;
    width: 100%;
    // padding-right: 15%;
    &-button {
      width: 100%;
    }
  }
}
.student-research-link-input {
  .v-input__slot {
    padding-right: 39px;
  }
  .v-input__append-outer {
    margin-left: 0;
  }
}
</style>
