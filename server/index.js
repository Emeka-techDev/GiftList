const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = '367b481850b4fbad902881ad7afde8865e6984afe3132c6559ed564a7ace20bf';

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const {proof, name} = req.body;

  // TODO: prove that a name is in the list 
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);
  // const isInTheList = false;
  // res.send(isInTheList ? "You got a toy robot" : "You are not on the list")
 
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
