import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, getProducts } from "../../redux/slices/productSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useState } from "react";
import { toast } from "react-toastify";
import CustomModal from "../../components/CustomModal";
import Reloader from "../../components/Reloader";

const ProductList = () => {
  const [open, setOpen] = useState(false);
  const [colorID, setcolorID] = useState("");
  const dispatch = useDispatch();
  const { products, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    dispatch(getProducts());
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
      title: "Brand",
      dataIndex: "brand",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "quantity",
      dataIndex: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Price",
      dataIndex: "price",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const data1 = [];
  for (let i = 0; i < products?.length; i++) {
    data1.push({
      Key: i + 1,
      title: products[i]?.title,
      brand: products[i]?.brand,
      category: products[i]?.category,

      quantity: products[i]?.quantity,
      price: products[i]?.price,
      action: (
        <div className="d-flex gap-4 fs-5">
          <Link style={{ color: "green" }} to="/1">
            <BiEdit />
          </Link>
          <Link
            style={{ color: "red" }}
            onClick={() => showModal(products[i]?._id)}
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
    dispatch(deleteProduct(colorID));
    setOpen(false);
    toast.success("Color deleted successfully");
    setTimeout(() => {
      dispatch(getProducts());
    }, 100);
  };
  const handleCancel = (e) => {
    setOpen(false);
  };
  return (
    <div>
      {isLoading ? (
        <Reloader />
      ) : (
        <div className="mt-4">
          <h3 className="mb-4">Product List</h3>
          <div>
            <Table columns={columns} dataSource={data1} />
          </div>
        </div>
      )}
      <CustomModal
        handleOk={handleOk}
        handleCancel={handleCancel}
        open={open}
        title="Are you sure you want to delete this product?"
      />
    </div>
  );
};

export default ProductList;
