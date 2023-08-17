import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../../redux/slices/productSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    dispatch(getProducts());
  }, [products, isError, isLoading, isSuccess, message]);

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
      title: "Color",
      dataIndex: "color",
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
  for (let i = 0; i < products.length; i++) {
    data1.push({
      Key: i + 1,
      title: products[i].title,
      brand: products[i].brand,
      category: products[i].category,
      color: products[i].color[0].color,
      price: products[i].price,
      action: (
        <div className="d-flex gap-4 fs-5">
          <Link style={{ color: "green" }} to="/1">
            <BiEdit />
          </Link>
          <Link style={{ color: "red" }} to="/2">
            <AiFillDelete />
          </Link>
        </div>
      ),
    });
  }
  return (
    <div>
      <div className="mt-4">
        <h3 className="mb-4">Product List</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
