import {LitElement, html} from './lit-element/lit-element.js';
import './components/ShipCalcForm.js';
import './components/ShipEstimates.js';
import {repeat} from "./lit/directives/repeat.js";
import {until} from "./lit/directives/until.js";

class ShipCostCalc extends LitElement {
    static get properties() {
        return {
          selectedCategory:{type:String},
          currentTotalPcs:{type:Number},
          currentBoxes:{type:Array}
        }
    }
    constructor(){
        super();
        this.currentBoxes = [];
        this.saved = [];
        this.selectedCategory = null;
        this.currentTotalPcs = 0;
        this.categories = [
            {
                category:"ss_mesh",
                weight:0.336,
                maxPcsLgBox:100,
                maxPcsMdBox:50,
                maxPcsSmBox:25,
                name:"Short Sleeve MESH"
            },
            {
                category:"ls_mesh",
                weight:0.366,
                maxPcsLgBox:80,
                maxPcsMdBox:40,
                maxPcsSmBox:20,
                name:"Long Seeve MESH"
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
                name:"Tank Top MESH"
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
    render(){
        return html`
            style:${this.selectedCategory} | totalPcs:${this.currentTotalPcs}
            <calc-form 
                .categories=${this.categories} 
                .boxInfo=${this.boxes}
                @categorySelected=${this.handleSelectedCategory} 
                @currentTotalPcs=${this.handleCurrentTotal}
                @updateBoxesArray=${this.handleUpdateBoxes}
                @clearBoxesArray=${this.handleClearBoxes}
                @addCategory=${this.handleAddCategory}
                >
            </calc-form>
            ${this.currentBoxes.length > 0 || this.saved.length > 0 ? html`
            <ship-estimates 
                .boxes=${this.currentBoxes.concat(this.saved)} 
                .totalPcs=${this.currentTotalPcs} 
                .selectedCat=${this.selectedCategory}>
            </ship-estimates>` : ""} 
        `;
    }
    handleSelectedCategory(e) {
        const newCategory = e.detail && e.detail.trim() !== '' ? e.detail : false;
        if(newCategory) {
            this.selectedCategory = newCategory;
        } else {
            this.selectedCategory = null;
        }
        console.log("Cureent selected category changed",this.selectedCategory)
    }
    handleCurrentTotal(e) {
        this.currentTotalPcs = e.detail;
        console.log("CurrentTotal is Set to :",this.currentTotalPcs);
    }
    handleUpdateBoxes(e) {
        this.currentBoxes = e.detail;
        console.log("CurrentBoxes is Set to :",this.currentBoxes);
    }
    handleClearBoxes() {
        this.currentBoxes = [];
    }
    handleAddCategory() {   
        this.saved = this.currentBoxes.concat(this.saved);
        this.currentBoxes = [];
        this.currentTotalPcs = 0;
        this.selectedCategory = null;
        //console.log("hanldeing category add", this.currentBoxes, this.saved)
    }
}

customElements.define('shipping-calc', ShipCostCalc);