'use client'
import Image from "next/image";
import axios from 'axios';
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState<string>('');
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmitAIData = async () => {
    if (!query.trim()) {
      setError('Query cannot be empty!');
      return;
    }
    setError(null); // Clear previous errors

    try {
      const res = await axios.post(
        'http://127.0.0.1:8000/query',
        { query }, // Pass the query in the request body
        { headers: { 'Content-Type': 'application/json' } } // Correct headers
      );
      // setResponse(res.data.response); // Update state with API response
      console.log(res.data.response);
      setResponse(res.data.response);
    } catch (err) {
      console.error('Submit data error:', err);
      setError('Failed to fetch data. Please try again.');
    }
  };

  return (
    <div className="p-4">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg w-1/2"
        placeholder="Enter your query here"
      />
      <button className="p-2 bg-red-200 ml-2" onClick={handleSubmitAIData}>
        Submit
      </button>
      {response && <div className="mt-4 p-2 bg-green-100">{response}</div>}
      {error && <div className="mt-4 p-2 bg-red-100 text-red-600">{error}</div>}
    </div>
  );
}
