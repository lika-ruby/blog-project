export const renderAddModal = () => {
  return `
      <div class="modal profile">
        <h2 class="modal-title">Створити пост</h2>
        <form class="modal-form" id="add-form">
          <label class="modal-label">
            Загаловок
            <input id="add-title" required placeholder="Why chocolate icecream is the best?" type="text" class="modal-input" />
          </label>
          <label class="modal-label">
            Один тег
            <input id="add-tag" required placeholder="ice cream" type="text" class="modal-input" />
          </label>
          <label class="modal-label">
            Текст
            <textarea required id="add-text"
              placeholder="Because, I love it..."
              type="text"
              class="modal-input modal-textarea"
            /></textarea>
          </label>
          <button type="submit" class="modal-submit">Створити</button>
        </form>
        <button id="close" class="modal-close">x</button>
      </div>`
}