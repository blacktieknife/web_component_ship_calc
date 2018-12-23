const shipEstimateStyle = `
    .container-flex{
        display:flex;
    }
    input {
        border-radius:6px;
        padding:4px;
    }
    .btn-sm,

.btn, .btn-group-sm > .btn {
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 3px;
  cursor: pointer;
}

.total_box_info {
    text-transform:uppercase;
    font-size:11px;
    font-weight:bold;
    letter-spacing:.8px;
    margin-top:5px;
    padding:5px;
    text-align:center;
    font-family:arial;
    color:white;
    background-color:#7692E9;
}

.tiny-progessbar{
    height:10px;
    width:100%;
    background-color:silver;
}

.tiny-progessbarfill{
    font-size:9px;
    text-align:center;
    color:white;
    max-width:100%;
    font-weight:bold;
    height:10px;
}

.box_info_area {
    width:75px;
    padding:8px;
}

.btn {
    color: #fff;
    background-color: #1087DD;
    border-color: #2e6da4; 
}

.btn:hover {
    color: #fff;
    background-color: #007BB6;
    border-color: #122b40;
}

button[disabled]{
    background-color:#CAC8C8;
    border-color:#fff;
}
button[disabled]:hover{
    background-color:#CAC8C8;
    border-color:#fff;
    cursor: not-allowed;
}

`;

export default shipEstimateStyle;