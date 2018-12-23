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
        background-color:rgba(0,0,0, 0.6);
        color:white;
        font-size:23px;
        font-weight:bold;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        z-index:999;
    }
    
`;
export default appStyle;