<template>
  <div class="guide-bar">
    <v-card class="program-card">
      <v-expand-x-transition>
        <div v-show="expand" class="guide-bar__container">
          <v-list class="guide-bar__list">
            <v-container fluid>
              <div class="d-flex flex-column">
                <!-- OBJECTIVES & KEY RESULTS -->

                <div v-if="modelProject != null">
                  <v-menu offset-y>
                    <template #activator="{ on, attrs }">
                      <!-- <v-btn color="primary" dark v-bind="attrs" v-on="on"> Dropdown </v-btn> -->
                      <v-lazy>
                        <v-textarea
                          id="action"
                          :key="autoGrowHack"
                          rows="1"
                          auto-grow
                          hide-details
                          :value="modelProject.action"
                          label="Action"
                          prepend-inner-icon="mdi-tools"
                          outlined
                          rounded
                          class="guide-bar__combobox mt-4 mb-4"
                          v-bind="attrs"
                          v-on="on"
                          @click="
                            reloadActions ? generateActionSynonyms(modelProject.action) : null
                          "
                          @input="val => updateAction(val, modelProject.id, true)"
                        >
                          <template #prepend-inner>
                            <v-icon class="pr-2">mdi-tools</v-icon>
                          </template>
                        </v-textarea>
                      </v-lazy>
                    </template>
                    <v-list>
                      <v-list-item-group color="primary">
                        <v-list-item v-if="actionOptions.length === 0">
                          <div class="spinner">
                            <div class="bounce1"></div>
                            <div class="bounce2"></div>
                            <div class="bounce3"></div>
                          </div>
                        </v-list-item>
                        <v-list-item v-for="(item, index) in actionOptions" :key="index">
                          <!-- <v-hover v-slot="{ hover }" open-delay="200"> -->
                          <v-list-item-content>
                            <v-list-item-title
                              @click="updateAction(item, modelProject.id, false)"
                              v-text="item"
                            ></v-list-item-title>
                          </v-list-item-content>
                          <!-- </v-hover> -->
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-menu>
                </div>

                <!-- PROJECTS -->

                <div v-if="modelProject != null">
                  <v-menu offset-y>
                    <template #activator="{ on, attrs }">
                      <v-lazy>
                        <v-textarea
                          id="project"
                          :key="autoGrowHack"
                          rows="1"
                          auto-grow
                          :value="modelProject.text"
                          label="Project"
                          prepend-inner-icon="mdi-file-chart"
                          outlined
                          rounded
                          v-bind="attrs"
                          v-on="on"
                          @click="
                            reloadProjects ? generateProjectSynonyms(modelProject.text) : null
                          "
                          @input="val => updateProject(val, modelProject.id, true)"
                        >
                          <template #prepend-inner>
                            <v-icon class="pr-2">mdi-file-chart</v-icon>
                          </template>
                        </v-textarea>
                      </v-lazy>
                    </template>
                    <v-list>
                      <v-list-item-group color="primary">
                        <v-list-item v-if="projectOptions.length === 0">
                          <div class="spinner">
                            <div class="bounce1"></div>
                            <div class="bounce2"></div>
                            <div class="bounce3"></div>
                          </div>
                        </v-list-item>
                        <v-list-item v-for="(item, index) in projectOptions" :key="index">
                          <v-list-item-content>
                            <v-list-item-title
                              @click="updateProject(item, modelProject.id, false)"
                              v-text="item"
                            ></v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-menu>
                </div>

                <!-- USERS -->

                <div v-if="modelUser != null">
                  <v-menu offset-y>
                    <template #activator="{ on, attrs }">
                      <v-lazy>
                        <v-textarea
                          id="user"
                          :key="autoGrowHack"
                          rows="1"
                          auto-grow
                          :value="modelUser.text"
                          label="User"
                          prepend-inner-icon="mdi-account-group"
                          outlined
                          rounded
                          v-bind="attrs"
                          v-on="on"
                          @click="reloadUsers ? generateUserSynonyms(modelUser.text) : null"
                          @input="val => updateUser(val, modelUser.id, true)"
                        >
                          <template #prepend-inner>
                            <v-icon class="pr-2">mdi-account-group</v-icon>
                          </template>
                        </v-textarea>
                      </v-lazy>
                    </template>
                    <v-list>
                      <v-list-item-group color="primary">
                        <v-list-item v-if="userOptions.length === 0">
                          <div class="spinner">
                            <div class="bounce1"></div>
                            <div class="bounce2"></div>
                            <div class="bounce3"></div>
                          </div>
                        </v-list-item>
                        <v-list-item v-for="(item, index) in userOptions" :key="index">
                          <v-list-item-content>
                            <v-list-item-title
                              @click="updateUser(item, modelUser.id, false)"
                              v-text="item"
                            ></v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-menu>
                </div>
              </div>

              <!-- OBJECTIVES -->

              <div v-if="modelObjective != null">
                <v-menu offset-y>
                  <template #activator="{ on, attrs }">
                    <v-lazy>
                      <v-textarea
                        id="objective"
                        :key="autoGrowHack"
                        rows="1"
                        auto-grow
                        hide-details
                        :value="modelObjective.text"
                        label="Objective & Key Result"
                        prepend-inner-icon="mdi-sign-direction"
                        outlined
                        rounded
                        class="guide-bar__combobox mb-4"
                        v-bind="attrs"
                        v-on="on"
                        @click="
                          reloadObjectives ? generateObjectiveSynonyms(modelObjective.text) : null
                        "
                        @input="val => updateObjective(val, modelObjective.id, true)"
                      >
                        <template #prepend-inner>
                          <v-icon class="pr-2">mdi-sign-direction</v-icon>
                        </template>
                      </v-textarea>
                    </v-lazy>
                  </template>
                  <v-list>
                    <v-list-item-group color="primary">
                      <v-list-item v-if="objectiveOptions.length === 0">
                        <div class="spinner">
                          <div class="bounce1"></div>
                          <div class="bounce2"></div>
                          <div class="bounce3"></div>
                        </div>
                      </v-list-item>
                      <v-list-item v-for="(item, index) in objectiveOptions" :key="index">
                        <v-list-item-content>
                          <v-list-item-title
                            @click="updateObjective(item, modelObjective.id, false)"
                            v-text="item"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-menu>
              </div>

              <div style="text-align: left">
                <div class="horizontal-center">
                  <v-btn
                    class="font-weight-bold mt-3"
                    large
                    rounded
                    outlined
                    depressed
                    @click="$emit('update:generateScopes')"
                    ><v-icon left>mdi-refresh</v-icon>Re-generate</v-btn
                  >
                </div>
              </div>
            </v-container>
          </v-list>
        </div>
      </v-expand-x-transition>
    </v-card>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, PropType } from '@vue/composition-api';

export default defineComponent({
  name: 'Bar',
  props: {
    objective: {
      required: true
    },
    project: {
      required: true
    },
    user: {
      required: true
    },
    openai: {
      required: true
    },
    autoGrowHack: {
      required: true
    }
  },

  setup(props, ctx) {
    const expand = ref(true); // open or closed sidebar

    return {
      expand
    };
  },
  data: () => ({
    search: true,
    key: 'id',
    modelObjective: null,
    modelAction: null,
    modelProject: null,
    modelUser: null,
    actionOptions: [],
    projectOptions: [],
    userOptions: [],
    objectiveOptions: [],
    reloadActions: true,
    reloadProjects: true,
    reloadUsers: true,
    reloadObjectives: true
  }),

  watch: {
    objective(newVal) {
      this.modelObjective = JSON.parse(JSON.stringify(newVal));
      this.reloadObjectives = true;
    },
    project(newVal) {
      // console.log(newVal);
      this.modelProject = JSON.parse(JSON.stringify(newVal));
      this.reloadActions = true;
      this.reloadProjects = true;
    },
    user(newVal) {
      this.modelUser = JSON.parse(JSON.stringify(newVal));
      this.reloadUsers = true;
    }
  },

  methods: {
    updateAction(action, projectId, reload) {
      this.modelProject.action = action;
      this.reloadActions = reload;
      this.$emit('update:actionGuideBar', {
        action,
        projectId
      });
    },
    updateProject(project, projectId, reload) {
      this.modelProject.text = project;
      this.reloadProjects = reload;
      this.$emit('update:projectGuideBar', { text: project, projectId });
    },
    updateUser(user, userId, reload) {
      this.modelUser.text = user;
      this.reloadUsers = reload;
      this.$emit('update:userGuideBar', { text: user, userId });
    },
    updateObjective(objective, objectiveId, reload) {
      this.modelObjective.text = objective;
      this.reloadObjectives = reload;
      this.$emit('update:objectiveGuideBar', { text: objective, objectiveId });
    },
    async generateActionSynonyms(action) {
      this.reloadActions = false;
      const response = await this.openai.createCompletion('text-davinci-001', {
        prompt: ['Find 5 synonyms for each of these words:\n\n', action, '.'].join(''),
        temperature: 0,
        max_tokens: 32,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0
      });

      const [result] = response.data.choices;

      if (
        RegExp('(?=.*1\\.)(?=.*2\\.)(?=.*3\\.)').test(result.text.replace(/(\r\n|\r|\n|\s)+/gm, ''))
      ) {
        this.actionOptions = result.text
          .replace(/(^(\r\n|\r|\n)+)/gm, '')
          .split('\n')
          .map(item => {
            return item.substring(3).trim();
          });
      } else {
        this.actionOptions = result.text
          .replace(/(^(\r\n|\r|\n)+)/gm, '')
          .split(',')
          .map(item => {
            return item.trim();
          });
      }

      // console.log(result.text.replace(/(^(\r\n|\r|\n)+)/gm, ''));
      // console.log(this.actionOptions);
      // console.log(result.text.replace(/(\r\n|\r|\n|\s)+/gm, ''));
    },
    async generateProjectSynonyms(project) {
      this.reloadProjects = false;
      const response = await this.openai.createCompletion('text-davinci-001', {
        prompt: ['Find 5 other meanings for this sentence:\n\n', project, '.'].join(''),
        temperature: 0,
        max_tokens: 200,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0
      });

      const [result] = response.data.choices;

      if (
        RegExp('(?=.*1\\.)(?=.*2\\.)(?=.*3\\.)').test(result.text.replace(/(\r\n|\r|\n|\s)+/gm, ''))
      ) {
        this.projectOptions = result.text
          .replace(/(^(\r\n|\r|\n)+)/gm, '')
          .split('\n')
          .map(item => {
            return item.substring(3).trim();
          });
      } else {
        this.projectOptions = result.text
          .replace(/(^(\r\n|\r|\n)+)/gm, '')
          .split(',')
          .map(item => {
            return item.trim();
          });
      }
      // console.log(result.text.replace(/(^(\r\n|\r|\n)+)/gm, ''));
      // console.log(result.text.replace(/(\r\n|\r|\n|\s)+/gm, ''));
    },
    async generateUserSynonyms(user) {
      this.reloadUsers = false;
      const response = await this.openai.createCompletion('text-davinci-001', {
        prompt: ['Find 5 synonyms for this phrase:\n\n', user, '.'].join(''),
        temperature: 1.0,
        max_tokens: 64,
        top_p: 0.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0
      });

      const [result] = response.data.choices;

      if (
        RegExp('(?=.*1\\.)(?=.*2\\.)(?=.*3\\.)').test(result.text.replace(/(\r\n|\r|\n|\s)+/gm, ''))
      ) {
        this.userOptions = result.text
          .replace(/(^(\r\n|\r|\n)+)/gm, '')
          .split('\n')
          .map(item => {
            return item.substring(3).trim();
          });
      } else {
        this.userOptions = result.text
          .replace(/(^(\r\n|\r|\n)+)/gm, '')
          .split(',')
          .map(item => {
            return item.trim();
          });
      }
      // console.log(result.text.replace(/(^(\r\n|\r|\n)+)/gm, ''));
      // console.log(this.actionOptions);
      // console.log(result.text);
      // console.log(result.text.replace(/(\r\n|\r|\n|\s)+/gm, ''));
    },
    async generateObjectiveSynonyms(objective) {
      // console.log('reload');
      this.reloadObjectives = false;
      const response = await this.openai.createCompletion('text-davinci-001', {
        prompt: ['Find 5 other meanings for this sentence:\n\n', objective, '.'].join(''),
        temperature: 0,
        max_tokens: 200,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0
      });

      const [result] = response.data.choices;

      if (
        RegExp('(?=.*1\\.)(?=.*2\\.)(?=.*3\\.)').test(result.text.replace(/(\r\n|\r|\n|\s)+/gm, ''))
      ) {
        this.objectiveOptions = result.text
          .replace(/(^(\r\n|\r|\n)+)/gm, '')
          .split('\n')
          .map(item => {
            return item.substring(3).trim();
          });
      } else {
        this.objectiveOptions = result.text
          .replace(/(^(\r\n|\r|\n)+)/gm, '')
          .split(',')
          .map(item => {
            return item.trim();
          });
      }
      // console.log(result.text.replace(/(^(\r\n|\r|\n)+)/gm, ''));
      // console.log(this.actionOptions);
    }
  }
});
</script>

<style lang="scss">
$stepper-step-step-width: 100px;
$stepper-step-step-height: 50px;

.max-width-chip .v-chip__content {
  padding-right: 10px;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
}

.program-card {
  max-width: 25vw;
  color: #dedede !important;
}
.v-application--is-ltr .guide-bar .v-stepper--vertical .v-stepper__content {
  margin: -16px -12px -24px 12px;
}
.theme--light.v-stepper
  .v-stepper__step:not(.v-stepper__step--active):not(.v-stepper__step--complete):not(.v-stepper__step--error)
  .v-stepper__step__step {
  align-items: center;
  border-radius: 50%;
  display: inline-flex;
  font-size: 0.75rem;
  justify-content: center;
  height: 16px;
  min-width: 16px;
  width: 16px;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.theme--light.v-stepper
  .v-stepper__step:not(.v-stepper__step--active):not(.v-stepper__step--complete):not(.v-stepper__step--error)
  .v-stepper__step__step {
  background: #ffffff !important;
  border: 1px solid #dedede;
  margin-left: 5px;
}

.mdi-check::before {
  font-weight: 900;
}

.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  box-shadow: none !important;
}

.v-list-item__content {
  display: inline !important;
}

.guide-bar {
  display: flex;
  height: 100vh;

  &__activities-chips {
    margin: 3px;
  }

  &__explore-participants-title {
    font-family: Raleway;
    font-size: 36px;
    font-weight: 800;
    line-height: 42px;
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
    height: 100%;
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
    max-height: 100vh;
    background-color: transparent;
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
    width: 24vw;
    overflow-y: auto;
  }
}

.guide-bar {
  &__sub {
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

// loading spinner
.spinner {
  margin: 10px auto;
  width: 70px;
  text-align: center;
}

.spinner > div {
  width: 18px;
  height: 18px;
  background-color: #333;

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
  }
}

@keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
