var currentdate = new Date(); 
var datetime = "Build " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + "-"  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds() + " GMT";

const fs = require('fs');

const content = "<?php echo '" + datetime + "'; ?>"

fs.writeFile('./api/version.php', content, err => {
  if (err) {
    console.error(err);
  }
});