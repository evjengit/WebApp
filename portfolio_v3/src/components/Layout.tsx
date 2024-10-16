import Footer from "./Footer.tsx";
import Header from "./Header.tsx";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header/>
      <main>{children}</main>
      <Footer />
    </>
  );
}