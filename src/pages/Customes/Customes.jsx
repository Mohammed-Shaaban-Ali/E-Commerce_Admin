import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/slices/customerSlice";

const Customes = () => {
  const dispatch = useDispatch();
  const { customers, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.customers
  );
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  // Table
  const columns = [
    {
      title: "SNo",
      dataIndex: "Key",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.Key - b.key,
    },
    {
      title: "Name",
      dataIndex: "name",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
    },
  ];
  const data1 = [];
  for (let i = 0; i < customers.length; i++) {
    if (customers[i].role !== "admin") {
      data1.push({
        Key: i + 1,
        name: customers[i].firstName + " " + customers[i].lastName,
        mobile: customers[i].mobile,
        email: customers[i].email,
      });
    }
  }
  return (
    <div>
      <div className="mt-4">
        <h3 className="mb-4">Customes</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default Customes;
