import { useContext } from 'react'
import NewTask from './NewTasks';
import { TaskContext } from '../store/tasks-context'

export default function Tasks() {

    const { tasks, handleDeleteTask } = useContext(TaskContext)

    return <section>
        <h2 className='text-2xl font-bold text-stone-700 mb-4'>Tasks</h2>
        <NewTask />
        { tasks.length === 0 && <p className='text-stone-800 my-4'>
            This project does not have any tasks yet
        </p>
        }
        { tasks.length > 0 && 
        <ul className='p-4 mt-8 rounded-md bg-stone-100'>
            {tasks.map(task => <li key={task.id} className='flex justify-between my-4'>
                                <span>{task.text}</span>
                                <button onClick={() => handleDeleteTask(task.id) }
                                 className='text-stone-700 hover:text-red-500'>
                                    Clear
                                </button>
                            </li>
            )}
         </ul>}
    </section>
}