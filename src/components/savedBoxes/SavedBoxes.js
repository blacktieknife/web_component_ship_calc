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
               
                <div class="container-flex" style="flex-wrap:wrap;">
                    ${this.reduceSaved().map(category=>{
                        return html`
                         <div class="saved_box_badge">${category.name}</div>   
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
                seenCategories.push({category:box.category, name:box.name, totalBoxes:1, totalWeight:box.weight});
            } else {
                const index = seenCategories.indexOf(seenCategories.find((el)=>el.category == box.category));
                seenCategories.splice(index, 1, {category:box.category, name:box.name, totalBoxes:seenCategories[index].totalBoxes+1, totalWeight:seenCategories[index].totalWeight+box.weight})
            }
        })
        return seenCategories;
    }
}

customElements.define("saved-boxes", SavedBoxes);