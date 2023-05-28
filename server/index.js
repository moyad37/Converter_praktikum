"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const Conversion_1 = __importDefault(require("./models/Conversion"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = 8080;
//conect to database
mongoose_1.default.connect("mongodb+srv://Mouayad:test123@cluster0.lgcided.mongodb.net/")
    .then(result => {
    //console.log("hallooo");
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
})
    .catch(err => {
    console.log("*******\nDie Verbindung zum Database ist nicht korekt\n*******");
    console.log(err);
});
//CORS für die verbindung zwischen client und server
//Cross-Origin Resource Sharing; Zugriff ermöglichen auf Ressource von anderen Ursprung
//app.use(express.urlencoded({ extended: true }));
app.get('/character/:code', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //95999995 ist die UTF-16 character anzahl
    if (Number(req.params.code) < 0 || Number(req.params.code) > 95999995) {
        //alert(`geben sie biite nummber zwischen 0 und 95999995  👍 `)
        res.sendStatus(404);
    }
    else {
        const code = Number(req.params.code);
        const characterCode = String.fromCharCode(code);
        const article = new Conversion_1.default({
            number: code,
            character: characterCode,
            createdAt: new Date()
        });
        yield article.save();
        console.log(`your converting is from ${code} to ${characterCode}`);
        res.send(characterCode);
    }
}));
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
app.get('/charactertest/:code', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //95999995 ist die UTF-16 character anzahl
    if (Number(req.params.code) < 0 || Number(req.params.code) > 95999995) {
        //alert(`geben sie biite nummber zwischen 0 und 95999995  👍 `)
        res.sendStatus(404);
    }
    else {
        const code = Number(req.params.code);
        const characterCode = String.fromCharCode(code);
        res.send(characterCode);
    }
}));
app.get('/characterRemove', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const removedliste = yield Conversion_1.default.deleteMany({});
    res.send(removedliste);
}));
app.get('/getList', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const liste = yield Conversion_1.default.find({});
    console.log(liste);
    res.send(liste);
}));
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
