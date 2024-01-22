const Favourite = require("../../model/users/favourite.model");
const FavouriteService   = require('../../services/users/favourite.service.js')
const favouriteService = new FavouriteService()

// localhost:8000/api/v1/users/favourite/add-favourite/:productId
exports.addFavourite = async (req, res) => {
  try {
 
    if (!req.params.productId) {
      return res.json({ message: "select product add favourite" });
    }
    let productFind = await favouriteService.getFavourite({product: req.params.productId},{isDelete: false});
    if (productFind) {
      return res.json({message: "This item add alredy in favuorite list"});
    }
 let favouriteItem = await favouriteService.addFavourite({ user: req.user._id,product:req.params.productId});
     res.json({ favouriteItem, message: "favourite item is add" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Server Error" });
  }
};

// localhost:8000/api/v1/users/favourite/favourites
exports.getFavouriteList = async (req, res) => {
  try {
    let product = await favouriteService.getAllFavourite({ user: req.user._id,isDelete: false})
    if (product.length === 0) {
      return res.json({ message: "favourite list empty" });
    }

    let favouriteItems = product.map((e) => ({
      _id:e._id,
      user:e.user,
      product_id: e.product._id,
      productImage: e.product.productImage,
      price: e.product.price,
      title: e.product.title
    }));

    res.json({ favouriteItems,message: "your All Favorite item list..",});
  } catch (error) {
    console.log(error);
    res.json({ message: "Server Error" });
  }
};

// localhost:8000/api/v1/users/favourite/remove-favourite/:id
exports.deleteFavouriteProduct = async (req, res) => {
  try {
    const  mongoId  = await favouriteService.removeFavourite({_id:req.params.id,isDelete:false},{isDelete:true}) 
    if(!mongoId) {
      return res.json({ message: "This favorite item alredy delete" });
    }
    res.json({message: "Your favorite product has been removed",});
  } catch (error) {
    console.log(error);
    res.json({ message: "Server Error" });
  }
};

