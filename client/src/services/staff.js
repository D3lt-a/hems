const BASE_URL = 'http://localhost:3000/staff'

export const getAll = async () => {
    try {
        const res = await fetch(`${BASE_URL}/get`)
        const data = await res.json()
        return data.data || []
    } catch (error) {
        console.error('Error fetching staff:', error)
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
        const data = await res.json()
        return data
    } catch (error) {
        return { success: false, message: 'Error creating staff member' }
    }
}

export const update = async (id, body) => {
    try {
        const res = await fetch(`${BASE_URL}/update/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        const data = await res.json()
        return data
    } catch (error) {
        return { success: false, message: 'Error updating staff member' }
    }
}

export const remove = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}/delete/${id}`, { method: 'DELETE' })
        const data = await res.json()
        return data
    } catch (error) {
        return { success: false, message: 'Error deleting staff member' }
    }
}
