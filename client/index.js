const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  let name = "Emeka";
  
  const merkleTree = new MerkleTree(niceList);
  const root = merkleTree.getRoot();
  console.log(`the root hash is ${root}`);

  const index = niceList.findIndex(n => n == name);
  console.log(index);

  let proof;
  
  if (index != -1) {
     proof =  merkleTree.getProof(index);
  
  }
  console.log(proof)

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof,
    name
  });

  console.log({ gift });
}

main();