import asyncHandler from "../utils/asyncHandler.js";
import pool from "../config/db.js";

const allowedPriorities = ["Low", "Medium", "High", "Critical"];
const allowedStatuses = ["Open", "In Progress", "Escalated", "Resolved"];

/**
 GET /api/tickets
 */
export const getTickets = asyncHandler(async (req, res) => {
  const { search = "", priority = "", status = "" } = req.query;

  let query = "SELECT * FROM tickets WHERE 1=1";
  const params = [];

  if (search.trim()) {
    const keyword = `%${search.trim()}%`;
    query += " AND (id LIKE ? OR customer_name LIKE ? OR subject LIKE ?)";
    params.push(keyword, keyword, keyword);
  }


  if (priority && allowedPriorities.includes(priority)) {
    query += " AND priority = ?";
    params.push(priority);
  }


  if (status && allowedStatuses.includes(status)) {
    query += " AND status = ?";
    params.push(status);
  }

  // Sorting
  query += " ORDER BY created_at DESC";

  try {
    const [rows] = await pool.query(query, params);
    res.json({ success: true, count: rows.length, data: rows });
  } catch (error) {
    console.error("Database Query Error:", error.message);
    res.status(500);
    throw new Error("Failed to fetch tickets from database");
  }
});

/**
 GET /api/ticket/:id
 */
export const getTicketById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query("SELECT * FROM tickets WHERE id = ?", [id]);

    if (rows.length === 0) {
      res.status(404);
      throw new Error("Ticket not found");
    }

    res.json({ success: true, data: rows[0] });
  } catch (error) {
    if (res.statusCode === 404) throw error;
    res.status(500);
    throw new Error("Database error occurred while fetching ticket");
  }
});

/**
 PUT /api/tickets/:id
 */
export const updateTicket = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;


  if (!allowedStatuses.includes(status)) {
    res.status(400);
    throw new Error(`Invalid status. Allowed values: ${allowedStatuses.join(", ")}`);
  }

  try {

    const [result] = await pool.query("UPDATE tickets SET status = ? WHERE id = ?", [status, id]);

    if (result.affectedRows === 0) {
      res.status(404);
      throw new Error("Ticket not found");
    }

    const [updatedRows] = await pool.query("SELECT * FROM tickets WHERE id = ?", [id]);

    res.json({
      success: true,
      message: "Ticket updated successfully",
      data: updatedRows[0],
    });
  } catch (error) {
    if (res.statusCode === 400 || res.statusCode === 404) throw error;
    res.status(500);
    throw new Error("Database error occurred while updating ticket");
  }
});
