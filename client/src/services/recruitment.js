const BASE_URL = 'http://localhost:3000/recruitment'

export const getAll = async () => {
    try {
        const res = await fetch(`${BASE_URL}/get`)
        const data = await res.json()
        return data.data || []
    } catch (error) {
        console.error('Error fetching recruitments:', error)
        return []
    }
}

export const create = async (body) => {
    try {
        const res = await fetch(`${BASE_URL}/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        return await res.json()
    } catch (error) {
        return { success: false, message: 'Error creating recruitment' }
    }
}

export const remove = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}/delete/${id}`, { method: 'DELETE' })
        return await res.json()
    } catch (error) {
        return { success: false, message: 'Error deleting recruitment' }
    }
}
