import {LitElement, html} from '../../../dependencies/lit-element/lit-element.js';
import savedBoxesStyle from './savedBoxesStyle.js';
class SavedBoxes extends LitElement {
    static get properties() {
        return {
          saved: {type:Array},
          //totalPcs:{type:Number},
        }
    }
    constructor(){
        super();
    }
    render(){
        return html`
               
                <div class="container-flex" style="flex-direction:column;">
                <h3>Saved Boxes</h3>
                    ${this.reduceSaved().map(category=>{
                        return html`
                            ${category.category}
                            boxes : ${category.totalBoxes}
                            weight : ${category.totalWeight}
                            <br />       
                        `;
                     })} 
                </div>
                <style>
                ${savedBoxesStyle}
                </style>
            `;
    }
    reduceSaved() {
        console.log("Cureent saved boxes",this.saved);
        const seenCategories = [];
        this.saved.forEach((box)=>{
            if (!seenCategories.find((el)=>el.category == box.category)) {
                seenCategories.push({category:box.category, totalBoxes:1, totalWeight:box.weight});
            } else {
                const index = seenCategories.indexOf(seenCategories.find((el)=>el.category == box.category));
                seenCategories.splice(index, 1, {category:box.category, totalBoxes:seenCategories[index].totalBoxes+1, totalWeight:seenCategories[index].totalWeight+box.weight})
            }
        })
        return seenCategories;
    }
}

customElements.define("saved-boxes", SavedBoxes);