import React from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import Header from './Header';
import Body from './Body';

const Post = ({ post, showBackButton }) => {
  return (
    <div className="post-container">
      {showBackButton && (
        <div className="flex items-center justify-between pt-1">
          <ChevronLeftIcon className="size-9 text-gray-500 flex-none" />
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
        likes={post.likes.length}
        content={post.content}
        postId={post._id}
        // postDate={post.postDate}
      />
    </div>
  );
};

export default Post;
