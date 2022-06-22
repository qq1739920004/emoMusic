//把字符串拆分成搜索框字体着色
export function colorText(purifyRes:any[],serchValue:string) {
  
const nodesAll=[]
  for(let i of purifyRes){
    let nodes=[]
    const colorText=(i as string).toUpperCase().startsWith(serchValue.toUpperCase())
    if(colorText){
      const key1=(i as string).slice(0,serchValue.length)
      let nodes1={
        name:"span",
        attrs:{style:"color:rgb(34, 219, 142);"},
        children:[{type:"text",text:key1}]
      }
      nodes.push(nodes1)
      const key2=(i as string).slice(serchValue.length)
      let nodes2={
        name:"span",
        attrs:{style:"color:#000000;"},
        children:[{type:"text",text:key2}]
      }
      nodes.push(nodes2)
    }
    else{
      let nodes3={
        name:"span",
        attrs:{style:"color:#000000;"},
        children:[{type:"text",text:i}]
      }
      nodes.push(nodes3)
    }
    nodesAll.push(nodes)
  }
  return nodesAll
}