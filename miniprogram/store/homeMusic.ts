const { HYEventStore } = require("hy-event-store")
import {hotMusicService,menuAllMusic,rankingDetail} from '../service/musicService'
import {SearchSuggestService,SearchEnter} from '../service/searchService'
const musicStore = new HYEventStore({
  state:{
    hotMusic:[],
    AllMusic:[],
    detail:{},
    SearchSuggest:[],
    SearchEntetList:[]
  },
  actions:{
    //获取热门歌曲
    getHotMusicList(ctx:any){
      hotMusicService().then(res=>{
        
        ctx.hotMusic=res.data.dailySongs
      })
    },
    //请求歌单的全部歌曲,还有歌单详细信息
    getMenuAllMusic(ctx:any,id:string|number){
      menuAllMusic(id).then(res=>{
        ctx.AllMusic=res
      }),
      rankingDetail(id).then(res=>{
        ctx.detail=res
      })
    },
    //搜索建议
    getSearchSuggest(ctx:any,keywords:string) {
      SearchSuggestService(keywords).then(res=>{
        if(!res.result) return
        ctx.SearchSuggest=res.result.allMatch
      })
    },
    //搜索关键字获取搜索到的列表
    getSearchEnter(ctx:any,obj:any){
      SearchEnter(obj.keyword,obj.limit,obj.offset).then(res=>{
        if(res.result.songs){
        ctx.SearchEntetList=res.result.songs
        }
      })
    }

  }
})

export {musicStore}