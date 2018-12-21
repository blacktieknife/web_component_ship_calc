import { html } from '../lit/lit-html.js';
import listItem from "./listItem.js";

export default function(data) {
    return html`
    <ul>
       ${listItem(data.todos)} 
    </ul>
    `;
}