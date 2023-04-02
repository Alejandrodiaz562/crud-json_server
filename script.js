const d = document,
    $table = d.querySelector(".viewUsers_table"),
    $tbody = $table.querySelector("tbody")

const getUsers = async()=>{
    try {
        const url = "http://localhost:3000/users",
        res = await fetch(url)
        if(res.status === 200){
            data =  await res.json()
            console.log(data)
            let contenido = ""
            data.forEach(el => {
                contenido += `
                <tr>
                <td class="name">${el.name}</td>
                <td class="lastName">${el.lastName}</td>
                <td class="actions">
                    <button class="edit">editar</button>
                    <button class="delete">eliminar</button>
                </td>
                </tr>
                `  
            });

            $tbody.innerHTML = contenido
        }else{
            throw {status: res.status, statusText: res.statusText || "ocurrio un error"}
        }
       
    } catch (error) {
        console.log(error)
    }
   
}

d.addEventListener("DOMContentLoaded", getUsers())