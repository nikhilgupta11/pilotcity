<template>
  <div class="landing__container">
    <!-- SELF-DEMO -->

    <div>
      <iframe
        class="employer-landing__videoask-background"
        src="https://www.videoask.com/fmicny32j"
        allow="camera *; microphone *; autoplay *; encrypted-media *; fullscreen *; display-capture *;"
        width="100%"
        height="800px"
        style="border: none; border-radius: 0px"
      >
      </iframe>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, PropType, watch } from '@vue/composition-api';
import { ObjectId } from 'bson';
import { useDbState } from '@/store';

import Profile from '@/components/Profile.vue';
import Testimonial from '@/components/landing/Testimonial.vue';
import Hero from '@/components/landing/Hero.vue';

import { PATHWAY_OPTIONS, USER_ROLES, TIME_LINES, PROGRAMS } from '@/constants/landing';

export default {
  name: 'EmployerLanding',

  components: {
    // Profile
    // Testimonial,
    // Hero
  },

  setup() {
    const starterEmail = ref('');
    const currentRole = ref('Student');
    const roleColor = ref('green');
    const roleLabel = ref('What employer projects would you like to explore?');
    const roles = ref(USER_ROLES);
    const { user } = useDbState(['user']);

    const changeRoleTo = (role: string) => {
      roles.value.student.show = true;
      roles.value.teacher.show = true;
      roles.value.school.show = true;
      roles.value.parent.show = true;
      roles.value.employer.show = true;
      roles.value.sponsor.show = true;

      switch (role) {
        case 'Student':
          roleLabel.value = 'What employer projects would you like to explore?';
          roleColor.value = roles.value.student.color;
          roles.value.student.show = false;
          break;
        case 'Teacher':
          roleLabel.value = 'What pathways do you teach in your class?';
          roleColor.value = roles.value.teacher.color;
          roles.value.teacher.show = false;
          break;
        case 'School':
          roleLabel.value = 'What employer projects would you like to explore?';
          roleColor.value = roles.value.school.color;
          roles.value.school.show = false;
          break;
        case 'Parent':
          roleLabel.value = 'What careers do you want your student to explore?';
          roleColor.value = roles.value.parent.color;
          roles.value.parent.show = false;
          break;
        case 'Employer':
          roleLabel.value = 'Check out employers in your industry';
          roleColor.value = roles.value.employer.color;
          roles.value.employer.show = false;
          break;
        case 'Sponsor':
          roleLabel.value = 'What workforce initiatives do you want to fund?';
          roleColor.value = roles.value.sponsor.color;
          roles.value.sponsor.show = false;
          break;
        default:
          break;
      }
      currentRole.value = role;
    };

    const pathwayPresets = ref(['All']);
    const handlePathwaysInput = () => {
      if (
        pathwayPresets.value.length > 1 &&
        pathwayPresets.value[pathwayPresets.value.length - 1] === 'All'
      )
        pathwayPresets.value = pathwayPresets.value.filter(filter => filter === 'All');
      else if (pathwayPresets.value.length > 1)
        pathwayPresets.value = pathwayPresets.value.filter(filter => filter !== 'All');
    };

    // watch(newpass => {
    //   window.videoask.loadEmbed({
    //     kind: 'widget',
    //     url: 'https://www.videoask.com/fsh9ziggj',
    //     options: {
    //       widgetType: 'VideoThumbnailWindow',
    //       text: 'Get Started',
    //       backgroundColor: '#000000',
    //       position: 'bottom-right'
    //     }
    //   });
    // });

    //     watch(pass, newpass => {
    //   if (newpass === invitePages[getInvitee.value].password) {
    //     (window as any).videoask.loadEmbed({
    //       kind: 'widget',
    //       url: 'https://www.videoask.com/f5my3e7yf',
    //       options: {
    //         widgetType: 'VideoThumbnailLarge',
    //         text: 'Got Qs?',
    //         backgroundColor: '#dedede',
    //         position: 'bottom-right'
    //       }
    //     });
    //   }
    // });

    return {
      errors: [],
      pathwaySearch: null,
      pathwayOptions: PATHWAY_OPTIONS,
      pathwayPresets,
      handlePathwaysInput,
      user,
      starterEmail,
      currentRole,
      changeRoleTo,
      roleLabel,
      roleColor,
      roles,
      snackbar: true,
      timeLines: TIME_LINES,
      programs: PROGRAMS,

      scopeTabs: null,
      scopeText:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',

      carouselColors: ['purple', 'green', 'blue', 'red', 'yellow', 'orange', 'pink'],
      carouselSlides: [
        'Publish projects to award internships',
        'Early workforce development that saves time',
        'Diversify your team with local students',
        'Make community impact the smart way',
        'Civic engagement with local residents'
      ]
    };
  }
};
</script>

<style lang="scss">
.employer-landing {
  &__main-hero {
    height: 100vh;
    background-color: transparent;
  }
  &__main-hero2 {
    height: 80vh;
    background-color: transparent;
    border-bottom: 0.1rem dashed #999999;
  }

  &__main-hero3 {
    height: 80vh;
    background-color: transparent;
  }

  &__videoask-background {
    background-color: #000000;
    height: 100vh;
    width: 100vw;
    color: #000000;
  }

  &__dashed-divider {
  }

  &__main-hero-left {
    height: 100vh;
    width: 100%;
  }
  &__main-hero-right {
    height: 100vh;
    width: 100%;
    // background-color: #ae90b0;
    background-color: black;
  }
  &__main-hero-tagline {
    color: white;
    font-size: 2.75rem;
    font-weight: 700;
  }

  &__main-hero-tagline2 {
    color: white;
    font-size: 1.6rem;
    font-weight: 700;
  }
  &__main-hero-carousel {
    height: 100vh;
  }
  &__second-hero-tagline {
    font-size: 2.75rem;
    font-weight: 700;
    max-width: 50%;
  }
  &__third-hero-tagline {
    font-size: 3.5rem;
    font-weight: 700;
    max-width: 80%;
  }

  &__table {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    overflow-y: scroll;
    z-index: 1;
  }

  &__chips {
    flex-wrap: wrap;
    display: flex;
    margin-left: 2%;
    margin-right: 50%;
  }

  &__two-side {
    width: 50vw;
    overflow-y: scroll;
    height: 60vh;
  }

  &__two-side-left {
    width: 50vw;
  }

  &__two-side-right {
    width: 50vw;
    overflow-y: scroll;
    height: 80vh;
  }
}

// OLD LANDING CSS

.snackbar-text {
  color: white !important;
}

.v-menu__content {
  box-shadow: none;
}

.landing {
  &__container {
    a {
      text-decoration: none;
      scroll-behavior: smooth;
    }
  }
}
.student {
  text-decoration: none;
  scroll-behavior: smooth;
}
.landing {
  &__i-am-a {
    font-family: Raleway;
    font-weight: 800;
    font-size: 18px;
    white-space: nowrap;
  }
  &__footer-text {
    font-weight: 700;
    font-size: 12px;
    margin: 10px;
  }
  &__footer-text-secondary {
    font-weight: 700;
    font-size: 12px;
    margin: 10px;
  }
  &__hero-default {
    background-color: #404142;
  }
  &__hero-default-padded {
    background-color: #404142;
    padding-top: 50px;
    padding-bottom: 50px;
  }
  &__hero-title {
    font-size: 52px;
    letter-spacing: -1px;
    line-height: 65px;
  }
  &__hero-logo {
    width: 65px;
    padding-top: 70px;
    margin-bottom: 50px;
  }
  &__hero-cta {
    width: 67%;
    padding-top: 75px;
  }
  &__left {
    padding-left: 100px;
  }
  &__timeline-card {
    border: 1px solid #6fbb81;
    border-radius: 25px;
    padding-right: 25px;
    margin-top: 15px;
  }
  &__timeline-card-step {
    font-weight: 800;
    font-size: 11px;
    letter-spacing: 1px;
  }
  &__single-column {
    padding: 50px;
  }
  &__row1-button {
    font-weight: 800;
  }
  &__row2 {
    font-weight: 700;
    padding-top: 35px;
    font-size: 50px;
    line-height: 75px;
    color: #fec34b;
  }
  &__row3 {
    justify-content: flex-end;
    align-items: flex-end;
    padding-top: 35px;
    margin-left: auto;
  }
  &__row3-button {
    font-weight: 800;
  }
  &__banner-cta {
    text-align: center;
    margin-bottom: 4%;
    margin-top: auto;
  }
  &__primary-image {
    margin: auto;
    margin-top: 4%;
    margin-bottom: 4%;
  }
  &__primary-title {
    font-weight: 700;
    font-size: 42px;
    color: #ffffff;
    text-align: center;
    margin-top: 4%;
  }
  &__primary-subtitle {
    font-weight: 700;
    font-size: 22px;
    color: #ffffff;
    text-align: center;
    margin-top: 2%;
    margin-bottom: 1%;
    min-width: 50%;
    max-width: 75%;
    margin: auto;
  }
  &__content-grid-combo {
    font-weight: 800;
    font-size: 22px;
  }
  &__benefits {
    margin-top: 50px;
    margin-bottom: 50px;
  }
  &__benefits-card {
    margin: 25px;
  }
  &__benefits-card-body {
    font-weight: 600;
    font-size: 13px;
  }
  &__benefits-card-icon {
    margin: 5px;
  }
  &__benefits-card-title {
    font-weight: 800;
    font-size: 16px;
  }
}
</style>
