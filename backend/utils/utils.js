const utils={}
module.exports= utils

utils.findNotItems=(item,compareList)=>{
    let returnValue=false
    let indexOf=-1
    compareList.forEach((data,index)=>{
        if (data.category==item){
            returnValue=true
            indexOf=index
        }
    })
    return [returnValue,indexOf]
}

utils.makeSubcategory=(lists)=>{
    let new_list=[]
    lists.forEach(data=>{
        let value=false
        new_list.forEach(category=>{
            (category===data)?value=true:null
        })
        if (!value) new_list.push(data)
    })
    return new_list
}

utils.categoryFilter=(list)=>{
    let new_array=[]
    let loop_number=list.length
    for (let i=0;i<loop_number;i++){
        const add_elemnt=list.at(0)
        list=list.slice(1)
        let [value,index]=utils.findNotItems(add_elemnt.category,new_array)
        if (value){
            new_array[index].subCategory=utils.makeSubcategory(new_array[index].subCategory.concat(add_elemnt.subCategory))
        }
        else{
            new_array.push(add_elemnt)
        }
    }
    return new_array
}