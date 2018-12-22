import {LitElement, html} from '../dependencies/lit-element/lit-element.js';
import './components/shipCalcForm/ShipCalcForm.js';
import './components/shipEstimates/ShipEstimates.js';
import './components/savedBoxes/SavedBoxes.js';
import appStyle from './appStyle.js';
import ups from './helpers/upsHelper.js';
import {repeat} from "../dependencies/lit/directives/repeat.js";
import {until} from "../dependencies/lit/directives/until.js";

class ShipCostCalc extends LitElement {
    static get properties() {
        return {
          selectedCategory:{type:String},
          currentTotalPcs:{type:Number},
          currentBoxes:{type:Array},
          rates:{type:Array},
          isLoading:{type:Boolean}
          //currentSavedCategories:{type:Array}
        }
    }
    constructor(){
        super();
        this.currentBoxes = [];
        this.saved = [];
        this.rates = [];
        this.currentSavedCategories = [];
        this.selectedCategory = null;
        this.currentTotalPcs = 0;
        this.isLoading = false;
    }
    render(){
        if (this.rates.length > 0) {
            return html`
            <style>
                ${appStyle}
            </style>
            <div class="container">
                <h1>Rates Component here.</h1>
                <button @click=${this.handleReset}>reset</button>
            </div>
            `;
        } else {
            return html`
            <style>
                ${appStyle}
            </style>
            <div class="container">
             ${this.isLoading ? html`<div class="isLoading">Is loadinged</div>`:null}
                <div class="header_section">
                style:${this.selectedCategory} | totalPcs:${this.currentTotalPcs}
                </div>
                <div class="container-flex">
                    <div style="display:inline-flex">
                        <calc-form 
                            .savedCategories=${this.currentSavedCategories}
                            @categorySelected=${this.handleSelectedCategory} 
                            @currentTotalPcs=${this.handleCurrentTotal}
                            @updateBoxesArray=${this.handleUpdateBoxes}
                            @clearBoxesArray=${this.handleClearBoxes}
                            @addCategory=${this.handleAddCategory}
                            >
                        </calc-form>
                    </div>
                    <div style="display:inline-flex">
                        ${this.currentBoxes.length > 0 || this.saved.length > 0 ? html`
                        <ship-estimates
                            .boxes=${this.currentBoxes.concat(this.saved)} 
                            .totalPcs=${this.currentTotalPcs} 
                            .selectedCat=${this.selectedCategory}
                            @getRates=${this.handleGetRates}
                            >     
                        </ship-estimates>` : ""}
                    </div>
                </div>
                ${this.saved.length > 0 ? 
                    html`<saved-boxes 
                        .saved=${this.saved}
                    >
                    </saved-boxes>
                `: null }
            </div>
            `;
        }
    }
    handleSelectedCategory(e) {
        const newCategory = e.detail && e.detail.trim() !== '' ? e.detail : false;
        if(newCategory) {
            this.selectedCategory = newCategory;
        } else {
            this.selectedCategory = null;
        }
    }
    handleCurrentTotal(e) {
        this.currentTotalPcs = e.detail;
    }
    handleUpdateBoxes(e) {
        this.currentBoxes = e.detail;
    }
    handleClearBoxes() {
        this.currentBoxes = [];
    }
    handleAddCategory(e) {   
        this.saved = this.currentBoxes.concat(this.saved);
        this.currentBoxes = [];
        this.currentSavedCategories = e.detail;
        this.currentTotalPcs = 0;
        this.selectedCategory = null;
    }
    handleGetRates(e) {
        this.isLoading = true;
        ups.mockFetchRates(e.detail)
        .then(rates=>{
            console.log("return rates ffrom ups", JSON.parse(rates));
            this.rates = JSON.parse(rates);
            this.isLoading = false;
        })
        .catch(err=>{
            console.log("error in fetching rates", err);
            this.isLoading = false;
        })
    }
    handleReset(){
        this.currentBoxes = [];
        this.saved = [];
        this.rates = [];
        this.currentSavedCategories = [];
        this.selectedCategory = null;
        this.currentTotalPcs = 0;
        this.isLoading = false;
    }
}

customElements.define('shipping-calc', ShipCostCalc);