import { Router } from "express";
import { User } from "../models/user.js";
import multer from "multer";
import { PdfDetails } from "../models/pdfDetails.js";
import path from "path";
import fs from "fs";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/upload", (req, res) => {
  return res.render("upload");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try{
  const token = await User.matchPasswordAndGenerateToken(email, password);

  console.log("Token ", token);
  return res.send("User Logged in Successfully");
  }catch(error){
    console.error(error);
        return res.status(400).send('Invalid Credentials ');
  }
});

router.post("/signup", async (req, res) => {
    const { fullName, email, password, age, gender, bloodGroup, mobileNumber } = req.body;
    try {
        await User.create({
            fullName,
            email,
            password,
            age,
            gender,
            bloodGroup,
            mobileNumber
        });
        return res.send('Form submitted!');
    } catch (error) {
        console.error(error);
        return res.status(400).send('Error creating user: ' + error.message);
    }
});


router.post("/upload", upload.single("Pdf"), async (req, res) => {
  console.log(req.file);
  const title = req.body.title;
  const fileName = req.file.filename;
  try{
  await PdfDetails.create({ title: title, pdf: fileName });
  return res.send('Report submitted successfully');
  }
  catch (error) {
    console.error(error);
    return res.status(400).send('Error in uploading File');
}
});

router.get('/details', (req, res) => {
  const textFilePath = path.join(__dirname, 'textfile.txt');
  fs.readFile(textFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading the text file.');
    }
    return res.send(data);
  });
});

export default router;
