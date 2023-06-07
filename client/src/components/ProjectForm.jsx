import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { CREATE_PROJECT, GET_PROJECTS } from '../graphql/projects'

export default function ProjectForm() {
    const [project, setproject] = useState({
        name:'',
        description:''
    })
   const [createProject,{loading,error,data}]= useMutation(CREATE_PROJECT,{
    refetchQueries:[
        {
            query:GET_PROJECTS
        },
        'GetProducts'
    ]
   })
    const handleChange= e =>{
        //actualiza
setproject({
    ...project,
    [e.target.name]: e.target.value
})
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        createProject({
            variables:{
                name:project.name,
                description:project.description
            }
        })
        console.log(project)

    }
  return (
    <form onSubmit={handleSubmit} className='w-2/5 '>
        {error && <p>{error.message}</p>}
        <input
        className='bg-zinc-800 text-white rounded-lg shadow-lg p-4 block w-full mb-3'
        type='text' name='name' placeholder='write a title'
        onChange={handleChange}
        />
        <textarea
        className='bg-zinc-800 text-white rounded-lg shadow-lg p-4 block w-full mb-3'
        name='description' rows={'3'}
        placeholder='write a description'
        onChange={handleChange}
        > </textarea>
        <button className='bg-blue-500 px-4 py-1 rounded-md text-lg mb-3 disabled:bg-zinc-400' disabled={loading} >
            save
        </button>
    </form>
  )
}
