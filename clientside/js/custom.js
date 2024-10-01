async function getdonor(params){
    const res=await fetch('http://localhost:3000/getdonor')
    const data=await res.json();
    
   let  str=``

                data.map((Datas)=>{
                    str+=`<div class="container">
                            <div class="sub">
                                <input type="text" id="name-${Datas._id}" disabled="true" value="${Datas.name}" name="" class="a1">
                                <input type="text" id="email-${Datas._id}" disabled="true" value="${Datas.email}" name="" class="a2">
                                <input type="text" id="phone-${Datas._id}" disabled="true" value="${Datas.phone}" name="" class="a3">
                                <input type="text" id="blood-${Datas._id}" disabled="true" value="${Datas.blood}" name="" class="a4">
                                <input type="text" id="gender-${Datas._id}" disabled="true" value="${Datas.gender}" name="" class="a5">    
                                </div>

                               <div class="btn"> <button class="btn2" id="btn2" onclick="handleEdit('${Datas._id}')">EDIT</button>
                                <button class="btn3" id="btn3">SAVE</button>
                                <button class="btn4" id="btn4" onclick="handleDelete('${Datas._id}')">DELETE</button>
                                </div>
                            </div>`
                })
                document.getElementById("display").innerHTML=str
    }

getdonor()

function handleEdit(_id){
    document.getElementById(`name-${id}`).disabled=false
    document.getElementById(`email-${id}`).disabled=false
    document.getElementById(`phone-${id}`).disabled=false
    document.getElementById(`blood-${id}`).disabled=false
    document.getElementById(`gender-${id}`).disabled=false
}

async function handleDelete(_id){
    let res=await fetch('http://localhost:3000/delete',{
        method:"DELETE",
        headers:{"Content-Type":"text/plain"},
        body:id
    })
    if(res.status==200){
        alert("Success")
        getdonor()
    }
    else{
        alert("Not Success")
    }
}