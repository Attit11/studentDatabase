const express = require("express");
const Student = require("../models/student");

const router = new express.Router();

router.get("/getStudents", async (req, res) => {
  try {
    const student = await Student.find({});
    res.status(201).send(student);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/createStudent", async (req, res) => {
  const student = new Student(req.body);
  console.log("FROM THE STUDENT", student);

  try {
    console.log("REQUEST BODY", req.body);
    await student.save();
    res.status(200).send(student);
  } catch (error) {
    console.log("ERRORRRRRR", error);
    res.status(400).send(error);
  }
});

router.get("/student/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).send({ error: "not found!" });
    }
    res.status(201).send(student);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/student/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id, {
      new: true,
      runValidators: true,
    });
    res.status(201).send(student);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch("/updateStudent/:id", async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["firstName", "lastName", "class", "rollNo"];

    const isValidUpdates = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidUpdates) {
      return res.status(400).send({ error: "is not a valid update" });
    }

    try {
      const student = await Student.findById(req.params.id);
      updates.forEach((update) => (student[update] = req.body[update]));
      await student.save();

      if (!student) {
        return res.status(404).send();
      }
      res.status(201).send(student);
    } catch (error) {
      res.status(400).send(error);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
