import React from 'react'
import TaskCard from './TaskCard'

export default function TasksList({tasks}) {
  return (
    <div>
        {tasks.map(task=>(
            <TaskCard task={task} key={task._id}/>
        ))}
    </div>
  )
}
