import { useState } from 'react';
import NewProject from './components/NewProject';
import NoProjectSelected from './components/NoProjectSelected';
import ProjectsSidebar from './components/ProjectsSideBar';
import SelectedProject from './components/SelectedProject';

function App() {

  const [ projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: []    
  })

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

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId)

  let content = <SelectedProject project={selectedProject}/>

  if(projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleSaveProject} onCancel={handleCancelProject}/>
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onAddProject={handleAddProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar 
        onAddProject={handleAddProject} 
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        // selectedProjectId={selectedProject.id}
      />
      {content}
    </main>
  );
}

export default App;
