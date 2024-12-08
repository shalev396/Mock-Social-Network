import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import Header from './Header';
import Body from './Body';

const Post = ({ post, showBackButton }) => {
  const navigate = useNavigate(); // Move useNavigate inside the component
  const user = useSelector((state) => state.auth.user); // Access user from Redux state
  const isLiked = post.likes.includes(user._id);

  return (
    <div className="post-container">
      {showBackButton && (
        <div className="flex items-center justify-between pt-1">
          <button onClick={() => navigate(-1)}>
            <ChevronLeftIcon className="size-9 text-gray-500 flex-none" />
          </button>
          <h1 className="text-1.5xl text-center flex-grow pr-5">Post</h1>
        </div>
      )}
      <Header
        authorName={post.author.username}
        profilePic={post.author.profilePic}
        media={post.media}
      />
      <Body
        authorName={post.author.username}
        commentsCount={post.commentsCount}
        initialLikes={post.likes.length}
        isLikedByMe={isLiked}
        content={post.content}
        postId={post._id}
      />
    </div>
  );
};

export default Post;
