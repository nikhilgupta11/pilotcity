<template>
  <div class="explore guide__container flex-row d-flex">
    <!-- <div class="guide__bar"></div> -->
    <!-- <div class="guide__page">
      <div class="guide__activity-title-button">
        <v-avatar size="50">
          <v-img
            src="https://cdn.discordapp.com/attachments/692111176129052712/800962947743875102/Screen_Shot_2021-01-18_at_9.40.44_PM.png"
          ></v-img>
        </v-avatar>
      </div>
      <div class="guide__activity-title">Prajit Saravanan's Progress</div> -->

    <div class="guide__table2">
      <v-stepper v-model="stepId" alt-labels class="guide__scope" flat>
        <v-stepper-header dark class="guide__scope-stepper-header">
          <!-- <v-icon color="black" x-large class="ml-6">mdi-panda</v-icon>
          <div class="d-flex align-center ml-3"><h1>Scope Builder</h1></div> -->

          <v-stepper-step :complete="stepId > 1" step="1" class="overline font-weight-bold"
            >Objectives
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="stepId > 2" step="2" class="overline font-weight-bold">
            Projects
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="stepId > 3" step="3" class="overline font-weight-bold">
            Users
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="stepId > 4" step="4" class="overline font-weight-bold">
            Results
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="5" class="overline font-weight-bold mr-10">
            Wordsmith
          </v-stepper-step>

          <div
            v-if="showCloseBtn"
            class="mt-auto mb-auto"
            :class="$vuetify.breakpoint.xs ? 'mr-0' : 'mr-15'"
          >
            <v-btn icon x-large @click="$emit('update:closeScopeDialog')"
              ><v-icon x-large color="">mdi-close</v-icon></v-btn
            >
          </div>

          <!-- <div class="d-flex align-center mr-6">
            <v-btn class="ml-6" rounded large depressed outlined color="primary" @click="stepId = +1">
              <v-icon left>mdi-skip-next</v-icon> Skip
            </v-btn>
          </div> -->
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content class="guide__scope-stepper-content" step="1">
            <!-- <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card> -->
            <div class="d-flex flex-column justify-center mt-12">
              <div class="mt-12">
                <v-icon class="mt-8 ml-auto mr-auto d-flex justify-center" color="green" x-large
                  >mdi-sign-direction</v-icon
                >
                <h2
                  class="
                    guide__scope-prompt
                    d-flex
                    justify-center
                    mt-4
                    mb-12
                    ml-auto
                    mr-auto
                    green--text
                  "
                >
                  List objectives & key results that will be & remain priority in 6 months to 2
                  years
                </h2>
                <!-- <div class="d-flex justify-center mb-5">
                  <v-chip class="font-weight-bold overline" color="green" small dark
                    ><v-icon small left>mdi-sign-direction</v-icon>Objectives & Key Results</v-chip
                  >
                </div> -->
              </div>

              <!-- <p>{{ objectives }}</p> -->

              <div v-for="objective in objectives" :key="objective.id">
                <div
                  class="guide__add-fields d-flex justify-center align-center mt-3 mb-3"
                  :class="$vuetify.breakpoint.xs ? 'flex-column' : 'flex-row'"
                >
                  <div class="item-action-dropdown d-flex align-center">
                    <v-text-field
                      v-model="objective.text"
                      hide-details
                      label="Objective & Key Result"
                      class="guide__objective-field ml-2 mr-2"
                      placeholder="Enter objective & key result here"
                      outlined
                      rounded
                    ></v-text-field>
                  </div>
                  <!-- <div class="d-flex align-center">
                    <v-select
                      v-model="objective.priority"
                      hide-details
                      :items="priorityItems"
                      label="Priority"
                      class="guide__objective-priority-select ml-2 mr-2"
                      rounded
                      outlined
                      @change="sortPriorityObjective"
                    ></v-select>
                  </div> -->
                  <div class="d-flex align-center">
                    <v-btn
                      class="ml-2 mr-2 font-weight-bold"
                      :disabled="objective.text == null || objective.text.length === 0"
                      :dark="objective.text != null && objective.text.length > 0"
                      depressed
                      rounded
                      color="green"
                      x-large
                      @click="selectObjective(objective.id)"
                      >Choose<v-icon right>mdi-cursor-default</v-icon></v-btn
                    >
                  </div>
                  <div class="d-flex align-center">
                    <v-btn
                      class=""
                      rounded
                      depressed
                      icon
                      color="red"
                      @click="confirmDeleteObjective(objective.id)"
                      ><v-icon>mdi-trash-can-outline</v-icon></v-btn
                    >
                  </div>
                </div>
              </div>

              <div class="d-flex justify-center mt-3 mb-3">
                <v-btn
                  rounded
                  x-large
                  class="white--text font-weight-bold"
                  depressed
                  outlined
                  color="green"
                  @click="addObjective"
                >
                  <v-icon class="module-edit__add-icon font-weight-bold" left> mdi-plus </v-icon>
                  Add New Objective
                </v-btn>
              </div>

              <div class="d-flex justify-center mt-12 mb-12">
                <!-- <v-btn rounded x-large depressed text> Back </v-btn> -->
                <!-- <v-btn rounded large depressed outlined color="primary" @click="stepId = 2">
                  <v-icon left>mdi-skip-backward</v-icon> Back
                </v-btn> -->
              </div>
            </div>
          </v-stepper-content>

          <v-stepper-content class="guide__scope-stepper-content" step="2">
            <div class="d-flex flex-column justify-center mt-12">
              <div
                class="d-flex justify-start mb-6"
                :class="$vuetify.breakpoint.xs ? 'mt-16' : 'mt-12'"
              >
                <!-- <v-btn rounded x-large depressed text> Back </v-btn> -->
                <v-btn
                  rounded
                  x-large
                  depressed
                  class="font-weight-bold"
                  color="transparent"
                  @click="stepId = 1"
                >
                  <v-icon large left>mdi-chevron-double-left</v-icon> Back
                </v-btn>
              </div>
              <div class="mb-6">
                <v-icon class="ml-auto mr-auto d-flex justify-center" color="red" x-large
                  >mdi-monitor-dashboard</v-icon
                >
                <h2
                  class="guide__scope-prompt mt-4 d-flex justify-center ml-auto mr-auto red--text"
                >
                  List projects or deliverables to achieve this objective & key result
                </h2>
                <!-- <div class="d-flex justify-center mt-5">
                  <v-chip class="font-weight-bold overline" color="grey" small outlined
                    ><v-icon small left>mdi-sign-direction</v-icon>Objective & Key Result</v-chip
                  >
                </div> -->

                <div
                  v-if="objectives.find(item => item.id === curObjectiveId) != null"
                  class="guide__list-box mt-5"
                >
                  <span class="font-weight-bold">Objective & Key Result: </span>
                  <span>{{ objectives.find(item => item.id === curObjectiveId).text }}</span>
                </div>
                <div v-else class="guide__list-box mt-5">
                  <span>No objective & key result</span>
                </div>
                <!-- <div v-else>
                  <h4 class="d-flex justify-center ml-auto mr-auto mt-5">
                    No objective & key result
                  </h4>
                </div> -->
              </div>
              <!-- <div class="d-flex justify-center mb-5">
                <v-chip class="font-weight-bold overline" color="red" small dark
                  ><v-icon small left>mdi-monitor-dashboard</v-icon>Projects</v-chip
                >
              </div> -->

              <!-- <p>{{ keyResults }}</p> -->
              <div v-for="project in projects" :key="project.id">
                <div v-if="project.objectiveId == curObjectiveId">
                  <div class="guide__add-fields d-flex justify-center align-center mt-3 mb-3">
                    <div class="item-action-dropdown">
                      <v-combobox
                        v-model="project.action"
                        :items="actionItems"
                        :search-input.sync="project.actionTmp"
                        label="Action"
                        class="guide__objective-action-select ml-2 mr-2"
                        rounded
                        outlined
                        hide-details
                        @change="updateAction"
                      >
                        <template #no-data>
                          <v-list-item @click="updateAction(project.actionTmp)">
                            <span class="subheading">Create </span>
                            <v-spacer></v-spacer>
                            <v-chip :color="`green lighten-3`" label small>
                              {{ project.actionTmp }}
                            </v-chip>
                          </v-list-item>
                        </template>
                        <!-- <template #selection>
                          <span>{{ project.action }}</span>
                        </template> -->
                        <template #item="{ item }">
                          <span class="pr-1">
                            {{ item }}
                          </span>
                          <div v-if="item !== project.action">
                            <v-list-item-action @click.stop>
                              <v-btn small icon @click.stop.prevent="removeAction(item)">
                                <v-icon small>mdi-close</v-icon>
                              </v-btn>
                            </v-list-item-action>
                          </div>
                        </template>
                      </v-combobox>
                    </div>
                    <div class="deliverable-textbox">
                      <v-text-field
                        v-model="project.text"
                        hide-details
                        label="Deliverable"
                        class="guide__objective-field ml-2 mr-2"
                        placeholder="Example: An app to detect people infected with Covid-19 by using ..."
                        outlined
                        rounded
                      ></v-text-field>
                    </div>
                    <div>
                      <v-btn
                        :disabled="
                          project.text == null ||
                          project.text.length === 0 ||
                          project.action == null ||
                          project.action.length === 0
                        "
                        :dark="
                          project.text != null &&
                          project.text.length > 0 &&
                          project.action != null &&
                          project.action.length > 0
                        "
                        class="ml-2 mr-2 font-weight-bold"
                        depressed
                        color="red"
                        rounded
                        x-large
                        @click="selectProject(project.id)"
                        >Choose<v-icon right>mdi-cursor-default</v-icon></v-btn
                      >
                    </div>

                    <div>
                      <v-btn
                        class="ml-1 mr-1"
                        rounded
                        depressed
                        color="red"
                        icon
                        @click="confirmDeleteProject(project.id)"
                        ><v-icon>mdi-trash-can-outline</v-icon></v-btn
                      >
                    </div>
                  </div>
                </div>
              </div>

              <div class="d-flex justify-center mt-3 mb-3">
                <v-btn
                  rounded
                  x-large
                  class="white--text font-weight-bold"
                  depressed
                  color="red"
                  outlined
                  @click="addProject(curObjectiveId)"
                >
                  <v-icon class="module-edit__add-icon font-weight-bold" left> mdi-plus </v-icon>
                  Add New Project
                </v-btn>
              </div>
            </div>
          </v-stepper-content>

          <v-stepper-content class="guide__scope-stepper-content" step="3">
            <div class="d-flex flex-column justify-center mt-12">
              <div
                class="d-flex justify-start mb-6"
                :class="$vuetify.breakpoint.xs ? 'mt-16' : 'mt-12'"
              >
                <!-- <v-btn rounded x-large depressed text> Back </v-btn> -->
                <v-btn
                  rounded
                  x-large
                  depressed
                  class="font-weight-bold"
                  color="transparent"
                  @click="stepId = 2"
                >
                  <v-icon large left>mdi-chevron-double-left</v-icon> Back
                </v-btn>
              </div>
              <div class="mb-6">
                <v-icon class="ml-auto mr-auto d-flex justify-center" color="blue" x-large
                  >mdi-file-chart</v-icon
                >

                <h2
                  class="guide__scope-prompt mt-4 d-flex justify-center ml-auto mr-auto blue--text"
                >
                  List the users or audience this project is for
                </h2>
                <div class="guide__list-box mt-5">
                  <div v-if="objectives.find(item => item.id === curObjectiveId) != null">
                    <span class="font-weight-bold">Objective & Key Result: </span>
                    <span> {{ objectives.find(item => item.id === curObjectiveId).text }}</span>
                  </div>
                  <div v-else class="guide__list-box mt-5">
                    <span>No objective & key result</span>
                  </div>
                  <br />
                  <div v-if="projects.find(item => item.id === curProjectId) != null">
                    <span class="font-weight-bold">Action: </span>
                    <span> {{ projects.find(item => item.id === curProjectId).action }}</span>
                  </div>
                  <br />
                  <div v-if="projects.find(item => item.id === curProjectId) != null">
                    <span class="font-weight-bold">Project: </span>
                    <span> {{ projects.find(item => item.id === curProjectId).text }}</span>
                  </div>
                  <div v-else class="guide__list-box mt-5">
                    <span> No project</span>
                  </div>
                </div>
              </div>
              <!-- <div class="d-flex justify-center mt-5">
                  <v-chip class="font-weight-bold overline" color="grey" outlined small
                    ><v-icon small left>mdi-file-chart</v-icon>Project</v-chip
                  >
                </div>
                <div v-if="projects.find(item => item.id === curProjectId) != null">
                  <h4 class="guide__objective-box d-flex justify-center ml-auto mr-auto mt-5">
                    {{ projects.find(item => item.id === curProjectId).text }}
                  </h4>
                </div>
                <div v-else>
                  <h4 class="guide__objective-box d-flex justify-center ml-auto mr-auto mt-5">
                    No project
                  </h4>
                </div> -->

              <!-- <div class="d-flex justify-center mb-5">
                <v-chip class="font-weight-bold overline" color="blue" small dark
                  ><v-icon small left>mdi-monitor-dashboard</v-icon>Users</v-chip
                >
              </div> -->

              <!-- <p>{{ projects }}</p> -->
              <div v-for="user in users" :key="user.id">
                <div v-if="user.objectiveId == curObjectiveId && user.projectId == curProjectId">
                  <div
                    class="guide__add-fields d-flex flex-row justify-center align-center mt-3 mb-3"
                    :class="$vuetify.breakpoint.xs ? 'flex-column' : 'flex-row'"
                  >
                    <div class="item-action-dropdown">
                      <v-text-field
                        v-model="user.text"
                        hide-details
                        label="User"
                        class="guide__objective-field ml-2 mr-2"
                        placeholder="Enter user here"
                        outlined
                        rounded
                      ></v-text-field>
                    </div>
                    <!-- <div>
                      <v-select
                        v-model="user.priority"
                        hide-details
                        :items="priorityItems"
                        label="Priority"
                        class="guide__objective-priority-select ml-2 mr-2"
                        rounded
                        outlined
                        @change="sortPriorityUser"
                      ></v-select>
                    </div> -->
                    <div>
                      <v-btn
                        class="ml-2 mr-2 font-weight-bold"
                        :disabled="user.text == null || user.text.length === 0"
                        :dark="user.text != null && user.text.length > 0"
                        depressed
                        color="blue"
                        rounded
                        x-large
                        @click="selectUser(user.id)"
                        >Choose<v-icon right>mdi-cursor-default</v-icon></v-btn
                      >
                    </div>

                    <div>
                      <v-btn
                        class="ml-1 mr-1"
                        rounded
                        depressed
                        color="red"
                        icon
                        @click="confirmDeleteUser(user.id)"
                        ><v-icon>mdi-trash-can-outline</v-icon></v-btn
                      >
                    </div>
                  </div>
                </div>
              </div>

              <div class="d-flex justify-center mt-3 mb-3">
                <v-btn
                  rounded
                  x-large
                  class="white--text font-weight-bold"
                  depressed
                  outlined
                  color="blue"
                  @click="addUser(curObjectiveId, curProjectId)"
                >
                  <v-icon class="module-edit__add-icon font-weight-bold" left> mdi-plus </v-icon>
                  Add New User
                </v-btn>
              </div>
            </div>
          </v-stepper-content>

          <v-stepper-content class="guide__scope-stepper-content mt-16" step="4">
            <!-- <div class="d-flex justify-start mt-12">
              <v-btn
                :disabled="curUserId == null"
                rounded
                x-large
                depressed
                class="font-weight-bold"
                color="transparent"
                @click="stepId = 3"
              >
                <v-icon large left>mdi-chevron-double-left</v-icon> Back
              </v-btn>
            </div> -->
            <div class="d-flex" :class="$vuetify.breakpoint.xs ? 'flex-column' : 'flex-row'">
              <div class="d-flex flex-column">
                <div
                  class="d-flex justify-start"
                  :class="$vuetify.breakpoint.xs ? 'mt-16' : 'mt-12'"
                >
                  <v-btn
                    :disabled="curUserId == null"
                    rounded
                    x-large
                    depressed
                    class="font-weight-bold"
                    color="transparent"
                    @click="stepId = 3"
                  >
                    <v-icon large left>mdi-chevron-double-left</v-icon> Back
                  </v-btn>
                </div>
                <guide-bar
                  class="guide__bar2 guide__step4"
                  :objective="objectives.find(item => item.id === curObjectiveId)"
                  :project="projects.find(item => item.id === curProjectId)"
                  :user="users.find(item => item.id === curUserId)"
                  :openai="openai"
                  :auto-grow-hack="autoGrowHack"
                  @update:objectiveGuideBar="updateObjectiveGuideBar($event)"
                  @update:actionGuideBar="updateActionGuideBar($event)"
                  @update:projectGuideBar="updateProjectGuideBar($event)"
                  @update:userGuideBar="updateUserGuideBar($event)"
                  @update:generateScopes="generateScopes()"
                />
              </div>
              <div class="d-flex flex-column" :class="$vuetify.breakpoint.xs ? 'pa-2' : 'pa-12'">
                <div class="d-flex flex-row align-center mt-10">
                  <h1 color="purple" class="purple--text">{{ numScopes }} Scopes</h1>
                  <!-- <v-chip small class="font-weight-bold overline ml-6" outlined close
                    >Sort by priority</v-chip
                  > -->
                </div>
                <div>
                  <v-simple-table class="mt-10 mb-10">
                    <template #default>
                      <thead>
                        <tr>
                          <th class="text-left">Choose</th>
                          <th class="text-left">Scopes</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in displayScopes" :key="index">
                          <td>
                            <v-btn
                              large
                              class="font-weight-bold"
                              color="purple"
                              rounded
                              dark
                              depressed
                              @click="selectScope(item)"
                              >Choose<v-icon right>mdi-cursor-default</v-icon></v-btn
                            >
                          </td>
                          <td class="pa-5">
                            <!-- <div class="pb-2">
                                <v-btn class="ml-2 mr-2" icon
                                  ><v-icon>mdi-sign-direction</v-icon></v-btn
                                >
                                <v-btn class="ml-2 mr-2" icon><v-icon>mdi-file-chart</v-icon></v-btn>
                                <v-btn class="ml-2 mr-2" icon
                                  ><v-icon>mdi-account-group</v-icon></v-btn
                                >
                                <v-btn class="ml-2 mr-2" icon><v-icon>mdi-tools</v-icon></v-btn>
                              </div> -->
                            <h3>{{ item }}</h3>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </div>
                <div v-if="displayScopes.length == 0" :class="loadingObject">
                  <div class="loading-item" :style="`width: 320%;`"></div>
                  <div class="loading-item" :style="`width: 340%;`"></div>
                  <div class="loading-item" :style="`width: 360%;`"></div>
                </div>
              </div>
            </div>
          </v-stepper-content>

          <v-stepper-content class="guide__step5 guide__scope-stepper-content mt-16" step="5">
            <div class="d-flex" :class="$vuetify.breakpoint.xs ? 'flex-column' : 'flex-row'">
              <div
                class="guide__scope-finalize d-flex mt-4 pr-6 mr-auto ml-auto mb-auto flex-column"
              >
                <div class="d-flex flex-row align-center mb-12">
                  <div class="d-flex justify-start">
                    <v-btn
                      rounded
                      x-large
                      depressed
                      class="font-weight-bold"
                      color="transparent"
                      :disabled="displayScopes.length == 0"
                      @click="stepId = 4"
                    >
                      <v-icon large left>mdi-chevron-double-left</v-icon> Back
                    </v-btn>
                  </div>
                  <div class="ml-auto mr-auto"></div>
                  <div class="d-flex justify-end">
                    <div class="">
                      <!-- <v-btn color="transparent" depressed @click="expand = !expand">
                        <v-icon large left>{{
                          expand == true ? 'mdi-chevron-double-right' : 'mdi-chevron-double-left'
                        }}</v-icon>
                      </v-btn> -->

                      <v-btn
                        large
                        outlined
                        depressed
                        class="font-weight-bold"
                        @click="expand = !expand"
                      >
                        <v-icon left>{{
                          expand == true ? 'mdi-chevron-double-right' : 'mdi-chevron-double-left'
                        }}</v-icon
                        >{{ expand == true ? 'Collapse' : 'Scopes Saved' }}
                      </v-btn>
                    </div>
                  </div>
                </div>

                <div class="d-flex justify-center mt-12">
                  <h2 class="pink--text guide__scope-wordsmith-title d-flex">Wordsmith</h2>
                </div>
                <v-textarea
                  v-model="tmpScopeText"
                  rounded
                  outlined
                  class="guide__scope-finalize-textarea mt-5 mb-5"
                  auto-grow
                  counter
                ></v-textarea>
                <!-- <v-progress-linear
                class="mb-3 mt-3"
                rounded
                height="10"
                color="green"
                value="75"
                ></v-progress-linear> -->
                <v-btn
                  x-large
                  rounded
                  color="pink"
                  class="guide__scope-finalize-save-btn font-weight-bold"
                  depressed
                  :dark="tmpScopeText.length !== 0"
                  :disabled="tmpScopeText.length === 0"
                  @click="saveScopeText(tmpScopeId, tmpScopeText)"
                  >Save Scope</v-btn
                >

                <div class="d-flex justify-center mt-12 mb-12">
                  <!-- <v-btn rounded x-large depressed text> Back </v-btn> -->
                  <v-btn rounded x-large depressed outlined color="primary" @click="stepId = 1">
                    Skip to Objectives<v-icon right>mdi-skip-forward</v-icon>
                  </v-btn>
                </div>
              </div>

              <div v-show="expand">
                <div class="d-flex flex-column">
                  <div class="guide__scopes-saved d-flex flex-column pl-6">
                    <div class="mt-2 mb-2"><h1>Scopes Saved</h1></div>
                    <v-divider class="mt-3 mb-3"></v-divider>
                    <!-- ENTRY -->
                    <div v-for="scope in savedScopes" :key="scope.id">
                      <div class="mt-2 mb-2">
                        <h4>
                          {{ scope.text }}
                        </h4>

                        <div class="d-flex flex-row align-center justify-end">
                          <div v-if="userType !== 'anon-user'" class="ma-2">
                            <v-btn
                              rounded
                              large
                              depressed
                              class="font-weight-bold"
                              dark
                              @click="insertProgramWithScope(scope.text)"
                              >Insert</v-btn
                            >
                          </div>
                          <div v-else class="ma-2">
                            <!-- <a href="/signup"> -->
                            <v-btn
                              rounded
                              large
                              depressed
                              class="font-weight-bold"
                              dark
                              @click="createProgramWithScope(scope.text)"
                              >Create new program with scope</v-btn
                            >
                            <!-- </a> -->
                          </div>
                          <div class="ma-2">
                            <v-btn
                              rounded
                              depressed
                              outlined
                              @click="editScopeText(scope.id, scope.text)"
                              >Edit</v-btn
                            >
                          </div>
                          <div class="">
                            <v-btn
                              rounded
                              depressed
                              icon
                              color="red"
                              @click="confirmDeleteSavedScope(scope.id)"
                              ><v-icon>mdi-trash-can-outline</v-icon></v-btn
                            >
                          </div>
                        </div>
                        <v-divider class="mt-3"></v-divider>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>

      <v-dialog v-model="confirmDelete" max-width="fit-content">
        <v-card class="pa-8">
          <div class="d-flex justify-center flex-column">
            <div class="d-flex justify-center">
              <h2 class="mb-4">Are you sure?</h2>
            </div>
            <div class="d-flex flex-row justify-center">
              <div>
                <v-btn
                  x-large
                  class="ma-3"
                  rounded
                  outlined
                  color="grey"
                  @click="confirmDelete = false"
                  >Close</v-btn
                >
              </div>
              <div>
                <v-btn
                  rounded
                  x-large
                  dark
                  class="ma-3 font-weight-bold"
                  depressed
                  color="red"
                  @click="confirmDeleteFunc"
                  ><v-icon left>mdi-trash-can</v-icon>Delete</v-btn
                >
              </div>
            </div>
          </div>
        </v-card>
      </v-dialog>

      <!-- <ListView
        :employers="filteredPrograms"
        :bookmarks="bookmarked"
        @bookmarkProgram="bookmarkProgram"
        v-on="$listeners"
      /> -->
      <!-- <v-snackbar
        v-model="snackbar"
        class="snackbar-announcement2"
        color="blue"
        rounded
        timeout="-1"
        top
      >
        <span class="font-weight-bold">
          <v-icon left>mdi-podcast</v-icon>
          Deciding on an employer?
          <a
            target="_blank"
            class="snackbar-text"
            style="text-decoration: underline"
            href="https://bit.ly/3ei34oC"
            >Watch their podcast</a
          >
          to learn more.
        </span>
        <template #action="{ attrs }">
          <v-btn v-bind="attrs" icon @click="snackbar = false"><v-icon>mdi-close</v-icon></v-btn>
        </template>
      </v-snackbar> -->
      <!-- <component :is="currentUnit" :employers="employers" /> -->
    </div>
    <!-- </div> -->
  </div>
</template>

<script lang="ts">
import { ref, reactive, toRefs, computed, defineComponent, Ref, watch } from '@vue/composition-api';
import { ObjectId } from 'bson';
import * as Realm from 'realm-web';
import { Configuration, OpenAIApi } from 'openai';

import { useUserGetters, useDbGetters } from '@/store';
import ScopeBar from './ScopeBar.vue';

export default defineComponent({
  name: 'ExploreGuide',

  components: {
    'guide-bar': ScopeBar
  },

  setup(_props, ctx) {
    const REALM_APP_ID = process.env.VUE_APP_REALM_ID;
    const realmApp: Realm.App = new Realm.App({ id: REALM_APP_ID! });
    const credentials = Realm.Credentials.anonymous();

    const { getUser, getObjectId } = useUserGetters(['getUser', 'getObjectId']);
    // console.log(getUser.value?.providerType);
    // console.log(getObjectId.value);
    const userType = getUser.value?.providerType;
    const userId = getObjectId.value;

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

    // const currentUnit = ref(ListView);

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

    const configuration = new Configuration({
      apiKey: process.env.VUE_APP_OPENAI_API_KEY
    });
    const openai = new OpenAIApi(configuration);
    const collectionProgram = collection.value!('Program');
    watch(newpass => {
      window.videoask.loadEmbed({
        kind: 'widget',
        url: 'https://www.videoask.com/fs2y00xq3',
        options: {
          widgetType: 'VideoThumbnailExtraLarge',
          text: 'Be a PilotCity Employer',
          backgroundColor: '#ffffff',
          position: 'bottom-right'
        }
      });
    });

    return {
      ...toRefs(state),
      filteredPrograms,
      bookmarkProgram,
      // currentUnit,
      snackbar: true,
      priorityItems: ['High', 'Medium', 'Low'],
      difficultyItems: ['Hard', 'Medium', 'Easy'],
      collection,
      collectionProgram,
      realmApp,
      credentials,
      openai,
      userType,
      userId
    };
  },

  data() {
    return {
      // userId: null,
      realmUser: null,
      stepId: 1,
      tmpObjective: {
        id: null,
        text: null,
        priority: null
      },
      tmpProject: {
        id: null,
        objectiveId: null,
        text: null,
        priority: null,
        difficulty: null,
        action: null
      },
      tmpUser: {
        id: null,
        objectiveId: null,
        projectId: null,
        text: null,
        priority: null
      },
      objectives: [],
      projects: [],
      users: [],
      tmp: [],
      curObjectiveId: null,
      curProjectId: null,
      curUserId: null,
      // lastObjectiveId: null,
      // lastProjectId: null,
      // lastUserId: null,
      priorityOrder: { Low: 0, Medium: 1, High: 2 },
      difficultyOrder: { Easy: 0, Medium: 1, Hard: 2 },
      newAction: null,
      actionItems: [
        'Create',
        'Make',
        'Produce',
        'Develop',
        'Code',
        'Plan',
        'Research',
        'Build',
        'Prototype'
      ],
      confirmDelete: false,
      deleteFunc: null,
      deleteArg: null,

      // screen 4
      tmpScope: {
        id: null,
        objectiveId: null,
        projectId: null,
        userId: null,
        text: null
      },
      results: {
        processedObjectives: [],
        processedProjects: [],
        processedUsers: [],
        scopes: []
      },
      objectiveOption: null,
      actionOption: null,
      projectOption: null,
      userOption: null,
      numScopes: 0,
      displayScopes: [],
      actionSynonyms: null,
      projectSynonyms: null,
      userSynonyms: null,
      objectiveSynonyms: null,

      // screen 5
      tmpScopeText: '',
      tmpScopeId: null,
      savedScopes: [],
      expand: true,

      // others
      autoGrowHack: false
    };
  },

  computed: {
    loadingObject() {
      return {
        loading: true,
        'loading-rounded': true,
        'loading-animated': true
      };
    },
    showCloseBtn() {
      return !window.location.pathname.includes('/scope'); //! this.$route.query.page.includes('/scope');
    }
  },

  beforeMount() {
    this.getScopeState();
  },

  methods: {
    async getScopeState() {
      const user: Realm.User = await this.realmApp.logIn(this.credentials);
      this.realmUser = user;

      const scopeState: Promise<any[]> = this.realmUser.functions.getScopeState(this.userId);
      // console.log(this.userType);
      // console.log(this.userId);

      let storedObjectives = JSON.parse(localStorage.getItem('objectives'));
      let storedProjects = JSON.parse(localStorage.getItem('projects'));
      let storedUsers = JSON.parse(localStorage.getItem('users'));
      let storedActions = JSON.parse(localStorage.getItem('actions'));
      let storedSavedScopes = JSON.parse(localStorage.getItem('savedScopes'));

      if (
        storedObjectives != null &&
        storedProjects != null &&
        storedUsers != null &&
        storedActions != null &&
        storedSavedScopes != null
      ) {
        // retrieve items from LocalStorage for new user
        this.objectives = storedObjectives;
        this.sortPriorityObjective();
        this.projects = storedProjects;
        this.sortPriorityProject();
        this.projects.forEach(project => {
          this.$set(project, 'actionTmp', null);
        });
        this.actionItems = storedActions;
        this.users = storedUsers;
        this.sortPriorityUser();
        this.savedScopes = storedSavedScopes;
        if (this.objectives.length === 0) this.addObjective();
        if (this.savedScopes.length > 0) this.stepId = 5;

        // remove all items from Local Storage
        localStorage.removeItem('objectives');
        localStorage.removeItem('projects');
        localStorage.removeItem('users');
        localStorage.removeItem('actions');
        localStorage.removeItem('savedScopes');
        localStorage.removeItem('curSavedScope');
      } else {
        scopeState.then(resp => {
          if (resp != null) {
            storedObjectives = JSON.parse(resp.objectives);
            storedProjects = JSON.parse(resp.projects);
            storedActions = JSON.parse(resp.actions);
            storedUsers = JSON.parse(resp.users);
            storedSavedScopes = JSON.parse(resp.savedScopes);

            if (storedObjectives != null) {
              this.objectives = storedObjectives;
              this.sortPriorityObjective();
            }
            if (storedProjects != null) {
              this.projects = storedProjects;
              this.sortPriorityProject();
            }
            this.projects.forEach(project => {
              this.$set(project, 'actionTmp', null);
            });

            if (storedActions != null) this.actionItems = storedActions;

            if (storedUsers != null) {
              this.users = storedUsers;
              this.sortPriorityUser();
            }
            if (storedSavedScopes != null) this.savedScopes = storedSavedScopes;

            if (this.objectives.length === 0) this.addObjective();

            if (this.savedScopes.length > 0) this.stepId = 5;
          } else console.log('Error retrieving scopeState');
        });
      }
    },

    syncDb() {
      if (this.userType !== 'anon-user') {
        const scopeState: Promise<any[]> = this.realmUser.functions.setScopeState(
          // this.userId,
          this.userId,
          JSON.stringify(this.objectives),
          JSON.stringify(this.projects),
          JSON.stringify(this.actionItems),
          JSON.stringify(this.users),
          JSON.stringify(this.savedScopes)
        );

        scopeState.then(resp => {
          // console.log(resp);
        });
      } else {
        // save anon user data into local storage
        localStorage.setItem('objectives', JSON.stringify(this.objectives));
        localStorage.setItem('projects', JSON.stringify(this.projects));
        localStorage.setItem('users', JSON.stringify(this.users));
        localStorage.setItem('actions', JSON.stringify(this.actionItems));
        localStorage.setItem('savedScopes', JSON.stringify(this.savedScopes));
      }
    },

    // screen 1->3
    addObjective() {
      const newObjective = this.tmpObjective;
      newObjective.id = `id${new Date().getTime()}`; // this.lastObjectiveId == null ? 0 : this.lastObjectiveId + 1;
      // this.lastObjectiveId = newObjective.id;
      this.objectives.push({ ...newObjective });
    },
    selectObjective(objectiveId) {
      this.objectives = this.objectives.filter(item => item.text != null && item.text.length > 0);
      this.curObjectiveId = objectiveId;
      this.stepId = 2;

      const childProjects = this.projects.filter(item => item.objectiveId === objectiveId);
      if (childProjects.length === 0) this.addProject(objectiveId);

      this.syncDb();
    },
    confirmDeleteObjective(objectiveId) {
      this.confirmDelete = true;
      this.deleteFunc = this.deleteObjective;
      this.deleteArg = objectiveId;
    },
    deleteObjective(objectiveId) {
      this.objectives = this.objectives.filter(item => item.id !== objectiveId);
      this.projects = this.projects.filter(item => item.objectiveId !== objectiveId);
      this.users = this.users.filter(item => item.objectiveId !== objectiveId);
      this.results.scopes = this.results.scopes.filter(item => item.objectiveId !== objectiveId);

      this.syncDb();
    },
    sortPriorityObjective() {
      this.objectives.sort((a, b) => {
        return (
          (a.priority == null && b.priority != null) ||
          this.priorityOrder[a.priority] < this.priorityOrder[b.priority]
        );
      });
    },
    addProject(objectiveId) {
      const newProject = this.tmpProject;
      newProject.id = `id${new Date().getTime()}`; // this.lastProjectId == null ? 0 : this.lastProjectId + 1;
      // this.lastProjectId = newProject.id;
      newProject.objectiveId = objectiveId;
      this.projects.push({ ...newProject });
    },
    selectProject(projectId) {
      this.projects = this.projects.filter(item => item.text != null && item.text.length > 0);
      this.curProjectId = projectId;
      this.stepId = 3;

      const childUsers = this.users.filter(item => item.projectId === projectId);
      if (childUsers.length === 0)
        this.addUser(this.projects.find(item => item.id === projectId).objectiveId, projectId);

      this.syncDb();
    },
    confirmDeleteProject(projectId) {
      this.confirmDelete = true;
      this.deleteFunc = this.deleteProject;
      this.deleteArg = projectId;
    },
    deleteProject(projectId) {
      this.projects = this.projects.filter(item => item.id !== projectId);
      this.users = this.users.filter(item => item.projectId !== projectId);
      this.results.scopes = this.results.scopes.filter(item => item.projectId !== projectId);

      this.syncDb();
    },
    sortPriorityProject() {
      this.projects.sort((a, b) => {
        return (
          (a.priority == null && b.priority != null) ||
          this.priorityOrder[a.priority] < this.priorityOrder[b.priority]
        );
      });
    },
    sortDifficultyProject() {
      this.projects.sort((a, b) => {
        return (
          (a.difficulty == null && b.difficulty != null) ||
          this.difficultyOrder[a.difficulty] < this.difficultyOrder[b.difficulty]
        );
      });
    },
    updateAction(newAction) {
      this.actionItems.push(newAction);

      this.syncDb();
    },
    removeAction(item) {
      this.actionItems = this.actionItems.filter(action => action !== item);

      this.syncDb();
    },
    addUser(objectiveId, projectId) {
      const newUser = this.tmpUser;
      newUser.id = `id${new Date().getTime()}`; // this.lastUserId == null ? 0 : this.lastUserId + 1;
      // this.lastUserId = newUser.id;
      newUser.objectiveId = objectiveId;
      newUser.projectId = projectId;
      this.users.push({ ...newUser });
    },
    selectUser(userId) {
      this.users = this.users.filter(item => item.text != null && item.text.length > 0);
      this.curUserId = userId;

      this.syncDb();

      this.autoGrowHack = !this.autoGrowHack;
      this.generateScopes();
    },
    confirmDeleteUser(userId) {
      this.confirmDelete = true;
      this.deleteFunc = this.deleteUser;
      this.deleteArg = userId;
    },
    deleteUser(userId) {
      this.users = this.users.filter(item => item.id !== userId);
      this.results.scopes = this.results.scopes.filter(item => item.userId !== userId);

      this.syncDb();
    },
    sortPriorityUser() {
      this.users.sort((a, b) => {
        return (
          (a.priority == null && b.priority != null) ||
          this.priorityOrder[a.priority] < this.priorityOrder[b.priority]
        );
      });
    },
    confirmDeleteFunc() {
      if (this.deleteFunc != null && this.deleteArg != null) this.deleteFunc(this.deleteArg);
      this.confirmDelete = false;
    },

    // screen 4

    async generateScopes() {
      this.stepId = 4;

      this.numScopes = 0;
      this.displayScopes = [];

      const objectiveText = this.objectives.find(item => item.id === this.curObjectiveId).text;
      const actionText = this.projects.find(item => item.id === this.curProjectId).action;
      const projectText = this.projects.find(item => item.id === this.curProjectId).text;
      const userText = this.users.find(item => item.id === this.curUserId).text;

      // generate general scopes

      const dummyScope = [
        'We are requesting you to create ',
        actionText,
        ' a ',
        projectText,
        ' for ',
        userText,
        ' to ',
        objectiveText
      ].join('');

      const generatedScopes = [];

      // 1st sentence: raw
      // generatedScopes.push(dummyScope.replace('We are requesting you to create ', ''));

      // 2nd sentence: grammar(raw)
      let response = await this.openai.createCompletion('text-davinci-001', {
        prompt: [
          'Correct this to grammatically correct English:\n\n',
          dummyScope.replace('We are requesting you to create ', ''),
          '.'
        ].join(''),
        temperature: 0,
        max_tokens: 150,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0
      });

      const result = response.data.choices[0];
      // console.log(response);
      generatedScopes.push(result.text.replace(/(^:+|^\s+)/gm, ''));

      // 3rd-14th: summarize
      response = await this.openai.createCompletion('text-davinci-001', {
        prompt: [dummyScope, 'Summarize this for a second-grade student:\n\n'].join(''),
        temperature: 0.9, // 0.7,
        max_tokens: 250, // 64,
        top_p: 1.0, // 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        n: 14 // CHANGE number of generated scopes here
      });

      let results = response.data.choices;

      // remove duplicates
      results = results.filter((value, index, self) => self.indexOf(value) === index);

      results.forEach(item => {
        generatedScopes.push(item.text.replace(/(^:+|^\s+)/gm, ''));
      });

      this.displayScopes = generatedScopes;
      this.numScopes = generatedScopes.length;
    },
    addScope(objectiveId, projectId, userId, scopeText) {
      const newScope = this.tmpScope;
      newScope.id = this.results.scopes.length;
      newScope.objectiveId = objectiveId;
      newScope.projectId = projectId;
      newScope.userId = userId;
      newScope.text = scopeText;
      this.results.scopes.push({ ...newScope });
    },
    updateObjectiveGuideBar({ text, objectiveId }) {
      this.objectives.find(item => item.id === objectiveId).text = text;
    },
    updateActionGuideBar({ action, projectId }) {
      this.projects.find(item => item.id === projectId).action = action;
    },
    updateProjectGuideBar({ text, projectId }) {
      this.projects.find(item => item.id === projectId).text = text;
    },
    updateUserGuideBar({ text, userId }) {
      this.users.find(item => item.id === userId).text = text;
    },

    selectScope(text) {
      if (text != null) {
        this.stepId = 5;
        this.tmpScopeText = text;
        this.tmpScopeId = null;
      } else {
        const objectiveText = this.objectives.find(item => item.id === this.curObjectiveId).text;
        const actionText = this.projects.find(item => item.id === this.curProjectId).action;
        const projectText = this.projects.find(item => item.id === this.curProjectId).text;
        const userText = this.users.find(item => item.id === this.curUserId).text;

        this.stepId = 5;
        this.tmpScopeText = [actionText, ' ', projectText, ' ', userText, ' ', objectiveText].join(
          ''
        );
        this.tmpScopeId = null;
      }
    },

    // screen 5
    saveScopeText(id, text) {
      if (id == null) {
        const newScope = this.tmpScope;
        newScope.id = `id${new Date().getTime()}`; // this.savedScopes.length;
        newScope.text = text;
        this.savedScopes.push({ ...newScope });
      } else {
        this.savedScopes.find(item => item.id === id).text = text;
      }
      this.syncDb();
    },
    editScopeText(id, text) {
      this.tmpScopeText = text;
      this.tmpScopeId = id;
    },
    confirmDeleteSavedScope(scopeId) {
      this.confirmDelete = true;
      this.deleteFunc = this.deleteSavedScope;
      this.deleteArg = scopeId;
    },
    deleteSavedScope(id) {
      this.savedScopes = this.savedScopes.filter(item => item.id !== id);

      this.syncDb();
    },
    createProgramWithScope(scopeText) {
      localStorage.setItem('curSavedScope', JSON.stringify(scopeText));
      this.$router.push({
        name: 'signup',
        query: { redirect: 'guide' }
      });
    },
    async insertProgramWithScope(scopeText) {
      if (window.location.pathname.includes('/scope')) {
        localStorage.setItem('curSavedScope', JSON.stringify(scopeText));
        await this.collectionProgram
          .insertOne({
            organizers: [this.userId],
            participants: [],
            dateCreated: new Date(),
            licensed: false
          })
          .then(result => {
            this.$router.push({
              name: 'guide',
              params: { programId: result.insertedId, page: '0' }
            });
          });
      } else this.$emit('update:useScope', scopeText);
    }
  }
});
</script>

<style lang="scss">
.guide__list-box {
  border: 1px solid #dedede;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  border-radius: 20px;
  width: 50%;
  padding: 15px;
  font-family: 'Raleway';
  font-size: 14px;

  @media (max-width: 767px) {
    width: 100%;
  }
}
.guide-bar3 {
  display: flex;
  height: 100vh;
  position: absolute;
}
.snackbar-announcement2 {
  margin-left: 11%;
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
    // position: fixed;
    // position: absolute;
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
  &__table2 {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    overflow-y: scroll;
    z-index: 1;
    padding: 0;
  }

  &__scope {
    width: 100%; //100vw;
    height: 100vh;
    overflow-y: scroll;
  }

  &__objective-field {
    // width: 50%;
    // width: 550px;
    width: 50vw;
  }

  &__add-objective {
    width: 76%;
    text-align: center;
    border: 1px dashed #404142;
  }

  &__scope-prompt {
    width: 76%;
    text-align: center;
    @media (max-width: 767px) {
      width: 100%;
    }
  }

  &__objective-priority-select {
    width: 140px;
  }
  &__objective-difficulty-select {
    width: 140px;
  }
  &__objective-action-select {
    // width: 140px;
    width: 15vw;
  }
  &__add-fields {
    flex-direction: row;
    @media (max-width: 992px) {
      flex-direction: column;

      .item-action-dropdown,
      .deliverable-textbox {
        width: 90%;
        .v-input {
          width: 100%;
          margin: 10px auto !important;
        }
      }
    }
  }

  &__objective-box {
    width: 50%;
    text-align: center;
  }

  &__scope-stepper-header {
    position: fixed;
    z-index: 1;
    width: 100vw;
    background-color: white;
    box-shadow: none;
    border-bottom: 1px dashed #dbdbdb;
    @media (max-width: 991px) {
      padding-top: 60px;

      .v-stepper__step {
        flex-basis: 70px;

        .v-stepper__step__step {
          margin-bottom: 0;
        }
      }
    }
  }

  &__scope-finalize {
    width: 50%;
  }

  &__scope-finalize-textarea {
    width: 100%;
    font-family: Raleway;
    font-weight: 800;
    font-size: 18px;
  }

  &__scope-finalize-save-btn {
    width: 100%;
  }

  &__scope-wordsmith-title {
    text-align: start;
  }

  &__scopes-saved {
    border-left: 0.1rem solid #dedede;
    height: 90vh;
    color: black;
    // padding-top: 10vh;
    width: 50vw;
    overflow-y: scroll;
  }
}

// Loading animation
$silver: #ccc;
$gallery: #eee;
$border-radius: 6px;
$line-height: 25px;
$loading-spacing: 10px;

@keyframes loadingAnimation {
  0% {
    transform: translate3d(-30%, 0, 0);
  }

  100% {
    transform: translate3d(100%, 0, 0);
  }
}

@mixin loading {
  position: relative;
  overflow: hidden;
  height: $line-height;
  background-color: $gallery;

  .loading-rounded & {
    border-radius: $border-radius;
  }

  .loading-animated &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    max-width: 1000px;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent 0%,
      darken($gallery, 5%) 15%,
      transparent 30%
    );
    animation-duration: 1.5s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: loadingAnimation;
    animation-timing-function: linear;
  }
}

@mixin loading-spacing {
  [class^='loading-'] + & {
    margin-top: 2 * $loading-spacing;
  }
}

.loading-item {
  @include loading;
  @include loading-spacing;

  width: 100%;
  height: $line-height;
  margin-bottom: $loading-spacing;
  overflow: hidden;
}

.guide__step4 {
  .container {
    @media (max-width: 991px) {
      padding: 0;
    }
  }
  @media (max-width: 767px) {
    .program-card {
      max-width: 100% !important;
      width: 100% !important;

      .guide-bar__list {
        width: 100% !important;
      }
    }
  }
}

.guide__step5 {
  @media (max-width: 991px) {
    padding-top: 80px;
  }
  .guide__scope-finalize {
    @media (max-width: 767px) {
      width: 100% !important;
      padding-right: 0 !important;
    }
  }
  .guide__scopes-saved {
    @media (max-width: 767px) {
      width: 100% !important;
    }
  }
}
</style>
