export default function PageLoader() {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-white/80 backdrop-blur-sm rounded-md">
      <svg
        className="animate-spin w-8 h-8 text-blue-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12" cy="12" r="10"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
      <p className="text-sm text-gray-500">Loading Please Wait ...</p>
    </div>
  );
}