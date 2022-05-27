import { dummyData } from '../../../dummy-data';
import db from '../../../firebase-config';
import { ref, get, remove, update} from 'firebase/database';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {

    if (req.method == 'GET') {
        const todo = dummyData.find(x => x.id == req.query.id)
        return res.status(200).json(todo)

    } else if (req.method == 'PUT') {
        const todo = req.body.todo

        if (todo) {
            try {
                update(ref(db, 'todos/' + req.query.id), { todo });
                
                return res.status(200).json({ messege: 'success' });           
            } catch (error) {

                return res.status(500).json({ messege: 'internal Server Error' });
            }

        } else {
            get(ref(db, 'todos/' + req.query.id)).then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const isCompleted = data.isCompleted == false ? true : false;
                    
                    update(ref(db, 'todos/' + req.query.id), { isCompleted });

                    return res.status(200).json({ messege: 'success' });
                } else {

                    return res.status(400).json({ messege: 'Not Found' });
                }
            }).catch((error) => {

                return res.status(500).json({ messege: error });
            });
        }

    } else if (req.method == 'DELETE') {
        
        await remove(ref(db, 'todos/' + req.query.id));

        return res.status(200).json({ messege: 'success' });
    }
}

  