export const renderRegisModal = () => {
  return `
      <div class="modal profile">
        <h2 class="modal-title">Регестрація</h2>
        <form class="modal-form" id="regis-form">
          <label class="modal-label">
            Нікнейм
            <input id="regis-nick" required placeholder="Solada52" type="text" class="modal-input" />
          </label>
          <label class="modal-label">
            Пошта
            <input required id="regis-email"
              placeholder="solada52@gmail.com"
              type="email"
              class="modal-input"
            />
          </label>
          <label class="modal-label">
            Аватарка
            <input required id="regis-avatar"
              placeholder="https://solada52"
              type="text"
              class="modal-input"
            />
          </label>
          <label class="modal-label">
            Пароль
            <input id="regis-password" required placeholder="********" type="password" class="modal-input" />
          </label>
          <p id="regis-alert" class="modal-alert"></p>
          <button type="submit" class="modal-submit">Зареєструватись</button>
        </form>
        <button id="close" class="modal-close">x</button>
      </div>`
}