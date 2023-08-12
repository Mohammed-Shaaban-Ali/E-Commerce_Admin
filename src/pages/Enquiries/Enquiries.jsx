import { Table } from "antd";

const Enquiries = () => {
  // Table
  const columns = [
    {
      title: "SNo",
      dataIndex: "Key",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Product",
      dataIndex: "Product",
    },
    {
      title: "Status",
      dataIndex: "Status",
    },
  ];
  const data1 = [];
  for (let i = 0; i < 46; i++) {
    data1.push({
      Key: i,
      name: `Edward King ${i}`,
      Product: `Product ${i}`,
      Status: `Status ${i}`,
    });
  }
  return (
    <div>
      <div className="mt-4">
        <h3 className="mb-4">Enquiries</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default Enquiries;
