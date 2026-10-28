export default function Loader({ fullScreen = false }) {
  return (
    <div
      className={`flex items-center justify-center ${fullScreen ? "h-dvh" : "p-6"}`}
    >
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );
}
