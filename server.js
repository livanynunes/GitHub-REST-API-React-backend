// Creating our HTTP server 
let express = require('express')
let cors = require('cors')
let app = express()
// Let it be acessible for others
app.use(cors())
let port = process.env.PORT || 8000;
let fetch = require("node-fetch");

//IP tokens to access Github application  // 60 access/hour
const client_id = 'Iv1.Iv1.a1dd32dc29b315b0';
const client_secret = 'f46d3af79fa14f5d839217d1adf3d2b82fbca2b3';

const fetchUser = async (user) => {
    const api_call = await fetch(`https://api.github.com/users/${user}?client_id=${client_id}&client_secret=${client_secret}`);
    const data = await api_call.json();
    return data;
    // console.log(data); // for tests
};

const fetchRepos = async (user) => {
  const api_call = await fetch(`https://api.github.com/users/${user}/repos?client_id=${client_id}&client_secret=${client_secret}`);
  const data = await api_call.json();
  return data;
  // console.log(data); // for tests
};

const fetchSince = async (number) => {
    const api_call = await fetch(`https://api.github.com/users?since=${number}&client_id=${client_id}&client_secret=${client_secret}`);
    const data = await api_call.json();

    // return array 'data' and a string 'next' with link for the next page
    return{data,next:`${process.env.APP_URL || 'http://localhost'}:${port}/api/users?since=${data[data.length-1].id}`};
};

app.get('/api/users', (req, res) => {
  fetchSince(req.query.since).then(
    (data)=>{res.send(data)}
  );
});

app.get('/api/users/:username/details', (req, res) => {
  fetchUser(req.params.username).then( 
    (data)=>{
      res.send(data)} 
    );
});

app.get('/api/users/:username/repos', (req,res)=>{
  fetchRepos(req.params.username).then( (data)=>{res.send(data)} );
});

module.exports = app.listen(port, () => {
  console.log(`Servidor rodando em ${process.env.APP_URL || 'http://localhost'}:${port}`)
  console.log('Para derrubar o servidor: ctrl + c');
})
