const BASE_URL = 'http://localhost:3000/users'

export const getAll = async () => {
    try {
        const res = await fetch(`${BASE_URL}/get`)
        const data = await res.json()
        return data.data || []
    } catch (error) {
        console.error('Error fetching users:', error)
        return []
    }
}
