import { mount } from 'svelte';
import App from './App.svelte';
import './styles/global.scss';

mount(App, {
  target: document.getElementById('app')
});

