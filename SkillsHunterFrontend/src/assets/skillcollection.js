var loginDetails = {
    email: "master@gmail.com",
    password: "master"
}

var skillCollections = {
        name: "Game Design",
        description: "Game level design and assets creation.",
        weight: 7, 
        skills: [
          {
            skillId: "D86075D1-D146-43E9-9EBB-3960FC17D8B7",
            weight: 8
          },
          {
            skillId: "8EA36C03-4DC8-45D5-BFB2-78C16A048D8F",
            weight: 6
          },
          {
            skillId: "7849F453-C25E-45E9-8DC4-D26A5A114E65",
            weight: 9
          }
        ]
};

var adminAccount = null;




function createData(){
  var req = new XMLHttpRequest();
  req.setRequestHeader("Content-type", "application/json");

  if(adminAccount != null)
    req.setRequestHeader("Authorization", "bearer " + adminAccount.token);

  req.onreadystatechange = function(){
    if(req.readyState == 4 && req.status == 200){
        console.log("========================================");
        console.log("Response");
        console.log("========================================");
        console.log(JSON.parse(req.responseText));
    }else{
         console.log("failed to insert record");
    }
  }

  req.open("POST", "http://localhost:5000/api/Admin/createSkillCollection", false);
  req.send(JSON.stringify(skillCollections));
}

function login(){

  var req = new XMLHttpRequest();
  req.setRequestHeader("Content-type", "application/json");

  req.onreadystatechange = function(){
    if(req.readyState == 4 && req.status == 200){
        console.log("========================================");
        console.log("Authenticate Response");
        console.log("========================================");
        adminAccount = JSON.parse(req.responseText);
        console.log(adminAccount);

    }else{
         console.log("Authentication failed");
    }
  }

  req.open("POST", "http://localhost:5000/api/User/authenticate", false);
  req.send(JSON.stringify(loginDetails));
}

login();
createData();