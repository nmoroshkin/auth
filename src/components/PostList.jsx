import React from 'react';

import PostItem from './PostItem';

const PostList = ({ posts }) => {
    return !!posts.length ? (
        posts.map((post, index) => <PostItem key={post.id} {...post} index={index + 1} />)
    ) : (
        <h2>Empty</h2>
    );
};

export default PostList;
