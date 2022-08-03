import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Todo } from '../redux/todos/slice';

export async function getTodosFromDB(email: string): Promise<Todo[]> {
    const querySnapshot = await getDocs(collection(db, email));
    const todos: Todo[] = [];
    querySnapshot.forEach((doc: any) => {
        const todo = {
            ...doc.data(),
            docId: doc._key.path.segments[doc._key.path.segments.length - 1],
        };
        todos.push(todo);
    });
    return todos;
}
