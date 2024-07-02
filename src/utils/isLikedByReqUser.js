export const isLikedByReqUser = (reqUserId, post) => {
  for (let user of post.likedList) {
    if (reqUserId === user.id) {
      return true;
    }
  }
  return false;
};
