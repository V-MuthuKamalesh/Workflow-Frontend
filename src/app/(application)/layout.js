import Header from "../_components/header/Header";

export default function ApplicationLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
