import {LitElement, html} from '../../../dependencies/lit-element/lit-element.js';

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
                <div>
                    <h4>Saved Boxes</h4>
                    ${this.reduceSaved().map(category=>{
                        return html`
                        <div>
                            <span>${category.category}</span>
                            <span>boxes : ${category.totalBoxes}</span>
                            <span>weight : ${category.totalWeight}</span>
                        </div>
                        `;
                     })} 
                </div>
            `;
    }
    reduceSaved() {
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