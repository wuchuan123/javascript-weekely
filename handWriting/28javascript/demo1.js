// map
const selfMap=function(fn,context){
    let arr=Array.prototype.slice.call(this)
    let mapArr=new Array()
    for(let i=0;i<arr.length;i++){
        if(!arr.hasOwnProperty(i)) continue
        mapArr[i]=fn.call(context,arr[i],i,this)
    }
    return mapArr
}