import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Unauthorized() {
  return (
    <div>
      <h1> You're not authorized for this Route </h1>
      <Link to="/">
        <Button>Home</Button>
      </Link>
    </div>
  );
}
