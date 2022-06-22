import {LRequest} from './Service'
//热搜列表(简略)
export function hotSearchService() {
  return LRequest.get("/search/hot")
}
//搜索建议
export function SearchSuggestService(keywords:string) {
  return LRequest.get("/search/suggest",{
    keywords,
    type:'mobile'
  })
}

//搜索关键词查询
export function SearchEnter(keywords:string,limit:number|string,offset:number|string){
  return LRequest.get("/cloudsearch",{
    keywords,
    limit,
    offset
  })
}