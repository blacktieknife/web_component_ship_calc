import {LitElement, html} from '../../../dependencies/lit-element/lit-element.js';
import shipEstimatesStyle from './shipEstimatesStyle.js';
class ShipEstimates extends LitElement {
    static get properties() {
        return {
          totalPcs:{type:Number},
          zipCode:{type:String},
          selectedCat:{type:String}
        }
    }
    constructor(){
        super();
        this.smallBoxNum = 0;
        this.malformedZip = true;
        this.smallBoxWeightTotal = 0;
        this.smallBoxWeightPerBox = 0;
        this.largeBoxNum = 0;
        this.largeBoxWeightTotal = 0;
        this.largeBoxWeightPerBox = 0;
        this.mediumBoxNum = 0;
        this.mediumBoxWeightTotal = 0;
        this.mediumBoxWeightPerBox = 0;
        this.totalPcs = 0;
        this.zipCode = '';
    }
    render(){
        this.parseBoxes();
        return html`
        <h3>Estimates</h3>
        Total Boxes ${this.boxes.length}</h4>
        <div class="container-flex" style="flex-direction:column; flex-wrap:wrap;">
            small Box's:${this.smallBoxNum} | weight(per box):${this.smallBoxWeightPerBox} | total weight:${this.smallBoxWeightTotal}
            <br />
            medium Box's:${this.mediumBoxNum}| weight(per box):${this.mediumBoxWeightPerBox} | total weight:${this.mediumBoxWeightTotal}
            <br />
            large Box's:${this.largeBoxNum} | weight(per box):${this.largeBoxWeightPerBox} | total weight:${this.largeBoxWeightTotal}
            <br />
            <div style="padding:7px;">
            ${this.boxes.length < 50 ? html`
                <label for="zip_input">Zip:</label>
                <input id="zip_input" type="text" @input=${this.updateZip} .value=${this.zipCode} style="width:78px;"/>
                <button ?disabled=${this.malformedZip} @click=${this.handleGetRates} class="btn btn-sm">Get Rates</button>` : html`
                <span style="color:#e80000;font-weight:bolder;">! Too many packages <small>(50 Pkg. Limit)</small></span>`}
                
            </div>
        </div>
        <style>
        ${shipEstimatesStyle}
        </style>
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
    updateZip(e){
        this.zipCode = e.target.value;
        if(/^[0-9]{5}(?:-[0-9]{4})?$/.test(this.zipCode)) {
            this.malformedZip = false;
        } else {
            this.malformedZip = true;
        }
    }
    handleGetRates(){
        if(!this.malformedZip) {
            console.log("do stuff with this.boxes && other things",this.zipCode);
            this.dispatchEvent(new CustomEvent("getRates", {detail:this.boxes}))
        } else {
            alert("Malformed zip code.");
        }
       
    }
   
}

customElements.define("ship-estimates", ShipEstimates);
