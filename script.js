const d = document,
    $table = d.querySelector(".viewUsers_table"),
    $tbody = $table.querySelector("tbody"),
    $form = d.querySelector(".editUsers_form"),
    $editUser = d.querySelector(".editUsers_title")

const getUsers = async()=>{
    try {
        const url = "http://localhost:5000/users",
        res = await fetch(url)
        if(res.status === 200){
            data =  await res.json()
            console.log(data)
            let contenido = ""
            data.forEach(el => {
                contenido += `
                <tr>
                <td class="name" >${el.name}</td>
                <td class="lastName" >${el.lastName}</td>
                <td class="actions">
                    <button class="edit" data-name="${el.name}" data-lastname="${el.lastName}" data-id="${el.id}">editar</button>
                    <button class="delete" data-id="${el.id}">eliminar</button>
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

d.addEventListener("click", async e =>{
    if(e.target.matches(".edit")){
        $editUser.textContent = "Editar Usuario"
        $form.name.value = e.target.dataset.name
        $form.lastName.value = e.target.dataset.lastname
        $form.id.value = e.target.dataset.id
    }

    if(e.target.matches(".delete")){
        try {
            const url = `http://localhost:5000/users/${e.target.dataset.id}`,
                options= {
                    method: "DELETE",
                },
                res = await fetch(url, options)

        } catch (error) {
            
        }
    }
})

d.addEventListener("submit", async e=>{
    if(e.target === $form){
        e.preventDefault()

        if(!e.target.id.value){
            //CREATE - POST

            try {
                const url = `http://localhost:5000/users`,
                    options = {
                        method: "POST",
                        headers: {
                            "Content-Type":"application/json"
                        },
                        body: JSON.stringify({
                            "name": e.target.name.value,
                            "lastName": e.target.lastName.value

                        })
                    },
                    res = await fetch(url, options)

                    if(!res.ok) throw {status: res.status, statusText: res.statusText}
            } catch (error) {
                console.log(error)
                let message = error.statusText || "ocurrio un error"
                $form.insertAdjacentHTML("afterend", `<p><b>${error.status}: ${message}</b></p>`)  
            }

        }else{
            try {
                const url = `http://localhost:5000/users/${e.target.id.value}`,
                    options = {
                        method: "PUT",
                        headers: {
                            "Content-Type":"application/json"
                        },
                        body: JSON.stringify({
                            "name": e.target.name.value,
                            "lastName": e.target.lastName.value
                        })
                    },
                    res = await fetch(url, options)

                    if(!res.ok) throw {status:res.status, statusText:res.statusText}
            } catch (error) {
                $form.insertAdjacentHTML("afterend", `<p><b>${error.status}: ${error.statusText}</b></p>`)
            }
        }
    }

})