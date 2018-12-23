import {LitElement, html} from '../../../dependencies/lit-element/lit-element.js';
import savedBoxesStyle from './savedBoxesStyle.js';
class SavedBoxes extends LitElement {
    static get properties() {
        return {
          saved: {type:Array},
          x:{type:Number},
          y:{type:Number},
          displayOverlay:{type:Boolean}
        }
    }
    constructor(){
        super();
        this.x = 0;
        this.y = 0;
        this.displayOverlay = false;
        this.overLayText;
    }
    render(){
        return html`
                ${this.displayOverlay ? this.showOverLay() : null}
                <div class="container-flex" style="flex-direction:row;flex-wrap:wrap;">
                    ${this.reduceSaved().map(category=>{
                        return html`
                         <div class="saved_box_badge" 
                            id="${category.category}" 
                            @mouseover=${this.updateMousePos} 
                            @click=${this.removeSaved}
                            @mouseout=${this.hideOverLay}
                         >
                            ${category.name.split(" ").map(letter=>letter.substring(0,1)).join('')}
                         </div>   
                        `;
                     })} 
                </div>
                <style>
                ${savedBoxesStyle}
                </style>
            `;
    }
    reduceSaved() {
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
    removeSaved(e) {
        //send custom event to remove from saved array were category = sent category
        this.displayOverlay = false;
        const selectedCategory = e.target.id;
        const selectedText = e.target.innerText;
        setTimeout(()=>{
            if(confirm("Are you sure you want to remove "+selectedText)){
                this.dispatchEvent(new CustomEvent("removeFromSaved", {detail:selectedCategory}));
            }
        },130)
        
    }
    showOverLay(e) {
        return html`
            <div style="border-radius:8px;text-align:center;width:150px;height:75px;position:absolute;top:${(this.y-79)+'px'};left:${(this.x)+"px"};font-weight:bold;background-color:#333;color:white;z-index:555;">
                ${this.overLayText}
            </div>
        `;
    }
    updateOverText(categoryId) {
        const catInfo = this.reduceSaved().find((cat)=>cat.category == categoryId);
        this.overLayText = html`
        <div style="font-size:12px;padding:8px;">
            <span><u>${catInfo.name}</u></span>
            <div><small>Boxes</small>: ${catInfo.totalBoxes}</div>
            <div><small>Weight</small>: ${catInfo.totalWeight}(lbs.)</div>
            <div>
                <span style="font-size:12px;font-weight:normal;color:silver;">click to remove</span>
            </div>
        </div>
           
        `;
    }
    updateMousePos(e) {
        const elOffset = this.getOffset(e.currentTarget);
        this.displayOverlay = true;
        this.x = elOffset.left;
        this.y = elOffset.top;
        this.updateOverText(e.target.id);
    }
    hideOverLay(e) {
        this.displayOverlay = false;
    }
    getOffset(el) {
        const rect = el.getBoundingClientRect();
        return {
          left: rect.left + window.scrollX,
          top: rect.top + window.scrollY
        };
    }
}

customElements.define("saved-boxes", SavedBoxes);