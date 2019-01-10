import {LitElement, html} from '../dependencies/lit-element/lit-element.js';

import './components/shipCalcForm/ShipCalcForm.js';
import './components/shipEstimates/ShipEstimates.js';
import './components/savedBoxes/SavedBoxes.js';
import './components/shipRates/ShipRates.js';
import './components/RipInput.js';

import appStyle from './appStyle.js';
import loaderCss from './helpers/loaderCss.js';
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
          isLoading:{type:Boolean},
          saved:{type:Array}
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
            <div>
                <ship-rates 
                    .rates="${this.rates}"
                    @resetShipCalc="${this.handleReset}"
                >
                </ship-rates>
            </div>
            `;
        } else {
            return html`
            <style>
                ${appStyle}
            </style>
            
             ${this.isLoading ? html`
                <style>
                    ${loaderCss}
                </style>
                <div class="isLoading">
                <div>Fetching Rates</div>
                    <div class="loader"><div></div><div></div><div></div><div></div></div>
                </div>
             `:null}
                <div class="header_section" style="display:none;">
                    style:${this.selectedCategory} | totalPcs:${this.currentTotalPcs}
                </div>
                <div class="container-flex" style="flex-direction:column;padding:5px;"> 
                <div style="display:flex; align-items:center; flex-direction:column;">
                    <div style="display:inline-block;width:100%">
                            <calc-form 
                                .savedCategories=${this.currentSavedCategories}
                                .savedBoxesLength=${this.currentBoxes.concat(this.saved).length}
                                @categorySelected=${this.handleSelectedCategory} 
                                @currentTotalPcs=${this.handleCurrentTotal}
                                @updateBoxesArray=${this.handleUpdateBoxes}
                                @clearBoxesArray=${this.handleClearBoxes}
                                @addCategory=${this.handleAddCategory}
                                >
                            </calc-form>
                        </div>
                        <div style="display:inline-block;width:100%">
                            ${this.currentBoxes.length > 0 || this.saved.length > 0 ? html`
                            <ship-estimates
                                .boxes=${this.currentBoxes.concat(this.saved)} 
                                .totalPcs=${this.currentTotalPcs} 
                                .selectedCat=${this.selectedCategory}
                                @getRates=${this.handleGetRates}
                                >     
                            </ship-estimates>` : html`
                                <div style="text-align:center;width:100%;min-height:193.5px;margin-top:15px;display:flex;align-items:center;flex-direction:column;font-size:22px;">
                                    <h4 style="margin-top:5px;margin-bottom:5px;">Shipping Rate Calculator</h4>
                                    <small>
                                        <div style="margin:10px 0px;padding:5px;background-color:lightblue;border-radius:4px;">
                                            To get started, pick a category & enter the total number pieces of that category you are shipping
                                        </div>
                                        <div style="background-color:lightgreen;border-radius:3px;padding:5px;">
                                            <small>
                                                <small style="padding:10px 0px;">Note: you can add multiple categories to your shipment</small>
                                            </small>
                                        </div>
                                    </small>
                                </div>`}
                        </div>
                        <div style="display:inline-block">
                            ${this.saved.length > 0 ? 
                                html`<saved-boxes 
                                    .saved=${this.saved}
                                    @removeFromSaved=${this.handleRemoveFromSaved}
                                >
                                </saved-boxes>
                                `: null }
                        </div>
                    </div>
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
            this.rates = JSON.parse(rates);
            this.isLoading = false;
        })
        .catch(err=>{
            console.log("error in fetching rates", err);
            this.isLoading = false;
        })
    }
    handleReset() {
        this.currentBoxes = [];
        this.saved = [];
        this.rates = [];
        this.currentSavedCategories = [];
        this.selectedCategory = null;
        this.currentTotalPcs = 0;
        this.isLoading = false;
    }
    handleRemoveFromSaved(e) {
        this.saved = this.saved.filter(box=>box.category !== e.detail);
        this.currentSavedCategories = this.currentSavedCategories.filter(cat=>cat !== e.detail);
    }
}

customElements.define('shipping-calc', ShipCostCalc);