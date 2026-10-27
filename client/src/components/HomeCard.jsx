const HomeCard = () => {
  return (
    <div className="grid content-center grid-cols-[repeat(auto-fit,minmax(390px,1fr))] gap-4 ">
      <div className="card bg-mist-900 w-96 shadow-sm ml-2">
        <div className="card-body">
          <h2 className="card-title ">CONNECT</h2>
          <p className="leading-5.5">
            <span className="font-extrabold">Connect</span> is how two matched
            users become learning partners. You send a request, the other person
            accepts or rejects it, and once accepted you both appear in each
            other's connections, which unlocks messaging and skill sessions.
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-neutral rounded-xl">MORE INFO</button>
          </div>
        </div>
      </div>
      <div className="card bg-mist-900 w-96 shadow-sm ml-2">
        <div className="card-body">
          <h2 className="card-title ">CONNECT</h2>
          <p className="leading-5.5">
            <span className="font-extrabold">Connect</span> is how two matched
            users become learning partners. You send a request, the other person
            accepts or rejects it, and once accepted you both appear in each
            other's connections, which unlocks messaging and skill sessions.
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-neutral rounded-xl">MORE INFO</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
