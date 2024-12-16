import { useEffect, useState } from 'react'
import { database } from '../lib/Appwrite'

type AppwriteTask = {
    $id: string
    title: string
    description: string
    pending: boolean
}

const Task = ({ task, onDelete }: {
    task: AppwriteTask
    onDelete: () => void
}) => {
    const [isPending, setIsPending] = useState<boolean>(task.pending)

    const editTask = async (id: string) => {
        setIsPending(prev => !prev)

        await database.updateDocument(import.meta.env.VITE_APPWRITE_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_LISTA_COLLECTION_ID, id, {
            pending: !isPending
        })
    }

    return (
        <div style={{ border: '1px solid gray' }}>
            <p>{task.title}</p>
            <input type="checkbox" name="active" id="active" checked={isPending} onChange={() => editTask(task.$id)} />
            <button onClick={onDelete}>Eliminar</button>
        </div>
    )
}

export default Task