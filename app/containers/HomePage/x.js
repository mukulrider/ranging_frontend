/**
 * Created by musigma on 12/4/17.
 */
let data = [{
  productId: "51447943",
  checked: true
}, {
  productId: "74847711",
  checked: true
}];

let checked = false

let product = "748477111"

data.map(obj=>{
  if (obj.checked) {
    if(obj.productId == product){
      checked = true
    }
  }
})

console.log(checked);