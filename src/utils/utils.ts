export function numberToPrice(price: number) : string{
  return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"); 
}

export function isInteger(s: string){
  return parseInt(s) != NaN
}