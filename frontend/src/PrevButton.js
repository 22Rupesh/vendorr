import React from "react";
import { useNavigate } from "react-router-dom";

export default function PrevButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary transition-colors px-4 py-2 rounded-btn hover:bg-primary-50"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      Previous
    </button>
  );
}
