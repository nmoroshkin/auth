import React from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { collection, addDoc } from 'firebase/firestore';

import { userSelect } from '../redux/user/selector';

import MyInput from '../components/UI/MyInput';
import MyButton from '../components/UI/MyButton';
import PostList from '../components/PostList';

import { deletePosts, setPost } from '../redux/posts/slice';

import { fetchPosts } from '../redux/posts/slice';
import { postSelect } from '../redux/posts/selector';

import { db } from '../firebase';
import { removeUser } from '../redux/user/slice';

const Home = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = React.useState('');
    const [body, setBody] = React.useState('');
    const { isAuth, email } = useSelector(userSelect);
    const { posts } = useSelector(postSelect);

    React.useEffect(() => {
        dispatch(fetchPosts(email));
    }, []);

    const handleLogout = () => {
        dispatch(removeUser());
        dispatch(deletePosts());
        localStorage.removeItem('user');
    };

    const handleClick = async () => {
        const post = {
            id: Date.now(),
            title,
            body,
        };
        setTitle('');
        setBody('');
        try {
            const docRef = await addDoc(collection(db, email), {
                ...post,
            });
            dispatch(setPost({ ...post, docId: docRef.id }));
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    if (!isAuth) {
        return <Navigate to="/login" replace={true} />;
    }

    return (
        <div>
            <h1>Home</h1>
            <button onClick={handleLogout}>logout</button>
            <MyInput placeholder="title" value={title} changeValue={(value) => setTitle(value)} />
            <MyInput
                placeholder="description"
                value={body}
                changeValue={(value) => setBody(value)}
            />
            <MyButton handleClick={handleClick}>add</MyButton>
            <PostList posts={posts} />
        </div>
    );
};

export default Home;
