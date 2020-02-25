import * as express from "express";
import * as mongoose from 'mongoose';
import config from './config/config';
import setRoutes from "./route";
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as nodemailer from 'nodemailer'; 
import * as cors from 'cors';
import * as path from 'path';
import * as http from 'http';
var favicon = require('serve-favicon');


const app = express();
app.set('port', (process.env.PORT || 3002));

app.use(cors());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// app.use('/', express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ limit: '1gb', extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

mongoose.connect(config.dbUrl);
mongoose.set('useFindAndModify', false);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log('Connected to MongoDB');
    setRoutes(app)
    app.get('/',(req,res)=>{
        res.render( "index" );
    })

    app.use('/', express.static(path.join(__dirname, '/public')));
    // app.use(express.favicon(__dirname + '/public/favicon.ico'));
    app.use('/assets',express.static('assets'));

    app.listen(app.get('port'), () => {
        console.log('server listening on port ' + app.get('port'));
    });

});

export { app }

// npx ts-node app.ts
