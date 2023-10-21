import React from "react";

type AddSecretSuccessProps = {
  onHomeClick: () => void;
};

function AddSecretSuccess({ onHomeClick }: AddSecretSuccessProps) {
  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="flex flex-1 h-full justify-center items-center">
        <p className="text-white text-lg">Secret created successfully!</p>
      </div>
      <button
        className="bg-[#4E46DC] px-4 py-2 rounded-3xl text-white text-bold hover:bg-[#3A4468] transition ease-in cursor-pointer mb-4"
        onClick={onHomeClick}
      >
        Done
      </button>
    </div>
  );
}

export default AddSecretSuccess;
