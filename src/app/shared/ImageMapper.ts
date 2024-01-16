export class ImageMapper {
    public srcsAccess(itemName: string){
        const srcs:any = {
        "Classic Red Pullover Hoodie": "https://i.imgur.com/1twoaDy.jpeg",
        "Classic Heather Grey Hoodie" : "https://i.imgur.com/cHddUCu.jpeg",
        "Classic Grey Hooded Sweatshirt": "https://i.imgur.com/R2PN9Wq.jpeg",
        "Classic Black Hooded Sweatshirt": "https://i.imgur.com/cSytoSD.jpeg"
        }
        return srcs[itemName]
      }

}