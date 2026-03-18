import { useEffect, useState } from "react";
import axios from "axios";
import { BackendUrl } from "../App";
import { toast } from "react-toastify";
import Card from "../components/Card";

const Dashboard = ({ token }) => {
  const [data, setData] = useState(null);

  const fetchDashboard = async () => {
    try {
      const res = await axios.post(`${BackendUrl}/api/product/getDashboard`);

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      setData(res.data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50">
      <h1 className="mb-8 text-4xl font-semibold text-center text-green-600">
        Dashboard Overview
      </h1>

      {!data ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card title="Total Users" value={data.totalUsers} />
          <Card title="Total Products" value={data.totalProducts} />
          <Card title="Total Sales" value={`₹${data.totalSales}`} />

          <Card title="Total Orders" value={data.totalOrders} />
          <Card title="Last 7 Days Orders" value={data.last7DaysOrders} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
