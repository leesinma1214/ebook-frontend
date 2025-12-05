import { type FC } from "react";
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

interface Props {
  visible?: boolean;
}

const AuthorPublicationTable: FC<Props> = ({ visible }) => {
  if (!visible) return null;

  return (
    <Table shadow="none">
      <TableHeader>
        <TableColumn>Tiêu đề</TableColumn>
        <TableColumn>Trạng thái</TableColumn>
        <TableColumn>Hành động</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Dignissimos, eum?
          </TableCell>
          <TableCell>Đã xuất bản</TableCell>
          <TableCell>
            <div className="flex space-x-3">
              <Button isIconOnly size="sm">
                <FaRegTrashCan />
              </Button>
              <Button isIconOnly size="sm">
                <FaEdit />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default AuthorPublicationTable;
