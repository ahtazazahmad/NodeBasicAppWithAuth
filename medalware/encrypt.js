const bcrypt = require('bcrypt');
const saltRounds = 10;
async function encrypt(text){
  let hash=await bcrypt.hash(text, saltRounds)
  return hash
}

async function decrypt(text){
   let hashStoredInDB="$2b$10$sgQoPVF1lxlwZD78sxaS3.YCmsOV8DnAvczlWisbKHfiqKwn4Aep2";
  let res=await bcrypt.compare(text, hashStoredInDB)
  return res;
}
module.exports={
   encrypt,
   decrypt,
}
