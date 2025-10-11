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

  let content

  if(projectsState.selectedProjectId === null) {
    content = <NewProject />
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onAddProject={handleAddProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar onAddProject={handleAddProject} />
      {content}
    </main>
  );
}

export default App;
