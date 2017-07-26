import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import graphqlHTTP from 'express-graphql'
import Schema from '../models/Schema';

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true
}));

app.set('view engine', 'pug');

app.use('/static', express.static(path.join(__dirname, '../public')));
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index', {title: 'Express', message: 'Hello Express!'});
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal server erro");
});

app.listen(3000, () => {
  console.log('Express runing at http://127.0.0.1:3000');
});

