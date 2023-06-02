// const get = () => {
//     fetch ("http://amiiboapi.com/api/amiibo/") https://pokeapi.co/api/v2/pokemon/ http://starwars-server.vercel.app/characters
//     .then((response) =>response.json())
//     .then((res) => console.log(res))
// }
// get() / esta es otra opcion de fetch

const getCharacters = async () => {
    const response = await fetch("http://starwars-server.vercel.app/characters")
    const res = await response.json();
    // console.log(res.data.characters);
    return res.data.characters
}

const mapCharacters = (characters) => {
    //   console.log(characters);
    return characters.map((character)=>({
        id: character.id,
        name: character.name,
        image: character.image,
        role: character.role,
    }))
}

const drawCharacters = (charactersMapeados) => {
    // console.log(charactersMapeados)
const main$$ = document.querySelector("main")
document.body.appendChild(main$$)
main$$.innerHTML = " "

for (const character of charactersMapeados) {
    const figure$$ = document.createElement("figure");
    main$$.appendChild(figure$$)
    const figCaption$$ = document.createElement("figcaption");
    figure$$.appendChild(figCaption$$)
    figCaption$$.textContent = character.name

    const img$$ = document.createElement("img")
    figure$$.appendChild(img$$)
    img$$.setAttribute("src", character.image)

    const p$ = document.createElement("p")
    figure$$.appendChild(p$)
    p$.textContent = character.role

}
}

const searchCharacter = (filtro, characters) => {
    // console.log(characters)
    let filteredCharacter = characters.filter((character)=>character.name.toLowerCase().includes(filtro.toLowerCase()))
    drawCharacters(filteredCharacter)
}

const drawInput = (charactersMapeados) => 
    // console.log(charactersMapeados);
    {
    const input$$ = document.querySelector("input")
    // console.log(input$$.value);
    input$$.addEventListener("input", ()=>  searchCharacter(input$$.value, charactersMapeados))
}


const init = async ()  => {
    const characters = await getCharacters();
    // console.log(characters);
    const mappedCharacters = mapCharacters(characters);
    // console.log(mappedCharacters);
    drawCharacters(mappedCharacters);
    drawInput(mappedCharacters)
}
init();

