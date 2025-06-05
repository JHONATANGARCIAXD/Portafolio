let colores = [
    { name: "normal", color: "#A8A77A" },
    { name: "fire", color: "#F08030" },
    { name: "water", color: "#6890F0" },
    { name: "electric", color: "#F8D030" },
    { name: "grass", color: "#78C850" },
    { name: "ice", color: "#98D8D8" },
    { name: "fighting", color: "#C03028" },
    { name: "poison", color: "#A040A0" },
    { name: "ground", color: "#E0C068" },
    { name: "flying", color: "#A890F0" },
    { name: "psychic", color: "#F85888" },
    { name: "bug", color: "#A8B820" },
    { name: "rock", color: "#B8A038" },
    { name: "ghost", color: "#705898" },
    { name: "dragon", color: "#7038F8" },
    { name: "dark", color: "#705848" },
    { name: "steel", color: "#B8B8D0" },
    { name: "fairy", color: "#EE99AC" }
];



document.addEventListener("DOMContentLoaded", async () => {
    let nombre_poke = document.getElementById("nombre_poke")
    let numero_poke = document.getElementById("numero_poke")
    let peso_poke = document.getElementById("peso_poke")
    let altura_poke = document.getElementById("altura_poke")
    let img_poke = document.getElementById("img_poke")
    let fondo_poke = document.getElementById("fondo_poke")
    let tipo = document.getElementById("tipo")
    let debil = document.getElementById("debil")
    let color = document.getElementById("color")

    let numero = Math.floor(Math.random() * 400)
    let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${numero}`)
    console.log(res);
    // CHIKORITA

    nombre_poke.textContent = res.data.name.toUpperCase()
    img_poke.src = res.data.sprites.other.dream_world.front_default
    numero_poke.textContent = `#${res.data.id}`
    peso_poke.textContent = `PESO: ${res.data.weight / 10} KG`
    altura_poke.textContent = `ALTURA: ${res.data.height / 10}M`

    let tipospoke = res.data.types
    let color_card2 = []
    tipospoke.forEach(element => {
        let color_btn = colores.find(elemnto => elemnto.name == element.type.name)
        color_card2.push(color_btn.color)
        tipo.innerHTML +=
            `
    <button style="background-color: ${color_btn.color}; padding: 9px 15px; border-radius: 10px;font-family: 'Oswald';  font-size: 16px; "> ${element.type.name.toUpperCase()}</button>
    `
    });

    if (color_card2.length == 2) {
        fondo_poke.style = `background: linear-gradient(153deg, ${color_card2[0]} 51%,  ${color_card2[1]} 100%);`
        color.style = `background: linear-gradient(to right, #423c3c, ${color_card2[0]}, ${color_card2[1]}, #423c3c);`
    } else {
        fondo_poke.style = `background-color: ${color_card2[0]}`
        color.style = ` background: linear-gradient(to right, #423c3c,${color_card2[0]}, #423c3c);`
    }




    let res_2 = await axios.get(tipospoke[0].type.url)
    let debilidades = res_2.data.damage_relations.double_damage_from
    debilidades.forEach(debilidad => {
        let color_btn = colores.find(elemnto => elemnto.name == debilidad.name)
        debil.innerHTML += `<button style="background-color: ${color_btn.color}; padding: 9px 15px; border-radius: 10px; margin: 0px; font-family: 'Oswald'; font-size: 16px;  "> ${debilidad.name.toUpperCase()}</button>`
    })




    let estadisticas = res.data.stats

    estadisticas.forEach(estadistica => {

        document.getElementById("estadisticas").innerHTML += `
                <p>${estadistica.stat.name.toUpperCase()}:  ${estadistica.base_stat} / 255 </p>

            <div style="display: flex; width: 100%; border-radius: 10px;  background-color: rgba(255, 255, 255, 0.179); margin: 5px 0; box-shadow: 0 0 5px 1px rgba(255, 255, 255, 0.12);  ">
                <div style=" width: calc(${estadistica.base_stat} / 255 * 100%); height: 20px; background-color: ${color_card2[0]}; border-radius: 10px 0 0 10px;"></div>
            </div>
                `

    })

})








