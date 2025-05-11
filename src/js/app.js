import { getPosts } from "./get/getPostsApi";
import { renderPosts } from "./markup/renderPostsMarkup";
import { renderPostModal } from "./markup/renderPostModalMarkup";
import postsListTemp from "./template/post.hbs"
import { getFromLocalStorage, setToLocalStorage } from "./local-host/local-host";
import { renderRegisModal } from "./markup/render profile modal/renderRegisModalMarkup";
import { renderLoginModal } from "./markup/render profile modal/renderLoginModalMarkup";
import { addObject } from "./functions/add-object";
import { updateObject } from "./functions/update-object";
import { getUsers } from "./get/getUsersApi";
import { getUsers } from "./get/getUsersApi";
import { renderAddModal } from "./markup/rederAddModal";
import { renderUpdateModal } from "./markup/renderUpdateModal";
import { deleteObject } from "./functions/delete-object";
import { renderAddCommentModal } from "./markup/renderAddCommentModalMarkup";
import { getPost } from "./get/getPost";
import { getUser } from "./get/getUser";
import { findCountriesByLetters } from "./functions/findCountriesByLetters";
import { getPostsAll } from "./get/getPostsAllApi";

const mainListElem = document.querySelector("#main-list")
const backdrop = document.querySelector(".backdrop")
const backdropComm = document.querySelector(".backdrop-comm")
const bodyELem = document.querySelector("body")
const loadMoreBtn = document.querySelector("#load-btn")
const regisOpenBtn = document.querySelector("#header-regis")
const loginOpenBtn = document.querySelector("#header-login")
const logoutBtn = document.querySelector("#header-logout")
const addOpenBtn = document.querySelector("#header-add")
const mainInput = document.querySelector("#main-input")

const keyPage = "page"
const keyLogin = "login"
const keyIDProfile = "idProfile"

let page = 1
if (Object.keys(localStorage).includes(keyPage)) {
    page = Number.parseInt(getFromLocalStorage(keyPage))
}

for (let i = 0; i < page; i += 1) {
    getPosts(i + 1).then((posts) => {
        mainListElem.insertAdjacentHTML("beforeend", renderPosts(posts, postsListTemp))
    })
}

if (getFromLocalStorage(keyLogin) === true) {
    bodyELem.classList.add("login")
    const userId = getFromLocalStorage(keyIDProfile)
    getUsers().then((users) => {
        for (const user of users) {
            if (userId === user.id) {
                document.querySelector("#header-avatar").src = user.avatar
            }
        }
    })
} else {
    bodyELem.classList.remove("login")

}


mainListElem.addEventListener("click", async (e) => {
    if (e.target.classList.contains("go")) {
        const itemElem = e.target.closest("li")
        await getPost(itemElem.id).then((post) => {
            backdrop.innerHTML = renderPostModal(post)
            backdrop.id = post.id
        })
        backdrop.classList.remove("is-hidden")
        bodyELem.classList.add("no-scroll")
    }
})

backdrop.addEventListener("click", (e) => {
    if (e.target.id === "close") {
        backdrop.innerHTML = "";
        backdrop.classList.add("is-hidden");
        bodyELem.classList.remove("no-scroll");
    }
});

loadMoreBtn.addEventListener("click", async () => {
    page += 1
    setToLocalStorage(keyPage, page)
    await getPosts(page).then((posts) => {
        mainListElem.insertAdjacentHTML("beforeend", renderPosts(posts, postsListTemp))
    })
})

regisOpenBtn.addEventListener("click", () => {
    backdrop.innerHTML = renderRegisModal()
    backdrop.classList.remove("is-hidden")
    bodyELem.classList.add("no-scroll")
})

loginOpenBtn.addEventListener("click", () => {
    backdrop.innerHTML = renderLoginModal()
    backdrop.classList.remove("is-hidden")
    bodyELem.classList.add("no-scroll")
})

backdrop.addEventListener("submit", async (e) => {
    if (e.target.id === "regis-form") {
        e.preventDefault()
        const regisNick = document.querySelector("#regis-nick")
        const regisEmail = document.querySelector("#regis-email")
        const regisAvatar = document.querySelector("#regis-avatar")
        const regisPassword = document.querySelector("#regis-password")
        const alertText = document.querySelector("#regis-alert")
        alertText.textContent = ""
        await getUsers().then(async (users) => {
            for (const user of users) {
                if (user.nickname === regisNick.value) {
                    alertText.textContent = "Такий нікнейм вже є..."
                    return
                } else {
                    if (user.email === regisEmail.value) {
                        alertText.textContent = "Така пошта вже є..."
                        return
                    } else {
                        backdrop.classList.add("is-hidden");
                        bodyELem.classList.remove("no-scroll");
                        bodyELem.classList.add("login");
                        setToLocalStorage(keyLogin, true)
                        const profile = {
                            nickname: regisNick.value,
                            email: regisEmail.value,
                            avatar: regisAvatar.value,
                            password: regisPassword.value,
                        }
                        await addObject("users", profile)
                        setToLocalStorage(keyIDProfile, user.id)

                        document.querySelector("#header-avatar").src = regisAvatar.value
                        backdrop.innerHTML = "";
                    }
                }
            }
        })
    }
})

backdrop.addEventListener("submit", async (e) => {
    if (e.target.id === "login-form") {
        e.preventDefault()
        const loginEmail = document.querySelector("#login-email")
        const loginPassword = document.querySelector("#login-password")
        const alertText = document.querySelector("#login-alert")
        alertText.textContent = ""
        await getUsers().then((users) => {
            for (const user of users) {
                if (user.email !== loginEmail.value) {
                    alertText.textContent = "Такої пошта немає..."


                } else {
                    if (user.password !== loginPassword.value) {
                        alertText.textContent = "Неправильний пароль..."
                        return
                    } else {
                        backdrop.classList.add("is-hidden");
                        bodyELem.classList.remove("no-scroll");
                        bodyELem.classList.add("login");
                        setToLocalStorage(keyLogin, true)
                        document.querySelector("#header-avatar").src = user.avatar
                        setToLocalStorage(keyIDProfile, user.id)
                        backdrop.innerHTML = "";
                    }
                }
            }
        })
    }
})

logoutBtn.addEventListener("click", () => {
    setToLocalStorage(keyLogin, false)
    bodyELem.classList.remove("login");

})

addOpenBtn.addEventListener("click", () => {
    backdrop.innerHTML = renderAddModal()
    backdrop.classList.remove("is-hidden")
    bodyELem.classList.add("no-scroll")
})

backdrop.addEventListener("submit", async (e) => {
    if (e.target.id === "add-form") {
        e.preventDefault()
        const addTitle = document.querySelector("#add-title")
        const addText = document.querySelector("#add-text")
        const addTag = document.querySelector("#add-tag")
        const idUser = getFromLocalStorage(keyIDProfile)
        console.log("1234567890")

        await getUser(idUser).then(async (user) => {
            console.log(user)
            if (idUser === user.id) {
                backdrop.classList.add("is-hidden");
                bodyELem.classList.remove("no-scroll");
                backdrop.innerHTML = "";
                const post = {
                    name: user.nickname,
                    email: user.email,
                    avatar: user.avatar,
                    password: user.password,
                    createdAt: new Date().toISOString(),
                    title: addTitle.value,
                    text: addText.value,
                    tag: addTag.value,
                    comments: []
                }
                console.log(post)

                await addObject("posts", post)
                mainListElem.innerHTML = ""
                for (let i = 0; i < page; i += 1) {
                    await getPosts(i + 1).then(async (posts) => {
                        mainListElem.insertAdjacentHTML("beforeend", await renderPosts(posts, postsListTemp))
                    })
                }
            }


        })
    }
})

mainListElem.addEventListener("click", async (e) => {
    if (e.target.classList.contains("update")) {
        backdrop.innerHTML = renderUpdateModal()
        const updateTitle = document.querySelector("#update-title")
        const updateText = document.querySelector("#update-text")
        const updateTag = document.querySelector("#update-tag")

        for (let i = 0; i < page; i += 1) {
            await getPosts(i + 1).then((posts) => {
                for (const post of posts) {
                    if (e.target.closest("li").id === post.id) {
                        updateTitle.value = post.title
                        updateText.value = post.text
                        updateTag.value = post.tag
                    }
                }
            })
        }
        backdrop.id = e.target.closest("li").id
        backdrop.classList.remove("is-hidden")
        bodyELem.classList.add("no-scroll")
    }
})

backdrop.addEventListener("submit", async (e) => {
    if (e.target.id === "update-form") {
        e.preventDefault()
        const updateTitle = document.querySelector("#update-title")
        const updateText = document.querySelector("#update-text")
        const updateTag = document.querySelector("#update-tag")
        const idPost = backdrop.id

        await getPost(idPost).then(async (post) => {

            if (idPost === post.id) {
                backdrop.classList.add("is-hidden");
                bodyELem.classList.remove("no-scroll");
                const postToChange = {
                    name: post.nickname,
                    email: post.email,
                    avatar: post.avatar,
                    password: post.password,
                    createdAt: post.createdAt,
                    title: updateTitle.value,
                    text: updateText.value,
                    tag: updateTag.value,
                    comments: post.comments
                }
                console.log(postToChange)
                backdrop.innerHTML = "";
                await updateObject("posts", postToChange, idPost)
                mainListElem.innerHTML = ""
                for (let i = 0; i < page; i += 1) {
                    await getPosts(i + 1).then(async (posts) => {
                        mainListElem.insertAdjacentHTML("beforeend", await renderPosts(posts, postsListTemp))
                    })
                }
            }
        })
    }
})

mainListElem.addEventListener("click", async (e) => {
    if (e.target.classList.contains("delete")) {
        await deleteObject("posts", e.target.closest("li").id)
        mainListElem.innerHTML = ""
        for (let i = 0; i < page; i += 1) {
            await getPosts(i + 1).then(async (posts) => {
                mainListElem.insertAdjacentHTML("beforeend", await renderPosts(posts, postsListTemp))
            })
        }
    }
})

backdrop.addEventListener("click", async (e) => {
    if (e.target.id === "comm-btn") {
        backdropComm.innerHTML = renderAddCommentModal()
        backdropComm.classList.remove("is-hidden")
        bodyELem.classList.add("no-scroll")
    }
})

backdropComm.addEventListener("click", (e) => {
    if (e.target.id === "close") {
        backdropComm.innerHTML = "";
        backdropComm.classList.add("is-hidden");
    }
});

backdropComm.addEventListener("submit", async (e) => {
    if (e.target.id === "comm-form") {
        e.preventDefault()
        const commText = document.querySelector("#comm-text")
        const idUser = getFromLocalStorage(keyIDProfile)
        const idPost = backdrop.id
        await getUser(idUser).then(async (user) => {
            await getPost(idPost).then(async (post) => {
                const postToChange = {
                    id: post.id,
                    name: post.name,
                    country: post.country,
                    avatar: post.avatar,
                    title: post.title,
                    text: post.text,
                    createdAt: post.createdAt,
                    comments: [...(post.comments || []), {
                        avatar: user.avatar,
                        nickname: user.nickname,
                        comm: commText.value
                    }],
                    isLiked: post.isLiked,
                    tag: post.tag,
                }
                await updateObject("posts", postToChange, idPost)
                backdrop.innerHTML = renderPostModal(postToChange)
            })
        })
        backdropComm.classList.add("is-hidden");
        backdropComm.innerHTML = "";
    }
})

mainInput.addEventListener("input", async () => {
    await getPostsAll().then(async (posts) => {
        const dataFiltered = findCountriesByLetters(posts, mainInput)
        mainListElem.innerHTML = await renderPosts(dataFiltered, postsListTemp)
    })
})