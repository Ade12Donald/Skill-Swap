const Story = () => {
  const handleClick = () => {};
  return (
    <button onClick={handleClick}>
      <div className="card w-96 m-3.5 bg-base-100 card-sm shadow-sm outline-base-200">
        <div className="flex flex-col items-start justify-start card-body">
          <div className="card-title font-bold text-l tracking-wide">
            Connections
          </div>
          <div className="flex gap-4">
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img
                  alt="Tailwind-CSS-Avatar-component"
                  src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                />
              </div>
            </div>
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img
                  alt="Tailwind-CSS-Avatar-component"
                  src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default Story;
