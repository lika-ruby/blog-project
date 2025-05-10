export const renderPostModal = (post) => {
  return `
      <div class="modal post">
        <div class="modal-top">
          <div class="modal-left">
            <img class="modal-avatar" src="${post.avatar}" alt="" />
            <div class="modal-data">
              <p class="modal-nickname">${post.name}</p>
              <p class="modal-place">${post.country}</p>
              </div>
          </div>
          <div class="modal-right">
            <p class="modal-date">${post.createdAt}</p>
            <button class="modal-heart" checked="${post.isLiked}">
              ♡
            </button>
          </div>
        </div>
        <div class="modal-down">
          <h2 class="modal-subtitle">${post.title}</h2>
          <p class="modal-tag">${post.tag}</p>
          <p class="modal-text">
            ${post.text}
          </p>
          <h3 class="modal-titlecom">Коментарі</h3>
          <p class="modal-none ${isCommented(post.comments)}">Поки нема коментарів...</p>
          <ul class="modal-comments">
            ${renderList(post.comments)}
          </ul>
          <button id="comm-btn" class="modal-btn">
            Додати коментар
          </button>
        </div>
        <button id="close" class="modal-close">
          x
        </button>
    </div>`
}


const renderList = (comments) => {
  if (!Array.isArray(comments)) return '';
  let commentsList = ''
  if (comments.length !== 0) {
    comments.map(comm => {
      console.log(comm)
      commentsList +=
        `
<li class="modal-comment">
  <div class="comments-wrapper">
    <img src="${comm.avatar}" alt="" class="comments-avatar" />
    <p class="comments-name">${comm.nickname}</p>
  </div>
  <p class="comments-text">${comm.comm}</p>
</li>`
    })
  } else {
    return ""
  }


  return commentsList
}


const isCommented = (comments) => {
  if (comments.length === 0) {
    return "active"
  } else {
    return ""
  }
}