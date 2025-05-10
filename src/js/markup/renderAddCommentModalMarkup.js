export const renderAddCommentModal = () => {
    return `
      <div class="modal profile">
        <h2 class="modal-title">Додати коментар</h2>
        <form class="modal-form" id="comm-form">
          <label class="modal-label">
            Текст
            <textarea required id="comm-text"
              placeholder="Oh, your posts are always interesting..."
              type="text"
              class="modal-input modal-textarea"
            /></textarea>
          </label>
          <button type="submit" class="modal-submit">Додати</button>
        </form>
        <button id="close" class="modal-close">x</button>
      </div>`
}