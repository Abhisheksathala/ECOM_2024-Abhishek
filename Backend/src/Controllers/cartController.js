import UserModel from './../model/UserModel.js';

const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    const userData = await UserModel.findById(userId);
    const cartData = userData.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    await UserModel.findByIdAndUpdate(userId, { cartData }, { new: true });

    res.status(200).json({ message: 'Item added to cart', success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const userData = await UserModel.findById(userId);
    const cartData = userData.cartData;

    cartData[itemId][size] = quantity;

    await UserModel.findByIdAndUpdate(userId, { cartData }, { new: true });

    res
      .status(200)
      .json({ message: 'Cart updated successfully', success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await UserModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ message: 'User not found', success: false });
    }
    const cartData = userData.cartData;
    res.status(200).json({ cartData, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export { addToCart, updateCart, getUserCart };
