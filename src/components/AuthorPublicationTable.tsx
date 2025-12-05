import { type FC, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@heroui/react";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import client from "../api/client";
import { Link } from "react-router-dom";
import { parseError } from "../utils/helper";
import toast from "react-hot-toast";
import { IoEyeOutline } from "react-icons/io5";

interface Props {
  visible?: boolean;
  authorId?: string;
}

interface PublishedBook {
  id: string;
  title: string;
  slug: string;
  status: string;
}

const AuthorPublicationTable: FC<Props> = ({ authorId, visible }) => {
  const [books, setBooks] = useState<PublishedBook[]>([]);
  const [removeRequestId, setRemoveRequestId] = useState("");
  const [removingBookId, setRemovingBookId] = useState("");

  const handleOnRemoveConfirm = async () => {
    try {
      setRemovingBookId(removeRequestId);
      const { data } = await client.delete("/book/" + removeRequestId);
      if (data.success) {
        toast.success("Sách đã được xóa thành công!");
        setBooks((oldBooks) =>
          oldBooks.filter((book) => book.id !== removeRequestId)
        );
      } else {
        toast.error(
          (t) => (
            <div className="space-y-2">
              <span>
                Không thể xóa sách vì một trong các lý do sau:
              </span>
              <li>Sách đã được mua bởi người khác.</li>
              <li>Hoặc nội dung của bạn không hỗ trợ tính năng này.</li>
              <button className="p-2" onClick={() => toast.dismiss(t.id)}>
                Đóng
              </button>
            </div>
          ),
          { duration: 7000 }
        );
      }
    } catch (error) {
      parseError(error);
    } finally {
      setRemovingBookId("");
    }
  };

  useEffect(() => {
    if (authorId) {
      client.get("/author/books/" + authorId).then(({ data }) => {
        setBooks(data.books);
      });
    }
  }, [authorId]);

  if (!visible) return null;

  return (
    <Table aria-label="Bảng sách của tác giả" shadow="none">
      <TableHeader>
        <TableColumn className="w-3/5">Tiêu đề</TableColumn>
        <TableColumn className="w-2/12">Trạng thái</TableColumn>
        <TableColumn className="w-2/12">Hành động</TableColumn>
      </TableHeader>
      <TableBody>
        {books.map((book) => {
          return (
            <TableRow key={book.id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.status}</TableCell>
              <TableCell>
                <div className="flex space-x-3 relative">
                  {removeRequestId === book.id && (
                    <div className="absolute inset-0 bg-white z-50 flex items-center justify-center">
                      <button
                        onMouseDown={handleOnRemoveConfirm}
                        className="underline"
                      >
                        Vui lòng xác nhận để xóa!
                      </button>
                    </div>
                  )}
                  <Button
                    onPress={() => setRemoveRequestId(book.id)}
                    onBlur={() => setRemoveRequestId("")}
                    isIconOnly
                    size="sm"
                    isLoading={removingBookId === book.id}
                  >
                    <FaRegTrashCan />
                  </Button>
                  <Button
                    to={"/update-book/" + book.slug}
                    as={Link}
                    isIconOnly
                    size="sm"
                    isLoading={removingBookId === book.id}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    as={Link}
                    to={`/read/${book.slug}?title=${book.title}&id=${book.id}`}
                    isIconOnly
                    size="sm"
                  >
                    <IoEyeOutline />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default AuthorPublicationTable;
