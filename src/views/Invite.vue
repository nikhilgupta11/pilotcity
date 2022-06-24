<template>
  <v-layout class="invite__container d-flex flex-column justify-center align-center">
    <div
      v-if="pass !== invitePages[getInvitee].password"
      class="invite__wrapper-password d-flex align-center flex-column"
    >
      <div class="invite__password-title">
        <v-btn
          :color="getInviteColor"
          class="invite__password-title-button font-weight-bold"
          small
          dark
          rounded
          depressed
          ><v-icon left>mdi-telegram</v-icon>Invite for {{ getInvitee }}
        </v-btn>
      </div>

      <validation-observer v-slot="{ handleSubmit }" class="invite__password d-flex">
        <validation-provider
          v-slot="{ errors }"
          slim
          :rules="`password:${invitePages[getInvitee].password}`"
        >
          <v-text-field
            v-model="inputPassword"
            :error-messages="errors"
            :type="show1 ? 'text' : 'password'"
            depressed
            label="Password"
            outlined
            required
            hint="See email for password..."
            @keyup.enter="
              handleSubmit(() => {
                pass = inputPassword;
              })
            "
          />
        </validation-provider>
        <v-btn
          class="invite__password-button text-uppercase"
          outlined
          x-large
          hide-details
          depressed
          @click="
            handleSubmit(() => {
              pass = inputPassword;
            })
          "
          >Open</v-btn
        >
      </validation-observer>
    </div>

    <!-- START OF PRIMARY PAGE   -->

    <div v-else class="d-flex align-center flex-row invite__wrapper-type3">
      <div class="d-flex align-center flex-row invite__wrapper-type2">
        <div
          class="d-flex align-center flex-row invite__wrapper-type"
          :class="{
            'invite__wrapper-school':
              invitePages[getInvitee] && invitePages[getInvitee].user === 'school',
            'invite__wrapper-employer':
              invitePages[getInvitee] && invitePages[getInvitee].user === 'employer',
            'invite__wrapper-teacher':
              invitePages[getInvitee] && invitePages[getInvitee].user === 'teacher',
            'invite__wrapper-parent':
              invitePages[getInvitee] && invitePages[getInvitee].user === 'parent',
            'invite__wrapper-student':
              invitePages[getInvitee] && invitePages[getInvitee].user === 'student',
            'invite__wrapper-sponsor':
              invitePages[getInvitee] && invitePages[getInvitee].user === 'sponsor'
          }"
        >
          <div class="d-flex flex-column mb-auto">
            <div v-if="invitePages[getInvitee] && invitePages[getInvitee].user">
              <v-btn
                rounded
                class="invite__password-title-button font-weight-bold"
                small
                outlined
                depressed
              >
                {{ `${invitePages[getInvitee] && invitePages[getInvitee].user} Invite` }}
              </v-btn>
            </div>

            <div>
              <span class="invite__title text-center black--text">
                <v-icon
                  v-if="invitePages[getInvitee] && invitePages[getInvitee].user"
                  :color="getInviteColor"
                  class="invite__title-icon mb-2"
                  x-large
                >
                  mdi-telegram
                </v-icon>
                Invite for
                <span
                  :class="{
                    'blue--text':
                      invitePages[getInvitee] && invitePages[getInvitee].user === 'school',
                    'purple--text':
                      invitePages[getInvitee] && invitePages[getInvitee].user === 'employer',
                    'pink--text':
                      invitePages[getInvitee] && invitePages[getInvitee].user === 'teacher',
                    'yellow--text':
                      invitePages[getInvitee] && invitePages[getInvitee].user === 'parent',
                    'green--text':
                      invitePages[getInvitee] && invitePages[getInvitee].user === 'student',
                    'red--text':
                      invitePages[getInvitee] && invitePages[getInvitee].user === 'sponsor'
                  }"
                >
                  {{ getInvitee }}
                </span>
              </span>
            </div>

            <div>
              <!-- YOUTUBE -->
              <iframe
                class="invite__video"
                :src="`https://www.youtube.com/embed/${invitePages[getInvitee].video}`"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
              <!-- VIDEOASK -->
              <!-- <iframe
            class="invite__video"
            src="https://www.videoask.com/fq62ahynz"
            allow="camera *; microphone *; autoplay *; encrypted-media *; fullscreen *; display-capture *;"
            style="border: none; border-radius: 24px"
          >
          </iframe> -->
            </div>
          </div>
          <div class="invite__wrapper-column-right d-flex flex-column mb-auto justify-start">
            <div class="invite__resources-title3 text-center black--text">What's next?</div>

            <div>
              <a
                href="https://app.hubspot.com/meetings/dericklee/programinvite"
                target="_blank"
                style="text-decoration: none"
                ><v-btn
                  class="invite__cta2 font-weight-bold"
                  color="grey darken-4"
                  x-large
                  dark
                  depressed
                  >Schedule 30-Min Meeting</v-btn
                >
              </a>
            </div>

            <div class="invite__accept-decline d-flex flex-row">
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <a
                    href="https://www.pilotcity.com/signup"
                    target="_blank"
                    style="text-decoration: none"
                    class="invite__cta-accept-decline-link"
                  >
                    <v-btn
                      v-bind="attrs"
                      class="invite__cta-accept-decline mx-auto font-weight-bold"
                      color="green"
                      large
                      dark
                      depressed
                      v-on="on"
                      >Sign-up</v-btn
                    ></a
                  >
                </template>
                <span>Sign-up for account</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <a
                    href="https://share.hsforms.com/1FhBLzFLZSPSHPUk3TEvv0w1h6bj"
                    target="_blank"
                    style="text-decoration: none"
                    class="invite__cta-accept-decline-link"
                  >
                    <v-btn
                      v-bind="attrs"
                      class="invite__cta-accept-decline mx-auto"
                      color="red"
                      large
                      dark
                      depressed
                      v-on="on"
                    >
                      Decline
                    </v-btn>
                  </a>
                </template>
                <span>Decline to participate</span>
              </v-tooltip>
            </div>

            <div class="invite__resources">
              <!-- <div class="invite__resources-title text-center black--text invite__resource-title2">
            EXPLORE RESOURCES
          </div> -->

              <div class="invite__resources-title3 text-center black--text mb-1">
                Can I learn more?
              </div>

              <div>
                <a href="https://www.pilotcity.com" target="_blank" style="text-decoration: none">
                  <v-btn class="invite__cta" small rounded outlined depressed>
                    Browse PilotCity.com
                  </v-btn>
                </a>
              </div>

              <div>
                <a
                  href="https://www.pilotcity.com/explore"
                  target="_blank"
                  style="text-decoration: none"
                >
                  <v-btn class="invite__cta" small rounded outlined depressed>
                    Explore current projects
                  </v-btn>
                </a>
              </div>

              <!-- ACTIVITIES AND TIMELINE -->
              <!-- <template>
            <div class="text-center">
              <v-dialog v-model="activitiesDialog" width="100%">
                <template #activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    class="invite__cta"
                    color="grey darken-3"
                    small
                    rounded
                    dark
                    depressed
                    v-on="on"
                  >
                    Timeline & Activities
                  </v-btn>
                </template>

                <v-card>
                  <v-parallax
                    src="https://f.hubspotusercontent00.net/hubfs/2480959/Final_19500_Background.svg"
                    dark
                    height="50%"
                    class="black"
                  >
                    <div class="d-flex flex-column justify-center py-5">
                      <div class="landing__primary-title text-center font-weight-bold">
                        Activities
                      </div>

                      <v-btn outlined small color="white" rounded class="landing__primary-subtitle">
                        Key events and program activities
                      </v-btn>
                      <div class="">
                        <v-img
                          src="https://f.hubspotusercontent00.net/hubfs/2480959/Final_ProgramTimeline_v2.svg"
                          class="landing__primary-image"
                          width="75%"
                        />
                      </div>
                      <div class="landing__banner-cta">
                        <v-btn icon dark @click="activitiesDialog = false">
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </v-parallax>
                </v-card>
              </v-dialog>
            </div>
          </template> -->

              <template>
                <div class="text-center">
                  <v-dialog width="90%">
                    <template #activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        class="invite__cta"
                        small
                        rounded
                        outlined
                        depressed
                        v-on="on"
                      >
                        Student & Parent Testimonials
                      </v-btn>
                    </template>

                    <v-card>
                      <Testimonial
                        v-for="(item, index) in inviteTestimonials"
                        :key="index"
                        :background="item.background"
                        :icon="item.icon"
                        :testimonial="item.testimonial"
                        :user="item.user"
                      />
                    </v-card>
                  </v-dialog>
                </div>
              </template>
            </div>

            <div class="invite__questions-tip black--text text-center">
              <v-icon small color="grey darken-3">mdi-comment-question-outline</v-icon> GOT
              QUESTIONS? WE GOT ANSWERS<v-icon small color="grey darken-3"
                >mdi-arrow-bottom-right-thick</v-icon
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-layout>
</template>

<script lang="ts">
import { computed, onMounted, ref, watch, Ref, ComputedRef, reactive } from '@vue/composition-api';
import Testimonial from '../components/invite/Testimonial.vue';

import { INVITE_PAGES, INVITE_TESTIMONIALS } from '../constants/invite';

export default {
  name: 'Invite',

  components: {
    Testimonial
  },

  props: {
    schoolName: {
      type: String,
      default: ''
    }
  },

  setup(props, { root: { $router } }) {
    const invitePages = reactive(INVITE_PAGES);
    const inviteTestimonials = reactive(INVITE_TESTIMONIALS);
    const pass: Ref<string> = ref('');
    const inputPassword: Ref<string> = ref('');
    const getInvitee: ComputedRef<string> = computed(() =>
      (props.schoolName as string)
        .split('-')
        .map(word => word[0].toUpperCase() + word.substring(1))
        .join(' ')
    );
    const getInviteColor: ComputedRef<string> = computed(() => {
      const { user } = invitePages[getInvitee.value];
      if (user === 'school') return 'blue';
      if (user === 'employer') return 'purple';
      if (user === 'parent') return 'yellow';
      if (user === 'teacher') return 'pink';
      if (user === 'student') return 'green';
      if (user === 'sponsor') return 'red';
      return '';
    });

    watch(pass, newpass => {
      if (newpass === invitePages[getInvitee.value].password) {
        (window as any).videoask.loadEmbed({
          kind: 'widget',
          url: 'https://www.videoask.com/f5my3e7yf',
          options: {
            widgetType: 'VideoThumbnailLarge',
            text: 'Got Qs?',
            backgroundColor: '#dedede',
            position: 'bottom-right'
          }
        });
      }
    });

    onMounted(() => {
      const valid =
        typeof invitePages[
          (props.partnerName as string)
            .split('-')
            .map(word => word[0].toUpperCase() + word.substring(1))
            .join(' ')
        ] !== 'undefined';
      if (!valid) $router.push({ name: '404' });
    });

    return {
      pass,
      inputPassword,
      invitePages,
      inviteTestimonials,
      getInviteColor,
      getInvitee,
      show1: ref(false),
      activitiesDialog: false,
      testimonialssDialog: false
    };
  }
};
</script>

<style lang="scss">
.invite {
  &__container {
    height: 100%;
  }

  &__password {
    margin-left: 10px;
    margin-right: 10px;
  }

  &__password-button {
    margin-left: 10px;
    margin-right: 10px;
  }

  &__wrapper-password {
    width: 100%;
    max-width: 80%;
  }

  &__wrapper-type {
    border-radius: 50px;
    padding: 45px;
  }

  &__wrapper-type2 {
    border-radius: 60px;
    padding: 8px;
    border: 5px solid #dedede;
  }

  &__wrapper-type3 {
    border-radius: 65px;
    padding: 8px;
    border: 1px dashed #dddddd;
  }

  &__wrapper-school {
    border: 15px solid #3c9dcd;
  }

  &__wrapper-employer {
    border: 15px solid #ae90b0;
  }

  &__wrapper-teacher {
    border: 15px solid #eda1bf;
  }

  &__wrapper-parent {
    border: 15px solid #fec34b;
  }

  &__wrapper-student {
    border: 15px solid #6eba80;
  }

  &__wrapper-sponsor {
    border: 15px solid #ea6764;
  }

  &__title-icon {
    margin-right: 12px;
  }

  &__wrapper-column-right {
    width: 100%;
    margin-left: 45px;
    height: 100%;
  }

  &__video {
    width: 619.5px;
    height: 350px;
    margin-top: 20px;
    border-radius: 25px;
    border: 5px solid #dedede;
  }

  &__title {
    font-family: Raleway;
    font-size: 30px;
    font-weight: 800;
  }

  &__resources-title {
    font-family: Raleway;
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 1px;
  }

  &__resources-title2 {
    margin-bottom: 5%;
  }

  &__resources-title3 {
    font-family: Raleway;
    font-size: 16px;
    font-weight: 800;
    letter-spacing: 0.5px;
  }

  &__questions-tip {
    font-family: Raleway;
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 1px;
  }

  &__password-title {
    width: 100%;
    margin: 20px;
    text-align: center;
  }

  &__password-title-button {
    margin-bottom: 20px;
  }

  &__resources {
    border: 1px solid #d5d5d5;
    border-radius: 7px;
    width: 100%;
    padding: 25px;
    margin-top: 8%;
    margin-bottom: 8%;
  }

  &__cta {
    width: 100%;
    margin-top: 8px;
    margin-bottom: 8px;
  }

  &__cta2 {
    width: 100%;
    margin-top: 10px;
  }

  &__cta-accept-decline {
    width: 98%;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  &__cta-accept-decline-link {
    width: 100%;
  }

  &__accept-decline {
    width: 100%;
  }
}

.landing__primary-title {
  font-family: Montserrat;
  margin-top: 4%;
  font-size: 42px;
}

.landing__primary-subtitle {
  font-size: 22px;
  margin-top: 2%;
  margin-bottom: 1%;
  min-width: 50%;
  max-width: 75%;
  margin: auto;
}

.landing__primary-image {
  margin: 4% auto;
}

.landing__banner-cta {
  text-align: center;
  margin-bottom: 4%;
  margin-top: auto;
}

@media screen and (max-width: 1280px) {
  .invite {
    &__wrapper-school {
      display: block;
      padding: 20px;
    }
    &__wrapper-column-right {
      margin-left: 0px;
    }
  }
}

@media screen and (min-width: 768px) and (max-width: 1023px) {
  .invite {
    &__wrapper-school {
      display: block;
      padding: 20px;
    }
    &__wrapper-column-right {
      margin-left: 0px;
    }
  }
}

@media screen and (min-width: 425px) and (max-width: 767px) {
  .invite {
    &__wrapper-school {
      display: block;
      padding: 20px;
    }
    &__wrapper-column-right {
      margin-left: 0px;
    }
  }
}

@media screen and (max-width: 375px) {
  .invite {
    &__container {
      flex-direction: row;
    }
    &__wrapper-school {
      max-width: none;
      align-items: center;
      border: none;
      border-radius: none;
    }
    &__wrapper-column-right {
      margin-left: 0px;
    }
  }
}
</style>
