export const updateObject = async (endPoint, objectToUpdate, id) => {
    const options = {
        method: "PUT",
        body: JSON.stringify(objectToUpdate),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
    };
    try {
        return await fetch(`https://680dfed9c47cb8074d91bfe0.mockapi.io/api/blog-project/${endPoint}/${id}`, options)
    } catch (error) {
        return error
    }
}