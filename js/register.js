let id = document.getElementById('id')
        names = document.getElementById('name')
        pwd = document.getElementById('password')
        flag = 0

    function ifExist(){
        //读取数据，判断是否存在
        const myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")
        let requestOptions = { // 里面不能有body
          method: "GET",  
          headers: myHeaders,
          redirect: "follow",
        }
        fetch(`https://db.api.orght.cn/users`, requestOptions)
        .then(response => response.json())
        .then(data => {
            for(let i = 0;i<data.length;i++){
                if (data[i].id === id.value && data[i].name === names.value && ((data[i].password == pwd.value)||(data[i].password == md5(pwd.value)))) { 
                    console.log('存在该用户，无需注册，请登录')
                    flag = 1
                  } else {
                    //throw new Error("用户名不存在")
                    console.log('!!!')
                    //进行注册
                    // register()
                  }
            }
            console.log('flag=',flag)
            if(flag == 1){
                //跳转到登录界面
                // login()
                alert('存在该用户，无需注册，请登录')
                window.location.replace('./index.html')
            }else{
                if(id.value=='' || names.value=='' || pwd.value==''){
                    console.log('111')
                    alert('请输入正确信息！')
                }else{
                    register()
                    alert('注册成功！')
                    document.location.href='./index.html'
                }
            }
         })
        .catch(err => console.log(err))  
    }

    //注册
    function register(){
        const myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")
        let requestOptions = {
          method: "POST",
          headers: myHeaders,
          redirect: "follow",
        }
        requestOptions.body = JSON.stringify({id: id.value, name: names.value, password: md5(pwd.value)})
        fetch(`https://db.api.orght.cn/users`, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log('data.length=',data.length)
            // for(let i = 0;i<data.length;i++){
            //     console.log('data[i].id=',data[i].id)
            // }
        })
        .catch(err => console.log(err)) 
    }