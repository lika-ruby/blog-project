export const addObject = async (endPoint, objectToAdd) => {
    const options = {
        method: "POST",
        body: JSON.stringify(objectToAdd),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },

    };
    try {
        return await fetch(`https://680dfed9c47cb8074d91bfe0.mockapi.io/api/blog-project/${endPoint}`, options)
    } catch (error) {
        return error
    }
}