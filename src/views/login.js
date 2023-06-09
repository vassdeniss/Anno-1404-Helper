import { login } from '../data/auth.js';
import { html, nothing } from '../lib/lit-html.js';
import { createSubmitHandler } from '../util.js';

export function renderLogin(ctx) {
  update();

  function update(formData, error) {
    ctx.render(loginTemplate(createSubmitHandler(onLogin), formData, error));
  }

  async function onLogin({ username, password }) {
    try {
      if (!username || !password) {
        throw {
          message: 'All fields are required!',
        };
      }

      await login(username, password);

      ctx.page.redirect('/settings');
    } catch (error) {
      update({ username }, error.message);
      error.handled = true;
    }
  }
}

const loginTemplate = (onLogin, formData = {}, error) =>
  html`<h1>Login</h1>
    <section class="main">
      <form @submit=${onLogin}>
        ${error ? html`<p class="error">${error}</p>` : nothing}
        <div class="layout">
          <label for="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            .value=${formData.username || ''}
          />
          <label for="password">Password</label>
          <input id="password" type="password" name="password" />
        </div>
        <button class="btn form-row action">Sign In</button>
      </form>
      <div class="box label">
        Don't have an account? <a class="link" href="./register">Sign up here</a>
      </div>
    </section>`;
