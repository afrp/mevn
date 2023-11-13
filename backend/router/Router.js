import express from 'express'
import {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
} from '../controller/EventController.js'

import {
    getUser,
    getUsers,
    createUser,
    loginUser
} from '../controller/UserController.js'

const router=express.Router();
router.get("/events",getEvents)
router.get("/events/:id",getEventById)
router.post("/events/",createEvent)
router.patch("/events/:id",updateEvent)
router.delete("/events/:id",deleteEvent)

router.get("/user", getUser)
router.get("/users", getUsers)
router.post("/login", loginUser)
router.post("/register", createUser)

export default router;