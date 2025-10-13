import { useContext } from 'react'
import Tasks from './Tasks'
import { TaskContext } from '../store/tasks-context'

export default function SelectedProject() {

    const { projects, selectedProjectId, handleDeleteProject } = useContext(TaskContext)

    const project = projects.find(project => project.id === selectedProjectId)

    const formattedDate = new Date(project.dueDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })

    return <div className='w-[35rem] mt-16'>
        <header className='pb-4 mb-4 border-b-2 border-stone-300'>
            <div className="flex flex-center justify-between">
                <h1 className='text-3xl font-bold text-stone-600 mb-2'>{project.title}</h1>
                <button className='text-stone-600 hover:text-stone-950'
                  onClick={handleDeleteProject}
                >Delete</button>
            </div>
            <p className='mb-4 text-stone-400'>{formattedDate}</p>
            <p className='text-stone-600 whitespace-pre-wrap'>{project.description}</p>
        </header>
        <Tasks />
    </div>
}