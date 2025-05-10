export const getPost = async (id) => {
    try {
        return await fetch(`https://680dfed9c47cb8074d91bfe0.mockapi.io/api/blog-project/posts/${id}`).
            then(response => response.json())
    } catch (error) {
        return error
    }
}