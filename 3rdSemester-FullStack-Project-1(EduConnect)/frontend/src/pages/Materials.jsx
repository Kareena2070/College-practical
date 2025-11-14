import { useState, useEffect } from "react";

export default function Materials() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [message, setMessage] = useState(""); // Message text
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const token = localStorage.getItem("token");

  // Auto-clear message after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const fetchMaterials = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/materials");
      const data = await res.json();
      setMaterials(data);
    } catch (err) {
      console.error(err);
      setMessage("Failed to fetch materials");
      setMessageType("error");
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    if (!title.trim() || !subject.trim() || !file) {
      setMessage("Please fill all required fields: Title, Subject, and File");
      setMessageType("error");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subject", subject);
    formData.append("description", description);
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/api/materials", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        setMessage("Material uploaded successfully");
        setMessageType("success");
        setTitle("");
        setSubject("");
        setDescription("");
        setFile(null);
        fetchMaterials();
      } else {
        setMessage(data.message || "Upload failed");
        setMessageType("error");
      }
    } catch (err) {
      console.error(err);
      setMessage("Upload failed due to network/server error");
      setMessageType("error");
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Upload Study Material</h1>

      {message && (
        <p
          className={`mb-4 p-2 rounded text-white ${
            messageType === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleUpload} className="flex flex-col gap-2 mb-6">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Upload
        </button>
      </form>

      <h2 className="text-xl font-bold mb-2">All Materials</h2>
      <ul className="flex flex-col gap-2">
        {materials.map((m) => (
          <li key={m._id} className="border p-2 rounded">
            <h3 className="font-semibold">{m.title}</h3>
            <p><strong>Subject:</strong> {m.subject}</p>
            <p>{m.description}</p>
            <p><strong>Uploaded by:</strong> {m.uploadedBy?.name}</p>
            {m.fileUrl && (
              <a
                href={`http://localhost:5000/${m.fileUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View File
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
