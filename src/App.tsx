import { useEffect, useState } from 'react'
import { database, ID } from './shared/lib/Appwrite'
import Task from './shared/components/Task'
import { Query } from 'appwrite'

const App = () => {
    const [tareas, setTareas] = useState<Array<object>>()
    const [showActives, setShowActives] = useState<boolean>(true)

    const getTareas = async (active: boolean) => {
        const { documents } = await database.listDocuments(import.meta.env.VITE_APPWRITE_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_LISTA_COLLECTION_ID, [
            Query.equal('pending', active)
        ])

        setTareas(documents)
    }

    const crearTarea = async (e) => {
        e.preventDefault()

        const { title, description } = e.target

        await database.createDocument(import.meta.env.VITE_APPWRITE_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_LISTA_COLLECTION_ID, ID.unique(), {
            title: title.value,
            description: description.value
        }
        ).then(() => {
            getTareas(true)
        })
    }

    const deleteTask = async (id: string) => {
        await database.deleteDocument(import.meta.env.VITE_APPWRITE_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_LISTA_COLLECTION_ID, id
        ).then(() => {
            getTareas(showActives)
        })
    }

    useEffect(() => {
        getTareas(showActives)
    }, [])

    return (
        <div>
            <form onSubmit={crearTarea}>
                <div>
                    <label htmlFor="title">Titulo</label>
                    <input type="text" name='title' id='title' />
                </div>

                <div>
                    <label htmlFor="description">Descripcion</label>
                    <input type="text" name='description' id='description' />
                </div>

                <button type='submit'>Agregar</button>
            </form>

            <h3>Ver Pendientes? {showActives ? 'Si' : 'No'}</h3>
            <input type="checkbox" checked={showActives} onChange={() => {
                setShowActives(!showActives)

                getTareas(!showActives)
            }} />

            {
                tareas?.map(t => (
                    <Task key={t.$id} task={t} onDelete={() => deleteTask(t.$id)} />
                ))
            }
        </div>
    )
}

export default App