import {LitElement, html} from '../../../dependencies/lit-element/lit-element.js';
import shipEstimatesStyle from './shipEstimatesStyle.js';
class ShipEstimates extends LitElement {
    static get properties() {
        return {
          totalPcs:{type:Number},
          zipCode:{type:String},
          selectedCat:{type:String},
          boxes:{type:Array}
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
        <div>Total Boxes:${this.boxes.length} | Total Weight:${this.smallBoxWeightTotal+this.mediumBoxWeightTotal+this.largeBoxWeightTotal}</div>
        <div style="padding-top:5px;">
        <div class="tiny-progessbar">
            <div class="tiny-progessbarfill green" style="background-color:${this.boxes.length < 35 ? '#4CAF50' : this.boxes.length >= 35 && this.boxes.length < 45 ? '#daa520' : '#fa8072' }; width:${Math.floor((this.boxes.length/50)*100)}%">${Math.floor((this.boxes.length/50)*100)} %</div>
        </div>
        </div>
        <div class="container-flex" style="flex-direction:column; flex-wrap:wrap;">
            <div style="display:flex;flex-direction:row;margin-top:7px;flex-wrap:wrap;">
                <span class="box_info_area">
                    <div style="text-align:center;"><img src="./public/img/sm_box.png"></div>
                    <div style="font-weight:bold;font-size:18px;text-align:center;">${this.smallBoxNum}</div>
                    <div style="text-align:center;"><small>${this.smallBoxWeightPerBox}<small>lbs.<small> (Per Box)</small></small></small></div>
                    <div style="text-align:center;"><small>${this.smallBoxWeightTotal}<small>lbs.</small> <small>(Total)</small></small></div>
                </span>
                <span class="box_info_area" style="margin-top:-8px;">
                <div style="text-align:center;"><img src="./public/img/med_box.png"></div>
                    <div style="font-weight:bold;font-size:18px;text-align:center;">${this.mediumBoxNum}</div>
                    <div style="text-align:center;"><small>${this.mediumBoxWeightPerBox.l}<small>lbs.<small> (Per Box)</small></small></small></div>
                    <div style="text-align:center;"><small>${this.mediumBoxWeightTotal}<small>lbs.</small> <small>(Total)</small></small></div>
                </span>
                <span class="box_info_area" style="margin-top:-10px;">
                <div style="text-align:center;"><img src="./public/img/lrg_box.png"></div>
                    <div style="font-weight:bold;font-size:18px;text-align:center;">${this.largeBoxNum}</div>
                    <div style="text-align:center;"><small>${this.largeBoxWeightPerBox}<small>lbs.<small> (Per Box)</small></small></small></div>
                    <div style="text-align:center;"><small>${this.largeBoxWeightTotal}<small>lbs.</small> <small>(Total)</small></small></div>
                </span>
            </div>
            <div style="padding:7px;">
            <div>
                ${this.boxes.length <= 50 ? html`
                <label for="zip_input">Zip:</label>
                <input id="zip_input" type="text" @input=${this.updateZip} .value=${this.zipCode} style="width:78px;"/>
                <button ?disabled=${this.malformedZip} @click=${this.handleGetRates} class="btn btn-sm">Get Rates</button>` : html`
                <span style="color:#e80000;font-weight:bolder;">! Too many packages <small>(50 Pkg. Limit)</small></span>`}
            </div> 
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
