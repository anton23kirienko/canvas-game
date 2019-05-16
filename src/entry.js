import insertMain from './components/main/main.js';
import { insertLoader, loadRecources, postProcessLoader } from './components/loader/loader.js';

window.addEventListener('load', e => {
  insertMain();
  insertLoader();
  loadRecources().then(() => postProcessLoader());
}, false);

