import React from 'react'
import { useParams } from 'react-router-dom'
import {useQuery} from '@apollo/client'
import { GET_PROJECT } from '../graphql/projects'
import TasksList from '../components/tasks/TasksList'
import TaskForm from '../components/tasks/TaskForm'

export default function ProjectDetails() {
  const params= useParams()
 const{data,loading,error}= useQuery(GET_PROJECT,{
  variables:{
    id:params.id
  },
  skip:!params.id
 })
 console.log(data)
 if(loading) return <p>cargando</p>
 if(error) return <p>error</p>
  return (
    <div className=''>
     <div>
     <h1 className='text-2xl'>{data.project.name}</h1>
      <p>{data.project.description}</p>
     </div>
      <button className='bg-red-500 px-3 py-2'>
        Delete
      </button>
      
      <TaskForm/>
      <TasksList tasks={data.project.tasks}/>
    </div>
  )
}
