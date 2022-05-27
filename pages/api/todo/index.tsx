import { v4 as uuidv4 } from 'uuid';
import db from 'firebase-config';
import {ref, set, onValue} from 'firebase/database';
import { NextApiRequest, NextApiResponse } from 'next';
import { Todo } from 'types';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    if (req.method == 'GET') {
        let data: Todo[] = [];

        await onValue(ref(db, 'todos'), (snapshot) => {
            data = Object.values(snapshot.val());
        });

        return res.status(200).json(data);

    } else if (req.method == 'POST') {
        const todo: string = req.body.todo;
        const data: any = { id: uuidv4(), todo, isCompleted: false, createdAt: Date() };

        await set(ref(db, 'todos/' + data.id), data);

        return res.status(201).json({ message: 'success' });
    }
}
  