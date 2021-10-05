class Catalogue {
  constructor(title) {
    this.title = title;
    this.products = [];
  }

  findProductById(id) {
    const match = this.products.find(
      function (product) {
        return id === product.id;
      })
    return match;
  }

  findProductsByNameLike(subString) {
    const matches = this.products.filter(function(product) {
      const position = product.name.search(subString)
      return position !== -1
    } )
    return matches;
  }
  removeProductById(uId){
    for(let i = 0;i <= this.products.length; i++){
      if(this.products[i].id === uId){
        this.products.splice(i,1);
        return true;
      }
    }
    return false;
  }

  checkReorder(){
    var reorders = {
      type : "Reorder",
      productToReorder : []
    };
    var bool = false;

    for(let i = 0;i < this.products.length; i++){
      if(this.products[i].quantityInStock <= this.products[i].reorderLevel){
        reorders.productToReorder.push(this.products[i].id);
      }
    }
    return reorders;
  }


  addProduct(product) {
    if (!this.findProductById(product.id)) {
      this.products.push(product);
      return true;
    }
    return false;
  }

}

module.exports = Catalogue;
