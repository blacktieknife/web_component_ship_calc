const styles = `
form {
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
}
label {
    cursor: pointer;
    display:block;
    padding:5px 2px;
    font-size:14px;
}
input {
    max-width:85px;
    padding:7px;
    margin-right:10px;
    font-size:18px;
    font-weight:bold;
    border-radius:4px;
    background-color:#CAF7CA;
}

input([disabled]) {
    background-color:#F5F5F5 !important;
    color:#808080 !important;
}

select {
    padding:9px;
    border-radius:4px;
    font-size:16px;
}
.btn-primary {
    color: #fff;
    background-color: #337ab7;
    border-color: #2e6da4;
}
.btn-primary:focus,
.btn-primary.focus {
    color: #fff;
    background-color: #286090;
    border-color: #122b40;
}
.btn-primary:hover {
    color: #fff;
    background-color: #286090;
    border-color: #204d74;
}
.btn-primary:active,
.btn-primary.active,
.open > .dropdown-toggle.btn-primary {
    color: #fff;
    background-color: #286090;
    border-color: #204d74;
}
.btn-primary:active:hover,
.btn-primary.active:hover,
.open > .dropdown-toggle.btn-primary:hover,
.btn-primary:active:focus,
.btn-primary.active:focus,
.open > .dropdown-toggle.btn-primary:focus,
.btn-primary:active.focus,
.btn-primary.active.focus,
.open > .dropdown-toggle.btn-primary.focus {
    color: #fff;
    background-color: #204d74;
    border-color: #122b40;
}
.btn-primary:active,
.btn-primary.active,
.open > .dropdown-toggle.btn-primary {
    background-image: none;
}
.btn[disabled] {
    background-color: #D8D8D8;
    border-color: #BBBBBB; 
    cursor: not-allowed;
}
.btn.disabled:hover,
.btn[disabled]:hover,
fieldset[disabled] .btn:hover,
.btn.disabled:focus,
.btn[disabled]:focus,
fieldset[disabled] .btn:focus,
.btn.disabled.focus,
.btn[disabled].focus,
fieldset[disabled] .btn.focus {
    background-color:#CAC8C8;
    border-color:#fff;
}
.btn .badge {
    color: #337ab7;
    background-color: #AFAFAF;
}

.btn-sm,
.btn-group-sm > .btn {
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 3px;
  cursor: pointer;
}

`;

export default styles;