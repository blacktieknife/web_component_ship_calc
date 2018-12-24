const ratesStyle = `
ul {
    list-style-type: none;
    margin:0;
    padding:0; 
}
li {
    text-align:center;
    padding:5px;
    list-style-type: none;
}
.money::before{
    content:"$"
}
.money {
    font-weight:bold;
}
h4 {
    margin-top:5px;
    margin-bottom:5px;
    text-align:center;
}
button {
    padding:6px;
    padding-left:5px;
    padding-right:5px;
    background-color:#ffcc00;
    border-radius:3px;
    border:solid 1.2px rgb(169, 169, 169);
    color:white;
    font-weight:bold;
    cursor:pointer;
}

button:hover {
    background-color:#e6b800;
}
`;

export default ratesStyle;