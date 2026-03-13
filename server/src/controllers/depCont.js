import { create, get } from '../models/depModel.js'

export const createDep = async (req, res) => {
    const { name } = req.body
    try {
        const dep = await create(name)
        if (!dep){
            res.status(500).json({message:"👎 Recheck the Credentials"})
        }else{
            res.status(201).json({message:"👍 Create the Department"})
        }
    } catch (error) {
        res.status(500).json({message:"👎 Error creating department"})
    }
}

export const getDeps = async (req, res) => {
    try {
        const deps = await get()
        if (!deps){
            res.status(500).json({message:"👎 Couldn't get the Departments"})
        }else{
            res.status(200).json({message:"👍 Got the Departments", deps})
        }
    } catch (error) {
        res.status(500).json({message:"👎 Error getting departments"})
    }
}