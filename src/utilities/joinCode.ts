export function generateJoinCode() {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;
  
  for ( var i = 0; i < 6; i++ ) { // let's go with a 6-character code for now
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  
  return result;
}