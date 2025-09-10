const express = require("express");
const multer = require("multer");
const axios = require("axios");
const dotenv = require("dotenv");
const FormData = require("form-data");
const cors = require("cors");
const { PDFDocument } = require("pdf-lib");

dotenv.config();
const app = express();
const upload = multer();
app.use(cors());

const pinFile = async (buffer, fileName) => {
  const formData = new FormData();
  formData.append("file", buffer, { filename: fileName });

  const res = await axios.post(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    formData,
    {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
    }
  );
  return res.data.IpfsHash;
};

app.post(
  "/upload",
  upload.fields([
    { name: "aadhar", maxCount: 1 },
    { name: "passport", maxCount: 1 },
    { name: "visa", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const mergedPdf = await PDFDocument.create();

      for (let field of ["aadhar", "passport", "visa"]) {
        if (req.files[field]) {
          const pdfBytes = req.files[field][0].buffer;
          const pdf = await PDFDocument.load(pdfBytes);
          const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
          copiedPages.forEach((page) => mergedPdf.addPage(page));
        }
      }

      const mergedPdfBytes = await mergedPdf.save();

      const cid = await pinFile(Buffer.from(mergedPdfBytes), "KYC.pdf");

      res.json({ cid });
    } catch (err) {
      console.error(err.response?.data || err.message);
      res.status(500).json({ error: "Upload failed" });
    }
  }
);

app.listen(3000, () =>
  console.log("Server running on http://localhost:3000")
);
