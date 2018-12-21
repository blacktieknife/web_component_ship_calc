import {LitElement, html} from '../lit-element/lit-element.js';

class ShipCalcForm extends LitElement {
    static get properties() {
        return {
          category: {type:String},
          totalPcs:{type:Number},
          //boxes:{type:Array},
         //saved:{type:Array}
        }
    }
    constructor(){
        super();
        this.category = null;
        this.totalPcs = 0;
        this.smallBoxNum = 0;
        this.smallBoxWeightTotal = 0;
        this.smallBoxWeightPerBox = 0;
        this.largeBoxNum = 0;
        this.largeBoxWeightTotal = 0;
        this.largeBoxWeightPerBox = 0;
        this.mediumBoxNum = 0;
        this.mediumBoxWeightTotal = 0;
        this.mediumBoxWeightPerBox = 0;
    }
    render(){
        return html`
            <h4>Calculate UPS rates</h4>
            <form @submit=${(e)=>{e.preventDefault()}}>
                <label for="pcs_num_input">Total Pcs.</label>
                <input type="number" id="pcs_num_input" @change=${this.handleTotalPcsChange}/>
                <br />
                <label for="cat_input">Select Category</label>
                <select id="cat_input" @change=${this.handleCategoryChange}>
                    <option value="">Select Category</option>
                    ${this.categories.map((style)=>{
                        return html`
                                <option .value="${style.category}">${style.name}</option>
                            `;
                    })}
                </select>
                <button title="Add multiple categories to shipment" type="button" ?disabled=${this.category == null || this.totalPcs < 1} class="btn btn-primary btn-sm" id="add_cat_btn" @click=${this.handleAddCategory}>Add Category</button>
            </form>
            `;
    }
    handleCategoryChange(e){
        console.log(e.target.value.trim())
        if(e.target.value.trim() == '') {
            this.category = null;
        } else {
            this.category = e.target.value.trim();
        }
        this.setEstimates();
        this.dispatchEvent(new CustomEvent('categorySelected',{detail: this.category}));
        
    }
    handleTotalPcsChange(e){
        this.totalPcs = e.target.value;
        if (this.totalPcs > 0) {
            this.setEstimates();
            this.dispatchEvent(new CustomEvent("currentTotalPcs", {detail:this.totalPcs}));
        }
        
    }
    handleAddCategory(){
        this.dispatchEvent(new CustomEvent("addCategory"));
    }
    setEstimates(){
        if(this.category && this.totalPcs > 0) {
        this.smallBoxNum = 0;
        this.smallBoxWeightTotal = 0;
        this.smallBoxWeightPerBox = 0;
        this.largeBoxNum = 0;
        this.largeBoxWeightTotal = 0;
        this.largeBoxWeightPerBox = 0;
        this.mediumBoxNum = 0;
        this.mediumBoxWeightTotal = 0;
        this.mediumBoxWeightPerBox = 0;
        const cat = this.categories.find((el)=>el.category == this.category);
        if (this.totalPcs <= cat.maxPcsSmBox) {
            this.smallBoxNum = Math.ceil(this.totalPcs / cat.maxPcsSmBox);
            this.smallBoxWeightTotal = Math.ceil(this.totalPcs * cat.weight)+3;
            this.smallBoxWeightPerBox = Math.ceil(this.smallBoxWeightTotal / this.smallBoxNum);

                
            } else if (this.totalPcs > cat.maxPcsSmBox && this.totalPcs <= cat.maxPcsMdBox) { 
                this.mediumBoxNum = Math.ceil(this.totalPcs / cat.maxPcsMdBox);
                this.mediumBoxWeightTotal = Math.ceil(this.totalPcs * cat.weight)+3;
                this.mediumBoxWeightPerBox = Math.ceil(this.mediumBoxWeightTotal / this.mediumBoxNum);
                //over 50 but under 100 if ss_mesh
            } else if (this.totalPcs > cat.maxPcsMdBox && this.totalPcs < cat.maxPcsLgBox) { 
                const meduimRemainder = this.totalPcs - cat.maxPcsMdBox;
                if (meduimRemainder <= cat.maxPcsSmBox) {//check if remainder is less than 25
                    //here ther is enough shirts for both medium and small box.
                    //mediumbox
                    console.log("here ther is enough shirts for both medium and small box", meduimRemainder)
                    this.mediumBoxNum = Math.floor(this.totalPcs / cat.maxPcsMdBox);
                    this.mediumBoxWeightTotal = Math.ceil((this.totalPcs - meduimRemainder) * cat.weight)+3;
                    this.mediumBoxWeightPerBox = Math.ceil(this.mediumBoxWeightTotal / this.mediumBoxNum);
                    //small box
                    this.smallBoxNum = Math.ceil(meduimRemainder / cat.maxPcsSmBox);
                    this.smallBoxWeightTotal = Math.ceil(meduimRemainder * cat.weight)+3;
                    this.smallBoxWeightPerBox = Math.ceil(this.smallBoxWeightTotal / this.smallBoxNum);
                } else {//remainder is too large for small box. must use 1 large box
                    this.largeBoxNum = Math.ceil(this.totalPcs / cat.maxPcsLgBox)
                    this.largeBoxWeightTotal = Math.ceil(this.totalPcs * cat.weight)+3;
                    this.largeBoxWeightPerBox = Math.ceil(this.largeBoxWeightTotal / this.largeBoxNum);
                }
            } else if (this.totalPcs % cat.maxPcsLgBox) {
                const largeRemainder = this.totalPcs % cat.maxPcsLgBox;
                if (largeRemainder <= cat.maxPcsSmBox) {
                    //large box
                    this.largeBoxNum = Math.floor(this.totalPcs / cat.maxPcsLgBox)
                    this.largeBoxWeightTotal = Math.ceil((this.totalPcs-largeRemainder) * cat.weight)+3;
                    this.largeBoxWeightPerBox = Math.ceil(this.largeBoxWeightTotal / this.largeBoxNum);
                    //small box
                    this.smallBoxNum = Math.ceil(largeRemainder / cat.maxPcsSmBox);
                    this.smallBoxWeightTotal = Math.ceil(largeRemainder * cat.weight)+3;
                    this.smallBoxWeightPerBox = Math.ceil(this.smallBoxWeightTotal / this.smallBoxNum);
                } else if (largeRemainder > cat.maxPcsSmBox && largeRemainder <= cat.maxPcsMdBox) {
                    //large box
                    this.largeBoxNum = Math.floor(this.totalPcs / cat.maxPcsLgBox)
                    this.largeBoxWeightTotal = Math.ceil((this.totalPcs-largeRemainder) * cat.weight)+3;
                    this.largeBoxWeightPerBox = Math.ceil(this.largeBoxWeightTotal / this.largeBoxNum);
                    //meduim box
                    this.mediumBoxNum = Math.ceil(largeRemainder / cat.maxPcsMdBox);
                    this.mediumBoxWeightTotal = Math.ceil(largeRemainder * cat.weight)+3;
                    this.mediumBoxWeightPerBox = Math.ceil(this.mediumBoxWeightTotal / this.mediumBoxNum);
                } else if (largeRemainder > cat.maxPcsMdBox && largeRemainder < cat.maxPcsLgBox) {
                    //large box
                    this.largeBoxNum = Math.floor(this.totalPcs / cat.maxPcsLgBox)
                    this.largeBoxWeightTotal = Math.ceil((this.totalPcs-largeRemainder) * cat.weight)+3;
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
                        this.largeBoxNum = Math.ceil(this.totalPcs / cat.maxPcsLgBox)
                        this.largeBoxWeightTotal = Math.ceil(this.totalPcs * cat.weight)+3;
                        this.largeBoxWeightPerBox = Math.ceil(this.largeBoxWeightTotal / this.largeBoxNum);
                    }
                }
            } else {
                this.largeBoxNum = this.totalPcs / cat.maxPcsLgBox;
                this.largeBoxWeightTotal = Math.ceil(this.totalPcs * cat.weight)+3;
                this.largeBoxWeightPerBox = Math.ceil(this.largeBoxWeightTotal / this.largeBoxNum);
            }
            
            let boxes = [];
            if(this.largeBoxNum > 0) {
                const largeBoxInfo = this.boxInfo.find(el=>el.type == "large");
                for(let i=0; i<this.largeBoxNum; i++) {
                    boxes.push({category:this.category, boxType:"LrgPkg", weight:this.largeBoxWeightPerBox, dimensions:largeBoxInfo})
                }
            }
            if(this.mediumBoxNum > 0) {
                const mediumBoxInfo = this.boxInfo.find(el=>el.type == "medium");
                for(let i=0; i<this.mediumBoxNum; i++) {
                    boxes.push({category:this.category, boxType:"MedPkg", weight:this.mediumBoxWeightPerBox, dimensions:mediumBoxInfo})
                }
            }
            if(this.smallBoxNum > 0) {
                const smallBoxInfo = this.boxInfo.find(el=>el.type == "small");
                for(let i=0; i<this.smallBoxNum; i++) {
                    boxes.push({category:this.category, boxType:"SmPkg", weight:this.smallBoxWeightPerBox, dimensions:smallBoxInfo})
                }
            }
            this.dispatchEvent(new CustomEvent("updateBoxesArray",{detail:boxes}));
        }
    }
}

{/* <button @click="${()=>{this.decrement()}}">decrease</button> */}
{/* <button @click="${()=>{this.increment()}}">increase</button> */}
customElements.define("calc-form", ShipCalcForm);
// export default function(data) {
//     return html`
//     <h4>${data.title}</h4>
//     <button >increament</button>
//     `;
// }