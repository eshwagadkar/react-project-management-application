import { useContext } from 'react'
import { TaskContext } from './store/tasks-context'
import ProjectsSidebar from './components/ProjectsSideBar';
import SelectedProject from './components/SelectedProject';
import NewProject from './components/NewProject';
import NoProjectSelected from './components/NoProjectSelected';

function App() {

  const { projects, selectedProjectId } = useContext(TaskContext)


  let content = <SelectedProject />

  if(selectedProjectId === null) {
    content = <NewProject/>
  } else if (selectedProjectId === undefined) {
    content = <NoProjectSelected />
  }

  return (
      <main className="h-screen my-8 flex gap-8">
        <ProjectsSidebar />
        {content}
      </main>
  )
}

export default App
