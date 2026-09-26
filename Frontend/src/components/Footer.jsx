import { Compass } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-cream">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-3">
        <div>
          <p className="flex items-center gap-2 font-semibold text-forest">
            <Compass className="h-4 w-4" /> SheTravels AI
          </p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
            Thoughtful tools for independent travellers — from the first route idea to a confident arrival.
          </p>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-forest">Explore</p>
          <div className="mt-3 flex flex-col gap-2 text-muted">
            <Link to="/about">About the project</Link>
            <Link to="/login">Member access</Link>
            <Link to="/register">Create an account</Link>
          </div>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-forest">Safety note</p>
          <p className="mt-3 leading-6 text-muted">
            This is a frontend mini-project demo. SOS and live tracking are simulated and do not contact emergency services.
          </p>
        </div>
      </div>
    </footer>
  );
}
