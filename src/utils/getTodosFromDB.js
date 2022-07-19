import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export async function getTodosFromDB(email) {
    const querySnapshot = await getDocs(collection(db, email));
    const todos = [];
    querySnapshot.forEach((doc) => {
        const todo = {
            ...doc.data(),
            docId: doc._key.path.segments[doc._key.path.segments.length - 1],
        };
        todos.push(todo);
    });
    return todos;
}
