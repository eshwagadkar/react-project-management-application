import { useState } from 'react';
import NewProject from './components/NewProject';
import NoProjectSelected from './components/NoProjectSelected';
import ProjectsSidebar from './components/ProjectsSideBar';

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

  let content

  if(projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleSaveProject} />
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onAddProject={handleAddProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar 
        onAddProject={handleAddProject} 
        projects={projectsState.projects}
      />
      {content}
    </main>
  );
}

export default App;
