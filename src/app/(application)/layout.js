import Footer from "../_components/footer/Footer";
import Header from "../_components/header/Header";

export default function ApplicationLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
