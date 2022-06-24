import { RouteConfig } from 'vue-router';
import apolloProvider from '@/vue-apollo';
import { useUserGetters, useDbState } from '@/store';

import {
  UserQueryInput,
  User,
  EmployerPortfolio,
  OrganizerPortfolio,
  ParentPortfolio,
  SchoolPortfolio,
  StudentPortfolio,
  TeacherPortfolio
} from '@/generated/graphql';
import { SETUP_ROUTE_USER, ALL_PORTFOLIOS } from '@/services/graphql/queries';

const routes: Array<RouteConfig> = [
  {
    path: '/monitor/:participantId?',
    name: 'Monitor',
    component: () => import(/* webpackChunkName: "Monitor" */ '@/views/Monitor/Monitor.vue'),
    meta: {
      requiresAuth: true,
      layout: 'no-nav'
    }
  },
  {
    path: '/program/manage',
    name: 'Manage',
    component: () =>
      import(/* webpackChunkName: "Manage" */ '@/views/ManageProgram/views/Manage.vue')
  },
  {
    path: '/program/participants',
    name: 'Participants',
    component: () =>
      import(/* webpackChunkName: "Participants" */ '@/views/ManageProgram/views/Participants.vue')
  },
  {
    path: '/program/editprogram',
    name: 'Editprogram',
    component: () =>
      import(/* webpackChunkName: "EditProgram" */ '@/views/ManageProgram/views/EditProgram.vue')
  },
  {
    path: '/program/managestakeholder',
    name: 'ManageStakeholder',
    component: () =>
      import(
        /* webpackChunkName: "ManageStakeholder" */ '@/views/ManageProgram/views/ManageStakeholder.vue'
      )
  },
  {
    path: '/program',
    name: 'ProgramManage',
    component: () =>
      import(/* webpackChunkName: "ProgramManage" */ '@/views/ManageProgram/ProgramManage.vue')
  },
  {
    path: '/ListView',
    name: 'Listview',
    component: () =>
      import(/* webpackChunkName: "ListView" */ '@/views/ManageProgram/components/ListView.vue')
  },
  {
    path: '/nav',
    name: 'Nav',
    component: () =>
      import(/* webpackChunkName: "Nav" */ '@/views/ManageProgram/components/Nav.vue')
  },
  {
    path: '/explore',
    name: 'explore',
    component: () => import(/* webpackChunkName: "Explore" */ '@/views/Explore/Guide.vue'),
    meta: {
      layout: 'no-nav'
    }
  },
  {
    path: '/scope',
    name: 'scope',
    component: () => import(/* webpackChunkName: "Explore" */ '@/views/Explore/Scope.vue'),
    meta: {
      layout: 'no-nav'
    }
  },
  {
    path: '/guide/:programId/:page',
    name: 'guide',
    component: () => import(/* webpackChunkName: "Guide" */ '@/views/Guide/Guide.vue'),

    meta: {
      layout: 'no-nav',
      requiresAuth: true,
      requiresUser: true
    },

    props: route => ({
      studentId: route.query.studentId,
      programId: route.params.programId,
      page: Number(route.params.page),
      monitorOrganizerView: route.query.monitorOrganizerView === 'true',
      previewView: route.query.preview === 'true'
    })
  },
  {
    path: '/guide',
    name: 'guide:airtime',
    component: () => import(/* webpackChunkName: "Guide" */ '@/views/Guide/AirGuide.vue'),

    meta: {
      layout: 'no-nav',
      requiresAuth: true,
      requiresUser: true
    }
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: () => import(/* webpackChunkName: "Portfolio" */ '@/views/Portfolio/Portfolio.vue'),
    meta: {
      requiresAuth: true,
      requiresUser: true
    }
  },
  {
    path: '/portfolio/:component/:profile?',
    name: 'portfolio',
    component: () => import(/* webpackChunkName: "Portfolio" */ '@/views/Portfolio/Portfolio.vue'),
    meta: {
      requiresAuth: true,
      requiresUser: true
    }
  },
  {
    path: '/invite/:slug',
    name: 'invitation',
    component: () =>
      import(/* webpackChunkName: "Invite" */ '@/views/Portfolio/views/GlobalInvitation.vue'),
    meta: {
      layout: 'no-nav'
    }
  },
  {
    path: '/setup',
    name: 'setup',
    component: () => import(/* webpackChunkName: "Setup" */ '@/views/Portfolio/SetupPortfolio.vue'),
    meta: {
      layout: 'no-nav',
      requiresAuth: true
    },
    async beforeEnter(to, from, next) {
      const { getId } = useUserGetters(['getId']);
      await apolloProvider.defaultClient
        .query<{ user: User }>({
          query: SETUP_ROUTE_USER,
          variables: {
            query: { _id: getId.value } as UserQueryInput
          }
        })
        .then(({ data: { user } }) => {
          if (user)
            apolloProvider.defaultClient
              .query<{
                employerPortfolio: EmployerPortfolio;
                organizerPortfolio: OrganizerPortfolio;
                parentPortfolio: ParentPortfolio;
                schoolPortfolio: SchoolPortfolio;
                studentPortfolio: StudentPortfolio;
                teacherPortfolio: TeacherPortfolio;
              }>({
                query: ALL_PORTFOLIOS,
                variables: {
                  id: getId.value
                }
              })
              .then(({ data }) => {
                if (user.userTypes?.every(type => data[type!])) {
                  next({
                    name: 'portfolio'
                  });
                } else next();
              });
        });
      next(() => {});
    }
  },
  {
    path: '/balanceview',
    name: 'balanceview',
    component: () =>
      import(/* webpackChunkName: "BalanceView" */ '@/views/Portfolio/BalanceView.vue')
  },
  {
    path: '/create-program',
    name: 'createProgram',
    component: () => import(/* webpackChunkName: "CreateProgram" */ '@/views/CreateProgram.vue'),
    meta: {
      requiresAuth: true,
      requiresUser: true
    }
  },
  {
    path: '/timeline',
    name: 'timeline',
    component: () => import(/* webpackChunkName: "Timeline" */ '@/components/Timeline.vue')
  },
  {
    path: '/login/:page?',
    name: 'login',
    component: () => import(/* webpackChunkName: "Login" */ '@/views/Login.vue'),
    meta: {
      layout: 'no-nav'
    },
    beforeEnter(to, from, next) {
      const { user } = useDbState(['user']);
      if (!user.value) next();
      else next({ name: 'login' });
    }
  },
  {
    path: '/signup/:page?',
    name: 'signup',
    component: () => import(/* webpackChunkName: "Signup" */ '@/views/Signup.vue'),
    meta: {
      layout: 'no-nav',
      requiresAuth: false,
      requiresUser: false
    },
    beforeEnter(to, from, next) {
      const { user } = useDbState(['user']);
      if (!user.value) next();
      else next({ name: 'portfolio' });
    }
  },
  {
    path: '/',
    name: 'landing',
    component: () => import(/* webpackChunkName: "Landing" */ '@/views/Landing.vue'),
    meta: {
      layout: 'no-nav'
    }
  },

  {
    path: '/ecc2022',
    name: 'Ecc2022',
    component: () => import(/* webpackChunkName: "Landing" */ '@/views/Ecc2022.vue'),
    meta: {
      layout: 'no-nav'
    }
  },

  {
    path: '/stemday',
    name: 'StemDay',
    component: () => import(/* webpackChunkName: "Landing" */ '@/views/StemDay.vue'),
    meta: {
      layout: 'no-nav'
    }
  },
  {
    path: '/employer',
    name: 'EmployerLanding',
    component: () => import(/* webpackChunkName: "Landing" */ '@/views/EmployerLanding.vue'),
    meta: {
      layout: 'no-nav'
    }
  },

  {
    path: '/help/employer',
    name: 'EmployerHelpLanding',
    component: () => import(/* webpackChunkName: "Landing" */ '@/views/EmployerHelpLanding.vue'),
    meta: {
      layout: 'no-nav'
    }
  },
  {
    path: '/teacher',
    name: 'TeacherLanding',
    component: () => import(/* webpackChunkName: "Landing" */ '@/views/TeacherLanding.vue'),
    meta: {
      layout: 'no-nav'
    }
  },
  {
    path: '/help/teacher',
    name: 'TeacherHelpLanding',
    component: () => import(/* webpackChunkName: "Landing" */ '@/views/TeacherHelpLanding.vue'),
    meta: {
      layout: 'no-nav'
    }
  },
  {
    path: '/student',
    name: 'StudentLanding',
    component: () => import(/* webpackChunkName: "Landing" */ '@/views/StudentLanding.vue'),
    meta: {
      layout: 'no-nav'
    }
  },
  {
    path: '/help/student',
    name: 'StudentHelpLanding',
    component: () => import(/* webpackChunkName: "Landing" */ '@/views/StudentHelpLanding.vue'),
    meta: {
      layout: 'no-nav'
    }
  },
  {
    path: '/parent',
    name: 'ParentLanding',
    component: () => import(/* webpackChunkName: "Landing" */ '@/views/ParentLanding.vue'),
    meta: {
      layout: 'no-nav'
    }
  },
  {
    path: '/school',
    name: 'SchoolLanding',
    component: () => import(/* webpackChunkName: "Landing" */ '@/views/SchoolLanding.vue'),
    meta: {
      layout: 'no-nav'
    }
  },
  {
    path: '/partner',
    name: 'PartnerLanding',
    component: () => import(/* webpackChunkName: "Landing" */ '@/views/PartnerLanding.vue'),
    meta: {
      layout: 'no-nav'
    }
  },
  {
    path: '/sponsor',
    name: 'SponsorLanding',
    component: () => import(/* webpackChunkName: "Landing" */ '@/views/SponsorLanding.vue'),
    meta: {
      layout: 'no-nav'
    }
  },
  {
    path: '/alumni',
    name: 'Alumni',
    component: () => import(/* webpackChunkName: "Landing" */ '@/views/Alumni.vue'),
    meta: {
      layout: 'no-nav'
    }
  },

  // EVENTS 2022

  {
    path: '/airtime2022',
    name: 'Airtime2022',
    component: () => import(/* webpackChunkName: "Landing" */ '@/views/Airtime2022.vue'),
    meta: {
      layout: 'no-nav'
    }
  },

  {
    path: '/getsponsored',
    name: 'ApproveSponsor',
    component: () => import('@/views/ApproveSponsor.vue'),
    meta: {
      requiresAuth: true,
      layout: 'no-nav'
    }
  },
  {
    path: '/mobile',
    name: 'Mobile',
    component: () => import('@/views/Mobile.vue'),
    meta: {
      requiresAuth: true,
      layout: 'no-nav'
    }
  },

  {
    path: '/monitor-internship',
    name: 'MobileEmployer',
    component: () => import('@/views/MobileEmployer.vue'),
    meta: {
      requiresAuth: true,
      layout: 'no-nav'
    }
  },

  {
    path: '/sponsor/:shareCode',
    name: 'Sponsor',
    component: () => import(/* webpackChunkName: "Guide" */ '@/views/Explore/Guide.vue'), // ! change this explore programs!!
    meta: {
      layout: 'no-nav'
    }
  },
  {
    path: '/invite/:schoolName',
    name: 'invite',
    component: () => import(/* webpackChunkName: "Invite" */ '@/views/Invite.vue'),
    props: true,
    meta: {
      layout: 'no-nav'
    }
  },

  {
    path: '/invites/:partnerName',
    name: 'partnerInvite',
    component: () => import(/* webpackChunkName: "Invite" */ '@/views/PartnerInvite.vue'),
    props: true,
    meta: {
      layout: 'no-nav'
    }
  },
  {
    path: '/emailconfirmation',
    name: 'confirmEmail',
    component: () => import(/* webpackChunkName: "ConfirmEmail" */ '@/views/ConfirmEmail.vue'),
    props: route => ({
      token: route.query.token,
      tokenId: route.query.tokenId,
      username: route.query.username
    })
  },
  {
    path: '/changepassword',
    name: 'passwordChange',
    component: () => import(/* webpackChunkName: "ChangePassword" */ '@/views/ChangePassword.vue')
  },
  {
    path: '/discordconfirmation',
    name: 'confirmDiscord',
    component: () => import(/* webpackChunkName: "ConfirmDiscord" */ '@/views/ConfirmDiscord.vue'),
    props: route => ({
      code: route.query.code
    }),
    meta: {
      layout: 'no-nav',
      requiresAuth: true
    }
  },
  {
    path: '/password-reset',
    name: 'resetPassword',
    component: () => import(/* webpackChunkName: "ResetPassword" */ '@/views/ResetPassword.vue'),
    props: route => ({
      token: route.query.token,
      tokenId: route.query.tokenId
    })
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/Error404.vue')
  },
  {
    path: '/authRequired',
    name: 'authError',
    component: () => import(/* webpackChunkName: "ErrorLogin" */ '@/views/ErrorLogin.vue')
  },
  {
    path: '/testroute',
    name: 'TestRoute',
    component: () => import(/* webpackChunkName: "TestRoute" */ '@/views/TestRoute.vue')
  },
  {
    path: '/testroute2',
    name: 'TestRoute2',
    component: () => import(/* webpackChunkName: "TestRoute2" */ '@/views/TestRoute2.vue')
  }
];

export default routes;
