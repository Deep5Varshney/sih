import { useMemo, useState } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import { Link } from "react-router-dom";

export default function TouristUpload() {
  const [aadhar, setAadhar] = useState(null);
  const [passport, setPassport] = useState(null);
  const [visa, setVisa] = useState(null);
  const [cid, setCid] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // fallback backend URL for local dev
  const backendURL = useMemo(
    () => import.meta.env.VITE_BACKEND_URL || "https://sih-backend-oei3.onrender.com",
    []
  );

  const handleUpload = async () => {
    if (!aadhar || !passport || !visa) return;

    const formData = new FormData();
    formData.append("aadhar", aadhar);
    formData.append("passport", passport);
    formData.append("visa", visa);

    try {
      setLoading(true);
      setProgress(5);
      const res = await axios.post(`${backendURL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          if (!e.total) return;
          const percent = Math.round((e.loaded / e.total) * 100);
          setProgress(Math.max(5, percent));
        },
      });
      setCid(res.data.cid);
      setProgress(100);
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
      setProgress(0);
    } finally {
      setLoading(false);
    }
  };

  // Auto-upload removed: upload starts only when user clicks the button.

  const Card = ({ id, label, onChange, file }) => (
    <div className="flex flex-col items-center">
      <input
        id={id}
        type="file"
        accept="application/pdf,image/*"
        onChange={(e) => onChange(e.target.files?.[0] || null)}
        className="hidden"
      />
      <label
        htmlFor={id}
        className={[
          "w-[107px] h-[63px] rounded-2xl border-2 cursor-pointer select-none",
          "flex items-center justify-center text-lg capitalize",
          "bg-[#F5F2E8] border-[#5b57f6] text-slate-800 shadow-sm",
          "hover:shadow-md transition-shadow",
          file ? "ring-4 ring-[#5b57f6]/60" : "",
        ].join(" ")}
      >
        {label}
      </label>
      {file && (
        <p className="mt-2 max-w-40 text-center text-xs text-slate-600 break-words">
          {file.name}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-extrabold tracking-tight text-[#5b57f6] text-center">
          Upload Your Documents
        </h1>

        <div className="mt-8 grid grid-cols-3 gap-5">
          <Card id="passport" label="passport" file={passport} onChange={setPassport} />
          <Card id="aadhar" label="aadhar" file={aadhar} onChange={setAadhar} />
          <Card id="visa" label="visa" file={visa} onChange={setVisa} />
        </div>

        <div className="mt-14">
          <h2 className="text-2xl font-extrabold text-slate-900">Uploading Documents</h2>
          <p className="text-slate-600 -mt-1">please wait a moment</p>

          <div className="mt-6">
            <div className="w-full h-10 bg-[#EDEBFF] rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-[#5b57f6] rounded-full transition-[width] duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 text-right font-semibold text-[#5b57f6]">
              {progress}%
            </div>
          </div>
        </div>

        {cid && (
          <div className="mt-10 flex flex-col items-center">
            <QRCodeCanvas
              value={`https://gateway.pinata.cloud/ipfs/${cid}`}
              size={260}
              className="mx-auto"
            />
          </div>
        )}

        <div className="mt-10 space-y-4">
          <Link
            to="/"
            className="block text-center w-full rounded-2xl border-2 border-[#5b57f6] bg-[#EFEDE4] text-[#5b57f6] py-3 text-lg font-semibold"
          >
            Return to Home
          </Link>
          <button
            type="button"
            onClick={handleUpload}
            disabled={loading || !aadhar || !passport || !visa}
            className="block w-full rounded-2xl bg-[#5b57f6] text-white py-3 text-lg font-semibold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
}
