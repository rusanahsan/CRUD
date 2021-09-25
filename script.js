var db=document.getElementById("db");
var table={};
var enable=true;
var currentId="";
function deleteRow(obj){
    if(enable){
        let ind=obj.parentNode.parentNode.rowIndex;
        delete table[db.rows[ind].cells[0].textContent];
        db.deleteRow(ind);
    }
}
function deleteRows(obj){
    db.deleteRow(obj.parentNode.parentNode.rowIndex);
    enable=true;
}
function editRow(obj){
    if(enable){
        enable=false;
        let arr=db.rows[obj.parentNode.parentNode.rowIndex].cells;
        currentId=arr[0].textContent;
        arr[0].innerHTML=`<input type="text" placeholder="Student Id">`;
        arr[1].innerHTML=`<input type="text" placeholder="Name">`;
        arr[2].innerHTML=`<input type="date" placeholder="DOB">`;
        arr[3].innerHTML=`<input type="text" placeholder="Address">`;
        arr[4].textContent="N/A";
        arr[5].innerHTML=`<button type="button" class="save" onclick="saveRow(this)">Save</button>
        <button type="button" class="cancel" onclick="cancelRow(this)">Cancel</button>`;
    }
}
function cancelRow(obj){
    let rownum=obj.parentNode.parentNode.rowIndex;
    db.rows[rownum].innerHTML=table[currentId];
    enable=true;
}
function saveRow(obj){
    let rownum=obj.parentNode.parentNode.rowIndex;
    let arr=db.rows[rownum].cells;
    if(arr[0].firstChild.value==""){
        alert('Please enter student id');
        return;
    }
    else if(typeof table[arr[0].firstChild.value]!='undefined' && arr[0].firstChild.value!=currentId){
        alert('Please enter unique student id');
        return;
    }
    else if(arr[1].firstChild.value==""){
        alert('Please enter your name');
        return;
    }
    else if(arr[2].firstChild.value==""){
        alert('Please enter your DOB');
        return;
    }
    else if(arr[3].firstChild.value==""){
        alert('Please enter your address');
        return;
    }
    else{
        let d=new Date();
        arr[0].innerHTML=arr[0].firstChild.value;
        arr[1].innerHTML=arr[1].firstChild.value;
        let val=arr[2].firstChild.value.split('-');
        arr[2].innerHTML=val[2]+"/"+val[1]+"/"+val[0];
        arr[3].innerHTML=arr[3].firstChild.value;
        let dd=String(d.getDate()).padStart(2,'0');
        let mm=String(d.getMonth()+1).padStart(2,'0');
        let yyyy=d.getFullYear();
        let hr=String(d.getHours()).padStart(2,'0');
        let min=String(d.getMinutes()).padStart(2,'0');
        let sec=String(d.getSeconds()).padStart(2,'0');
        arr[4].textContent=dd+"/"+mm+"/"+yyyy+" "+hr+":"+min+":"+sec;
        arr[5].innerHTML=`<button type="button" class="edit" onclick="editRow(this)">Edit</button>
        <button type="button" class="delete" onclick="deleteRow(this)">Delete</button>`;
        if(currentId!="")
            delete table[currentId];
        table[arr[0].textContent]=db.rows[rownum].innerHTML;
        enable=true;
    }
}
function addRow(){
    if(!enable)
        return;
    enable=false;
    currentId="";
    let tabbod=document.getElementById("tabbod");
    tabbod.innerHTML+=`<tr><td><input type="text" placeholder="Student Id"></td>
    <td><input type="text" placeholder="Name"></td><td><input type="date" placeholder="DOB"></td>
    <td><input type="text" placeholder="Address"></td><td>N/A</td>
    <td><button type="button" class="save" onclick="saveRow(this)">Save</button>
    <button type="button" class="cancel" onclick="deleteRows(this)">Cancel</button></td>`;
}
function populateTable(){
    console.log(db.rows.length);
    for(let i=1;i<db.rows.length;i++){
        let key=db.rows[i].cells[0].textContent;
        table[key]=db.rows[i].innerHTML;
    }
}
function deleteallRow(){
    if(enable){
        table={};
        document.getElementById("tabbod").innerHTML="";
    }
}
populateTable();
