//data models
import Project from "../models/Project.js";
import Task from "../models/Task.js";

export const resolvers = {
  Query: {
    projects: async () => {
      return await Project.find();
    },
    project: async (_, { _id }) => await Project.findById(_id),
    task: async (_, { _id }) => await Task.findById(_id),
    tasks: async () => {
      return await Task.find();
    },
  },
  Mutation: {
    createProject: async (_, { name, description }) => {
      //client values {name,description}
      const project = new Project({
        name,
        description,
      });
      //save in db->
      const savedProject = await project.save();
      return savedProject;
    },
    
    createTask: async (_, { title, projectId }) => {
      console.log(title, projectId);
      // filter by id
      const projectFound = await Project.findById(projectId);
      if (!projectFound) throw new Error("Project not found");
      const task = new Task({
        title,
        projectId,
      });
      const taskSaved = await task.save();
      return taskSaved;
    },
    deleteProject: async (_, { _id }) => {
      const deletedProject = await Project.findByIdAndDelete(_id);
      if (!deletedProject) throw new Error("Project not found");
      const taskDeleted = await Task.deleteMany({projectId:deletedProject._id})
      console.log(taskDeleted)
      return deletedProject;
    },
    deleteTask: async (_, { _id }) => {
      const deletedTask = await Task.findByIdAndDelete(_id);
      if (!deletedTask) throw new Error("Task not found");
      return deletedTask;
    },
    updateProject:async(_,args)=>{
      const updatedProject=  await Project.findByIdAndUpdate(args._id,args,{
        new:true
      })
      if(!updatedProject) throw new Error('Project not found')
      return updatedProject
    },
    updateTask:async(_,args)=>{
        const updatedTask=  await Task.findByIdAndUpdate(args._id,args,{
            new:true
          })
          if(!updatedTask) throw new Error('Project not found')
          return updatedTask
    },
    
  },
  Project: {
		tasks: async (parent) => {
      
      //relations ->
		return await Task.find({ projectId: parent._id });
		}
	},
  Task:{
    project:async(parent)=>await Project.findById(parent.projectId)
  }
};
