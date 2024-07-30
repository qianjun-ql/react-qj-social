// import {
//   Avatar,
//   Card,
//   CardActions,
//   CardContent,
//   CardHeader,
//   CardMedia,
//   Divider,
//   IconButton,
//   Typography,
// } from "@mui/material";
// import React, { useState } from "react";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { red } from "@mui/material/colors";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import ShareIcon from "@mui/icons-material/Share";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import ChatIcon from "@mui/icons-material/Chat";
// import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
// import BookmarkIcon from "@mui/icons-material/Bookmark";
// import { useDispatch, useSelector } from "react-redux";
// // import { createCommentAction } from "../../Redux/Post/post.action";
// import { createCommentAction } from "../../Redux/Comment/comment.action";
// import { likePostAction } from "../../Redux/Post/post.action";
// import { isLikedByReqUser } from "../../utils/isLikedByReqUser";

// const PostCard = ({ item }) => {
//   const [showComments, setShowComments] = useState(false);
//   const handleShowComments = () => setShowComments(!showComments);
//   const dispatch = useDispatch();
//   // const post = useSelector((state) => state.post);
//   // const auth = useSelector((state) => state.auth);
//   const { post, auth } = useSelector((store) => store);

//   const handleCreateComment = (content) => {
//     const reqData = {
//       postId: item?.id,
//       data: {
//         content,
//       },
//     };

//     dispatch(createCommentAction(reqData));
//   };

//   const handleLikePost = () => {
//     dispatch(likePostAction(item.id));
//   };

//   return (
//     <Card className="">
//       <CardHeader
//         avatar={
//           <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
//             R
//           </Avatar>
//         }
//         action={
//           <IconButton aria-label="settings">
//             <MoreVertIcon />
//           </IconButton>
//         }
//         title={item.user.firstName + " " + item.user.lastName}
//         subheader={
//           "@" +
//           item.user.firstName.toLowerCase() +
//           "_" +
//           item.user.lastName.toLowerCase()
//         }
//       />
//       {/* <CardMedia
//         component="img"
//         height="194"
//         image={item.image}
//         // video={item.video}
//         alt="Paella dish"
//       /> */}
//       <img
//         className="w-full max-h-[30rem] object-cover object-top"
//         src={item.image}
//         alt=""
//       />
//       <CardContent>
//         <Typography variant="body2" color="text.secondary">
//           {item.caption}
//         </Typography>
//       </CardContent>

//       <CardActions className="flex justify-between" disableSpacing>
//         <div>
//           <IconButton onClick={handleLikePost}>
//             {isLikedByReqUser(auth.user.id, item) ? (
//               <FavoriteIcon />
//             ) : (
//               <FavoriteBorderIcon />
//             )}
//           </IconButton>
//           <IconButton>
//             <ShareIcon />
//           </IconButton>
//           <IconButton onClick={handleShowComments}>
//             <ChatIcon />
//           </IconButton>
//         </div>
//         <div>
//           <IconButton>
//             {false ? <BookmarkIcon /> : <BookmarkBorderIcon />}
//           </IconButton>
//         </div>
//       </CardActions>

//       {showComments && (
//         <section>
//           <div className="flex items-center space-x-5 mx-3 my-5">
//             <Avatar sx={{}} />
//             <input
//               onKeyPress={(e) => {
//                 if (e.key == "Enter") {
//                   handleCreateComment(e.target.value);
//                   console.log("enter pressed----", e.target.value);
//                 }
//               }}
//               className="w-full outline-none bg-transparent border border-[#3b4054] rounded-full px-5 py-2 "
//               placeholder="Please write your comment"
//               type="text"
//             />
//           </div>
//           <Divider />

//           <div className="mx-3 space-y-2 my-5 text-xs ">
//             {item.commentList?.map((comment) => (
//               <div className="flex items-center space-x-5 ">
//                 <Avatar
//                   sx={{ height: "2rem", width: "2rem", fontSize: ".8rem" }}
//                 >
//                   {comment.user.firstName[0]}
//                 </Avatar>

//                 <p>{comment.content}</p>
//               </div>
//             ))}
//           </div>
//         </section>
//       )}
//     </Card>
//   );
// };

// export default PostCard;

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
import { likePostAction } from "../../Redux/Post/post.action";
import { isLikedByReqUser } from "../../utils/isLikedByReqUser";

const PostCard = ({ item }) => {
  const [showComments, setShowComments] = useState(false);
  const handleShowComments = () => setShowComments(!showComments);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("PostCard rendered with item:", item);
    console.log("Auth state:", auth);
  }, [item, auth]);

  const handleCreateComment = (content) => {
    console.log("Creating comment with content:", content);
    const reqData = {
      postId: item?.id,
      data: {
        content,
      },
    };

    dispatch(createCommentAction(reqData));
  };

  const handleLikePost = () => {
    console.log("Liking post with ID:", item.id);
    dispatch(likePostAction(item.id));
  };

  if (!item) {
    console.log("PostCard received undefined item prop");
    return null;
  }

  if (!item.user) {
    console.log("PostCard received item without user:", item);
    return null;
  }

  return (
    <Card className="">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {item.user.firstName[0]}
          </Avatar>
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
          <IconButton>
            {false ? <BookmarkIcon /> : <BookmarkBorderIcon />}
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
                  console.log("enter pressed----", e.target.value);
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
