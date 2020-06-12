import React, {useState} from 'react'
import {withRouter} from 'react-router-dom'
import CreatableSelect from 'react-select/creatable'
import Header from './Header'
import './NewMoviePage.css'
export const NewMoviePage = ({history})=>{
    const [name,setName] = useState('')
    const [year,setYear] = useState(2020)
    const [tag,setTag] = useState([])
    const [error,setError] = useState('')

    const onSubmit = async (e)=>{
        e.preventDefault()
        if(name.length===0){
            setError('Veuillez renseigner un titre de film')
        }else{
            const send_tag = []
            for (const tag_object of tag){
                send_tag.push(tag_object.value)
            }
            
             try{
                let movie = {}

                //Appel à l'api imdb pour ajouter une image et recuperer l'id imdb
                const response = await fetch("https://imdb-api.com/fr/API/Search/k_2yhHp04I/"+name)
                const responseJson = await response.json()
                console.log(responseJson)
                if(responseJson.results.length!==0){
                    movie = {image:responseJson.results[0].image,IMDB_id:responseJson.results[0].id}
                  }
                  
        
                
                await fetch("https://bkhyigklqc.execute-api.eu-west-1.amazonaws.com/dev/film",{
                    method:"POST",
                    body:JSON.stringify({
                        name,
                        date:year,
                        tag:send_tag,
                        ...movie
                    })
                    
                });
                console.log(JSON.stringify({
                    name,
                    date:year,
                    tag:send_tag,
                    ...movie
                }))
                history.push('/home')
                
    
            }catch(error){
                console.log(error)
            }
        }
        
        


    }

    return (
        <div>
            <Header/>

            <form onSubmit={onSubmit} className="form">
                <input
                    type="text"
                    value={name}
                    placeholder="Titre du film"
                    onChange={(e)=>setName(e.target.value)}
                    className="text-input"
                    autoFocus
                />
                <div className="form-element">
                    <p>Année de sortie : </p>
                    <input
                        type="number"
                        min="1850" 
                        max="2020" 
                        step="1"
                        value={year}
                        onChange={(e)=>setYear(e.target.value)}
                        className="number-input"
                    />
                </div>
                <div className="form-element">
                    <p>Genres du film : </p>
                    <CreatableSelect
                        value = {tag}
                        isMulti
                        className="select-input"
                        onChange = {(new_tag)=>setTag(new_tag?new_tag:[])}
                    />
                </div>
                

                <button className="new-button">Ajouter</button>
                
            </form>
            {error && (<p>{error}</p>)}
        </div>
    )
}

export default withRouter(NewMoviePage)
