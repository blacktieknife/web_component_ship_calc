import {LitElement, html} from '../lit-element/lit-element.js';

class ShipEstimates extends LitElement {
    static get properties() {
        return {
          categories: {type:Array},
          totalPcs:{type:Number},
          smallBoxNum:{type:Number},
          smallBoxWeightTotal:{type:Number},
          selectedCat:{type:String}
          //boxes:{type:Array},
         //saved:{type:Array}
        }
    }
    constructor(){
        super();
        this.smallBoxNum = 0;
        this.smallBoxWeightTotal = 0;
        this.smallBoxWeightPerBox = 0;
        this.largeBoxNum = 0;
        this.largeBoxWeightTotal = 0;
        this.largeBoxWeightPerBox = 0;
        this.mediumBoxNum = 0;
        this.mediumBoxWeightTotal = 0;
        this.mediumBoxWeightPerBox = 0;
        this.totalPcs = 0;
    }
    render(){
        this.parseBoxes();
        return html`
        <h4>Estimates Total Boxes ${this.boxes.length}</h4>
        small Box's:${this.smallBoxNum} | weight(per box):${this.smallBoxWeightPerBox} | total weight:${this.smallBoxWeightTotal}
        <br />
        medium Box's:${this.mediumBoxNum}| weight(per box):${this.mediumBoxWeightPerBox} | total weight:${this.mediumBoxWeightTotal}
        <br />
        large Box's:${this.largeBoxNum} | weight(per box):${this.largeBoxWeightPerBox} | total weight:${this.largeBoxWeightTotal}
        <br />
        `;   
    }
    parseBoxes() {
        this.smallBoxNum = 0;
        this.smallBoxWeightTotal = 0;
        this.smallBoxWeightPerBox = 0;
        this.largeBoxNum = 0;
        this.largeBoxWeightTotal = 0;
        this.largeBoxWeightPerBox = 0;
        this.mediumBoxNum = 0;
        this.mediumBoxWeightTotal = 0;
        this.mediumBoxWeightPerBox = 0;
        this.boxes.forEach(box=>{
            if (box.boxType == "LrgPkg") {
               this.largeBoxNum++; 
               this.largeBoxWeightPerBox = box.weight;
               this.largeBoxWeightTotal = this.largeBoxWeightPerBox * this.largeBoxNum;
            }
            if (box.boxType == "SmPkg") {
                this.smallBoxNum++;
                this.smallBoxWeightPerBox = box.weight;
                this.smallBoxWeightTotal = this.smallBoxWeightPerBox * this.smallBoxNum;
                
            }
            if (box.boxType == "MedPkg") {
                this.mediumBoxNum++;
                this.mediumBoxWeightPerBox = box.weight;
                this.mediumBoxWeightTotal = this.mediumBoxWeightPerBox * this.mediumBoxNum;
            }
        })
    }
    // async setEstimates(){
    //     this.smallBoxNum = 0;
    //     this.smallBoxWeightTotal = 0;
    //     this.smallBoxWeightPerBox = 0;
    //     this.largeBoxNum = 0;
    //     this.largeBoxWeightTotal = 0;
    //     this.largeBoxWeightPerBox = 0;
    //     this.mediumBoxNum = 0;
    //     this.mediumBoxWeightTotal = 0;
    //     this.mediumBoxWeightPerBox = 0;
    //     const cat = this.categories.find((el)=>el.category == this.selectedCat);
    //     if (this.totalPcs <= cat.maxPcsSmBox) {
    //         this.smallBoxNum = Math.ceil(this.totalPcs / cat.maxPcsSmBox);
    //         this.smallBoxWeightTotal = Math.ceil(this.totalPcs * cat.weight)+3;
    //         this.smallBoxWeightPerBox = Math.ceil(this.smallBoxWeightTotal / this.smallBoxNum);

            
    //     } else if (this.totalPcs > cat.maxPcsSmBox && this.totalPcs <= cat.maxPcsMdBox) { 
    //         this.mediumBoxNum = Math.ceil(this.totalPcs / cat.maxPcsMdBox);
    //         this.mediumBoxWeightTotal = Math.ceil(this.totalPcs * cat.weight)+3;
    //         this.mediumBoxWeightPerBox = Math.ceil(this.mediumBoxWeightTotal / this.mediumBoxNum);
    //         //over 50 but under 100 if ss_mesh
    //     } else if (this.totalPcs > cat.maxPcsMdBox && this.totalPcs < cat.maxPcsLgBox) { 
    //         const meduimRemainder = this.totalPcs - cat.maxPcsMdBox;
    //         if (meduimRemainder <= cat.maxPcsSmBox) {//check if remainder is less than 25
    //             //here ther is enough shirts for both medium and small box.
    //             //mediumbox
    //             console.log("here ther is enough shirts for both medium and small box", meduimRemainder)
    //             this.mediumBoxNum = Math.floor(this.totalPcs / cat.maxPcsMdBox);
    //             this.mediumBoxWeightTotal = Math.ceil((this.totalPcs - meduimRemainder) * cat.weight)+3;
    //             this.mediumBoxWeightPerBox = Math.ceil(this.mediumBoxWeightTotal / this.mediumBoxNum);
    //             //small box
    //             this.smallBoxNum = Math.ceil(meduimRemainder / cat.maxPcsSmBox);
    //             this.smallBoxWeightTotal = Math.ceil(meduimRemainder * cat.weight)+3;
    //             this.smallBoxWeightPerBox = Math.ceil(this.smallBoxWeightTotal / this.smallBoxNum);
    //         } else {//remainder is too large for small box. must use 1 large box
    //             this.largeBoxNum = Math.ceil(this.totalPcs / cat.maxPcsLgBox)
    //             this.largeBoxWeightTotal = Math.ceil(this.totalPcs * cat.weight)+3;
    //             this.largeBoxWeightPerBox = Math.ceil(this.largeBoxWeightTotal / this.largeBoxNum);
    //         }
    //     } else if (this.totalPcs % cat.maxPcsLgBox) {
    //         const largeRemainder = this.totalPcs % cat.maxPcsLgBox;
    //         if (largeRemainder <= cat.maxPcsSmBox) {
    //             //large box
    //             this.largeBoxNum = Math.floor(this.totalPcs / cat.maxPcsLgBox)
    //             this.largeBoxWeightTotal = Math.ceil((this.totalPcs-largeRemainder) * cat.weight)+3;
    //             this.largeBoxWeightPerBox = Math.ceil(this.largeBoxWeightTotal / this.largeBoxNum);
    //              //small box
    //              this.smallBoxNum = Math.ceil(largeRemainder / cat.maxPcsSmBox);
    //              this.smallBoxWeightTotal = Math.ceil(largeRemainder * cat.weight)+3;
    //              this.smallBoxWeightPerBox = Math.ceil(this.smallBoxWeightTotal / this.smallBoxNum);
    //         } else if (largeRemainder > cat.maxPcsSmBox && largeRemainder <= cat.maxPcsMdBox) {
    //              //large box
    //              this.largeBoxNum = Math.floor(this.totalPcs / cat.maxPcsLgBox)
    //              this.largeBoxWeightTotal = Math.ceil((this.totalPcs-largeRemainder) * cat.weight)+3;
    //              this.largeBoxWeightPerBox = Math.ceil(this.largeBoxWeightTotal / this.largeBoxNum);
    //               //meduim box
    //               this.mediumBoxNum = Math.ceil(largeRemainder / cat.maxPcsMdBox);
    //               this.mediumBoxWeightTotal = Math.ceil(largeRemainder * cat.weight)+3;
    //               this.mediumBoxWeightPerBox = Math.ceil(this.mediumBoxWeightTotal / this.mediumBoxNum);
    //         } else if (largeRemainder > cat.maxPcsMdBox && largeRemainder < cat.maxPcsLgBox) {
    //             //large box
    //             this.largeBoxNum = Math.floor(this.totalPcs / cat.maxPcsLgBox)
    //             this.largeBoxWeightTotal = Math.ceil((this.totalPcs-largeRemainder) * cat.weight)+3;
    //             this.largeBoxWeightPerBox = Math.ceil(this.largeBoxWeightTotal / this.largeBoxNum);
    //             const mediumRemainder = largeRemainder - cat.maxPcsMdBox;
    //             if (mediumRemainder <= cat.maxPcsSmBox) {
    //                 //medium box
    //                 this.mediumBoxNum = Math.floor(largeRemainder / cat.maxPcsMdBox);
    //                 this.mediumBoxWeightTotal = Math.ceil((largeRemainder - mediumRemainder) * cat.weight)+3;
    //                 this.mediumBoxWeightPerBox = Math.ceil(this.mediumBoxWeightTotal / this.mediumBoxNum);
    //                 //small box
    //                 this.smallBoxNum = Math.ceil(mediumRemainder / cat.maxPcsSmBox);
    //                 this.smallBoxWeightTotal = Math.ceil(mediumRemainder * cat.weight)+3;
    //                 this.smallBoxWeightPerBox = Math.ceil(this.smallBoxWeightTotal / this.smallBoxNum);
    //             } else {
    //                 this.largeBoxNum = Math.ceil(this.totalPcs / cat.maxPcsLgBox)
    //                 this.largeBoxWeightTotal = Math.ceil(this.totalPcs * cat.weight)+3;
    //                 this.largeBoxWeightPerBox = Math.ceil(this.largeBoxWeightTotal / this.largeBoxNum);
    //             }
    //         }
    //     } else {
       
    //         this.largeBoxNum = this.totalPcs / cat.maxPcsLgBox;
    //         this.largeBoxWeightTotal = Math.ceil(this.totalPcs * cat.weight)+3;
    //         this.largeBoxWeightPerBox = Math.ceil(this.largeBoxWeightTotal / this.largeBoxNum);
    //     }
    // }
}

/* <button @click="${()=>{this.decrement()}}">decrease</button> */
/* <button @click="${()=>{this.increment()}}">increase</button> */
customElements.define("ship-estimates", ShipEstimates);
// export default function(data) {
//     return html`
//     <h4>${data.title}</h4>
//     <button >increament</button>
//     `;
// }