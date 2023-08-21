import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import {
  deletecolor,
  getcolors,
  resetState,
} from "../../redux/slices/colorSlice";
import { toast } from "react-toastify";
import CustomModal from "../../components/CustomModal";

const ColorList = () => {
  const [open, setOpen] = useState(false);
  const [colorID, setcolorID] = useState("");

  const dispatch = useDispatch();
  const { colors, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.colors
  );
  useEffect(() => {
    dispatch(resetState());
    dispatch(getcolors());
  }, []);
  // Table
  const columns = [
    {
      title: "SNo",
      dataIndex: "Key",
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const data1 = [];
  for (let i = 0; i < colors.length; i++) {
    data1.push({
      Key: i + 1,
      title: (
        <div
          style={{
            width: "25px",
            height: "25px",
            borderRadius: "50%",
            backgroundColor: `${colors[i].title}`,
          }}
        ></div>
      ),
      action: (
        <div className="d-flex gap-4 fs-5">
          <Link
            style={{ color: "green" }}
            to={`/admin/edit-color/${colors[i]._id}`}
          >
            <BiEdit />
          </Link>
          <Link
            style={{ color: "red" }}
            onClick={() => showModal(colors[i]._id)}
          >
            <AiFillDelete />
          </Link>
        </div>
      ),
    });
  }

  const showModal = (id) => {
    setOpen(true);
    setcolorID(id);
  };
  const handleOk = (e) => {
    dispatch(deletecolor(colorID));
    setOpen(false);
    toast.success("Color deleted successfully");
    setTimeout(() => {
      dispatch(getcolors());
    }, 100);
  };
  const handleCancel = (e) => {
    setOpen(false);
  };
  return (
    <div>
      <div className="mt-4">
        <h3 className="mb-4">ColoList</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
      <CustomModal
        handleOk={handleOk}
        handleCancel={handleCancel}
        open={open}
        title="Are you sure you want to delete this color?"
      />
    </div>
  );
};

export default ColorList;
