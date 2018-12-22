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
    
    :host .isLoading {
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background-color:rgba(205,0,153, 0.7);
        color:white;
        font-size:23px;
        font-weight:bold;
        display:flex;
        align-items:center;
        justify-content:center;
    }
    
`;
export default appStyle;