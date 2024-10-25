import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <div>
      <Link
        to="track"
        style={{
          margin: "150px auto",
          display: "block",
          textAlign: "center",
          fontSize: "30px",
        }}
      >
        Start Tarcker
      </Link>
    </div>
  );
}
