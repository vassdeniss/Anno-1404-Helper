import { loadConfig } from '../data/config.js';
import { html } from '../lib/lit-html.js';
import { until } from '../lib/directives/until.js';

let config = null;

export function icon(name, ...classList) {
  return until(
    resolveIcon(46, name, classList),
    iconTemplate(46, 15, 13, classList)
  );
}

export function smallIcon(name, ...classList) {
  return until(
    resolveIcon(23, name, ['small', ...classList]),
    iconTemplate(23, 15, 13, ['small', ...classList])
  );
}

async function resolveIcon(gridSize, name, classList) {
  if (config === null) {
    config = loadConfig('icons');
  }

  let data = (await config)[name];
  if (!data) {
    data = (await config).missing;
  }

  return iconTemplate(gridSize, data[0], data[1], classList);
}

export const iconTemplate = (gridSize, x, y, classList) => html` <span
  class="icon ${classList.join(' ')}"
  style="background-position: -${x * gridSize}px -${y * gridSize}px"
></span>`;

const loader = document.createElement('div');
loader.classList.add('spinner-overlay');
//! Bad idea, exception
loader.innerHTML = `<div class="spinner-container">
    <div class="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</div>`;

export function mask() {
  document.body.appendChild(loader);
}

export function unmask() {
  loader.remove();
}
