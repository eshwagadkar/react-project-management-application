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

  if(action.type === 'ADD_TASK') {

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

  } else if (action.type === 'DELETE_TASK') {
    return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload.id)
      }

  } else if (action.type === 'ADD_PROJECT') {
    return {
        ...state,
        selectedProjectId: null
      }
  } else if (action.type === 'CANCEL_PROJECT') {
     return {
        ...state,
        selectedProjectId: undefined
      }
  } else if (action.type === 'SAVE_PROJECT') {
    
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

  } else if (action.type === 'SELECT_PROJECT') {

     return {
        ...state,
        selectedProjectId: action.payload.selectedProjectID
      }
  } else if (action.type === 'DELETE_PROJECT') {
     return {
        ...state,
        selectedProjectId: undefined,
        projects: state.projects.filter(project => project.id !== state.selectedProjectId)
      }
  }


  return state
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