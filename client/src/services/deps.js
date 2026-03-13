const BASE_URL = 'http://localhost:3000/departments'

export const getAll = async () => {
    try {
        const results = await fetch(`${BASE_URL}/get`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        const data = await results.json()
        return Array.isArray(data) ? { deps: data } : data
    } catch (error) {
        console.error(error)
        return { deps: [], message: 'Error fetching departments' }
    }
}

export const create = async (name) => {
    try {
        const results = await fetch(`${BASE_URL}/create`, {
            method: 'POST',
            headers: { 'Content-Type':'application/json' },
            body: JSON.stringify({ name })
        })
        const data = await results.json()
        return { message: data.message, success: true }
    } catch (error) {
        return { message: 'Error creating department', success: false }
    }
}
