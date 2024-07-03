import React from "react";

const SearchUser = () => {
  const handleSearchUser = () => {
    console.log("search user...");
  };

  return (
    <div>
      <div>
        <div className="py-5 relative">
          <input
            className="bg-transparent border border-[#3b4054] outline-none w-full px-5 py-3 right-full"
            placeholder="Please enter user"
            onChange={handleSearchUser}
            type="text"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
