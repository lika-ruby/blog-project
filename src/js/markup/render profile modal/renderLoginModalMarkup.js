export const renderLoginModal = () => {
    return `
      <div class="modal profile">
        <h2 class="modal-title">Входження</h2>
        <form class="modal-form" id="login-form">
          <label class="modal-label">
            Пошта
            <input required id="login-email"
              placeholder="solada52@gmail.com"
              type="email"
              class="modal-input"
            />
          </label>
          <label class="modal-label">
            Пароль
            <input id="login-password" required placeholder="********" type="password" class="modal-input" />
          </label>
          <p id="login-alert" class="modal-alert"></p>
          <button type="submit" class="modal-submit">Увійти</button>
        </form>
        <button id="close" class="modal-close">x</button>
      </div>`
}