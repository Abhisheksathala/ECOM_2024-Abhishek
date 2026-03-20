import { useState } from "react";
import axios from "axios";
import { BackendUrl } from "../App";
import { toast } from "react-toastify";

const AddCoupon = ({ token }) => {
  const [formData, setFormData] = useState({
    code: "",
    discountType: "percentage",
    discountValue: "",
    usageLimit: "",
    expiryDate: "",
  });

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.code || !formData.discountValue) {
      toast.error("Fill required fields");
      return;
    }

    try {
      const res = await axios.post(
        `${BackendUrl}/api/coupon/create`,
        formData,
        {
          headers: { token },
        },
      );

      if (res.data.success) {
        toast.success("Coupon created");
        setFormData({
          code: "",
          discountType: "percentage",
          discountValue: "",
          usageLimit: "",
          expiryDate: "",
        });
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error creating coupon");
    }
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-semibold mb-6">Create Coupon</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="code"
          placeholder="Coupon Code (e.g SAVE10)"
          value={formData.code}
          onChange={onChangeHandler}
          className="border p-2 rounded"
        />

        <select
          name="discountType"
          value={formData.discountType}
          onChange={onChangeHandler}
          className="border p-2 rounded"
        >
          <option value="percentage">Percentage</option>
          <option value="flat">Flat</option>
        </select>

        <input
          type="number"
          name="discountValue"
          placeholder="Discount Value"
          value={formData.discountValue}
          onChange={onChangeHandler}
          className="border p-2 rounded"
        />

        <input
          type="number"
          name="usageLimit"
          placeholder="Usage Limit"
          value={formData.usageLimit}
          onChange={onChangeHandler}
          className="border p-2 rounded"
        />

        <input
          type="date"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={onChangeHandler}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Create Coupon
        </button>
      </form>
    </div>
  );
};

export default AddCoupon;
