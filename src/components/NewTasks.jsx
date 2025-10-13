import { useState, useContext } from 'react'
import { TaskContext } from '../store/tasks-context'

export default function NewTask() {

    const [enteredTask, setEnteredTask] = useState('')
    const { handleAddTask } = useContext(TaskContext)

    function handleClick() {

        if(enteredTask.trim() === '') return

        handleAddTask(enteredTask)
        setEnteredTask('')
    }

    return <div className='flex items-center gap-4'>
        <input type='text' value={enteredTask} 
               onChange={() => setEnteredTask(event.target.value)} 
               className='w-64 px-2 py-1 rounded-sm bg-stone-200' />
        <button onClick={handleClick} 
            className='text-stone-700 hover:text-stone-950'>Add Task</button>
    </div>
}