import HomePage from './pages/home.vue';
import AboutPage from './pages/about.vue';
import FormPage from './pages/form.vue';
import DynamicRoutePage from './pages/dynamic-route.vue';
import NotFoundPage from './pages/not-found.vue';
import SignIn from './authentication/sign-in.vue'
import SignUp from './authentication/sign-up.vue'
import Signout from './authentication/sign-out';
import Initiate from './pages/Initiate'

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
    path: '/sign-out/',
    component: Signout
  },
  {
    path: '/initiate/',
    component: Initiate
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
