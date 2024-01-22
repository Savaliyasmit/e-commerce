const Favorite  = require('../../model/users/favourite.model.js')

module.exports = class FavouriteService {
    getFavourite = async (body)=>{
        return await Favorite.findOne(body)
    }
    addFavourite = async (body)=>{
        return await Favorite.create(body)
    }
    removeFavourite = async (id) => {
        return await Favorite.findOneAndDelete(id);
      };
    getAllFavourite = async (data)=>{
        return await Favorite.find(data).populate("product");
    }
}