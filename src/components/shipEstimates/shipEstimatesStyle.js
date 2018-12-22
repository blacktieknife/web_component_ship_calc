const shipEstimateStyle = `
    .container-flex{
        display:flex;
        align-content:center;
        justify-content:center;
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