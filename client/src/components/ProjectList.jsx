import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_PROJECTS } from '../graphql/projects'
import ProjectCard from './ProjectCard'
//consultas graphql
export default function ProjectList() {
  const{loading,error,data}=  useQuery(GET_PROJECTS)

  if(loading) return <p>Loading</p>
  if(error) return <p>Error</p>
  return (
    <div className='overflow-y-auto h-80 w-full px-5'>
        {
            data.projects.map(project=>(
                <ProjectCard project={project} key={project._id}/>
            ))
        }
    </div>
  )
}
