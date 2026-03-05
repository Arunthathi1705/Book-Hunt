import { IconSearch } from "@tabler/icons-react";

const ExploreSearchBar = ({ value, onChange}) => {

  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="mb-4">
      <div className="relative">
        <IconSearch
          size={16}
          className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search books, authors, editions..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full
            px-8 py-2
            text-sm
            border-none
            rounded-full
            focus:outline-none
            focus:ring-1
            focus:ring-sky-500
          "
        />
        {value && (
          <span
            onClick={handleClear}
            className="absolute right-4 top-1/2 cursor-pointer -translate-y-1/2 text-gray-500 hover:text-gray-900"
          >
            ✕
          </span>
        )}
      </div>
    </div>
  );
};

export default ExploreSearchBar;
