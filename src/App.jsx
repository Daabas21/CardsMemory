import { useState, useEffect } from 'react';

import './App.css';
import Displaycard from './DisplayCard';



function App() {
  const [data , setData]= useState([]);
  const [drow, setDrow] = useState(null);
  const [drow2, setDrow2] = useState(null);

  console.log(data);
  

  
  async function fetchData(url) {
    
    const res = await fetch(url);
    const dataa = await res.json();
    
    const newData = dataa.cards.filter(prev=>(prev.suit==="HEARTS")|| (prev.suit==="CLUBS"))
    
    console.log(newData)
      
       setData(newData);
       
      }  
      // data.forEach(function (element) {
      //   element.bool = false
      // }); 

  useEffect(()=>{
    fetchData("https://deckofcardsapi.com/api/deck/new/draw/?count=52");
  },[]);


  const handleChoice = (item) => {
    drow ? setDrow2(item) : setDrow(item)
  }



  useEffect(() => {
    if(drow && drow2){
      if(drow.value === drow2.value){
        setData(prev => {
          return prev.map(item => {
            if(item.value === drow.value){
              return {...item, suit: "true"}
            }else{
              return item
            }
          })
        })
        reset()
      }else{
        setTimeout(()=> reset(), 1000)
      }
    }
  },[drow, drow2])

  console.log(data)

  const reset = () => {
    setDrow(null)
    setDrow2(null)
  }

  
    return (
      <div className="App">
      {data.length===26 ? (

        <div style={{display:"grid", gridTemplateColumns:"repeat(8, 1fr)", paddingLeft:"20px"}}>
      
         

          {data.map(item => (

            <Displaycard 
            key={item.code}
            item={item} 
            handleChoice = {handleChoice}
            flipped ={item === drow || item === drow2 || item.suit==="true"}
            />
          ))}


          </div>)
        

          : 

        (<p>loading....</p>)
      }
    </div>
    
  );
}

//checkKey(item.code ,item.image)
export default App;