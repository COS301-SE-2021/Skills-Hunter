var account = {
	    name: "Joseph",
        surname: "Makgopa",
        phone: "0606116670",
        email: "joseph@gmail.com",
        password: "joseph",
        role: 3,
        startDate: "12-10-2021",
        openForWork: true
};


var req = new XMLHttpRequest();
req.setRequestHeader("Content-type", "application/json");

req.onreadystatechange = function(){
  if(req.readyState == 4 && req.status == 200){
      document.getElementById("dis").innerHTML = req.responseText;
      console.log("successfully inserted record");
  }else{
  	   console.log("failed to insert record");
  }
}

req.open("POST", "http://localhost:5000/api/User/register", false);
req.send(JSON.stringify(account));