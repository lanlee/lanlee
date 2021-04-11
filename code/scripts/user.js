Bmob.initialize("79f44c39963af0e6cb974d2df26f4e4b", "1cec7ee578bfee43e37cd69972bf2100");

//Register
function registerNew(){
    var user = new Bmob.User();

    function getName(email) {
        var avg, splitted, part1, part2;
        splitted = email.split("@");
        part1 = splitted[0];
        part1 = part1.substring(0, part1.length);//could save
        return part1;
    };
    

    user.set("username", getName(email.value));
    user.set("password", password.value);
    user.set("email", email.value);
    //user.set("avatar",profileImage);
    // var name = getName(email.value);
    // var initials = name.charAt(0);
    // document.getElementById("name").innerHTML = initials;

    //user.set("bio",bio.value);

//other fields can be set just like with Bmob.Object
//user.set("phone", "415-392-0202");

    user.signUp(null, {
    success: function(user) {
        // Hooray! Let them use the app now.
        alert("Yay! You are registered now");
        window.location.href="_cn-1index.html";          

        //$('#invite-friend').show();
    },
    error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.message);
    }
    });
}

//Register from a task
function registerFromTask(){
    var newURL = new URL(window.location.protocol + "//" + window.location.host + "/code/_cn-3taskContent.html" + window.location.search);
    var taskid = window.location.search;
    taskid = taskid.replace('?task=','');

    var user = new Bmob.User();

    //get name from email
    function getName(email) {
        var avg, splitted, part1, part2;
        splitted = email.split("@");
        part1 = splitted[0];
        part1 = part1.substring(0, part1.length);//could save
        return part1;
    };
    

    user.set("username", getName(email.value));
    user.set("password", password.value);
    user.set("email", email.value);
    //user.set("avatar",profileImage);
    //user.set("bio",bio.value);

//other fields can be set just like with Bmob.Object
//user.set("phone", "415-392-0202");

    user.signUp(null, {
    success: function(user) {
        // Hooray! Let them use the app now.
        alert("Yay! You are registered now");


        //after login/register, add this user in ACL
        var userList = Bmob.Object.extend("userList");
        var query = new Bmob.Query(userList);
        query.equalTo("taskid", taskid);
        query.find({
            success: function(results) {
                var userIds = results.get("userIds");
                userIds.push(user);
                console.log(userIds)
            },
            error: function(error) {
                alert("查询失败: " + error.code + " " + error.message);
            }
        });
    
        //redirect after register
        window.location.href= newURL.href;      
    },
    error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.message);
    }
    });
}


//Login
function login(){
    Bmob.User.logIn(email.value, password.value, {
        success: function(user) {
            //redirect to user's homepage(update feed)
            alert("Yay! You are logged in now");
            window.location.href="_cn-1index.html";  
            //alert("Current user:"+Bmob.User.current().id);        

        },
        error: function(user, error) {
        // The login failed. Check error to see why.
        alert("Error: " + error.message);
        }
    });
    //current user
    var currentUser = Bmob.User.current();
    if (currentUser) {
        // do stuff with the user
    } else {
        // show the signup or login page
    }
}

function logout(){
    Bmob.User.logOut();
    alert("You are logged out now")
}
//
//var currentUser = Bmob.User.current();  // this will now be null

//get and display current user
function getUser(){
    const newURL = new URL(window.location.protocol + "//" + window.location.host + "/code/_cn-5teamPage.html");
    newURL.searchParams.append("user", Bmob.User.current().id);

    alert(newURL.href)
    //document.getElementById('taskContent').setAttribute('href',newURL.href);
    window.location.href= newURL.href;
}


//change username or password
function changename(){    
    var user = Bmob.User.logIn("my_username", "my_password", {
        success: function(user) {
        user.set("username", "my_new_username");  // attempt to change username
        user.save(null, {
            success: function(user) {
            // This succeeds, since the user was authenticated on the device
    
            // Get the user from a non-authenticated method
            var query = new Bmob.Query(Bmob.User);
            query.get(user.objectId, {
                success: function(userAgain) {
                userAgain.set("username", "another_username");
                userAgain.save(null, {
                    error: function(userAgain, error) {
                    // This will error, since the Bmob.User is not authenticated
                    }
                });
                }
            });
            }
        });
        }
    });
}


//limit read and write access
function limitaccess(){
    var Note = Bmob.Object.extend("Note");
    var privateNote = new Note();
    privateNote.set("content", "This note is private!");
    privateNote.setACL(new Bmob.ACL(Bmob.User.current()));
    privateNote.save();


    //setReadAccess and setWriteAccess
    var Message = Bmob.Object.extend("Message");
    var groupMessage = new Message();
    var groupACL = new Bmob.ACL();

    // userList is an array with the users we are sending this message to.
    for (var i = 0; i < userList.length; i++) {
    groupACL.setReadAccess(userList[i], true);
    groupACL.setWriteAccess(userList[i], true);
    }

    groupMessage.setACL(groupACL);
    groupMessage.save();


    //setReadAccess and setWriteAccess
    var publicPost = new Post();
    var postACL = new Bmob.ACL(Bmob.User.current());
    postACL.setPublicReadAccess(true);
    publicPost.setACL(postACL);
    publicPost.save();
}



//reset password
//emailVerified: true, false, missing
function emailverify(){
    Bmob.User.requestEmailVerify("h6k65@126.com", {
        success: function() {
        // Password reset request was sent successfully
        },
        error: function(error) {
        // Show the error message somewhere
        alert("Error: " + error.code + " " + error.message);
        }
    });
}


//reset password
function resetpassword(){
    Bmob.User.requestPasswordReset("test@126.com", {
        success: function() {
        // Password reset request was sent successfully
        },
        error: function(error) {
        // Show the error message somewhere
        alert("Error: " + error.code + " " + error.message);
        }
    });
}


//
//CRUD updates

function addUser(user,taskid){
    var newTask = Bmob.Object.extend("newTask");
    var newTask = new newTask();
    newTask.id = taskid;

    //var newACL = new Bmob.ACL();

    //newACL.setReadAccess(user, true);
    //newACL.setWriteAccess(user, true);

    //newTask.setACL(newACL);
    newTask.save();

    var newTask = Bmob.Object.extend("newTask");
    var query = new Bmob.Query(newTask);
    query.get(taskid, {
        success: function(newTask,user) {
            console.log(newTask)
            console.log(user)

        },
        error: function(newTask, error) {
        }
    });

}


  //create an update and connect to a task
  function createUpdate(){
    var newUpdate = Bmob.Object.extend("newUpdate");
    var newUpdate = new newUpdate();
    newUpdate.set("updateTitle",updateTitle.value);
    newUpdate.set("updateDescription",updateDescription.value);
    newUpdate.set("userCreated",Bmob.User.current());

    //attach newUpdate to corresponding task
    //get taskTag from update or task
    const newURL = new URL(window.location.protocol + "//" + window.location.host + "/code/_cn-3taskContent.html" + window.location.search);
    var taskid = window.location.search;
    taskid = taskid.replace('?task=','');

    //newUpdate.set("taskPic",fileUpload.value);
    //update.ACL=task.ACL


    var newTask = Bmob.Object.extend("newTask");
    var newTask = new newTask();
    newTask.id = taskid;
    newUpdate.set("parent", newTask);
    newUpdate.set("parentID", taskid);
    newUpdate.set("parentTag", newTask.get('projectTag'));
    newUpdate.set("parentTitle", newTask.get('taskTitle'));
    newUpdate.set("userCreated",Bmob.User.current());

    var userId = Bmob.User.current().id;
    var item = Bmob.User;                        
    var query = new Bmob.Query(item);
    console.log(userId)
    query.get(userId, {
    success: function(item) {
        var username = item.get("username");
        newUpdate.set("userCreatedName",username);
        console.log(username)
    },
    error: function(item, error) {
    }
    });
    newUpdate.set("status", "unread");

    
    newUpdate.save(null, {
    success: function(newUpdate) {
        alert('Update created!'+newUpdate.id+" appended to task "+taskid)
        window.location.href= newURL.href;                                                                           

                                                                                                                    
    },

    error: function(newUpdate, error) {
    // 添加失败
    alert('Error:' + error.description)
    }
    });
        

  }  

  
  //create an update and connect to a task
  function createUpdateFromUpdate(){
    var taskid = $(this).attr("id");
    console.log(taskid)


    var newUpdate = Bmob.Object.extend("newUpdate");
    var newUpdate = new newUpdate();
    newUpdate.set("updateTitle",updateTitle.value);
    newUpdate.set("updateDescription",updateDescription.value);
    newUpdate.set("userCreated",Bmob.User.current());

    //attach newUpdate to corresponding task
    //get parentID from this updateID

    var newTask = Bmob.Object.extend("newTask");
    var newTask = new newTask();
    var query = new Bmob.Query(newTask);
    newUpdate.set("parent", newTask);
    newUpdate.set("parentID", taskid);

    //get parent tag info
    query.get(taskid, {
        success: function(newTask) {
            var parentTag = newTask.get('projectTag');
            var parentTitle = newUpdate.set("parentTag", parentTag);
            newUpdate.set("parentTag", parentTag);
            newUpdate.set("parentTitle", parentTitle);
        },
        error: function(newTask, error){

        }
    });

    //set the userCreated info
    newUpdate.set("userCreated",Bmob.User.current());
    var userId = Bmob.User.current().id;
    var item = Bmob.User;                        
    var query = new Bmob.Query(item);
    console.log(userId)
    query.get(userId, {
    success: function(item) {
        var username = item.get("username");
        newUpdate.set("userCreatedName",username);
        console.log(username)
    },
    error: function(item, error) {
    }
    });
    newUpdate.set("status", "unread");

    
    newUpdate.save(null, {
    success: function(newUpdate) {
        alert('Update created!'+newUpdate.id+" appended to task "+taskid)
        window.location.href= newURL.href;                                                                           

                                                                                                                    
    },

    error: function(newUpdate, error) {
    // 添加失败
    alert('Error:' + error.description)
    }
    });
        

  }  

//CRUD tasks
  //Create a new task + creating a just created update
  function createTask(){
    var newTask = Bmob.Object.extend("newTask");

    var newTask = new newTask();
    newTask.set("projectTag",projectTag.value);
    newTask.set("taskTitle",taskTitle.value);
    newTask.set("taskDescription",taskDescription.value);
    newTask.set("userCreated",Bmob.User.current());
    newTask.set("startDate",startDate.value);
    newTask.set("endDate",endDate.value);
    newTask.set("status","inProgress");

    //newTask.set("taskPic",fileUpload.value);
    //newTask.set("userList",userList.value);
    //all friends multiple choice
    //Everyone
    //Members from task:
    //Member 
    //newTask.setACL(new Bmob.ACL(Bmob.User.current()));


    newTask.save(null, {
        success: function(newTask) {
            alert('Task created!'+newTask.id)
    
            //create task URL
            const newURL = new URL(window.location.protocol + "//" + window.location.host + "/code/_cn-3taskContent.html");
            newURL.searchParams.append("task", newTask.id);

                //attach the first "task created" update to task
                var newUpdate = Bmob.Object.extend("newUpdate");
                var newUpdate = new newUpdate();
                newUpdate.set("updateTitle","已创建任务："+taskTitle.value);
                newUpdate.set("updateDescription",taskDescription.value);
                newUpdate.set("parent", newTask);
                newUpdate.set("parentID", newTask.id);
                newUpdate.set("parentTag", newTask.get('projectTag'));
                newUpdate.set("parentTitle", newTask.get('taskTitle'));
                newUpdate.set("userCreated",Bmob.User.current());


                var item = Bmob.User;                        
                var query = new Bmob.Query(item);
                query.get(Bmob.User.current(), {
                success: function(item) {
                    var username = item.get("username");
                    newUpdate.set("userCreatedName",username);
                },
                error: function(item, error) {
                }
                });
                newUpdate.set("status", "unread");
                //newUpdate.setACL(new Bmob.ACL(Bmob.User.current()));
                newUpdate.save(null, {
                success: function(newTask) {
                    alert('Update created!'+newUpdate.id)    
                    //redirect to taskContent page
                    window.location.href= newURL.href;                                                                           
                    },
                error: function(newTask, error) {
                    alert(error.code + " " + error.message);
                    }
                });
                                                                                                               
        },
        error: function(newTask, error) {
            alert(error.code + " " + error.message);
            }
        });
    }


function terminateTask(){
    var taskid = window.location.search;
    taskid = taskid.replace('?task=','');

    //newUpdate.set("taskPic",fileUpload.value);
    //update.ACL=task.ACL


    var newTask = Bmob.Object.extend("newTask");
    var newTask = new newTask();
    newTask.id = taskid;
    newUpdate.set("parent", newTask);
}



    //Read a update
    function readUpdate(){
        var newUpdate = Bmob.Object.extend("newUpdate");
        var query = new Bmob.Query(newUpdate);
        // 查询所有数据
        query.find({
          success: function(results) {
            alert("共查询到 " + results.length + " 条记录");
            // 循环处理查询到的数据
            for (var i = 0; i < results.length; i++) {
              var object = results[i];
              alert(object.id + ' - ' + object.get('updateTitle'));
            }
          },
        error: function(error) {
          alert("查询失败: " + error.code + " " + error.message);
        }
      });
      }
  

  //invite page redirect to login page
  function redirectRegister(){

    var newURL = new URL(window.location.protocol + "//" + window.location.host + "/code/_cn-3taskContent.html" + window.location.search);
    var taskid = window.location.search;
    taskid = taskid.replace('?task=','');

    //if current user is not a part of the task, redirect to register pop up
    if(Bmob.user.current().id===null){
    alert("You don't have access to this task. Please log in or register to continue.")

    var registerPop = document.getElementById('register');
    registerPop.show();

    //redirect after register
    window.location.href= newURL.href;  

//if current user is a part of this task ACL list, it stays in the taskContent page, and add to ACL list
    } else{
        var newTask = Bmob.Object.extend("newTask");
        var groupTask = new newTask();
        groupTask.id = taskid;
        //redirect automatically
        window.location.href= newURL.href;  
    }


                                                                         


  }


function getURL(){
    var newURL = new URL(window.location.protocol + "//" + window.location.host + "/code/_cn-3taskContent.html" + window.location.search);
    var newSearch = window.location.search;
    document.getElementById("inviteURL").innerHTML = newURL;
    return newSearch;
}




/*var taskid = window.location.search;
taskid = taskid.replace('?task=','');
var newTask = Bmob.Object.extend("newTask");
var query = new Bmob.Query(newTask);
query.get(taskid, {
    success: function(newTask) {
        var ACL = newTask.getACL();
        var ACLgroup = Object.keys(ACL.permissionsById);
        //console.log(ACLGroup)
    },
    error: function(newTask, error) {
    }
});*/



// function addACL(user,taskid){
//     var newTask = Bmob.Object.extend("newTask");
//     var query = new Bmob.Query(newTask);
//     query.get(taskid, {
//         success: function(newTask,user) {
//             //newACL.setReadAccess(Bmob.User.current(), true);
//             //newACL.setWriteAccess(Bmob.User.current(), true);
//             //newTask.setACL(new Bmob.ACL(user));

//             //current ACL list, count ACL list items, add an extra
//             console.log(taskid)
//             console.log(user)

//             var userList = newTask.get("userList");

//             userList.push(user);

//             console.log(userList)
//             newTask.save();

//             // var updateTask = new newTask();
//             // var newACL = new Bmob.ACL();

//             // // userList is an array with the users we are sending this message to.
//             // for (var i = 0; i < userList.length; i++) {
//             // newACL.setReadAccess(userList[i], true);
//             // newACL.setWriteAccess(userList[i], true);
//             // }

//             // updateTask.setACL(newACL);
//             // updateTask.save();

//             //var relation = user.relation("userGroup");
//             //relation.add(user.id);
//             //user.save();


//             /*
//             console.log(Object.keys(ACL.permissionsById))
//             console.log(Object.keys(ACL.permissionsById).length)
//             var end = Object.keys(ACL.permissionsById).length;
//             console.log(Object.keys(ACL.permissionsById)[0])

//             Object.keys(ACL.permissionsById)[end+1] = user.id;
//             console.log(Object.keys(ACL.permissionsById)[end+1])
              
//             //new user ACL
//             var newACL = new Bmob.ACL(user);
//             //append new user ACL to current ACL
//             console.log(newACL.permissionsById)

//             //var ACLgroup = Object.keys(ACL.permissionsById);
//             newTask.updateACL(newACL);
//             newTask.save();*/
//         },
//         error: function(newTask, error) {
//         }
//     });

// }
    
