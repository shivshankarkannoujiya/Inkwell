export const isAuthor = (post, user) => {
    if (!post || !user) return false;
    return post.author.toString() === user?._id.toString();
};
