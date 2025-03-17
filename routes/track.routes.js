import { Router } from "express";

const trackRouter = Router();

trackRouter.get("/", (req, res) => res.send({title: "GET all track"}))

trackRouter.get("/:id", (req, res) => res.send({title: "GET track details "}))

trackRouter.post("/", (req, res) => res.send({title: "CREATE track"}))

trackRouter.put("/:id", (req, res) => res.send({title: "UPDATE track by id"}))

trackRouter.delete("/:id", (req, res) => res.send({title: "DELETE track by id"}))

trackRouter.get("/user/:id", (req, res) => res.send({title: "GET all track by user id"}))

trackRouter.put("/:id/cancel", (req, res) => res.send({title: "CANCEL track"}))

trackRouter.get("/upcoming", (req, res) => res.send({title: "GET upcoming track"}))

export default trackRouter;