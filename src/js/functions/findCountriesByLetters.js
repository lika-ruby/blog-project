export const findCountriesByLetters = (posts, mainInput) => {
    const filtered = posts.filter((post) => post.tag.toLowerCase().includes(mainInput.value.toLowerCase()))
    return filtered
};
