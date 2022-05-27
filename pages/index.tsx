import Head from 'next/head';
import { useState, useEffect } from 'react';
import axios from '@/services/axios';
import db from 'firebase-config';
import {ref, onValue} from 'firebase/database';
import { Todo } from 'types';

export default function Home() {
  const [todo, setTodo] = useState<string>('')
  const [todoList, setTodoList] = useState<Todo[]>([])
  const [searchItem, setSearchItem] = useState<Todo[]>([])
  const [id, setId] = useState<string>('')

  const handleChange = (e) => {
    
    const searchList = e.target.value.toLowerCase() ? todoList.filter(x => { return x.todo.toLowerCase().includes(e.target.value.toLowerCase()) }): [];
    setTodo(e.target.value)
    setSearchItem([...searchList])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const exist = todoList.find(x => x.todo == todo);
    if (exist) {
      alert(`${todo} already exist.`)
    } else {

      if (id) {
        axios.put(`todo/${id}`, { todo })
          .then(res => {
            console.log(res.data)
            setId('')
            setTodo('')
          }).catch(err => {
            console.log(err);
        });
      } else {
  
        axios.post(`todo`, { todo })
          .then(res => {
            console.log(res.data)
            setTodo('')
          }).catch(err => {
            console.log(err);
        });
      }
    }
  }

  const handleDelete = (id) => {
    if (todoList.length > 1) {
      axios.delete(`todo/${id}`)
        .then(res => {
          console.log(res.data)
        }).catch(err => {
          console.log(err);
      });
    } else {
      alert('todo item could not be empty!')
    }
  }

  const handleUpdate = (t) => {
    setTodo(t.todo)
    setId(t.id)
  }

  const markAsComplete = (id) => {
    axios.put(`todo/${id}`)
      .then(res => {
        console.log(res.data)
        setId('')
      }).catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {

    onValue(ref(db, 'todos'), (snapshot) => {
      const data:Todo[] = snapshot.val()? Object.values(snapshot.val()) : [];
      setTodoList(data)
    });

  }, []);

  return (
    <div className='container'>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='main'>
        <h1 className='title'>
          To Do Challenge !
        </h1>
        <div className='container'>
          <form className='todoForm' onSubmit={ handleSubmit }>
            <input className='todoInput' type='text' value={todo} name='todo' onChange={handleChange} placeholder='Input Todo here...' required />
            <input type='submit' value={id? 'Update': 'Save'}/>
          </form>
          <div className='searchItem'>
            {
              searchItem.map((t) => {
                return <div key={t.id}>
                  <p>{t.todo}</p>
                </div>
              })
            } 
          </div>
        </div>
        <div className='todoList'>
          <table className='border'>
            <thead>
              <tr>
                <th>Todo</th>
                <th>Is Completed</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                todoList.map((t, i) => {
                  return (
                    <tr key={i}>
                      <td className={ t.isCompleted ? 'isCompleted' : ''}>{t.todo}</td>
                      <td>{t.isCompleted.toString()}</td>
                      <td>{t.createdAt as string}</td>
                      <td>
                        <div className='action'>
                        <button onClick={() => {
                          handleDelete(t.id)
                        }}>Delete</button>
                        <button onClick={() => {
                          handleUpdate(t)
                          }}>Update</button>
                        <button onClick={() => {
                          markAsComplete(t.id)
                          }}>{t.isCompleted? 'Mark as Incomplete': 'Mark as Complete'}</button>
                          </div>
                      </td>         
                    </tr>
                  )
                })
              } 
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
