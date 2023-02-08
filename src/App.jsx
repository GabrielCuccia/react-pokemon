import { useState, useEffect } from "react"
import Button from "./components/button";
import "./hoja-de-estilos/app.css"
import { TiArrowLeftOutline, TiArrowRightOutline } from "react-icons/ti";
import Card from "./components/card";

const App = ()=> {
    let pokemones = []
    
    
    let [pokemonNumber, setPokemonNumber] = useState(1);
   
    let pokemonImg
    let [pokemonEvolutions, setPokemonEvolutions] = useState([])


    async function getPokemonImgs(name){
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
        const data = await response.json()                                         
        return data.sprites.other['official-artwork'].front_default;
    }
    
 
    

    async function getEvolutions(){

        const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${pokemonNumber}/`)
        const data = await response.json()
        
            let pokemonLv1 
            pokemonLv1 = data.chain.species.name;
            pokemonImg = await getPokemonImgs(pokemonLv1)
            pokemones.push([pokemonLv1, pokemonImg])
            
            
    
            
            if(data.chain.evolves_to.length != 0){
                
                let pokemonLv2 = data.chain.evolves_to[0].species.name
                let pokemonImg2 = await getPokemonImgs(pokemonLv2)
                pokemones.push([pokemonLv2, pokemonImg2])
                
                
                
                if(data.chain.evolves_to[0].evolves_to.length != 0){
                    let pokemonLv3 = data.chain.evolves_to[0].evolves_to[0].species.name
                    let pokemonImg3 = await getPokemonImgs(pokemonLv3)
                    pokemones.push([pokemonLv3, pokemonImg3])
                    setPokemonEvolutions(pokemones)
                    
                    
                    
                    
    
                }else{
                    setPokemonEvolutions(pokemones)
                }
                
                

            }else{
                setPokemonEvolutions(pokemones)
            }
            
            

            
        

    } 
    console.log(pokemonEvolutions)

    

    function increaseNumber(){
        setPokemonNumber(pokemonNumber + 1)
        

    }
    function descreaseNumber(){
        if(pokemonNumber > 1){
            setPokemonNumber(pokemonNumber - 1)
        }
        
        

    }
    useEffect(()=>{
            
           getEvolutions()
           
           
            

    }, [pokemonNumber])
    return(
        

        <>
            <div className={`Cards card${pokemonEvolutions.length}`}>
                {pokemonEvolutions.map(pokemon =>
                    <Card 
                    name={pokemon[0]}
                    pokemon={pokemon[1]}/>
                )}
            
            </div>
             

            


            <div className="buttons-container">
                
                <Button
                 icon={<TiArrowLeftOutline/>}
                 funcion={descreaseNumber} />
                <Button icon={<TiArrowRightOutline/>} 
                funcion={increaseNumber}
                />

            </div>
            <footer className="footer">
                <p>Programado por: <a href="">Gabriel Cuccia</a></p>
            </footer>
        </>
    )
}

export default App
