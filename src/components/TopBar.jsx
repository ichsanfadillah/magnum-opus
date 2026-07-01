import Clock from "../components/Clock.jsx";

export default function TopBar() {
  return (
    <>
      <div className="top-bar">
        <div className="core-system">
          <button>Start</button>
          <button>Search</button>
        </div>
        <div className="task-tracker">
          <button> - </button>
        </div>
        <div className="status-utilities">
          <button>Batteries</button>
          <Clock />
        </div>
      </div>
    </>
  );
}
