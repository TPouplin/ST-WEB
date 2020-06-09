import React, {useState,useEffect} from 'react'
import CreatableSelect from 'react-select/creatable'
import Header from './Header'
const NewMoviePage = ()=>{
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
                await fetch("https://b6b8xoxbi0.execute-api.eu-west-1.amazonaws.com/dev/film",{
                    method:"POST",
                    body:JSON.stringify({
                        name,
                        date:year,
                        tag:send_tag
                    })
                });
                
                
    
            }catch(error){
                console.log(error)
            }
        }
        
        


    }

    return (
        <div>
            <Header/>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    value={name}
                    placeholder="Titre du film"
                    onChange={(e)=>setName(e.target.value)}
                />
                <p>Année de sortie </p>
                <input
                    type="number"
                     min="1850" 
                     max="2020" 
                     step="1"
                     value={year}
                     onChange={(e)=>setYear(e.target.value)}
                />
                <p>Genres du film</p>
                <CreatableSelect
                    value = {tag}
                    isMulti
                    onChange = {(new_tag)=>setTag(new_tag?new_tag:[])}
                />

                <button>Ajouter</button>
                
            </form>
            {error && (<p>{error}</p>)}
        </div>
    )
}

export default NewMoviePage