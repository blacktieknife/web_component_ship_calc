import {LitElement, html} from '../../../dependencies/lit-element/lit-element.js';
import shipRatesStyle from './shipRatesStyle.js';

class ShipRates extends LitElement {
    render(){
        return html`
            <style>
            ${shipRatesStyle}
            </style>
            <h4>Estimated Rates</h4>
            <ul>
                ${this.rates.map(rate=>html`
                    <li>
                        <u>${rate.service}</u><br /> 
                        <small>Published:&nbsp;<span class="money">${rate.prate}</span> &nbsp; Negotiatied:&nbsp;<span class="money">${rate.rate}</span></small>
                    </li>
                `)}
            </ul>
            <div style="text-align:center;margin-top:7px;margin-bottom:7px;">
                <button @click=${this.handleReset}>Reset</button>
            </div>
            `;
    }
    handleReset() {
        this.dispatchEvent(new CustomEvent('resetShipCalc'))
    }
}

customElements.define('ship-rates', ShipRates);