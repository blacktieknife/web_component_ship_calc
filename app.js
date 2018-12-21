import {LitElement, html} from './lit-element/lit-element.js';
import './components/ShipCalcForm.js';
import './components/ShipEstimates.js';
import {repeat} from "./lit/directives/repeat.js";
import {until} from "./lit/directives/until.js";

class ShipCostCalc extends LitElement {
    static get properties() {
        return {
          count: {type:Number},
          title:{type:String},
          selectedCategory:{type:String},
          currentTotalPcs:{type:Number}
         //saved:{type:Array}
        }
    }
    constructor(){
        super();
        this.count = 0;
        //this.title = "Calculate domestic UPS rates";
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
                @increment=${()=>{this.handleIncrementEvent()}} 
                @categorySelected=${this.handleSelectedCategory} 
                @currentTotalPcs=${this.handleCurrentTotal}
                @updateBoxesArray=${this.handleUpdateBoxes}
                >
            </calc-form>
            ${this.currentBoxes.length > 0 ? html`<ship-estimates .boxes=${this.currentBoxes.concat(this.saved)} .totalPcs=${this.currentTotalPcs} .selectedCat=${this.selectedCategory}></ship-estimates>` : ""}
            
        `;
    }
    handleSelectedCategory(e) {
        const newCategory = e.detail && e.detail.trim() !== '' ? e.detail : false;
        if(newCategory) {
            this.selectedCategory = newCategory;
        } else {
            this.selectedCategory = null;
        }
        //this.requestUpdate();
        console.log("Cureent selected category changed",this.selectedCategory)
    }
    handleCurrentTotal(e) {
        this.currentTotalPcs = e.detail;
       //this.requestUpdate();
       console.log("CurrentTotal is Set to :",this.currentTotalPcs);
    }
    handleUpdateBoxes(e) {
        this.currentBoxes = e.detail;
        console.log("CurrentBoxes is Set to :",this.currentBoxes);
    }
}

customElements.define('shipping-calc', ShipCostCalc);

// const state = {
//     name:"kirk",
//     newTodo:"",
//     title:"Todo App",
//     todos:null,
//     completedHidden:false,
//     currentDisplayListLength:null
// }

// const completeTask = (e) => {
//     const currentIndex = e.target.id.substring(8, e.target.id.length);
//     console.log(currentIndex);
//     state.todos[currentIndex].completed = !state.todos[currentIndex].completed;
//     render(myApp(state), document.getElementById("app"));
// };

// const addTodoSubmit = (e) => {
//     e.preventDefault();
//     if(state.newTodo.trim().length > 0) {
//         state.todos.unshift({userId: Date.now(), id: Date.now(), title: state.newTodo, completed: false})
//         state.newTodo = '';
//         state.currentDisplayListLength = state.todos.length;
//         document.getElementById("addTodoIn").value = '';
//         render(myApp(state), document.getElementById("app"));
//     }
// }

// const handleInput = e => {
//     state.newTodo = e.target.value;
// };

// function list({todos, completedHidden}) {
//     return html`<div style="display:flex; overflow:auto;padding:5px;flex-direction:column;border:solid 1.4px;border-radius:8px;height:450px; width:350px;">${listItem(todos, completedHidden)}</div>`
// }

// function addTodo() {
//     return html`
//     <form @submit="${addTodoSubmit}">
//         <input type="text" id="addTodoIn" @change="${handleInput}" .value=${state.newTodo}>
//         <button>Add Todo</button>
//     </form>
//     `;
// }

// function rerenderTodos() {
//     state.completedHidden = true;
//     state.currentDisplayListLength = state.todos.filter((todo)=>todo.completed == false).length;
//     render(myApp(state), document.getElementById("app"));
// }

// function resetTodos() {
//     state.completedHidden = false;
//     state.currentDisplayListLength = state.todos.length;
//     render(myApp(state), document.getElementById("app"));
// }

// function listItem(todos=null) {
//     if(todos) {
//         let count = 0;
//         if(state.completedHidden) {
//             todos = todos.filter((todo)=>{
//                 count++;
//                 return todo.completed == false;
//             })
//             console.log(todos.length);
//         }    
//         return html`${repeat(todos, ({id})=>id, (todo, i)=>{
//             return html`
//             <div style="padding:10px;">
//                 <div style="${todo.completed ? 'text-decoration: line-through;' : ''}">
//                     ${todo.title} 
//                 </div>
//                 <span>
//                     <button .id="todo_id_${i}" @click="${completeTask}" style="width:80px;">${todo.completed ? 'undo' : 'Complete'}</button>
//                 </span>
//             </div>
//             `;
//         })}`;
//     } else {
//         return html`
//         ${until(
//             fetch('https://jsonplaceholder.typicode.com/todos')
//             .then(rawJson=>rawJson.json())
//             .then(todos=>{
//                 state.currentDisplayListLength = todos.length;
//                 state.todos = todos;
//                 render(myApp(state), document.getElementById("app"))
//                 listItem(state.todos);
//         }),
//         html`<p>Loading Todos</p>`
//         )}
//         `;
//     }
// }

// function title(data) {
//     return html`
//     <h4>${data.title}</h4>
//     `;
// }

// // Define a template
// const myApp = (data) => html`
// ${title(data)}
// ${addTodo()}
// <button @click="${rerenderTodos}">hide finished</button>
// <button @click="${resetTodos}">resest</button>
// Todos Listed : ${state.currentDisplayListLength}
// <div style="">
// ${list(data)}
// </div>
// `;

// // Render the template to the document
// render(myApp(state), document.getElementById("app"));