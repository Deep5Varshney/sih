import { useState } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";

export default function TouristUpload() {
  const [aadhar, setAadhar] = useState(null);
  const [passport, setPassport] = useState(null);
  const [visa, setVisa] = useState(null);
  const [cid, setCid] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!aadhar || !passport || !visa) {
      alert("All three documents (Aadhar, Passport, Visa/Itinerary) are required!");
      return;
    }

    const formData = new FormData();
    formData.append("aadhar", aadhar);
    formData.append("passport", passport);
    formData.append("visa", visa);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setCid(res.data.cid);
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded-2xl">
      <h2 className="text-xl font-bold mb-4">Upload KYC Documents</h2>

      <div className="mb-4">
        <label className="block font-semibold">Aadhar Card (PDF/Image)</label>
        <input
          type="file"
          accept="application/pdf,image/*"
          onChange={(e) => setAadhar(e.target.files[0])}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Passport (PDF/Image)</label>
        <input
          type="file"
          accept="application/pdf,image/*"
          onChange={(e) => setPassport(e.target.files[0])}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Visa / Itinerary (PDF/Image)</label>
        <input
          type="file"
          accept="application/pdf,image/*"
          onChange={(e) => setVisa(e.target.files[0])}
          required
        />
      </div>

      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        {loading ? "Uploading..." : "Upload & Generate QR"}
      </button>

      {cid && (
        <div className="mt-6 text-center">
          <h3 className="text-lg font-semibold">Your Tourist ID</h3>
          <p className="break-words">{cid}</p>
          <QRCodeCanvas
            value={`https://gateway.pinata.cloud/ipfs/${cid}`}
            size={200}
            className="mx-auto mt-4"
          />
        </div>
      )}
    </div>
  );
}
