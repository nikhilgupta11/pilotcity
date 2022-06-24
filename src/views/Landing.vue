<template>
  <div class="landing__container">
    <v-parallax
      dark
      height="100%"
      src="https://f.hubspotusercontent00.net/hubfs/2480959/PC_Hero_3c-1.jpg"
      class="paralaxBannerImage align-start justify-start mb-auto"
    >
      <!-- APP BAR  -->
      <v-app-bar absolute class="mb-0 pb-0" color="transparent" flat>
        <v-toolbar-title
          ><span class="text-h5 signup__header font-weight-black text-sm-h4"></span
        ></v-toolbar-title>

        <v-spacer></v-spacer>

        <div class="nav__actions">
          <router-link class="exploreProgramLinkWrapper" :to="{ name: 'explore' }">
            <v-btn
              class="ml-5 font-weight-bold"
              depressed
              dark
              outlined
              large
              rounded
              :class="$vuetify.breakpoint.mdAndDown ? 'mr-0' : 'mr-5'"
            >
              Explore Programs<v-icon right>mdi-sign-direction</v-icon>
            </v-btn>
          </router-link>
          <v-btn
            v-if="!user"
            depressed
            color="white"
            class="mr-3 login__loginBtn"
            outlined
            large
            rounded
            :to="{ name: 'login' }"
            :ripple="false"
          >
            <span class="font-weight-black">Login</span>
          </v-btn>
          <v-btn
            v-if="!user"
            class="signup__signupbutton ml-2"
            depressed
            large
            rounded
            dark
            :ripple="false"
            :to="{ name: 'signup' }"
          >
            <span class="font-weight-black">Signup</span>
          </v-btn>

          <v-btn
            v-if="user"
            class="userMenu"
            text
            color="#404142"
            @click="$router.push({ name: 'portfolio' })"
          >
            <Profile :size="45" />
          </v-btn>
        </div>
        <!-- </v-toolbar> -->
      </v-app-bar>

      <!-- APP BAR END -->
      <div class="mb-auto">
        <div class="landing__hero-logo mx-auto mt-6">
          <v-img
            src="https://f.hubspotusercontent00.net/hubfs/2480959/PilotCity_Wireframe_White.svg"
          ></v-img>
        </div>

        <div data-heap-redact-text="true" class="landing__hero-title font-weight-bold text-center">
          Build projects to win internships
        </div>

        <div class="d-flex landing__hero-cta mx-auto justify-center">
          <v-menu class="d-flex align-center" offset-y transparent>
            <template #activator="{ on, attrs }">
              <div class="d-flex landing__i-am-a">I am a</div>
              <v-btn
                rounded
                class="d-flex align-center font-weight-bold landing__currentRoleSelection"
                x-large
                v-bind="attrs"
                dark
                :color="roleColor"
                depressed
                v-on="on"
                >{{ currentRole }}<v-icon right>mdi-chevron-down</v-icon></v-btn
              >
            </template>
            <div v-for="(role, index) in roles" :key="index">
              <v-btn
                v-if="role.show"
                class="mt-2 mb-1"
                :color="role.color"
                dark
                rounded
                x-large
                depressed
                @click="changeRoleTo(role.val)"
              >
                {{ role.val }}
              </v-btn>
              <v-divider />
            </div>
          </v-menu>

          <v-combobox
            v-model="pathwayPresets"
            rounded
            :items="pathwayOptions"
            :search-input="pathwaySearch"
            :error-messages="errors"
            :label="roleLabel"
            multiple
            small-chips
            hide-details
            outlined
            dark
            class="
              d-flex
              align-center
              module-setup__combobox
              landing__combobox landing__employer_explore_selection
              font-weight-bold
            "
            @input="handlePathwaysInput"
          >
            <template #no-data>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title> Press <kbd>enter</kbd> to add reward </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template #selection="{ attrs, item, parent, selected }">
              <v-chip
                v-bind="attrs"
                :input-value="selected"
                small
                rounded
                dark
                color="grey darken-4"
                @click="parent.selectItem(item)"
              >
                <span class="pr-2">
                  {{ item }}
                </span>
                <v-icon small> mdi-close </v-icon>
              </v-chip>
            </template>
          </v-combobox>
          <router-link :to="{ name: 'explore', query: { pathway: pathwayPresets } }">
            <v-btn class="ma-2 d-flex align-center font-weight-bold" x-large rounded dark depressed
              >Explore Employers<v-icon right>mdi-sign-direction</v-icon></v-btn
            >
          </router-link>
        </div>
      </div>
      <div class="d-flex justify-center mt-auto mb-3 align-center">
        <h3 class="white--text"><i>Fly around</i></h3>
        <v-icon large class="ml-2" color="yellow">mdi-telegram</v-icon>
      </div>

      <div class="text-center landing__tabSelection">
        <a href="#student">
          <v-btn class="font-weight-black" rounded dark depressed color="green">
            <v-icon left>mdi-clover</v-icon>
            Students
          </v-btn>
        </a>
        <a href="#employer">
          <v-btn class="font-weight-black" rounded dark depressed color="purple">
            <v-icon left>mdi-graph-outline</v-icon>
            Employers
          </v-btn>
        </a>
        <a href="#teacher">
          <v-btn class="font-weight-black" rounded dark depressed color="pink">
            <v-icon left>mdi-head-heart</v-icon>
            Teachers
          </v-btn>
        </a>
        <a href="#school">
          <v-btn class="font-weight-black" rounded dark depressed color="blue">
            <v-icon left>mdi-airballoon</v-icon>
            Schools
          </v-btn>
        </a>
        <a href="#parent">
          <v-btn class="font-weight-black" rounded dark depressed color="yellow">
            <v-icon left>mdi-sign-direction</v-icon>
            Parents
          </v-btn>
        </a>
        <a href="#sponsor">
          <v-btn class="font-weight-black" rounded dark depressed color="red">
            <v-icon left>mdi-currency-usd-circle</v-icon>
            Sponsors
          </v-btn>
        </a>
      </div>
    </v-parallax>

    <v-parallax
      dark
      class="landing__hero-default"
      height="100%"
      src="https://f.hubspotusercontent00.net/hubfs/2480959/Final_19500_Background.svg"
    >
      <div class="landing__single-column d-flex flex-column justify-start">
        <div>
          <v-btn
            style="color: white !important"
            class="landing__row1-button"
            color="white"
            disabled
            dark
            depressed
            outlined
            small
          >
            PilotCity's Flagship Program
          </v-btn>
        </div>
        <div class="landing__row2">
          PilotCity enables students to build employer projects to win internships. 97% of our
          alumni and 90% of our parents would recommend our program.
        </div>
        <div class="landing__row3">
          <v-btn
            class="landing__row3-button"
            disabled
            style="color: white !important"
            dark
            depressed
            outlined
            small
            color="white"
            >A civic engine for resilience, equity and digital transformation</v-btn
          >
        </div>
      </div>
    </v-parallax>

    <Testimonial
      background="https://f.hubspotusercontent00.net/hubfs/2480959/testimonial-background4.png"
      content="PilotCity kicks the idea of 'coffee fetching and document copying' internships to the curb"
      right-logo="https://f.hubspotusercontent00.net/hubfs/2480959/StrategyOfThings_white.png"
      :user="{
        name: 'Kevin C.',
        position: 'Intern, Strategy of Things',
        avatar: 'https://f.hubspotusercontent00.net/hubfs/2480959/_DSC4843_small.jpg'
      }"
    />

    <!-- <v-parallax
      src="https://f.hubspotusercontent00.net/hubfs/2480959/Final_19500_Background.svg"
      dark
      height="100%"
      class="landing__hero-default landing__activitiesWrapper"
    >
      <div class="landing__primary-title">Activities</div>

      <v-btn outlined small color="white" rounded class="landing__primary-subtitle"
        >Key events and program activities</v-btn
      >
      <div class="activitiesBannerImage">
        <v-img
          src="https://f.hubspotusercontent00.net/hubfs/2480959/Final_ProgramTimeline_v2.svg"
          class="landing__primary-image"
          width="75%"
        ></v-img>
      </div>
      <div class="landing__banner-cta">
        <v-btn
          x-large
          depressed
          dark
          rounded
          color="blue"
          @click="$router.push({ name: 'signup', query: { email: starterEmail } })"
          >Signup and Invite</v-btn
        >
      </div>
    </v-parallax> -->

    <v-parallax
      dark
      class="landing__hero-default landing__peopleWrapper"
      height="100%"
      src="https://f.hubspotusercontent00.net/hubfs/2480959/Final_19500_Background.svg"
    >
      <div class="landing__primary-title">People</div>

      <v-btn outlined small color="white" rounded class="landing__primary-subtitle">
        Students are the protagonist, the community is their village</v-btn
      >
      <v-img
        src="https://f.hubspotusercontent00.net/hubfs/2480959/Final_CrossSector_v3.svg"
        class="landing__primary-image peopleBannerImage"
        width="35%"
      ></v-img>

      <div class="landing__banner-cta">
        <v-btn
          x-large
          depressed
          dark
          rounded
          color="green"
          @click="$router.push({ name: 'signup', query: { email: starterEmail } })"
          >Sponsor Students</v-btn
        >
      </div>
    </v-parallax>

    <div id="student" class="videoask-black-background">
      <iframe
        src="https://www.videoask.com/fh5yzj1mw"
        allow="camera *; microphone *; autoplay *; encrypted-media *; fullscreen *; display-capture *;"
        width="100%"
        height="800px"
        style="border: none; border-radius: 0px"
      >
      </iframe>
    </div>

    <Testimonial
      background="https://f.hubspotusercontent00.net/hubfs/2480959/testimonial-backgroundB.png"
      content="PilotCity was a fresh breath of air. It was a new program that offered a mind-blowing and unique experience."
      :user="{
        name: 'Amratha R.',
        position: 'Healthtech Entrepreneur, PilotCity',
        avatar:
          'https://f.hubspotusercontent00.net/hubfs/2480959/Screen%20Shot%202020-08-31%20at%2012.33.36%20AM.png'
      }"
    />

    <Hero
      icon="mdi-clover"
      color="green"
      title="Student choice of employer"
      description="Freely explore employer programs and projects<br />Auto-join program, or pre-qualify<br />Get sponsored to participate<br />Build portfolio projects<br />Win internships"
      background="https://f.hubspotusercontent00.net/hubfs/2480959/students.png"
      :to="{ to: '/signup', button: 'Sign-up to get sponsored' }"
    >
      <template #right>
        <v-btn dark depressed outlined small rounded>Program Timeline</v-btn>
        <div class="landing__timeline-card">
          <v-timeline dark dense>
            <v-timeline-item
              v-for="(timeline, index) in timeLines"
              :key="index"
              fill-dot
              small
              class="landing__timeline-card-step text-uppercase"
              color="green"
            >
              {{ timeline }}
            </v-timeline-item>
          </v-timeline>
        </div>
      </template>
    </Hero>

    <Testimonial
      background="https://f.hubspotusercontent00.net/hubfs/2480959/testimonial-backgroundE.png"
      content="PilotCity is more than just a program... it's a family."
      :user="{
        name: 'Pranav P.',
        position: 'MESH Fellow, Takeoff Point',
        avatar:
          'https://f.hubspotusercontent00.net/hubfs/2480959/Screen%20Shot%202020-08-31%20at%2012.31.38%20AM.png'
      }"
    />

    <div id="teacher" class="videoask-black-background">
      <iframe
        src="https://www.videoask.com/fcc13e4kw"
        allow="camera *; microphone *; autoplay *; encrypted-media *; fullscreen *; display-capture *;"
        width="100%"
        height="800px"
        style="border: none; border-radius: 0px"
      >
      </iframe>
    </div>
    <Hero
      icon="mdi-head-heart"
      title="Teacher as coach, and monitor"
      background="https://f.hubspotusercontent00.net/hubfs/2480959/testimonial-backgroundE.png"
      description="Share explore programs page with students<br />Collect, and distribute sponsorship tickets<br />Accept stakeholder invitation, and monitor programs"
      :to="{ to: '/portfolio', button: 'Invite Schools, Students and Peers' }"
    >
      <template #bottom>
        <v-chip-group>
          <v-chip
            v-for="(program, index) in programs"
            :key="index"
            dark
            color="pink"
            class="landing__content-grid-combo"
            >{{ program }}</v-chip
          >
        </v-chip-group>
      </template>
    </Hero>

    <v-parallax
      src="https://f.hubspotusercontent00.net/hubfs/2480959/19500_pink-1.svg"
      dark
      height="100%"
      class="landing__hero-default landing__benefitsWrapper"
    >
      <div class="landing__primary-title">Engage</div>

      <v-btn outlined small color="white" rounded class="landing__primary-subtitle"
        >Engage your students to develop real-world projects to win internships</v-btn
      >

      <div class="landing__benefits d-flex flex-grow-1 m-auto">
        <v-card elevation="0" max-width="375px" min-width="250px" class="landing__benefits-card">
          <v-card-title class="landing__benefits-card-title">
            <v-icon color="pink" large class="landing__benefits-card-icon"
              >mdi-cursor-pointer</v-icon
            >Student choice of employer</v-card-title
          >

          <v-divider class="mx-4" />
          <v-card-text class="landing__benefits-card-body">
            Students choose their employer project. This drives engagement and motivation,resulting
            in higher quality learning and project development. They will be guided through
            activities and completion of deliverables to auto-qualify for our internship program.
          </v-card-text>
        </v-card>
        <v-card
          max-width="375px"
          min-width="250px"
          class="landing__benefits-card"
          rounded
          elevation="0"
        >
          <v-card-title class="landing__benefits-card-title">
            <v-icon color="pink" large class="landing__benefits-card-icon"
              >mdi-account-supervisor-circle</v-icon
            >Teacher as coach and advisor</v-card-title
          >
          <v-divider class="mx-4" />
          <v-card-text class="landing__benefits-card-body">
            Sit back, relax and do the fun part: coach and advise student projects. Students will
            learn directly from employer-driven content, driving higher absorption of information
            and relieving you of training and facilitation.
          </v-card-text>
        </v-card>
        <v-card
          max-width="375px"
          min-width="250px"
          class="landing__benefits-card"
          rounded
          elevation="0"
        >
          <v-card-title class="landing__benefits-card-title">
            <v-icon color="pink" large class="landing__benefits-card-icon"
              >mdi-monitor-dashboard</v-icon
            >Monitor and track progress</v-card-title
          >

          <v-divider class="mx-4" />

          <v-card-text class="landing__benefits-card-body">
            Track progress, and support your students through a dashboard. Enjoy a hands-off,
            asynchronous approach to your student's learning by targeting your support so you can
            get back to planning, scaffolding and teaching what you know best.
          </v-card-text>
        </v-card>
      </div>
    </v-parallax>

    <div id="school" class="videoask-black-background">
      <iframe
        src="https://www.videoask.com/fsmicugwt"
        allow="camera *; microphone *; autoplay *; encrypted-media *; fullscreen *; display-capture *;"
        width="100%"
        height="800px"
        style="border: none; border-radius: 0px"
      >
      </iframe>
    </div>

    <Hero
      icon="mdi-airballoon"
      color="blue"
      title="School as sponsor, and stakeholder"
      background="https://f.hubspotusercontent00.net/hubfs/2480959/school.png"
      description="Sponsor student participants<br />Transfer tickets to teacher stakeholders<br />Monitor sponsorships"
      :to="{ to: '/portfolio', button: 'Sponsor and Invite Teachers and Students' }"
    />

    <v-parallax
      src="https://f.hubspotusercontent00.net/hubfs/2480959/19500_blue-3.svg"
      dark
      height="100%"
      class="landing__hero-default landing__benefitsWrapper"
    >
      <div class="landing__primary-title">Outcomes</div>

      <v-btn outlined small color="white" rounded class="landing__primary-subtitle"
        >What our program delivers to our student participants</v-btn
      >

      <div class="landing__benefits d-flex flex-grow-1 m-auto">
        <v-card elevation="0" max-width="375px" min-width="250px" class="landing__benefits-card">
          <v-card-title class="landing__benefits-card-title">
            <v-icon color="blue" large class="landing__benefits-card-icon"
              >mdi-book-account-outline</v-icon
            >Work-based Learning</v-card-title
          >

          <v-divider class="mx-4" />
          <v-card-text class="landing__benefits-card-body"
            >Our program oozes with work-based learning experiences from developing real solutions
            for real employers to a full-blown internship program. Oh and all the stuff in-between
            from interviewing, resume workshops to client engagement.</v-card-text
          >
        </v-card>
        <v-card
          max-width="375px"
          min-width="250px"
          class="landing__benefits-card"
          rounded
          elevation="0"
        >
          <v-card-title class="landing__benefits-card-title">
            <v-icon color="blue" large class="landing__benefits-card-icon"
              >mdi-ruler-square-compass</v-icon
            >Project-based Learning</v-card-title
          >
          <v-divider class="mx-4" />
          <v-card-text class="landing__benefits-card-body"
            >Project-based learning is our secret sauce. By developing real projects for real
            employers, our students tend to get wild. Their engagement increases, their motivation
            amps up, and most importantly, it builds their confidence when they've built a real
            project.</v-card-text
          >
        </v-card>

        <v-card
          max-width="375px"
          min-width="250px"
          class="landing__benefits-card"
          rounded
          elevation=""
        >
          <v-card-title class="landing__benefits-card-title">
            <v-icon color="blue" large class="landing__benefits-card-icon"
              >mdi-account-heart-outline</v-icon
            >Service-based Learning</v-card-title
          >

          <v-divider class="mx-4" />

          <v-card-text class="landing__benefits-card-body"
            >We were born to believe our youngest citizens can build the future of their own
            communities. Students are the protagonists of this mission to improve their communities
            through building resilience, equity and digital transformation.
          </v-card-text>
        </v-card>
      </div>
    </v-parallax>

    <div id="employer" class="videoask-black-background">
      <iframe
        src="https://www.videoask.com/fs2y00xq3"
        allow="camera *; microphone *; autoplay *; encrypted-media *; fullscreen *; display-capture *;"
        width="100%"
        height="800px"
        style="border: none; border-radius: 0px"
      >
      </iframe>
    </div>

    <Hero
      icon="mdi-graph-outline"
      color="purple"
      title="Employer simple, low-commitment setup"
      background="https://f.hubspotusercontent00.net/hubfs/2480959/employer.png"
      description="Setup program from template<br />Get your program running in 4-hours<br />Asynchronous interactions, or zero-management option"
      :to="{ to: '/signup', button: 'Onboard Now' }"
    >
      <template #right>
        <v-card elevation="0" tile depressed>
          <!-- <v-img max-height="300px" max-width="300px" src="" depressed></v-img> -->
        </v-card>
      </template>
    </Hero>

    <v-parallax
      src="https://f.hubspotusercontent00.net/hubfs/2480959/19500_purple-2.svg"
      dark
      height="100%"
      class="landing__hero-default landing__benefitsWrapper"
    >
      <div class="landing__primary-title">Benefits</div>

      <v-btn outlined small color="white" rounded class="landing__primary-subtitle"
        >Enable students to build projects to win internships with you</v-btn
      >

      <div class="landing__benefits d-flex flex-grow-1 m-auto">
        <v-card elevation="0" max-width="375px" min-width="250px" class="landing__benefits-card">
          <v-card-title class="landing__benefits-card-title">
            <v-icon color="purple" large class="landing__benefits-card-icon"
              >mdi-rocket-launch</v-icon
            >Present problems, get solutions</v-card-title
          >

          <v-divider class="mx-4" />
          <v-card-text class="landing__benefits-card-body"
            >Pose problems, allow students to solve it for you. Whether they're in class, part of
            extracurricular or outside of school, our students build an initial solution to present
            to you before you decide to hire them as an intern. Saving you onboarding time, and
            management bandwidth.
          </v-card-text>
        </v-card>
        <v-card
          max-width="375px"
          min-width="250px"
          class="landing__benefits-card"
          rounded
          elevation="0"
        >
          <v-card-title class="landing__benefits-card-title">
            <v-icon color="purple" large class="landing__benefits-card-icon">mdi-ab-testing</v-icon>
            Test drive, then hire to execute</v-card-title
          >
          <v-divider class="mx-4" />
          <v-card-text class="landing__benefits-card-body">
            Students deliver initial solutions in competition for your internship. Once hired,
            students pre-internship projects to further develop their prototype, pilot or product.
            This model gets your side project off the ground, while eliminating the wonder if the
            intern will be a good-fit.
          </v-card-text>
        </v-card>
        <v-card
          max-width="375px"
          min-width="250px"
          class="landing__benefits-card"
          rounded
          elevation="0"
        >
          <v-card-title class="landing__benefits-card-title">
            <v-icon color="purple" large class="landing__benefits-card-icon"
              >mdi-content-copy</v-icon
            >Setup for scale, manage easier</v-card-title
          >

          <v-divider class="mx-4" />

          <v-card-text class="landing__benefits-card-body">
            Our one-time program setup allows you to run your program over and over again,preparing
            you for greater replicability and scale. You can then focus your time monitoring
            tracking and supporting your participants to deliver the outcomes you're looking for.
          </v-card-text>
        </v-card>
      </div>
    </v-parallax>

    <Hero
      id="sponsor"
      icon="mdi-currency-usd-circle"
      color="red"
      title="Sponsor participants, and monitor your impact"
      background="https://f.hubspotusercontent00.net/hubfs/2480959/sponsor.png"
      description="Sign-up for an account<br />Sponsor and purchase program tokens<br />Transfer to participants and stakeholders for use"
      :to="{ to: '/portfolio', button: 'Sponsor and fund participants' }"
    />

    <v-parallax
      src="https://f.hubspotusercontent00.net/hubfs/2480959/19500_red-2.svg"
      dark
      height="100%"
      class="landing__hero-default landing__benefitsWrapper"
    >
      <div class="landing__primary-title">Impact</div>

      <v-btn outlined small color="white" rounded class="landing__primary-subtitle"
        >Sponsor participants to advance outcome goals</v-btn
      >

      <div class="landing__benefits d-flex flex-grow-1 m-auto">
        <v-card elevation="0" max-width="375px" min-width="250px" class="landing__benefits-card">
          <v-card-title class="landing__benefits-card-title">
            <v-icon color="red" large class="landing__benefits-card-icon">mdi-rotate-orbit</v-icon
            >Fund participants, transform lives</v-card-title
          >

          <v-divider class="mx-4" />
          <v-card-text class="landing__benefits-card-body">
            Student participants in our program transform as individuals while in our program. They
            discover interests within themself and motivation to pursue a path for themself. Fund
            participants to see an impact in student lives as they pursue their growth as
            contributors to the community.
          </v-card-text>
        </v-card>
        <v-card
          max-width="375px"
          min-width="250px"
          class="landing__benefits-card"
          rounded
          elevation="0"
        >
          <v-card-title class="landing__benefits-card-title">
            <v-icon color="red" large class="landing__benefits-card-icon">
              mdi-desktop-mac-dashboard
            </v-icon>
            Monitor your sponsorees
          </v-card-title>
          <v-divider class="mx-4" />
          <v-card-text class="landing__benefits-card-body">
            Once you've funded participants, the token they use to select and join programs will be
            tracked under the name and entity that sponsored the participant. Monitor and track the
            progress of your sponsorships, and see outcomes be delivered live.
          </v-card-text>
        </v-card>
        <v-card
          max-width="375px"
          min-width="250px"
          class="landing__benefits-card"
          rounded
          elevation="0"
        >
          <v-card-title class="landing__benefits-card-title">
            <v-icon color="red" large class="landing__benefits-card-icon">mdi-billboard</v-icon>
            Ads and acknowledgements</v-card-title
          >

          <v-divider class="mx-4" />

          <v-card-text class="landing__benefits-card-body">
            Your participant's success is your success. Your entity or name will be forever
            associated with the impact you had on the program participant. You will be automatically
            advertised, recognized and acknowledged during key activities during the program.
          </v-card-text>
        </v-card>
      </div>
    </v-parallax>

    <Hero
      id="parent"
      icon="mdi-sign-direction"
      color="yellow"
      title="Parent as sponsor, and stakeholder"
      background="https://f.hubspotusercontent00.net/hubfs/2480959/sponsor.png"
      description="Sponsor student participants<br />Transfer tickets to student participants<br />Monitor sponsorships"
      :to="{ to: '/portfolio', button: 'Invite Your Student and School' }"
    />

    <Testimonial
      color="black"
      :class="'testimonal-wrapper'"
      background="https://f.hubspotusercontent00.net/hubfs/2480959/19500_yellow.svg"
      content="PilotCity is 'too good to be true' for people of all ages who would like to rediscover themselves."
      right-logo="https://f.hubspotusercontent00.net/hubfs/2480959/WI_P_Wireframe-1.png"
      :user="{
        name: 'Nina S.',
        position: 'PilotCity Parent & Guardian',
        avatar: 'https://f.hubspotusercontent00.net/hubfs/2480959/flipped2019_panel.png'
      }"
    />

    <v-footer dark height="100">
      <div class="row d-flex ml-auto">
        <div class="landing__footer-text-secondary white--text text-decoration-none">
          <v-icon small>mdi-copyright</v-icon> 2015 - 2020, PilotCity Inc.
        </div>
        <a
          href="https://www.iubenda.com/terms-and-conditions/32542296"
          target="_blank"
          class="landing__footer-text white--text text-decoration-none"
        >
          Terms & Conditions
        </a>
        <a
          href="https://www.iubenda.com/privacy-policy/32542296"
          target="_blank"
          class="landing__footer-text white--text text-decoration-none"
        >
          Privacy Policy
        </a>
      </div>
    </v-footer>
  </div>
</template>

<script lang="ts">
import { ref } from '@vue/composition-api';
import { useDbState } from '@/store';

import Profile from '@/components/Profile.vue';
import Testimonial from '@/components/landing/Testimonial.vue';
import Hero from '@/components/landing/Hero.vue';

import { PATHWAY_OPTIONS, USER_ROLES, TIME_LINES, PROGRAMS } from '@/constants/landing';

export default {
  name: 'Landing',

  components: {
    Profile,
    Testimonial,
    Hero
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
      programs: PROGRAMS
    };
  }
};
</script>

<style lang="scss">
.videoask-black-background {
  background-color: #000000;
}
.snackbar-text {
  color: white !important;
}
.student {
  text-decoration: none;
  scroll-behavior: smooth;
}
.v-btn {
  &__content {
    @media (min-width: 768px) and (max-width: 1199px) {
      font-size: 14px;
      white-space: normal;
      width: 100%;
      text-align: center;
      padding: 10px;
    }
    @media (max-width: 767px) {
      font-size: 12px;
      line-height: 20px;
      white-space: normal;
      width: 100%;
      text-align: center;
      padding: 10px;
    }
  }
}
.landing {
  &__container {
    a {
      text-decoration: none;
      scroll-behavior: smooth;
    }
    .paralaxBannerImage {
      position: relative;
      height: 625px;
      &::before {
        position: absolute;
        height: 100%;
        width: 100%;
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
        content: '';
        background-color: #000;
        opacity: 0;
        z-index: 2;
      }
      @media (min-width: 768px) and (max-width: 1199px) {
        height: 100%;

        .exploreProgramLinkWrapper {
          button {
            margin-left: 0 !important;
            margin-right: 10px !important;
          }
        }

        .login {
          &__loginBtn {
            margin-right: 2px !important;
          }
        }
      }
      @media (max-width: 767px) {
        height: 100%;
        padding-top: 15px;
        .v-parallax__image-container {
          img {
            transform: translate(-50%, 0) !important;
          }
        }
        .nav__actions {
          button,
          a {
            padding: 0 10px;
            font-size: 11px;
            height: 30px;
            min-width: unset;
            span {
              padding-left: 0;
              padding-right: 0;
            }
          }
          .exploreProgramLinkWrapper {
            display: inline-block;
            padding: 0;
            button {
              margin-left: 0 !important;
              margin-right: 4px !important;
              span {
                font-size: 11px;
              }
            }
          }
          .login {
            &__loginBtn {
              margin-right: 4px !important;
              font-size: 16px;
            }
          }
          .signup {
            &__signupbutton {
              margin-left: 0px !important;
              font-size: 16px;
            }
          }
          .userMenu {
            padding: 0;
            min-width: unset;
          }
        }
      }
    }
    .v-parallax__content {
      header {
        @media (min-width: 768px) and (max-width: 1199px) {
          padding-top: 1rem;
        }
      }
      @media (min-width: 768px) and (max-width: 1199px) {
        padding: 34px 2rem;
      }
      @media (max-width: 767px) {
        padding: 34px 1rem;

        header {
          .v-toolbar__content {
            padding: 4px 7px !important;
          }
        }
      }
    }
  }
  &__i-am-a {
    font-family: Raleway;
    font-weight: 800;
    font-size: 18px;
    margin-top: 20px;
    white-space: nowrap;
    align-items: flex-start;
    @media (min-width: 768px) and (max-width: 1199px) {
      margin-top: 10px;
    }
    @media (max-width: 767px) {
      justify-content: center;
      margin-bottom: 0px;
      margin-top: 0;
    }
  }
  &__employer_explore_selection {
    .v-select__slot {
      .v-select__selections {
        .v-chip {
          height: fit-content;
          span {
            white-space: normal;
            line-height: normal;
            padding: 3px 0px;
          }
        }
      }
    }
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
  &__benefitsWrapper {
    .v-parallax__image {
      height: 100%;
      object-fit: cover;
    }
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
    @media (min-width: 768px) and (max-width: 1199px) {
      font-size: 48px !important;
      line-height: 60px !important;
    }
    @media (max-width: 767px) {
      font-size: 38px !important;
      line-height: 52px !important;
    }
  }
  &__hero-logo {
    width: 65px;
    padding-top: 70px;
    margin-bottom: 50px;
    @media (min-width: 768px) and (max-width: 1199px) {
      width: 120px !important;
    }
    @media (max-width: 767px) {
      width: 100px !important;
      padding-top: 50px !important;
      margin-bottom: 20px !important;
    }
  }
  &__hero-cta {
    width: 67%;
    padding-top: 75px;
    flex-direction: row;
    @media (min-width: 768px) and (max-width: 1199px) {
      flex-wrap: wrap !important;
      width: 90% !important;
      padding-top: 50px !important;
      margin-bottom: 50px !important;
    }
    @media (max-width: 767px) {
      width: 100% !important;
      padding-top: 40px !important;
      padding-bottom: 40px !important;
      flex-wrap: wrap !important;
      align-items: center !important;
    }
  }
  &__currentRoleSelection {
    margin: 8px;
    @media (min-width: 768px) and (max-width: 1199px) {
      margin-top: 0px;
    }
    @media (max-width: 767px) {
      height: 36px !important;
      padding-top: 3px !important;
      width: 100% !important;
      margin-bottom: 20px !important;
      font-size: 14px !important;
    }
  }
  &__combobox {
    margin-bottom: 8px !important;
    .v-select__slot {
      label {
        color: #fff;
      }
    }
  }
  &__tabSelection {
    margin-bottom: 32px;
    a {
      display: inline-block;
      button {
        margin: 8px;
      }
    }
    @media (min-width: 768px) and (max-width: 1199px) {
      justify-content: center;
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 0 !important;
      a {
        display: inline-flex;
        width: 30%;
        margin-bottom: 10px;
        margin-right: 10px;
        &:nth-child(3n + 3) {
          margin-right: 0;
        }
        button {
          margin: 0;
          width: 100%;
          min-width: unset !important;
          max-width: unset;
        }
      }
    }
    @media (max-width: 767px) {
      justify-content: center !important;
      display: flex !important;
      flex-wrap: wrap !important;
      margin-bottom: 0 !important;
      a {
        display: inline-flex;
        width: 40%;
        margin-bottom: 10px;
        margin-right: 10px;
        &:nth-child(2n + 2) {
          margin-right: 0;
        }
        button {
          margin: 0;
          width: 100%;
          min-width: unset !important;
          max-width: unset;
        }
      }
    }
  }
  &__timeline-card {
    border: 1px solid #6fbb81;
    border-radius: 25px;
    padding-right: 25px;
    margin-top: 15px;
    @media (min-width: 768px) and (max-width: 1199px) {
      margin-right: 30px;
    }
  }
  &__timeline-card-step {
    font-weight: 800;
    font-size: 11px;
    letter-spacing: 1px;
  }
  &__single-column {
    padding: 50px;
    @media (max-width: 1199px) {
      padding: 0 !important;
    }
  }
  &__row1-button {
    font-weight: 800;
    white-space: break-spaces;
    width: fit-content;
    text-align: center;
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    height: fit-content !important;
    padding: 0px 12px !important;
    @media (max-width: 767px) {
      width: 100% !important;
    }
    span {
      white-space: normal !important;
      display: inline-block;
      width: 100%;
      line-height: 18px;
    }
  }
  &__row2 {
    font-weight: 700;
    padding-top: 35px;
    font-size: 50px;
    line-height: 75px;
    color: #fec34b;
    @media (min-width: 768px) and (max-width: 1199px) {
      font-size: 32px !important;
      line-height: 42px !important;
    }
    @media (max-width: 767px) {
      font-size: 22px !important;
      line-height: 32px !important;
    }
  }
  &__row3 {
    justify-content: flex-end;
    align-items: flex-end;
    padding-top: 35px;
    margin-left: auto;
  }
  &__row3-button {
    font-weight: 800;
    white-space: break-spaces;
    width: fit-content;
    text-align: center;
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    height: fit-content !important;
    padding: 0px 12px !important;
    @media (max-width: 767px) {
      width: 100% !important;
    }
    span {
      white-space: normal !important;
      display: inline-block;
      width: 100%;
      line-height: 18px;
    }
  }
  &__testimonialWrapper {
    flex-direction: row;
    @media (max-width: 1199px) {
      flex-direction: column-reverse !important;
      padding: 0 !important;
    }
  }
  &__left {
    padding-left: 100px;
    @media (max-width: 1199px) {
      padding-left: 0 !important;
    }
  }
  &__right {
    flex-grow: 0.25;
    font-size: 42px;
    padding-left: 50px;
    margin-bottom: auto;
    @media (max-width: 1199px) {
      padding-left: 0 !important;
      margin-bottom: 0px !important;
    }
    .testimonialLogo {
      max-width: 200px;
      @media (min-width: 768px) and (max-width: 1199px) {
        margin: 0 auto !important;
        max-width: 350px !important;
        margin-bottom: 50px !important;
      }
      @media (max-width: 767px) {
        margin: 0 auto !important;
        max-width: 250px !important;
        margin-bottom: 50px !important;
      }
    }
    .v-btn {
      @media (max-width: 1199px) {
        width: 100% !important;
      }
      .v-btn__content {
        @media (max-width: 1199px) {
          white-space: normal !important;
          width: 100% !important;
          text-align: center !important;
          padding: 10px !important;
        }
      }
    }
  }
  &__testimonial-logo {
    @media (max-width: 1199px) {
      padding-left: 0 !important;
    }
  }
  &__content-grid {
    margin: 50px;
    max-width: 100%;
    @media (max-width: 1199px) {
      margin: 40px 0 10px !important;
    }
  }
  &__text-subtitle {
    font-weight: 800;
    font-size: 42px;
    @media (max-width: 767px) {
      font-size: 32px !important;
      margin-top: 0 !important;
      margin-bottom: 10px !important;
    }
  }
  &__text-testimonial {
    font-size: 22px;
    color: #ffffff;
    max-width: 75%;
    margin-top: 100px;
    margin-bottom: 35px;
    @media (min-width: 768px) and (max-width: 1199px) {
      max-width: 100% !important;
      margin-top: 0px !important;
      font-size: 32px !important;
    }
    @media (max-width: 767px) {
      max-width: 100% !important;
      margin-top: 0px !important;
      font-size: 22px !important;
      line-height: 32px !important;
    }

    &-title {
      padding-left: 25px;
    }

    &-name {
      font-size: 15px;
    }

    &-body {
      margin-bottom: 100px;
    }
  }
  &__text-testimonial-body {
    @media (max-width: 1199px) {
      margin-bottom: 10px !important;
    }
  }
  &__activitiesWrapper {
    .activitiesBannerImage {
      @media (min-width: 768px) and (max-width: 1199px) {
        .v-image {
          width: 100% !important;
        }
      }
      @media (max-width: 767px) {
        display: inline-flex;
        width: 100%;
        overflow-y: auto;
        padding-bottom: 10px;
        margin-bottom: 20px;
        .v-image {
          width: 1000px !important;
          max-width: unset;
        }
      }
    }
  }
  &__peopleWrapper {
    .peopleBannerImage {
      @media (min-width: 768px) and (max-width: 1199px) {
        margin-top: 60px !important;
        margin-bottom: 60px !important;
        width: 80% !important;
      }
      @media (max-width: 767px) {
        width: 100% !important;
        margin-top: 50px !important;
        margin-bottom: 50px !important;
      }
    }
  }
  &__studentChoiceEmployerWrapper {
    height: 100%;
    padding-top: 4%;
    padding-bottom: 4%;
    @media (max-width: 767px) {
      padding: 0 !important;
    }
    .studentChoice {
      flex-direction: row;
      @media (max-width: 767px) {
        flex-direction: column !important;
      }
    }
    .landing__left {
      .landing__timeline-card {
        margin-bottom: auto;
        @media (max-width: 767px) {
          margin-bottom: 50px !important;
        }
      }
    }
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
    @media (min-width: 768px) and (max-width: 1199px) {
      font-size: 38px !important;
      margin-top: 0 !important;
      margin-bottom: 10px !important;
    }
    @media (max-width: 767px) {
      font-size: 32px !important;
      margin-top: 0 !important;
      margin-bottom: 10px !important;
    }
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
    @media (min-width: 768px) and (max-width: 1199px) {
      height: fit-content !important;
    }
    @media (max-width: 767px) {
      min-width: unset !important;
      width: 100% !important;
      max-width: unset !important;
      height: fit-content !important;
      padding: 0px !important;
      span {
        white-space: normal;
        width: 100%;
        display: inline-block;
        word-break: break-word;
      }
    }
  }
  &__content-grid-combo {
    font-weight: 800;
    font-size: 22px;
  }
  &__benefits {
    margin-top: 10px;
    margin-bottom: 50px;
    flex-wrap: wrap;
    flex-direction: row;
    @media (min-width: 768px) and (max-width: 1199px) {
      margin: 20px 0 0 !important;
    }
    @media (max-width: 767px) {
      margin: 20px 0 0 !important;
      flex-direction: column !important;
      .landing__benefits-card {
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  &__benefits-card {
    margin: 25px;
    @media (min-width: 768px) and (max-width: 1199px) {
      margin-left: 0 !important;
      min-width: unset !important;
      max-width: unset !important;
      width: 48% !important;
      margin-right: 2% !important;
      margin-top: 0 !important;
      margin-bottom: 2% !important;
      &:nth-child(2n + 2) {
        margin-right: 0;
      }
    }
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
.testimonal-wrapper {
  .v-parallax__image {
    @media (max-width: 991px) {
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>

<style lang="scss" scoped>
.v-menu__content {
  box-shadow: none;

  @media (max-width: 767px) {
    border-radius: 12px;
    background-color: rgba(0, 0, 0, 0.85);
    margin-top: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 15px;
    padding-top: 15px;

    div {
      width: 90%;
      display: inline-block;

      button {
        width: 100%;
        height: 35px !important;
      }
    }
  }
}
</style>
