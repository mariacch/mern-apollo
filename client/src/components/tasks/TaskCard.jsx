import { useMutation } from '@apollo/client'
import React from 'react'
import { DELETE_TASK } from '../../graphql/tasks'

export default function TaskCard({task}) {
   const [deleteTask]= useMutation(DELETE_TASK,{
    refetchQueries:['getProject']
   })
  return (
    <div className='bg-zinc-900 px-5 py-3 mb-2 flex justify-between'>
        <h1>{task.title}</h1>
        <button className='bg-red-500' onClick={()=>deleteTask({
            variables: {
                id:task._id
            }
        })}>delete</button>
    </div>
  )
}
