import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";

export function Layout({ children, showFooter = true }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}
