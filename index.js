const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = 5173;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use("/pdfs", express.static(path.join(__dirname, "pdfs")));

app.get("/", (req, res) => {
    res.send("Welcome to node server!");
});

app.post("/save-pdf", (req, res) => {
    try {
        const pdfData = req.body.pdf;
        const uuid = req.body.uuid;

        const pdfBuffer = Buffer.from(pdfData, "base64");
        
        const pdfPath = path.join(__dirname, "pdfs", `${uuid}.pdf`);

        fs.writeFileSync(pdfPath, pdfBuffer);

        res.send("PDF wurde gespeichert!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Fehler beim Speichern");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});