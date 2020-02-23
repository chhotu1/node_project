import * as express from "express";
import * as mongoose from 'mongoose';
import config from './config/config';
import setRoutes from "./route";
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as nodemailer from 'nodemailer'; 
import * as path from 'path';
const app = express();
app.set('port', (process.env.PORT || 3002));
// const port = 8080;

app.use(bodyParser.urlencoded({ limit: '1gb', extended: true }));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded())
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use('/assets',express.static('assets'));
app.set('views', path.join(__dirname, 'views'));

//connection to database
mongoose.connect(config.dbUrl);
mongoose.set('useFindAndModify', false);
const db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log('Connected to MongoDB');
    setRoutes(app)
    app.get( "/", ( req:express.Request, res :express.Response  ) => {
        // return res.json({ message:"welcome" });
        res.render( "/index" ); 
    });
   
    // app.listen( port, () => {
    //     console.log( `server started at http://localhost:${ port }` );
    // });

    app.listen(app.get('port'), () => {
        console.log('server listening on port ' + app.get('port'));
    });

    
    

});

export { app }

// npx ts-node app.ts
