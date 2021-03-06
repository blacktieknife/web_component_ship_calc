const styles = `
form {
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    justify-content:space-around;
    width:100%;
}
label {
    cursor: pointer;
    display:block;
    padding:5px 2px;
    font-size:14px;
}
input {
    border:solid 1.2px rgb(169, 169, 169);
    padding:4px;
    margin-right:5px;
    font-weight:bold;
    border-radius:4px;
    background-color:#CAF7CA;
    box-shadow:none;
}

input([disabled]) {
    background-color:#F5F5F5 !important;
    color:#808080 !important;
}
select {
    padding:3px;
    font-weight:bold;
    border-radius:4px;

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