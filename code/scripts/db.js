//Bmob.initialize("Application ID", "REST API Key");
Bmob.initialize("79f44c39963af0e6cb974d2df26f4e4b", "1cec7ee578bfee43e37cd69972bf2100");

//Create a new update
function createUpdate(){
  var newUpdate = Bmob.Object.extend("newUpdate");
      var newUpdate = new newUpdate();
      var groupACL = new Bmob.ACL();
      newUpdate.set("updateTitle",updateTitle.value);
      newUpdate.set("updateDescription",updateDescription.value);

      newUpdate.setACL(new Bmob.ACL(Bmob.User.current()));

      // userList is an array with the users we are sending this message to.
     /* for (var i = 0; i < userList.length; i++) {
        groupACL.setReadAccess(userList[i], true);
        groupACL.setWriteAccess(userList[i], true);
      }*/

      newUpdate.setACL(groupACL);


      //添加数据，第一个入口参数是null
      newUpdate.save(null, {
      success: function(newUpdate) {
      // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
      alert('添加更新信息成功');
      window.location.href="_cn-1index.html";          
    },
      error: function(newUpdate, error) {
      // 添加失败
      alert('添加数据失败，返回错误信息：' + error.description);
      }
      });
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


//Create a new task
function addTask(){
  var newTask = Bmob.Object.extend("newTask");
      var newTask = new newTask();
      newTask.set("taskTitle",taskTitle.value);
      newTask.set("taskDescription",taskDescription.value);
      //添加数据，第一个入口参数是null
      newTask.save(null, {
      success: function(newTask) {
      // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
      alert('添加数据成功，返回的objectId是：' + newUpdate.id);
      },
      error: function(newUpdate, error) {
      // 添加失败
      alert('添加数据失败，返回错误信息：' + error.description);
      }
      });
}