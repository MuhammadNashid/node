async function getdoner(params) {
    const res=await fetch("http://localhost:3000/getdoner")
   const data=await res.json()
   console.log(data);
   
   let str=``
   data.map((datas)=>{
    str+=`
     <div class="sub1">
    <input class="txt" type="text" id="name-${datas._id}" disabled="true" value="${datas.name}" placeholder="NAME">
    <input class="txt" type="text" id="email-${datas._id}" disabled="true" value="${datas.email}" placeholder="EMAIL">
    <input class="txt" type="text" id="phone-${datas._id}" disabled="true" value="${datas.phone}" placeholder="PHONE NUMBER">
    <input class="txt" type="text" id="blood-${datas._id}" disabled="true" value="${datas.blood}" placeholder="BLOOD GROUP" >
    <input class="txt" type="text" id="gender-${datas._id}" disabled="true" value="${datas.gender}"placeholder="GENDER">


    <button class="btn" type="button" onclick="handleSave('${datas._id}')">Save</button>
    <button class="btn1" type="button" onclick="handleEdit('${datas._id}')">Edit</button>
    <button class="btn2" type="button" onclick="handleDelete('${datas._id}')">Delete</button>
    </div>
    
    

    `
   })
   document.getElementById("display").innerHTML=str
    
}
getdoner()
 function handleEdit(id){
    document.getElementById(`name-${id}`).disabled=false
    document.getElementById(`email-${id}`).disabled=false
    document.getElementById(`phone-${id}`).disabled=false
    document.getElementById(`blood-${id}`).disabled=false
    document.getElementById(`gender-${id}`).disabled=false
 }

  async function handleDelete(id) {
    let res=await fetch('http://localhost:3000/delete',{
       method:"DELETE",
       headers:{"Content:Type":"text/plain"},
       body:id        
    })
    if(res.status==200){
        alert("success")
        getdoner()
    }
    else{
        alert("failed")
    }
  }

  async function handleSave(id) {
    console.log(id);
    const name=document.getElementById(`name-${id}`).value
    const email=document.getElementById(`email-${id}`).value
    const phone=document.getElementById(`phone-${id}`).value
    const bloodgroup=document.getElementById(`blood-${id}`).value
    const gender=document.getElementById(`gender-${id}`).value
    console.log(name,email,phone,bloodgroup,gender);
    const data=(id,name,email,phone,bloodgroup,gender)
    const res=await fetch("http://localhost:3000/update",{
        method:"PUT",
        headers:{"content-type":"text/json"},
        body:JSON.stringify(data)

    })
    console.log(res);
    if(res.status===200)
    {
        alert("success")
        getdoner()
    }
    
    else{
        alert("failed")
    }
    
    
  }