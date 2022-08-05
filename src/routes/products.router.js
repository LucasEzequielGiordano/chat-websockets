import { Router } from "express";

const router = Router();

router.post("/newProduct", async (req, res) => {
  console.log(req.body);
  res.send({ status: "success", message: "A new product has been added" });
});

export default router;
