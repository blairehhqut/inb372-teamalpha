$(document).ready(function() {
   
    db = getDB();
    var count = 0;
    
    window.setInterval(function() {
        $("#countDiv").html(count);
        if (count == 100) {
            count = 0;   
        } else {
            count++;
        }
    }, 3000); // 3 seconds
   
   $("#addtodb").click(function() {
       var text = $("#sometext").val();
       var trueFalse = $("#truefalse").val();
       var color = $("#color").val();
       
        db.transaction(function(t) { 
            t.executeSql("INSERT INTO appData('someText','trueFalse','color') VALUES ('" + text + "','" + trueFalse + "','" + color + "');", [], null, null);
           
        });

       $("#sometext").val("");
     
       
   });
    
    
    $("#showRecords").click(function() {
        $("#recordsTable > tbody").empty();
        var query = 'SELECT * FROM appData';
        db.transaction(function(t){
            t.executeSql(query,null,function(t,data) {
               for (var i = 0; i < data.rows.length; i++) {
                    $("#recordsTable").append("<tr><td>" + data.rows.item(i).someText + "</td><td>" + data.rows.item(i).trueFalse + "</td><td>" + data.rows.item(i).color + "</td></tr>"); 
               }
               
            });
        });
    });
    
    
    $("#clearData").click(function() {
        var del = confirm("Are you sure want to delete all data?");
        if (del) {
            alert("deleting");
            db.transaction(function(t) {
               t.executeSql('DELETE FROM appData',[]);
            });
            $("#recordsTable > tbody").empty();
        }
    });
});

