import { createContext, useState } from 'react'
import NewProject from '../components/NewProject'
import NoProjectSelected from '../components/NoProjectSelected'
import SelectedProject from '../components/SelectedProject'

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

export default function TaskContextProvider({children}) {

  const [ projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []    
  })

  function handleAddTask(text) {

      setProjectsState(prevState => {
      const taskId = Math.random()

      const newTasks = {
        text,
        projectId: prevState.selectedProjectId,
        id: taskId
      }

      return {
        ...prevState,
        tasks: [...prevState.tasks, newTasks]
      }

    })
  }

  function handleDeleteTask(id){
    setProjectsState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(task => task.id !== id)
      }
    })
  }

  function handleAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null
      }
    })
  }

  function handleCancelProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined
      }
    })
  }

  function handleSaveProject(projectData) {

    setProjectsState(prevState => {
      const projectId = Math.random()

      const newProject = {
        ...projectData,
        id: projectId
      }

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      }

    })

  }

  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id
      }
    })
  }

  function handleDeleteProject(){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(project => project.id !== prevState.selectedProjectId)
      }
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