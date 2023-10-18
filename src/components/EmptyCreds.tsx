const EmptyCreds = () => {
  return (
    <div className="w-full h-full flex flex-col justify-start items-start">
      <p className="text-base font-light mb-6 text-[#828CAE]">
        It seems all empty here! <br />
        Create your secret passwords and credentials.
      </p>
      <button className="bg-[#4E46DC] px-10 py-2 rounded-3xl text-white text-sm ml-4 ">Add Secret</button>
    </div>
  );
};

export default EmptyCreds;
