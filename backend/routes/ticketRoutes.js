import express from "express";
import { getTicketById, getTickets, updateTicket } from "../controllers/ticketController.js";

const router = express.Router();

router.get("/tickets", getTickets);
router.get("/ticket/:id", getTicketById);
router.put("/tickets/:id", updateTicket);

export default router;
