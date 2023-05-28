import express, { Express, Request, Response } from 'express';
import cors from "cors";
import mongoose from 'mongoose';
import Article from './models/Conversion'

const app: Express = express();
app.use(cors())
const port = 8080

//conect to database
mongoose.connect("mongodb+srv://Mouayad:test123@cluster0.lgcided.mongodb.net/")
.then( result => {
  //console.log("hallooo");
  
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  })
  
})
.catch( err => {
  console.log("*******\nDie Verbindung zum Database ist nicht korekt\n*******");
  console.log(err);
}); 



//CORS für die verbindung zwischen client und server

//Cross-Origin Resource Sharing; Zugriff ermöglichen auf Ressource von anderen Ursprung


//app.use(express.urlencoded({ extended: true }));





app.get('/character/:code',async(req: Request, res: Response) => {
  //95999995 ist die UTF-16 character anzahl
  if(Number(req.params.code) < 0 || Number(req.params.code) > 95999995)
  {
    //alert(`geben sie biite nummber zwischen 0 und 95999995  👍 `)
    res.sendStatus(404);
  }else {
    const code = Number(req.params.code);
    const characterCode = String.fromCharCode(code);
    const article = new Article( {
      number : code,
      character : characterCode,
      createdAt: new Date()
    } )
    await article.save();
    console.log(`your converting is from ${code} to ${characterCode}`)
    res.send(characterCode);
  }
  
});
//function async ???
/*
app.get('/test', async(req: Request, res: Response) => {
  console.log("TESTiIIIIII");
  const small = new Article( {
    number : 7,
    character : "+"
  } )
  console.log(small);
  await small.save();
    res.send("test");
  }
  
);
*/


app.get('/charactertest/:code',async(req: Request, res: Response) => {
  //95999995 ist die UTF-16 character anzahl
  if(Number(req.params.code) < 0 || Number(req.params.code) > 95999995)
  {
    //alert(`geben sie biite nummber zwischen 0 und 95999995  👍 `)
    res.sendStatus(404);
  }else {
    const code = Number(req.params.code);
    const characterCode = String.fromCharCode(code);
    res.send(characterCode);
  }
  
});


app.get('/characterRemove',async(req: Request, res: Response) => {
  const removedliste = await Article.deleteMany({})
    res.send( removedliste);
});

app.get('/getList', async(req: Request, res: Response) => {
    const liste = await Article.find({})
    console.log(liste);
    res.send(liste);
  }
);


/*
const Article = require("./models/Conversion");

app.post('http://localhost:5173/save'), (req: Request, res: Response) => {

  //const article = new Article(req.body);
  console.log(req.body);

}

*/

/*
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
})
*/
