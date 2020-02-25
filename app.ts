import * as express from "express";
import * as mongoose from 'mongoose';
import config from './config/config';
import setRoutes from "./route";
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as nodemailer from 'nodemailer'; 
import * as cors from 'cors';
// import * as favicon from 'serve-favicon';
import * as finalhandler from 'finalhandler';
import * as http from 'http';
var favicon = require('serve-favicon');
// var favicon = require('serve-favicon');
import * as path from 'path';
// var _favicon = favicon(path.join(__dirname, 'public', 'favicon.ico'))
const app = express();
app.set('port', (process.env.PORT || 3002));
// const port = 8080;

app.use(cors());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use('/', express.static(path.join(__dirname, '/public')));

app.use(bodyParser.urlencoded({ limit: '1gb', extended: true }));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded())
app.use(morgan('dev'));
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.set('view engine', 'ejs');
app.use('/assets',express.static('assets'));
app.set('views', path.join(__dirname, 'views'));
// app.use(favicon(__dirname + '/public/images/favicon.ico'));

mongoose.connect(config.dbUrl);
mongoose.set('useFindAndModify', false);
const db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));

// var _favicon = favicon(path.join(__dirname, 'public', 'favicon.ico'))


db.once('open', () => {
    console.log('Connected to MongoDB');
    setRoutes(app)
    app.get('/',(req,res)=>{
        res.render( "index" );
    })
   
    // app.get( "/home", ( req:express.Request, res :express.Response  ) => {
    //     // return res.json({ message:"welcome" });
    //     res.render( "/index" ); 
    // });
   
    // app.listen( port, () => {
    //     console.log( `server started at http://localhost:${ port }` );
    // });
    app.use('/', express.static(path.join(__dirname, '/public')));


    app.listen(app.get('port'), () => {
        console.log('server listening on port ' + app.get('port'));
    });

});

export { app }

// npx ts-node app.ts
