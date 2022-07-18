import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../redux/posts/slice';
import { doc, deleteDoc } from 'firebase/firestore';

import { db } from '../firebase';

import MyButton from './UI/MyButton';
import { userSelect } from '../redux/user/selector';

const PostItem = React.memo(({ id, title, body, docId }) => {
    const dispatch = useDispatch();
    const { email } = useSelector(userSelect);

    const handleClick = async () => {
        dispatch(deletePost(id));
        await deleteDoc(doc(db, email, docId));
    };

    return (
        <div className="post__wrapper">
            <div>
                <h3>{title}</h3>
                <p>{body}</p>
            </div>
            <div>
                <MyButton handleClick={handleClick}>Delete</MyButton>
            </div>
        </div>
    );
});

export default PostItem;
