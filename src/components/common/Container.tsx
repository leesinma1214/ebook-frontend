import { type FC, type ReactNode } from "react";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

interface Props {
  children: ReactNode;
}

const Container: FC<Props> = ({ children }) => {
  const location = useLocation();

  const readingMode = location.pathname.startsWith("/read/");

  if (readingMode) return children;

  return (
    <div className="min-h-screen max-w-5xl mx-auto flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col pb-20">{children}</div>

      <footer className="pb-10 px-4 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} DiGiRead. Tất cả các quyền được bảo lưu.
        </p>
      </footer>
    </div>
  );
};

export default Container;
