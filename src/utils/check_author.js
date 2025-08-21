export const isAuthor = (post, user) => {
    if (!post || !user) return false;
    return post.user?.toString() === user?._id?.toString();
};
