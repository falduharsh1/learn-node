const fs = require('fs')

//for craete folder
fs.mkdir( './src/data', (err)=> {
    if(err){
        console.log(err); 
    }

    console.log("depositiory craeted"); 
})

//craete a file and add text
fs.writeFile('./src/data/demo.txt' , 'helloo' , (err) => {
    if(err){
        console.log(err);
        
    }

    console.log("file craeted");
})

//in file add some more data
fs.appendFile('./src/data/demo.txt' , ' world' , (err) => {
    if(err){
        console.log(err);
    }

    console.log("successfull");
})

//for delete file
fs.unlink('./src/data/demo.txt' , () => {
    if(err){
        console.log(err);
    }

    console.log("delete");
})