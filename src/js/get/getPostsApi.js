export const getPosts = async (page) => {
    try {
        return await fetch(`https://680dfed9c47cb8074d91bfe0.mockapi.io/api/blog-project/posts?limit=4&page=${page}`).
            then(response => response.json())
    } catch (error) {
        return error
    }
}