import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ViewDocs() {
  const { cid } = useParams();

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await fetch(`https://gateway.pinata.cloud/ipfs/${cid}`);
        const data = await res.json();

        window.open(data.aadhar, "_blank");
        window.open(data.passport, "_blank");
        window.open(data.visa, "_blank");
      } catch (err) {
        console.error("Error loading docs:", err);
        alert("Failed to load documents");
      }
    };

    fetchDocs();
  }, [cid]);

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-bold">Opening your documents...</h2>
      <p>If nothing happens, please check your browser’s popup blocker.</p>
    </div>
  );
}
