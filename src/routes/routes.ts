import { Router, Request, Response } from "express";

const router = Router();

// Middleware to ensure all responses in this router are JSON
router.use((req: Request, res: Response, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

// Route: "/"
router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "API is running",
  });
});

// Route: "/me"
router.get("/me", (req: Request, res: Response) => {
  res.status(200).json({
    name: "Ifeanyi Nworji",
    email: "nworjiifeanyi@gmail.com",
    github: "https://github.com/KellsCodes",
  });
});

// Route: "/health"
router.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    message: "healthy",
  });
});

export default router;
