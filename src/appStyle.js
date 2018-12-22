const appStyle = `
    :host{
        all:initial;
        display:block;
        contain:content;
        transition: transform .2s ease-out;
    }
    :host .container {
        display:block;
        width:90%;
        margin:auto;
    }
    
    :host .container-flex{
        display:flex;
        align-content:center;
        justify-content:center;
    }
    
    :host .header_section {
     
    }
    
`;
export default appStyle;