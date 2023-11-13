import Event from "../models/EventModel.js"

export const getEvents=async(req,res)=>{
    try{
        const events=await Event.find()
        res.json(events)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

export const getEventById=async(req,res)=>{
    try {
        const event=await Event.findById(req.params.id)
        res.json(event)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}
export const createEvent=async(req,res)=>{
    let item= new Event(req.body)
    item.createdDate = new Date();
    try{
        const insertevent=await item.save();
        res.status(201).json(insertevent);
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
}
export const updateEvent=async(req,res)=>{
    try{
        const updateevent=await Event.updateOne(
        {_id:req.params.id},
        {$set:req.body})
        res.status(200).json(updateevent);
    }catch(error){
        res.status(400).json({message:error.message})
    }
} 

export const deleteEvent = async (req,res)=>{
    try {
        const deleteevent=await Event.deleteOne({_id:req.params.id});
        res.status(200).json(deleteevent)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}