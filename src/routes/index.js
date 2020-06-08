import Home from './Home.svelte';
import User from './User.svelte';


const routes = [
  { path: '/', component: Home, label: 'Home' },
  { path: '/user', component: User, label: 'User' },
];


export default routes;
