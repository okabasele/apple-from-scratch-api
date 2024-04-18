const express = require('express');
const app = express();

const initAPI = async () => {
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  
  app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
  })

}

initAPI();