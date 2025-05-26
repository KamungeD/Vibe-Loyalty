import { Router, Request, Response, NextFunction, RequestHandler } from "express";
import { supabase } from "../index";

const router = Router();

// Helper: Calculate rewards
const REWARD_THRESHOLD = 5;
function calculateRewards(points: number) {
  return Math.floor(points / REWARD_THRESHOLD);
}

// Register or check-in customer
const checkinHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { phone, name } = req.body;
    if (!phone) return res.status(400).json({ error: "Phone is required" });

    // Find or create customer
    let { data: customer, error } = await supabase
      .from("customers")
      .select("*")
      .eq("phone", phone)
      .single();

    if (!customer) {
      // Create new customer
      const { data: newCustomer, error: createError } = await supabase
        .from("customers")
        .insert([{ phone, name }])
        .select()
        .single();
      if (createError) return res.status(500).json({ error: createError.message });
      customer = newCustomer;
    }

    // Log visit
    await supabase.from("visits").insert([{ customer_id: customer.id }]);

    // Update points and visits
    const updated = await supabase
      .from("customers")
      .update({
        points: customer.points + 1,
        visits: customer.visits + 1,
      })
      .eq("id", customer.id)
      .select()
      .single();

    if (updated.error) return res.status(500).json({ error: updated.error.message });

    res.json({
      ...updated.data,
      rewards: calculateRewards(updated.data.points),
    });
  } catch (err) {
    next(err);
  }
};

router.post("/checkin", checkinHandler as RequestHandler);

// Get customer info
router.get("/customer/:phone", (async (req, res, next) => {
  try {
    const { phone } = req.params;
    const { data: customer, error } = await supabase
      .from("customers")
      .select("*")
      .eq("phone", phone)
      .single();
    if (error || !customer) return res.status(404).json({ error: "Customer not found" });

    res.json({
      ...customer,
      rewards: calculateRewards(customer.points),
    });
  } catch (err) {
    next(err);
  }
}) as RequestHandler);

export default router;