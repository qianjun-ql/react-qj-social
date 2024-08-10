import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatIcon from "@mui/icons-material/Chat";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useDispatch, useSelector } from "react-redux";
import { createCommentAction } from "../../Redux/Comment/comment.action";
import { likePostAction, savePostAction } from "../../Redux/Post/post.action";
import { isLikedByReqUser } from "../../utils/isLikedByReqUser";
import { getUserSavedPosts } from "../../Redux/Auth/auth.action";

const PostCard = ({ item, isProfile }) => {
  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const post = useSelector((state) => state.post);
  const savedPosts = auth.savedPosts;
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (auth.user && auth.user.id) {
      dispatch(getUserSavedPosts(auth.user.id));
    }
  }, [dispatch, auth.user]);

  useEffect(() => {
    setIsSaved(savedPosts.some((post) => post.id === item.id));
  }, [savedPosts, item.id]);

  const handleShowComments = () => setShowComments(!showComments);

  const handleCreateComment = (content) => {
    const reqData = {
      postId: item?.id,
      data: {
        content,
      },
      userId: item.user.id,
    };

    dispatch(createCommentAction(reqData, isProfile));
  };

  const handleLikePost = () => {
    dispatch(likePostAction(item.id));
  };

  const handleSavePost = async () => {
    await dispatch(savePostAction(item.id));
    setIsSaved((prevState) => !prevState);
    console.log("Is post saved:", item.id);
  };

  return (
    <Card className="">
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            src={item.user?.profilePhoto || "defaultImageURL"}
          ></Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={item.user.firstName + " " + item.user.lastName}
        subheader={
          "@" +
          item.user.firstName.toLowerCase() +
          "_" +
          item.user.lastName.toLowerCase()
        }
      />
      <img
        className="w-full max-h-[30rem] object-cover object-top"
        src={item.image}
        alt=""
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {item.caption}
        </Typography>
      </CardContent>

      <CardActions className="flex justify-between" disableSpacing>
        <div>
          <IconButton onClick={handleLikePost}>
            {auth.user && isLikedByReqUser(auth.user.id, item) ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <IconButton>
            <ShareIcon />
          </IconButton>
          <IconButton onClick={handleShowComments}>
            <ChatIcon />
          </IconButton>
        </div>
        <div>
          <IconButton onClick={handleSavePost}>
            {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </div>
      </CardActions>

      {showComments && (
        <section>
          <div className="flex items-center space-x-5 mx-3 my-5">
            <Avatar />
            <input
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleCreateComment(e.target.value);
                }
              }}
              className="w-full outline-none bg-transparent border border-[#3b4054] rounded-full px-5 py-2 "
              placeholder="Please write your comment"
              type="text"
            />
          </div>
          <Divider />

          <div className="mx-3 space-y-2 my-5 text-xs ">
            {item.commentList?.map((comment, index) => (
              <div key={index} className="flex items-center space-x-5 ">
                <Avatar
                  sx={{ height: "2rem", width: "2rem", fontSize: ".8rem" }}
                >
                  {comment.user.firstName[0]}
                </Avatar>

                <p>{comment.content}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </Card>
  );
};

export default PostCard;
