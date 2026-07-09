export default function Trailblazer() {
  return (
    <div
      className="browser"
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <div className="navbar"></div>
      <div
        className="browser-viewport"
        style={{ flexGrow: 1, background: "white" }}
      >
        <iframe
          src="https://google.com"
          title="Trailblazer Browser"
          style={{ width: "100%", height: "100%", border: "none" }}
        />
      </div>
    </div>
  );
}
