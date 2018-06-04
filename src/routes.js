import HomePage from './pages/home.vue';
import AboutPage from './pages/about.vue';
import FormPage from './pages/form.vue';
import DynamicRoutePage from './pages/dynamic-route.vue';
import NotFoundPage from './pages/not-found.vue';
import SignIn from './pages/sign-in.vue'
import SignUp from './pages/sign-up.vue'

import PanelLeftPage from './pages/panel-left.vue';
import PanelRightPage from './pages/panel-right.vue';


import join from './pages/join-group.vue'

export default [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/sign-in/',
    component: SignIn,
  },
  {
    path: '/sign-up/',
    component: SignUp,
  },
  {
    path: '/panel-left/',
    component: PanelLeftPage,

  },
  {
    path: '/panel-right/',
    component: PanelRightPage,
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/form/',
    component: FormPage,
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  },
  {
    path: '/j/',
    component: join ,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];
