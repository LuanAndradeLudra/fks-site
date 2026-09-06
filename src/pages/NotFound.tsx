import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center px-4">
        <h1 className="mb-4 text-6xl font-black text-primary font-display">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">Página não encontrada</p>
        <Link to="/" className="btn-gaming-primary inline-flex">
          Voltar ao início
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
