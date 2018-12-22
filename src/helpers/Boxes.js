class Boxes {
    constructor() {
        this.returnBoxesArray = [];
        this.smallBoxNum = 0;
        this.smallBoxWeightTotal = 0;
        this.smallBoxWeightPerBox = 0;
        this.largeBoxNum = 0;
        this.largeBoxWeightTotal = 0;
        this.largeBoxWeightPerBox = 0;
        this.mediumBoxNum = 0;
        this.mediumBoxWeightTotal = 0;
        this.mediumBoxWeightPerBox = 0; 
        this.categories = [
            {
                category:"ss_mesh",
                weight:0.336,
                maxPcsLgBox:100,
                maxPcsMdBox:50,
                maxPcsSmBox:25,
                name:"Short Sleeve Mesh"
            },
            {
                category:"ls_mesh",
                weight:0.366,
                maxPcsLgBox:80,
                maxPcsMdBox:40,
                maxPcsSmBox:20,
                name:"Long Seeve Mesh"
            },
            {
                category:"ss_hp",
                weight:0.364,
                maxPcsLgBox:100,
                maxPcsMdBox:50,
                maxPcsSmBox:25,
                name:"Short Sleeve HP"
            },
            {
                category:"ls_hp",
                weight:0.423,
                maxPcsLgBox:80,
                maxPcsMdBox:40,
                maxPcsSmBox:20,
                name:"Long Sleeve HP"
            },
            {
                category:"yss_mesh",
                weight:0.235,
                maxPcsLgBox:140,
                maxPcsMdBox:65,
                maxPcsSmBox:35,
                name:"Youth Mesh"
            },
            {
                category:"qzip_hp",
                weight:0.465,
                maxPcsLgBox:65,
                maxPcsMdBox:25,
                maxPcsSmBox:15,
                name:"Quater Zips HP"
            },
            {
                category:"sp_hat",
                weight:0.156,
                maxPcsLgBox:200,
                maxPcsMdBox:60,
                maxPcsSmBox:40,
                name:"Sport Hat"
            },
            {
                category:"tank_mesh",
                weight:0.229,
                maxPcsLgBox:130,
                maxPcsMdBox:60,
                maxPcsSmBox:40,
                name:"Tank Top Mesh"
            },
        ];
        this.boxes = [
            {
                type:'small',
                width: 15,
                height: 6,
                length: 15
            },
            {
                type:'medium',
                width: 15,
                height: 15,
                length: 11
            },
            {
                type:'large',
                width: 18,
                height: 10,
                length: 25,
            },
        ];
    }
    returnBoxes(category, totalPcs) {
        if(category && totalPcs > 0) {
            this.smallBoxNum = 0;
            this.smallBoxWeightTotal = 0;
            this.smallBoxWeightPerBox = 0;
            this.largeBoxNum = 0;
            this.largeBoxWeightTotal = 0;
            this.largeBoxWeightPerBox = 0;
            this.mediumBoxNum = 0;
            this.mediumBoxWeightTotal = 0;
            this.mediumBoxWeightPerBox = 0;  
            const cat = this.categories.find((el)=>el.category == category);
            if (totalPcs <= cat.maxPcsSmBox) {
                this.smallBoxNum = Math.ceil(totalPcs / cat.maxPcsSmBox);
                this.smallBoxWeightTotal = Math.ceil(totalPcs * cat.weight)+3;
                this.smallBoxWeightPerBox = Math.ceil(this.smallBoxWeightTotal / this.smallBoxNum);
    
                    
                } else if (totalPcs > cat.maxPcsSmBox && totalPcs <= cat.maxPcsMdBox) { 
                    this.mediumBoxNum = Math.ceil(totalPcs / cat.maxPcsMdBox);
                    this.mediumBoxWeightTotal = Math.ceil(totalPcs * cat.weight)+3;
                    this.mediumBoxWeightPerBox = Math.ceil(this.mediumBoxWeightTotal / this.mediumBoxNum);
                    //over 50 but under 100 if ss_mesh
                } else if (totalPcs > cat.maxPcsMdBox && totalPcs < cat.maxPcsLgBox) { 
                    const meduimRemainder = totalPcs - cat.maxPcsMdBox;
                    if (meduimRemainder <= cat.maxPcsSmBox) {//check if remainder is less than 25
                        //here ther is enough shirts for both medium and small box.
                        //mediumbox
                        this.mediumBoxNum = Math.floor(totalPcs / cat.maxPcsMdBox);
                        this.mediumBoxWeightTotal = Math.ceil((totalPcs - meduimRemainder) * cat.weight)+3;
                        this.mediumBoxWeightPerBox = Math.ceil(this.mediumBoxWeightTotal / this.mediumBoxNum);
                        //small box
                        this.smallBoxNum = Math.ceil(meduimRemainder / cat.maxPcsSmBox);
                        this.smallBoxWeightTotal = Math.ceil(meduimRemainder * cat.weight)+3;
                        this.smallBoxWeightPerBox = Math.ceil(this.smallBoxWeightTotal / this.smallBoxNum);
                    } else {//remainder is too large for small box. must use 1 large box
                        this.largeBoxNum = Math.ceil(totalPcs / cat.maxPcsLgBox)
                        this.largeBoxWeightTotal = Math.ceil(totalPcs * cat.weight)+3;
                        this.largeBoxWeightPerBox = Math.ceil(this.largeBoxWeightTotal / this.largeBoxNum);
                    }
                } else if (totalPcs % cat.maxPcsLgBox) {
                    const largeRemainder = totalPcs % cat.maxPcsLgBox;
                    if (largeRemainder <= cat.maxPcsSmBox) {
                        //large box
                        this.largeBoxNum = Math.floor(totalPcs / cat.maxPcsLgBox)
                        this.largeBoxWeightTotal = Math.ceil((totalPcs-largeRemainder) * cat.weight)+3;
                        this.largeBoxWeightPerBox = Math.ceil(this.largeBoxWeightTotal / this.largeBoxNum);
                        //small box
                        this.smallBoxNum = Math.ceil(largeRemainder / cat.maxPcsSmBox);
                        this.smallBoxWeightTotal = Math.ceil(largeRemainder * cat.weight)+3;
                        this.smallBoxWeightPerBox = Math.ceil(this.smallBoxWeightTotal / this.smallBoxNum);
                    } else if (largeRemainder > cat.maxPcsSmBox && largeRemainder <= cat.maxPcsMdBox) {
                        //large box
                        this.largeBoxNum = Math.floor(totalPcs / cat.maxPcsLgBox)
                        this.largeBoxWeightTotal = Math.ceil((totalPcs-largeRemainder) * cat.weight)+3;
                        this.largeBoxWeightPerBox = Math.ceil(this.largeBoxWeightTotal / this.largeBoxNum);
                        //meduim box
                        this.mediumBoxNum = Math.ceil(largeRemainder / cat.maxPcsMdBox);
                        this.mediumBoxWeightTotal = Math.ceil(largeRemainder * cat.weight)+3;
                        this.mediumBoxWeightPerBox = Math.ceil(this.mediumBoxWeightTotal / this.mediumBoxNum);
                    } else if (largeRemainder > cat.maxPcsMdBox && largeRemainder < cat.maxPcsLgBox) {
                        //large box
                        this.largeBoxNum = Math.floor(totalPcs / cat.maxPcsLgBox)
                        this.largeBoxWeightTotal = Math.ceil((totalPcs-largeRemainder) * cat.weight)+3;
                        this.largeBoxWeightPerBox = Math.ceil(this.largeBoxWeightTotal / this.largeBoxNum);
                        const mediumRemainder = largeRemainder - cat.maxPcsMdBox;
                        if (mediumRemainder <= cat.maxPcsSmBox) {
                            //medium box
                            this.mediumBoxNum = Math.floor(largeRemainder / cat.maxPcsMdBox);
                            this.mediumBoxWeightTotal = Math.ceil((largeRemainder - mediumRemainder) * cat.weight)+3;
                            this.mediumBoxWeightPerBox = Math.ceil(this.mediumBoxWeightTotal / this.mediumBoxNum);
                            //small box
                            this.smallBoxNum = Math.ceil(mediumRemainder / cat.maxPcsSmBox);
                            this.smallBoxWeightTotal = Math.ceil(mediumRemainder * cat.weight)+3;
                            this.smallBoxWeightPerBox = Math.ceil(this.smallBoxWeightTotal / this.smallBoxNum);
                        } else {
                            this.largeBoxNum = Math.ceil(totalPcs / cat.maxPcsLgBox)
                            this.largeBoxWeightTotal = Math.ceil(totalPcs * cat.weight)+3;
                            this.largeBoxWeightPerBox = Math.ceil(this.largeBoxWeightTotal / this.largeBoxNum);
                        }
                    }
                } else {
                    this.largeBoxNum = totalPcs / cat.maxPcsLgBox;
                    this.largeBoxWeightTotal = Math.ceil(totalPcs * cat.weight)+3;
                    this.largeBoxWeightPerBox = Math.ceil(this.largeBoxWeightTotal / this.largeBoxNum);
                }
                
                this.returnBoxesArray = [];
                if(this.largeBoxNum > 0) {
                    const largeBoxInfo = this.boxes.find(el=>el.type == "large");
                    for(let i=0; i<this.largeBoxNum; i++) {
                        this.returnBoxesArray.push({category:category, name:cat.name,  boxType:"LrgPkg", weight:this.largeBoxWeightPerBox, dimensions:largeBoxInfo})
                    }
                }
                if(this.mediumBoxNum > 0) {
                    const mediumBoxInfo = this.boxes.find(el=>el.type == "medium");
                    for(let i=0; i<this.mediumBoxNum; i++) {
                        this.returnBoxesArray.push({category:category, name:cat.name, boxType:"MedPkg", weight:this.mediumBoxWeightPerBox, dimensions:mediumBoxInfo})
                    }
                }
                if(this.smallBoxNum > 0) {
                    const smallBoxInfo = this.boxes.find(el=>el.type == "small");
                    for(let i=0; i<this.smallBoxNum; i++) {
                        this.returnBoxesArray.push({category:category, name:cat.name, boxType:"SmPkg", weight:this.smallBoxWeightPerBox, dimensions:smallBoxInfo})
                    }
                }
            }
            return this.returnBoxesArray
            
    }
}

export default Boxes;
