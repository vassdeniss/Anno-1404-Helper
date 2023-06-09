import { register } from '../data/auth.js';
import { html, nothing } from '../lib/lit-html.js';
import { createSubmitHandler } from '../util.js';

export function renderRegister(ctx) {
  update();

  function update(formData, error) {
    ctx.render(
      registerTemplate(createSubmitHandler(onRegister), formData, error)
    );
  }

  async function onRegister({ username, password, repass }) {
    try {
      if (!username || !password) {
        throw {
          message: 'All fields are required!',
        };
      }

      if (password !== repass) {
        throw {
          message: 'Passwords must match!',
        };
      }

      await register(username, password);

      ctx.page.redirect('/settings');
    } catch (error) {
      update({ username }, error.message);
      error.handled = true;
    }
  }
}

const registerTemplate = (onRegister, formData = {}, error) =>
  html`<h1>Register</h1>
    <section class="main">
      <form @submit=${onRegister}>
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
          <label for="repass">Repeat</label>
          <input id="repass" type="password" name="repass" />
        </div>
        <button class="btn form-row action">Sign Up</button>
      </form>
      <div class="box label">
        Already have an account? <a class="link" href="./login">Sign in here</a>
      </div>
    </section>`;
