// indexOf
const unique=(arr)=>{
  let res=[]
  for(let i=0;i<arr.length;i++){
    let current=arr[i]
    if(res.indexOf(current)===-1){
      res.push(current)
    }
  }
  return res
}