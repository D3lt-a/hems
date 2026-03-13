const BASE_URL = 'http://localhost:3000/users'

export const create = async (empID, name, key) => {
    try {
        const res = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ empID, name, key })
        })
        const data = await res.json()
        return res.status === 201
            ? { success: true, message: data.message }
            : { success: false, message: data.message }
    } catch (error) {
        return { success: false, message: 'An error occurred while creating the user.' }
    }
}

export const login = async (name, key) => {
    try {
        const res = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, key })
        })
        const data = await res.json()
        if (res.status === 200) {
            // Save user to localStorage so protected routes and topbar work
            localStorage.setItem('user', JSON.stringify(data.user))
            localStorage.setItem('token', 'authenticated') // no JWT yet, just a flag
            return { success: true, message: data.message }
        } else {
            return { success: false, message: data.message }
        }
    } catch (error) {
        return { success: false, message: 'An error occurred while logging in.' }
    }
}
