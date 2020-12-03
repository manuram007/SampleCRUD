    var id;
    var multiId=[];
    var temp=false;
    var stringData;
    var Userdata;
       $(document).ready(function () {
        $("#Edit").prop("disabled", true);
        $("#Delete").prop("disabled", true);
        bind();
       
           
        $("#selectall").click(function () {
    
          if ($(this).prop("checked") == true) {
            console.log("Checkbox is checked.");
            $('.case').prop('checked', true);
          }
          else if ($(this).prop("checked") == false) {
            console.log("Checkbox is unchecked.");
            $('.case').prop('checked', false);
          }
          
    Edit();
        });
        $(document).on("change",".case", function () {
         Edit();
          if ($(".case").length == $(".case:checked").length) {
            $("#selectall").prop("checked", true);
          }
          else {
            $("#selectall").prop("checked", false);
          }
        });
    
      });
    function Edit(){
      if ($(".case:checked").length == 1) {
            $("#Edit").prop("disabled", false);
            $("#Delete").prop("disabled", false);
            if ($(".case:checked").length > 1) {
              $("#Delete").text('Delete Users');
            }
            else {
              $("#Delete").text('Delete User');
            }
          }
          else {
            if ($(".case:checked").length == 0) {
              $("#Delete").prop("disabled", true);
              $("#Delete").text('Delete User');
            }
            else {
              if ($(".case:checked").length > 1) {
                $("#Delete").text('Delete Users');
              }
              else {
                $("#Delete").text('Delete User');
              }
              $("#Delete").prop("disabled", false);
            }
            $("#Edit").prop("disabled", true);
          }
    }
    
      function bind() {
        var str = '';
        $.ajax({
          type: "GET",
          url: "https://jsonplaceholder.typicode.com/posts",
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function (response) {
            $("#bind tbody").empty();
            console.log(response);
            if(temp==false){
              Userdata = response;
              temp=true;
            }
           
            var i;
             
            for (i = 0; i < Userdata.length; ++i) {
              str = str + "<tr>";
              str = str + "<td><input type='checkbox' class='case' name='case' value='" + Userdata[i].id + "' /> </td>";
              str = str + "<td >";
    
              str = str +  Userdata[i].id  ;
              str = str + "</td>";
              str = str + "<td >";
    
              str = str +  Userdata[i].title ;
              str = str + "</td>";
              str = str + "<td >";
              str = str +   Userdata[i].body  ;
              str = str + "</td>";
    
    
              str = str + "</tr>";
    
            }
            $('#bind').append(str);
    
    $(".loading").hide();
    
          },
          failure: function (response) {
            
            alert(response.responseText);
            
            alert("Failure");
            $(".loading").hide();
          },
          error: function (response) {
            
            alert(response);
    
            alert("Error");
            $(".loading").hide();
          }
        });
    
    
      }
    
     function UpdateRequest(){
       $('.modal-title').text("Exist User");
      var grid = document.getElementById("bind");
      var checkBoxes = grid.getElementsByTagName("INPUT");
    
     for (var i = 0; i < checkBoxes.length; i++) {
         if (checkBoxes[i].checked) {
             var row = checkBoxes[i].parentNode.parentNode;
             id=row.cells[1].innerHTML;
             title=row.cells[2].innerHTML;
             $("#title").val(title);
             body=row.cells[3].innerHTML;
             $("#body").val(body);
             
            break;
         }
    
    
     }
    
           
                      
     }
     function SubmitRequest(){
      var title=$("#title").val();
         var body=$("#body").val();
      var data = { title: title, body: body,id:id,userId: 1 };
      var url;
      var type;
      var Alertmessage;
       if(id!=null && id !=undefined&& id!=''){
               url="https://jsonplaceholder.typicode.com/posts/"+id;
               
              type="PUT";
              Alertmessage="Record updated successful";
       }
       else{
        url="https://jsonplaceholder.typicode.com/posts/";
        type="POST";
        Alertmessage="Record inserted successful";
       }
       stringData = JSON.stringify(data);      
               $.ajax({      
                   type: type,      
                   url: url,      
                   data: stringData,      
                   contentType: "application/json; charset=utf-8",      
                   dataType: "json",      
                   success: function (result,status,xhr) {
                    alert(Alertmessage);
             
            var i;
            for (i = 0; i < Userdata.length; ++i){
              if (Userdata[i].id == id){
                Userdata[i].title=title;
                Userdata[i].body=body;
                id=null;
                break;
              }
            }
            if(type=="POST")
            Userdata.push(result);
    
             $("#title").val('');
         $("#body").val('');
            
            bind();
    
          },
           
          error: function (xhr,status,error) {
            
            alert(xhr);
    
          
            $(".loading").hide();
          }     
               }); 
    
             
       
       
     }
     $("#Delete").click(function () {  
      var grid = document.getElementById("bind");
      var checkBoxes = grid.getElementsByTagName("INPUT");
      multiId=[]; 
     for (var i = 0; i < checkBoxes.length; i++) {
         if (checkBoxes[i].checked) {
             var row = checkBoxes[i].parentNode.parentNode;
             multiId.push(row.cells[1].innerHTML);
         }
     }
     $('.case').prop('checked', false);
     Edit();
     var ans = confirm("Are you sure you want to delete Record(s)?");  
     var tempval=false;
     for(var j=0;j<multiId.length;j++){
        
        if (ans) {  
            $.ajax({  
                url: "https://jsonplaceholder.typicode.com/posts/" + multiId[j],  
                type: "DELETE",  
                contentType: "application/json;charset=UTF-8",  
                dataType: "json",  
                success: function () { 
                 
                  tampval=true;
                    
                    bind();
                },  
                error: function (errormessage) {  
                    alert(errormessage.responseText);  
                }  
            });  
            Userdata = Userdata.filter(function(item) { 
       return item.id !== parseInt(multiId[j]);  
      
    }); 
    setTimeout(function () {
      if(tempval){
        alert("Records deleted successfully!");
       }
                            }, 1000);
    
        } 
     }
     
    });    
    $("#Add").click(function () {  
      
      $('.modal-title').text("New User");
       
            $('.case').prop('checked', false);
            $("#title").val('');
         $("#body").val('');
         Edit();
          
    });    
    