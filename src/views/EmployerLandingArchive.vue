<template>
  <div class="landing__container">
    <v-app-bar absolute class="mb-0 pb-0" color="transparent" flat>
      <v-toolbar-title
        ><span class="text-h5 signup__header font-weight-black text-sm-h4"></span
      ></v-toolbar-title>

      <v-spacer></v-spacer>

      <div class="nav__actions">
        <router-link :to="{ name: 'explore' }">
          <v-btn class="ml-5 mr-5 font-weight-bold" depressed dark outlined large rounded>
            Explore Programs<v-icon right>mdi-sign-direction</v-icon>
          </v-btn>
        </router-link>
        <v-btn
          v-if="!user"
          depressed
          color="white"
          class="mr-3"
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

        <v-btn v-if="user" text color="#404142" @click="$router.push({ name: 'portfolio' })">
          <Profile :size="45" />
        </v-btn>
      </div>
    </v-app-bar>
    <div class="employer-landing__main-hero d-flex flex-row justify-center align-center">
      <div class="employer-landing__main-hero-right d-flex justify-center align-center flex-column">
        <div class="landing__hero-logo mx-auto">
          <v-img
            src="https://f.hubspotusercontent00.net/hubfs/2480959/PilotCity_Wireframe_White.svg"
          ></v-img>
        </div>
        <div class="d-flex justify-center">
          <div class="employer-landing__main-hero-tagline text-center">
            Automate & streamline <br />your internship program
          </div>
        </div>
        <div class="mt-12">
          <v-btn rounded x-large depressed class="font-weight-bold white--text" dark color="purple"
            >Setup Program</v-btn
          >
        </div>
        <div class="d-flex mt-12">
          <v-btn outlined dark icon x-large
            ><v-icon x-large color="white">mdi-chevron-down</v-icon></v-btn
          >
        </div>
      </div>

      <div class="employer-landing__main-hero-right d-flex justify-center align-center">
        <v-carousel
          cycle
          class="employer-landing__main-hero-carousel"
          hide-delimiter-background
          height="100%"
          show-arrows-on-hover
          vertical-delimiters
        >
          <v-carousel-item v-for="(slide, i) in carouselSlides" :key="i" vertical>
            <v-sheet
              :color="carouselColors[i]"
              class="
                employer-landing__main-hero-carousel
                d-flex
                flex-column
                justify-start
                align-start
              "
            >
              <!-- <div class="landing__hero-logo mx-auto">
                <v-img
                  src="https://f.hubspotusercontent00.net/hubfs/2480959/PilotCity_Wireframe_White.svg"
                ></v-img>
              </div> -->
              <div class="d-flex justify-start align-start mt-auto mb-12 ml-12 flex-column">
                <div class="ml-3 mb-3 font-weight-bold">
                  <v-btn depressed outlined rounded small class="font-weight-bold">PilotCity</v-btn>
                </div>
                <div class="employer-landing__main-hero-tagline2 mb-3 ml-3">
                  {{ slide }}
                </div>
              </div>
              <!-- <div class="mt-12">
                <v-btn rounded x-large dark depressed class="font-weight-bold">Setup Program</v-btn>
              </div>
              <div class="d-flex mt-12">
                <v-btn outlined dark icon x-large
                  ><v-icon x-large color="white">mdi-chevron-down</v-icon></v-btn
                >
              </div> -->
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </div>
    </div>

    <!-- LOGOS -->
    <v-divider class=""></v-divider>
    <div class="d-flex flex-row justify-center">
      <div class="d-flex align-center ml-10 mr-10 mt-5 mb-5">
        <v-img width="10vw" src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg"></v-img>
      </div>
      <div class="d-flex align-center ml-10 mr-10 mt-5 mb-5">
        <v-img width="10vw" src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg"></v-img>
      </div>
      <div class="d-flex align-center ml-10 mr-10 mt-5 mb-5">
        <v-img width="10vw" src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg"></v-img>
      </div>
      <div class="d-flex align-center ml-10 mr-10 mt-5 mb-5">
        <v-img width="10vw" src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg"></v-img>
      </div>
      <div class="d-flex align-center ml-10 mr-10 mt-5 mb-5">
        <v-img width="10vw" src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg"></v-img>
      </div>
      <div class="d-flex align-center ml-10 mr-10 mt-5 mb-5">
        <v-img width="10vw" src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg"></v-img>
      </div>
    </div>
    <v-divider class="mb-6"></v-divider>

    <!-- RANKINGS -->
    <div class="d-flex flex-column pt-12 pb-6">
      <div class="d-flex justify-center">
        <v-icon color="blue" x-large>mdi-pyramid</v-icon>
      </div>
      <div class="employer-landing__second-hero-tagline text-center mx-auto">
        Scope & post projects
      </div>
      <div class="d-flex justify-center mt-6 flex-row">
        <div class="ma-2"><v-select rounded label="Select Industry" outlined></v-select></div>
        <div class="d-flex justify-center font-weight-bold ma-2">
          <v-btn dark x-large depressed rounded color="blue">See examples</v-btn>
        </div>
      </div>
    </div>

    <div class="d-flex flex-row justify-center">
      <div class="d-flex justify-start flex-column employer-landing__two-side">
        <div class="ml-6 mr-3 mb-3">
          <v-btn outlined rounded depressed small
            ><h3 class="ma-2">3</h3>
            Examples Found</v-btn
          >
        </div>
        <div class="ml-6 mr-3 mt-3 mb-3">
          <v-card flat class="pa-4">
            <div class="d-flex flex-row">
              <div>
                <v-chip outlined small rounded class="mb-2 mr-4">1</v-chip>
              </div>
              <div>
                <h4>
                  Design, prototype, and code a voice-enabled user experience using the Alan AI
                  voice platform that lets user interact with a gaming application using voice
                </h4>
                <v-chip-group>
                  <v-chip color="red" dark small>Marketing</v-chip>
                  <v-chip color="green" dark small>Communications</v-chip>
                  <v-chip color="purple" dark small>Product</v-chip>
                  <v-chip color="blue" dark small>Operations</v-chip>
                </v-chip-group>
              </div>
            </div>
          </v-card>
        </div>

        <div class="ml-6 mr-3 mt-3 mb-3">
          <v-card flat class="pa-4">
            <div class="d-flex flex-row">
              <div>
                <v-chip outlined small rounded class="mb-2 mr-4">2</v-chip>
              </div>
              <div>
                <h4>
                  Help a biotech startup interview, evaluate & understand attitudes towards
                  cell-based meats by determining age, demographics & reasons consumers would choose
                  it over animal-based meats
                </h4>
                <v-chip-group>
                  <v-chip color="red" dark small>Marketing</v-chip>

                  <v-chip color="purple" dark small>Product</v-chip>
                  <v-chip color="blue" dark small>Operations</v-chip>
                </v-chip-group>
              </div>
            </div>
          </v-card>
        </div>

        <div class="ml-6 mr-3 mt-3 mb-3">
          <v-card flat class="pa-4">
            <div class="d-flex flex-row">
              <div>
                <v-chip outlined small rounded class="mb-2 mr-4">3</v-chip>
              </div>
              <div>
                <h4>
                  Help a marketing startup get and implement insights from local businesses in your
                  city to improve their digital marketing capabilities and transform the way they
                  get clients using Bexi, an automated digital marketing platform
                </h4>
                <v-chip-group>
                  <v-chip color="red" dark small>Marketing</v-chip>

                  <v-chip color="blue" dark small>Operations</v-chip>
                </v-chip-group>
              </div>
            </div>
          </v-card>
        </div>
      </div>
      <div class="d-flex justify-start flex-column employer-landing__two-side">
        <div class="ml-6 mr-3 mb-3">
          <v-btn outlined rounded depressed small
            ><h3 class="ma-2">6</h3>
            Benefits Found</v-btn
          >
        </div>
        <v-card flat outlined class="ml-3 mr-6 mt-3 mb-3">
          <div class="d-flex flex-row">
            <div>
              <v-avatar class="ma-3" size="125" tile>
                <v-img src="https://picsum.photos/500/300"></v-img>
              </v-avatar>
            </div>
            <div class="ma-3">
              <h3>Streamline your internship program</h3>
              <h4 class="mt-2 grey--text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna
              </h4>
            </div>
          </div>
        </v-card>
        <v-card flat outlined class="ml-3 mr-6 mt-3 mb-3">
          <div class="d-flex flex-row">
            <div>
              <v-avatar class="ma-3" size="125" tile>
                <v-img src="https://picsum.photos/500/300"></v-img>
              </v-avatar>
            </div>
            <div class="ma-3">
              <h3>Early workforce development that saves time</h3>
              <h4 class="mt-2 grey--text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna
              </h4>
            </div>
          </div>
        </v-card>
        <v-card flat outlined class="ml-3 mr-6 mt-3 mb-3">
          <div class="d-flex flex-row">
            <div>
              <v-avatar class="ma-3" size="125" tile>
                <v-img src="https://picsum.photos/500/300"></v-img>
              </v-avatar>
            </div>
            <div class="ma-3">
              <h3>Diversify your team with local students</h3>
              <h4 class="mt-2 grey--text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna
              </h4>
            </div>
          </div>
        </v-card>

        <v-card flat outlined class="ml-3 mr-6 mt-3 mb-3">
          <div class="d-flex flex-row">
            <div>
              <v-avatar class="ma-3" size="125" tile>
                <v-img src="https://picsum.photos/500/300"></v-img>
              </v-avatar>
            </div>
            <div class="ma-3">
              <h3>Make community impact the smart way</h3>
              <h4 class="mt-2 grey--text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna
              </h4>
            </div>
          </div>
        </v-card>

        <v-card flat outlined class="ml-3 mr-6 mt-3 mb-3">
          <div class="d-flex flex-row">
            <div>
              <v-avatar class="ma-3" size="125" tile>
                <v-img src="https://picsum.photos/500/300"></v-img>
              </v-avatar>
            </div>
            <div class="ma-3">
              <h3>Civic engagement with local residents</h3>
              <h4 class="mt-2 grey--text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna
              </h4>
            </div>
          </div>
        </v-card>
      </div>
    </div>
    <!-- SETUP -->
    <div class="employer-landing__main-hero2 d-flex flex-row align-center">
      <div class="d-flex justify-center align-center pa-12">
        <v-card width="45vw" outlined flat>
          <v-img
            width="45vw"
            src="https://media.giphy.com/media/SRPSvvnIMjziG5RblO/giphy.gif"
          ></v-img>
        </v-card>
      </div>
      <div class="d-flex flex-column pr-12">
        <div class="d-flex align-center mb-6">
          <h1>Setup program in 5 hours or less</h1>
        </div>
        <div class="pr-12">
          <h2 class="grey--text font-weight-regular">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </h2>
        </div>
        <div class="mt-8">
          <v-btn rounded x-large dark color="orange" class="font-weight-bold" depressed
            >Start Setup</v-btn
          >
        </div>
      </div>
    </div>
    <!-- PUBLISH -->
    <div class="employer-landing__main-hero2 d-flex flex-row align-center">
      <div class="d-flex flex-column pl-12">
        <div class="d-flex align-center mb-6">
          <h1>Publish & ready to explore</h1>
        </div>
        <div class="">
          <h2 class="grey--text font-weight-regular">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </h2>
        </div>
        <div class="mt-8">
          <v-btn rounded x-large dark color="red" class="font-weight-bold" depressed
            >Explore Employers</v-btn
          >
        </div>
      </div>
      <div class="d-flex justify-center align-center pa-12">
        <v-card width="45vw" outlined flat>
          <v-img
            width="45vw"
            src="https://media.giphy.com/media/mVIHLIJ3ojpFo8px8X/giphy.gif"
          ></v-img>
        </v-card>
      </div>
    </div>
    <!-- MONITOR -->
    <div class="employer-landing__main-hero3 d-flex flex-row align-center">
      <div class="d-flex justify-center align-center pa-12">
        <v-card width="45vw" outlined flat>
          <v-img
            width="45vw"
            src="https://media.giphy.com/media/ch0sxNMPWbGwoPQxEJ/giphy.gif"
          ></v-img>
        </v-card>
      </div>
      <div class="d-flex flex-column pr-12">
        <div class="d-flex align-center mb-6">
          <h1>Monitor students & their projects</h1>
        </div>
        <div class="pr-12">
          <h2 class="grey--text font-weight-regular">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </h2>
        </div>
        <div class="mt-8">
          <v-btn rounded x-large dark color="blue" class="font-weight-bold" depressed
            >Demo now</v-btn
          >
        </div>
      </div>
    </div>
    <!-- INDUSTRIES -->
    <div class="">
      <div class="d-flex justify-center"><v-icon color="yellow" x-large>mdi-pyramid</v-icon></div>
      <div class="employer-landing__second-hero-tagline text-center mx-auto mb-4">
        Industries of our employers
      </div>
      <div class="d-flex justify-center mb-12">
        <h3 class="grey--text">Ranked by most to least</h3>
      </div>

      <v-progress-linear color="purple" value="72" height="38">
        <template>
          <v-icon class="mr-2" color="black" small>mdi-hexagon-slice-1</v-icon>
          <h5>Marketing, Sales & Service</h5>
        </template>
      </v-progress-linear>
      <v-progress-linear color="blue" value="68" height="38">
        <template>
          <v-icon class="mr-2" color="black" small>mdi-hexagon-slice-2</v-icon>
          <h5>Information & Communication Technologies</h5>
        </template>
      </v-progress-linear>
      <v-progress-linear color="green" value="50" height="38">
        <template>
          <v-icon class="mr-2" color="black" small>mdi-hexagon-slice-3</v-icon>
          <h5>Arts, Media & Entertainment</h5>
        </template>
      </v-progress-linear>
      <v-progress-linear color="red" value="43" height="38">
        <template>
          <v-icon class="mr-2" color="black" small>mdi-hexagon-slice-4</v-icon>
          <h5>Manufacturing & Product Design</h5>
        </template>
      </v-progress-linear>

      <v-progress-linear color="orange" value="37" height="38">
        <template>
          <v-icon class="mr-2" color="black" small>mdi-hexagon-slice-5</v-icon>
          <h5>Public Service</h5>
        </template>
      </v-progress-linear>

      <v-progress-linear color="yellow" value="28" height="38">
        <template>
          <v-icon class="mr-2" color="black" small>mdi-hexagon-slice-6</v-icon>
          <h5>Energy, Environment & Utilities</h5>
        </template>
      </v-progress-linear>

      <v-progress-linear color="purple lighten-1" value="21" height="38">
        <template>
          <v-icon class="mr-2" color="black" small>mdi-hexagon-slice-5</v-icon>
          <h5>Engineering & Architecture</h5>
        </template>
      </v-progress-linear>

      <v-progress-linear color="blue lighten-1" value="21" height="38">
        <template>
          <v-icon class="mr-2" color="black" small>mdi-hexagon-slice-4</v-icon>
          <h5>Business & Finance</h5>
        </template>
      </v-progress-linear>

      <v-progress-linear color="green lighten-1" value="21" height="38">
        <template>
          <v-icon class="mr-2" color="black" small>mdi-hexagon-slice-3</v-icon>
          <h5>Health Science & Medical Technology</h5>
        </template>
      </v-progress-linear>

      <v-progress-linear color="red lighten-1" value="21" height="38">
        <template>
          <v-icon class="mr-2" color="black" small>mdi-hexagon-slice-2</v-icon>
          <h5>Education, Child Development & Family Services</h5>
        </template>
      </v-progress-linear>

      <v-progress-linear color="orange lighten-1" value="10" height="38">
        <template>
          <v-icon class="mr-2" color="black" small>mdi-hexagon-slice-1</v-icon>
          <h5>Transportation</h5>
        </template>
      </v-progress-linear>

      <v-progress-linear color="yellow lighten-1" value="7" height="38">
        <template>
          <v-icon class="mr-2" color="black" small>mdi-hexagon-slice-2</v-icon>
          <h5>Building & Construction Trades</h5>
        </template>
      </v-progress-linear>

      <v-progress-linear color="purple lighten-2" value="6" height="38">
        <template>
          <v-icon class="mr-2" color="black" small>mdi-hexagon-slice-3</v-icon>
          <h5>Agriculture & Natural Resources</h5>
        </template>
      </v-progress-linear>

      <v-progress-linear color="blue lighten-2" value="3" height="38">
        <template>
          <v-icon class="mr-2" color="black" small>mdi-hexagon-slice-4</v-icon>
          <h5>Hospitality, Tourism & Recreation</h5>
        </template>
      </v-progress-linear>

      <v-progress-linear color="green lighten-2" value="2" height="38">
        <template>
          <v-icon class="mr-2" color="black" small>mdi-hexagon-slice-5</v-icon>
          <h5>Fashion & Interior Design</h5>
        </template>
      </v-progress-linear>
    </div>

    <!-- SELF-DEMO -->

    <div>
      <iframe
        src="https://www.videoask.com/fourbiyzg"
        allow="camera *; microphone *; autoplay *; encrypted-media *; fullscreen *; display-capture *;"
        width="100%"
        height="800px"
        style="border: none; border-radius: 0px"
        class="ma-0 pa-0"
      >
      </iframe>
    </div>

    <!-- BY THE NUMBERS -->

    <div class="d-flex flex-row mt-12 mb-12">
      <div class="d-flex flex-column">
        <div class="d-flex justify-center ma-2"><v-icon color="red" large>mdi-pyramid</v-icon></div>
        <div class="d-flex justify-center ma-2">
          <h1>3,250+ Students</h1>
        </div>
        <div class="d-flex text-center grey--text ma-2">
          <h3 class="font-weight-regular">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </h3>
        </div>
      </div>
      <div class="d-flex flex-column">
        <div class="d-flex justify-center ma-2">
          <v-icon color="blue" large>mdi-pyramid</v-icon>
        </div>
        <div class="d-flex justify-center ma-2">
          <h1>60+ Schools</h1>
        </div>
        <div class="d-flex text-center grey--text ma-2">
          <h3 class="font-weight-regular">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </h3>
        </div>
      </div>
      <div class="d-flex flex-column">
        <div class="d-flex justify-center ma-2">
          <v-icon color="green" large>mdi-pyramid</v-icon>
        </div>
        <div class="d-flex justify-center ma-2">
          <h1>40+ Cities</h1>
        </div>
        <div class="d-flex text-center grey--text ma-2">
          <h3 class="font-weight-regular">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </h3>
        </div>
      </div>
    </div>

    <!-- MAP -->
    <div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26370823.165272687!2d-113.70758642866038!3d36.21289492733001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sus!4v1642396458823!5m2!1sen!2sus"
        width="100%"
        height="500px"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
      ></iframe>
    </div>

    <!-- ANYTHING BELOW THIS IS I DUNNO YET -->

    <div class="d-flex flex-column pt-12 pb-12">
      <div class="employer-landing__second-hero-tagline text-center mx-auto mb-8">
        <!-- No time for interns?<br />Streamline it. -->
        <!-- Setup, publish & monitor<br />internship program -->
        Crowdsource student projects <br />
        to award internships
      </div>

      <div class="mt-6 mb-12">
        <div class="employer-landing__chips d-flex justify-start">
          <div>
            <v-btn small class="font-weight-bold ma-2" color="green" dark depressed rounded
              >Agriculture & Natural Resources</v-btn
            >
          </div>
          <div>
            <v-btn small class="font-weight-bold ma-2" color="red" dark depressed rounded
              >Arts, Media & Entertainment</v-btn
            >
          </div>
          <div>
            <v-btn small class="font-weight-bold ma-2" color="orange" dark depressed rounded>
              Building & Construction Trades</v-btn
            >
          </div>
          <div>
            <v-btn small class="font-weight-bold ma-2" color="green" dark depressed rounded
              >Business & Finance</v-btn
            >
          </div>
          <div>
            <v-btn small class="font-weight-bold ma-2" color="pink" dark depressed rounded
              >Education, Childhood Development & Family Services</v-btn
            >
          </div>
          <div>
            <v-btn small class="font-weight-bold ma-2" color="blue" dark depressed rounded
              >Energy, Environment & Utilities</v-btn
            >
          </div>
          <div>
            <v-btn small class="font-weight-bold ma-2" color="purple" dark depressed rounded
              >Engineering & Architecture</v-btn
            >
          </div>
          <div>
            <v-btn small class="font-weight-bold ma-2" color="yellow" dark depressed rounded
              >Fashion & Interior Design</v-btn
            >
          </div>
          <div>
            <v-btn small class="font-weight-bold ma-2" color="pink" dark depressed rounded
              >Health Science & Medical Technology</v-btn
            >
          </div>
          <div>
            <v-btn small class="font-weight-bold ma-2" color="orange" dark depressed rounded
              >Hospitality, Tourism & Recreation</v-btn
            >
          </div>
          <div>
            <v-btn small class="font-weight-bold ma-2" color="green" dark depressed rounded
              >Information & Communication Technologies</v-btn
            >
          </div>
          <div>
            <v-btn small class="font-weight-bold ma-2" color="purple" dark depressed rounded
              >Manufacturing & Product Design</v-btn
            >
          </div>
          <div>
            <v-btn small class="font-weight-bold ma-2" color="red" dark depressed rounded
              >Marketing, Sales & Service</v-btn
            >
          </div>
          <div>
            <v-btn small class="font-weight-bold ma-2" color="pink" dark depressed rounded
              >Public Services</v-btn
            >
          </div>
          <div>
            <v-btn small class="font-weight-bold ma-2" color="green" dark depressed rounded
              >Transportation</v-btn
            >
          </div>
        </div>
      </div>

      <div>
        <v-tabs color="blue" centered>
          <v-tab class="font-weight-bold">Run Internships</v-tab>
          <v-tab class="font-weight-bold">Workforce & Economy</v-tab>
          <v-tab class="font-weight-bold">Social Responsibility</v-tab>
          <v-tab class="font-weight-bold">Diversity & Inclusion</v-tab>
          <v-tab class="font-weight-bold">Civic Engagement</v-tab>
          <!-- <v-tab>Giving Back</v-tab> -->
          <!-- <v-tab>Digital Transformation</v-tab> -->
          <!-- <v-tab>Economic Development</v-tab> -->
          <v-tab-item v-for="n in 5" :key="n">
            <v-container fluid>
              <v-row>
                <v-col v-for="i in 6" :key="i" cols="12" md="4">
                  <v-img
                    :src="`https://picsum.photos/500/300?image=${i * n * 5 + 10}`"
                    aspect-ratio="2"
                  ></v-img>
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
        </v-tabs>
      </div>

      <div>
        <v-tabs v-model="scopeTabs" centered>
          <v-tab v-for="n in 3" :key="n"> Item {{ n }} </v-tab>
        </v-tabs>

        <v-tabs-items v-model="scopeTabs">
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-title class="text-h5"> An awesome title </v-card-title>
              <v-card-text>
                <p>
                  Duis lobortis massa imperdiet quam. Donec vitae orci sed dolor rutrum auctor.
                  Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc, vitae
                  euismod ligula urna in dolor. Praesent congue erat at massa.
                </p>

                <p>
                  Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu
                  sollicitudin urna dolor sagittis lacus. Pellentesque egestas, neque sit amet
                  convallis pulvinar, justo nulla eleifend augue, ac auctor orci leo non est. Etiam
                  sit amet orci eget eros faucibus tincidunt. Donec sodales sagittis magna.
                </p>

                <p class="mb-0">
                  Ut leo. Suspendisse potenti. Duis vel nibh at velit scelerisque suscipit. Fusce
                  pharetra convallis urna.
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-title class="text-h5"> An even better title </v-card-title>
              <v-card-text>
                <p>
                  Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum
                  viverra felis nunc et lorem. Sed hendrerit. Maecenas malesuada. Vestibulum
                  ullamcorper mauris at ligula. Proin faucibus arcu quis ante.
                </p>

                <p class="mb-0">
                  Etiam vitae tortor. Curabitur ullamcorper ultricies nisi. Sed magna purus,
                  fermentum eu, tincidunt eu, varius ut, felis. Aliquam lobortis. Suspendisse
                  potenti.
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </div>

    <div></div>
    <div class="d-flex justify-center mt-12 mb-12">
      <div class="employer-landing__third-hero-tagline text-center">
        The X industry has X students with X tokens
      </div>
    </div>
    <Testimonial
      background="https://f.hubspotusercontent00.net/hubfs/2480959/testimonial-background4.png"
      content="I was just blown away about their technical skills and coding abilities.  I know when I was in high school I definitely wasn’t coding like they were."
      right-logo="https://f.hubspotusercontent00.net/hubfs/2480959/StrategyOfThings_white.png"
      :user="{
        name: 'David D.',
        position: 'Strategy of Things',
        avatar: 'https://f.hubspotusercontent00.net/hubfs/2480959/_DSC4843_small.jpg'
      }"
    />

    <div>
      <iframe
        src="https://www.videoask.com/fr0bm7ss3"
        allow="camera *; microphone *; autoplay *; encrypted-media *; fullscreen *; display-capture *;"
        width="100%"
        height="800px"
        style="border: none; border-radius: 0px"
        class="ma-0 pa-0"
      >
      </iframe>
    </div>

    <Testimonial
      color="black"
      background="https://f.hubspotusercontent00.net/hubfs/2480959/19500_yellow.svg"
      content="I was just meeting them once a week.  With that minimal guidance they were able to figure out the platform ... and produce a functioning app at the end, which was really really impressive."
      right-logo="https://f.hubspotusercontent00.net/hubfs/2480959/WI_P_Wireframe-1.png"
      :user="{
        name: 'Smita C.',
        position: 'Onyxx Village Connection',
        avatar: 'https://f.hubspotusercontent00.net/hubfs/2480959/flipped2019_panel.png'
      }"
    />

    <Testimonial
      background="https://f.hubspotusercontent00.net/hubfs/2480959/testimonial-backgroundE.png"
      content="Teaching the interns how to use the software - there was basically no effort at all there. In terms of training them, educating them I recorded some quick videos and they basically took the rest on their own."
      :user="{
        name: 'Joe R.',
        position: 'Raconteur Animation',
        avatar:
          'https://f.hubspotusercontent00.net/hubfs/2480959/Screen%20Shot%202020-08-31%20at%2012.31.38%20AM.png'
      }"
    />

    <Hero
      icon="mdi-graph-outline"
      color="purple"
      title="Designed for minimal time committment"
      background="https://f.hubspotusercontent00.net/hubfs/2480959/employer.png"
      description="4 - 5 hours program setup<br />10 - 15 minutes review per candidate<br />30 - 60 minutes per week intern management"
      :to="{ to: '/signup', button: 'Onboard Now' }"
    >
      <template #right>
        <v-card elevation="0" tile depressed>
          <!-- <v-img max-height="300px" max-width="300px" src="" depressed></v-img> -->
        </v-card>
      </template>
    </Hero>

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

    <v-parallax
      src="https://f.hubspotusercontent00.net/hubfs/2480959/Final_19500_Background.svg"
      dark
      height="100%"
      class="landing__hero-default"
    >
      <div class="landing__primary-title">Activities</div>

      <v-btn outlined small color="white" rounded class="landing__primary-subtitle"
        >Key events and program activities</v-btn
      >
      <div class="">
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
    </v-parallax>

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

    <v-parallax
      dark
      class="landing__hero-default"
      height="100%"
      src="https://f.hubspotusercontent00.net/hubfs/2480959/Final_19500_Background.svg"
    >
      <div class="landing__primary-title">People</div>

      <v-btn outlined small color="white" rounded class="landing__primary-subtitle">
        Students are the protagonist, the community is their village</v-btn
      >
      <v-img
        src="https://f.hubspotusercontent00.net/hubfs/2480959/Final_CrossSector_v3.svg"
        class="landing__primary-image"
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
      class="landing__hero-default"
    >
      <div class="landing__primary-title">Engage</div>

      <v-btn outlined small color="white" rounded class="landing__primary-subtitle"
        >Engage your students to develop real-world projects to win internships</v-btn
      >

      <div class="landing__benefits flex-row d-flex flex-grow-1 m-auto">
        <div>
          <v-card elevation="0" max-width="375px" min-width="250px" class="landing__benefits-card">
            <v-card-title class="landing__benefits-card-title">
              <v-icon color="pink" large class="landing__benefits-card-icon"
                >mdi-cursor-pointer</v-icon
              >Student choice of employer</v-card-title
            >

            <v-divider class="mx-4" />
            <v-card-text class="landing__benefits-card-body">
              Students choose their employer project. This drives engagement and motivation,
              resulting in higher quality learning and project development. They will be guided
              through activities and completion of deliverables to auto-qualify for our internship
              program.
            </v-card-text>
          </v-card>
        </div>
        <div>
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
        </div>

        <div>
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
      </div>
    </v-parallax>
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
      class="landing__hero-default"
    >
      <div class="landing__primary-title">Outcomes</div>

      <v-btn outlined small color="white" rounded class="landing__primary-subtitle"
        >What our program delivers to our student participants</v-btn
      >

      <div class="landing__benefits flex-row d-flex flex-grow-1 m-auto">
        <div>
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
        </div>
        <div>
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
        </div>

        <div>
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
              communities. Students are the protagonists of this mission to improve their
              communities through building resilience, equity and digital transformation.
            </v-card-text>
          </v-card>
        </div>
      </div>
    </v-parallax>

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
      class="landing__hero-default"
    >
      <div class="landing__primary-title">Benefits</div>

      <v-btn outlined small color="white" rounded class="landing__primary-subtitle"
        >Enable students to build projects to win internships with you</v-btn
      >

      <div class="landing__benefits flex-row d-flex flex-grow-1 m-auto">
        <div>
          <v-card elevation="0" max-width="375px" min-width="250px" class="landing__benefits-card">
            <v-card-title class="landing__benefits-card-title">
              <v-icon color="purple" large class="landing__benefits-card-icon"
                >mdi-rocket-launch</v-icon
              >Present problems, get solutions</v-card-title
            >

            <v-divider class="mx-4" />
            <v-card-text class="landing__benefits-card-body"
              >Pose problems, allow students to solve it for you. Whether they're in class, part of
              extracurricular or outside of school, our students build an initial solution to
              present to you before you decide to hire them as an intern. Saving you onboarding
              time, and management bandwidth.
            </v-card-text>
          </v-card>
        </div>
        <div>
          <v-card
            max-width="375px"
            min-width="250px"
            class="landing__benefits-card"
            rounded
            elevation="0"
          >
            <v-card-title class="landing__benefits-card-title">
              <v-icon color="purple" large class="landing__benefits-card-icon"
                >mdi-ab-testing</v-icon
              >Test drive, then hire to execute</v-card-title
            >
            <v-divider class="mx-4" />
            <v-card-text class="landing__benefits-card-body">
              Students deliver initial solutions in competition for your internship. Once hired,
              students pre-internship projects to further develop their prototype, pilot or product.
              This model gets your side project off the ground, while eliminating the wonder if the
              intern will be a good-fit.
            </v-card-text>
          </v-card>
        </div>

        <div>
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
              Our one-time program setup allows you to run your program over and over again,
              preparing you for greater replicability and scale. You can then focus your time
              monitoring, tracking and supporting your participants to deliver the outcomes you're
              looking for.
            </v-card-text>
          </v-card>
        </div>
      </div>
    </v-parallax>
    <Hero
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
      class="landing__hero-default"
    >
      <div class="landing__primary-title">Impact</div>

      <v-btn outlined small color="white" rounded class="landing__primary-subtitle"
        >Sponsor participants to advance outcome goals</v-btn
      >

      <div class="landing__benefits flex-row d-flex flex-grow-1 m-auto">
        <div>
          <v-card elevation="0" max-width="375px" min-width="250px" class="landing__benefits-card">
            <v-card-title class="landing__benefits-card-title">
              <v-icon color="red" large class="landing__benefits-card-icon">mdi-rotate-orbit</v-icon
              >Fund participants, transform lives</v-card-title
            >

            <v-divider class="mx-4" />
            <v-card-text class="landing__benefits-card-body">
              Student participants in our program transform as individuals while in our program.
              They discover interests within themself and motivation to pursue a path for themself.
              Fund participants to see an impact in student lives as they pursue their growth as
              contributors to the community.
            </v-card-text>
          </v-card>
        </div>
        <div>
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
              Once you've funded participants, the token they use to select and join programs will
              be tracked under the name and entity that sponsored the participant. Monitor and track
              the progress of your sponsorships, and see outcomes be delivered live.
            </v-card-text>
          </v-card>
        </div>

        <div>
          <v-card
            max-width="375px"
            min-width="250px"
            class="landing__benefits-card"
            rounded
            elevation="0"
          >
            <v-card-title class="landing__benefits-card-title">
              <v-icon color="red" large class="landing__benefits-card-icon">mdi-billboard</v-icon
              >Ads and acknowledgements</v-card-title
            >

            <v-divider class="mx-4" />

            <v-card-text class="landing__benefits-card-body">
              Your participant's success is your success. Your entity or name will be forever
              associated with the impact you had on the program participant. You will be
              automatically advertised, recognized and acknowledged during key activities during the
              program.
            </v-card-text>
          </v-card>
        </div>
      </div>
    </v-parallax>

    <Hero
      icon="mdi-sign-direction"
      color="yellow"
      title="Parent as sponsor, and stakeholder"
      background="https://f.hubspotusercontent00.net/hubfs/2480959/sponsor.png"
      description="Sponsor student participants<br />Transfer tickets to student participants<br />Monitor sponsorships"
      :to="{ to: '/portfolio', button: 'Invite Your Student and School' }"
    />

    <Testimonial
      color="black"
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

    // watch(newpass => {
    //   window.videoask.loadEmbed({
    //     kind: 'widget',
    //     url: 'https://www.videoask.com/fsh9ziggj',
    //     options: {
    //       widgetType: 'VideoThumbnailWindow',
    //       text: 'Get Started',
    //       backgroundColor: '#dedede',
    //       position: 'bottom-right',
    //       dismissable: false
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
