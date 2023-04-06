import { render } from '../lib/lit-html.js';
import { layoutTemplate } from '../views/layout.js';

const root = document.getElementById('content');

export function addRender(ctx, next) {
  ctx.render = renderView.bind(ctx);

  next();
}

function renderView(content) {
  const tab = this?.pathname;
  const islands = this?.islands || [];

  render(layoutTemplate(tab, islands, content), root);
}
