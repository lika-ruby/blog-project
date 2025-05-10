export const getUser = async (id) => {
    try {
        return await fetch(`https://680dfed9c47cb8074d91bfe0.mockapi.io/api/blog-project/users/${id}`).
            then(response => response.json())
    } catch (error) {
        return error
    }
}