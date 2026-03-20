import AddressModel from "../model/AddressModel.js";

export const saveAddress = async (req, res) => {
  try {
    const userId = req.body.userId;
    const addressData = req.body;

    // if addressId exists → user selected existing → NO CREATE
    if (addressData._id) {
      return res.json({
        success: true,
        message: "Using existing address",
      });
    }

    const count = await AddressModel.countDocuments({ userId });

    if (count >= 4) {
      return res.json({
        success: false,
        message: "Max 4 addresses allowed",
      });
    }

    const newAddress = await AddressModel.create({
      ...addressData,
      userId,
    });

    res.json({
      success: true,
      message: "Address created",
      address: newAddress,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAddress = async (req, res) => {
  try {
    const userId = req.body.userId;

    const addresses = await AddressModel.find({ userId });

    res.json({ success: true, addresses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.body;

    await AddressModel.findByIdAndDelete(addressId);

    res.json({
      success: true,
      message: "Address deleted",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
