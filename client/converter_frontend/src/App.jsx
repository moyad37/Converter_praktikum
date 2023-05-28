// React is simply returning a html code
import { useEffect, useState} from 'react'
import './App.css'

/*
export class Date extends React.Component {
  constructor() {
      super();

      var today = new Date(),
          date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

      this.state = {
          date: date
      };
  }
}
*/


function App() {
  const [x, setx] = useState(0)
  const [code, setcode] = useState(0)
 // const [char, setchar] = useState("")
  //const [num, setnum] = useState("")
  const [list, setlist] = useState([])

  function refreshPage() {
    window.location.reload(false);
  }

  function getList() {
    fetch("http://localhost:8080/getList/").then(res => {
      return res.json()
    }).then(res => {
      setlist(res);
    })
  }

  useEffect( () =>
  {
    getList()
  }, [])

  
  function getCharacter() {
    fetch("http://localhost:8080/character/"+code).then(res => {
      if(res.status !== 200) {
        //status 200 ist OK
        //95999995 ist die UTF-16 character anzahl
        alert("Bitte gebe eine Nummer zwischen 0 und 95999995 👍")
      }else {
        return res.text()
      }
    }).then((res)=> {
      //x = res;
      setx(res)
      getList()
    })
  }


  function showCharacter() {
    fetch("http://localhost:8080/characterTest/"+code).then(res => {
      if(res.status !== 200) {
        //status 200 ist OK
        //95999995 ist die UTF-16 character anzahl
        alert("Bitte gebe eine Nummer zwischen 0 und 95999995 👍")
      }else {
        return res.text()
      }
    }).then((res)=> {
      //x = res;
      setx(res)
    })
  }

  function removeData() {
    fetch("http://localhost:8080/characterRemove/").then(res => {
      if(res.status !== 200) {
        //status 200 ist OK
        //95999995 ist die UTF-16 character anzahl
        alert("Etwas ist ok bei Data löschen vom Database")
      }else {
        return res.text()
      }
    }).then((res)=> {
      //x = res;
      setx(res)
    })
    refreshPage();
  }
  /*
  function handleSubmit(e){
    e.preventDefault();
     let databody = {
         "num": this.state.code,
         "character": this.getCharacter(code),
         "createdAt": this.state.date
     }
 
     fetch('http://localhost:5173', {
             method: 'POST',
             body: JSON.stringify(databody),
             headers: {
                 'Content-Type': 'application/json'
             },
         })
         .then(res => res.json())
         .then(data => console.log(data));
 }
 */
  
  //The "Show Result" button does just show the result without save it in the database
  return (
    <>
    <button className='remove btn' onClick={removeData}>Remove</button>
    <div className='container card'>
          <div className="input_container">
            <p>Character</p>
            <input className='in' name='num' type='number' value={code} onChange={(e)=> {
              setcode(e.target.value)
              }}>
            </input>
          </div>
          <div className='btn_container'>
            <button className="btn get_charachter" onClick={getCharacter}>Get character</button>
          </div>
        <button className="btn show_charachter"  onClick={showCharacter}>Show Result</button>
    </div>
       
    <p className='result_p'>
      The CharCode {code} represent the character &quot;{x}&quot;
    </p>
    
    <div className="table">
          <div className="table-header">
            <div className="header__item"><a id="name" className="filter__link" href="#">Number</a></div>
            <div className="header__item"><a id="wins" className="filter__link filter__link--number" href="#">Character</a></div>
            <div className="header__item"><a id="draws" className="filter__link filter__link--number" href="#">Date</a></div>
          </div>
    </div>

    {list.map((item) => {
      return (
        <>
        <div className="table">
        <div className="table-content">	
          <div className="table-row">	
          <div  key={item.id} className="table-data">{item.number}</div>	
          <div  key={item.id} className="table-data">{item.character}</div>	
          <div  key={item.id} className="table-data">{item.createdAt}</div>	
          </div>
        </div>	
      </div>
        </>
      )
    })}
      
    </>
  )
}



export default App
