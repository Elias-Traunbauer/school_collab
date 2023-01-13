var currentdate = new Date(); 
var datetime = "Build " + (currentdate.getDate().toString().length == 1 ? "0" + currentdate.getDate() : currentdate.getDate())  +
                  ((currentdate.getMonth()+1).toString().length == 1 ? "0" + (currentdate.getMonth()+1) : (currentdate.getMonth()+1))  +
                  (currentdate.getFullYear().toString().length == 1 ? "0" + currentdate.getFullYear() : currentdate.getFullYear())  +
                  (currentdate.getHours().toString().length == 1 ? "0" + currentdate.getHours() : currentdate.getHours())  +
                  (currentdate.getMinutes().toString().length == 1 ? "0" + currentdate.getMinutes() : currentdate.getMinutes())  +
                  (currentdate.getSeconds().toString().length == 1 ? "0" + currentdate.getSeconds() : currentdate.getSeconds());

const fs = require('fs');

const content = "<?php echo '" + datetime + "'; ?>"

fs.writeFile('./api/version.php', content, err => {
  if (err) {
    console.error(err);
  }
});