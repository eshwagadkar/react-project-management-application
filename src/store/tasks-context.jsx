import { createContext, useState, useReducer } from 'react'

export const TaskContext = createContext({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
    handleAddTask: () => {},
    handleDeleteTask: () => {},
    handleAddProject: () => {},
    handleCancelProject: () => {},
    handleSaveProject: () => {},
    handleSelectProject: () => {},
    handleDeleteProject: () => {}
})  

function TaskReducer(state, action) {

  switch (action.type) {

    case 'ADD_TASK': {
      const taskId = Math.random()

      const newTasks = {
        text: action.payload.text,
        projectId: state.selectedProjectId,
        id: taskId
      }

      return {
        ...state,
        tasks: [...state.tasks, newTasks]
      }
    }

    case 'DELETE_TASK': {
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload.id)
      }
    }

    case 'ADD_PROJECT': {
      return {
        ...state,
        selectedProjectId: null
      }
    }

    case 'CANCEL_PROJECT': {
      return {
        ...state,
        selectedProjectId: undefined
      }
    }

    case 'SAVE_PROJECT': {
      const projectId = Math.random()

      const newProject = {
        ...action.payload.data,
        id: projectId
      }

      return {
        ...state,
        selectedProjectId: undefined,
        projects: [...state.projects, newProject]
      }
    }

    case 'SELECT_PROJECT': { 
      return {
         ...state,
         selectedProjectId: action.payload.selectedProjectID
       }
    }

    case 'DELETE_PROJECT' : {
      return {
         ...state,
         selectedProjectId: undefined,
         projects: state.projects.filter(project => project.id !== state.selectedProjectId)
       }
    }

    default:
      return state

  }

}


export default function TaskContextProvider({children}) {

  const [projectsState, projectsDispatch] = useReducer(TaskReducer, {
    selectedProjectId: undefined,
    projects: [],
    tasks: []    
  })

  function handleAddTask(text) {
    projectsDispatch({
      type: 'ADD_TASK',
      payload: {
        text
      }
    })
  }

  function handleDeleteTask(id){
     projectsDispatch({
      type: 'DELETE_TASK',
      payload: { id }
    })
  }

  function handleAddProject() {
    projectsDispatch({
      type: 'ADD_PROJECT'
    })
  }

  function handleCancelProject() {
    projectsDispatch({
      type: 'CANCEL_PROJECT'
    })
  }

  function handleSaveProject(projectData) {
    projectsDispatch({
      type: 'SAVE_PROJECT',
      payload: {
        data: projectData
      }
    })
  }

  function handleSelectProject(id) {
     projectsDispatch({
      type: 'SELECT_PROJECT',
      payload: {
        selectedProjectID: id
      }
    })
  }

  function handleDeleteProject(){
      
    projectsDispatch({
      type: 'DELETE_PROJECT'
    })

  }

  const ctxValue = {
    selectedProjectId: projectsState.selectedProjectId,
    projects: projectsState.projects,
    tasks: projectsState.tasks,
    handleAddTask: handleAddTask,
    handleDeleteTask: handleDeleteTask,
    handleAddProject: handleAddProject,
    handleCancelProject: handleCancelProject,
    handleSaveProject: handleSaveProject,
    handleSelectProject: handleSelectProject,
    handleDeleteProject: handleDeleteProject
  }

  return <TaskContext.Provider value={ctxValue}>
    {children}
  </TaskContext.Provider>


}