import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export async function getPostsFromDB(email) {
    const querySnapshot = await getDocs(collection(db, email));
    const posts = [];
    querySnapshot.forEach((doc) => {
        posts.push(doc.data());
    });
    return posts;
}
