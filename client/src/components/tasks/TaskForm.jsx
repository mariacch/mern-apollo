import { useMutation } from '@apollo/client'
import React from 'react'
import { CREATE_TASK } from '../../graphql/tasks'
import { useParams } from 'react-router-dom'
import { GET_PROJECT } from '../../graphql/projects'

export default function TaskForm() {
    const [createTask]=useMutation(CREATE_TASK,{
        refetchQueries:['getProject']
    })
    const params =useParams()
    const handleSubmit=async(e)=>{
    e.preventDefault()
  const data= await  createTask({
        variables:{
            title:e.target.title.value,
            projectId:params.id
        }
    })
    e.target.reset()
    e.target.title.focus()
    console.log(data)
    }
  return (
    <form onSubmit={handleSubmit}>
        <input className='bg-zinc-900 text-white w-full p-2 rounded-lg mb-2' type="text" name='title' />
        <button className='bg-sky-900 text-white w-full p-2 rounded-lg'>add</button>
    </form>
  )
}
