$(document).ready(function(){
    window.onload = function() {
        loadExp();
    }
        $('[name=spending]').autoNumeric('init', {aSign:'SGD $ '});   

        $(function($) {
            $('.money-bg').autoNumeric('init', {aSign:'SGD $ '});   
            $("#sign-up").validate({
                rules: {
                    firstName: "required",
                    lastName: "required",
                    ocptn: "required",
                    budget: "required",
                    income: "required",
                    balance: "required"
                    },
                messages: {
                    firstName: "This field is required",
                    lastName: "This field is required",
                    ocptn: "This field is required",
                    income: "This field is required",
                    balance: "This field is required"
                }
            });
            
            $("#next").on('click', function() {
                $("#sign-up").submit();
                var name = $("#firstName").val() + " " + $("#lastName").val();
                var occupation = $("#ocptn").val();
                var budget =  parseInt($('#budget').autoNumeric('get'));
                var income =  parseInt($('#income').autoNumeric('get'));
                var balance =  parseInt($('#balance').autoNumeric('get'));
                
                console.log("balance:" + balance);
                var expenses = 0;
                if ($("input").length != $('input').filter(function () {
                    return $.trim(this.value)
                    }).length){
                    $("#sign-up").validate();
                } else {
                    window.open("home.html",'_self');
                    getUser(name, occupation, budget, income, balance);
                    console.log(name + occupation + budget + income + balance);
                    ;
                }

            })
        
        });
    
    
        function User (name, occupation, budget, income, balance) {
                this.name = name;
                this.occupation = occupation;
                this.budget = budget;
                this.income = income;
                this.balance = balance;

            }
    
        function getUser(name, occupation, budget, income, balance){
            var user_input = new User(name, occupation, budget, income, balance);
            
            
            var temp = []; 
            temp.push(user_input);
            localStorage.setItem("dataKey", JSON.stringify(temp));
            
            var getTemp = JSON.parse(localStorage.getItem("dataKey"));
        }
        
        
        
        
/* -------- Expenses page -------- */
       var now = new Date();
        var today = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
        $('#date').val(today);
    
    
        $("#expenses").on('click', function() {
            window.open("expenses.html",'_self');

        });
        $("#analysis").on('click', function() {
            window.open("analysis.html",'_self')
        });
        $("#table").on('click', function() {
            window.open("table.html",'_self')
        });
        
        
        $("#record").validate({
                rules: {
                    category: "required",
                    note: "required",
                    paymentMode: "required",
                    spending: "required",
                },
                fields: {
                    date: {
                        validators: {
                            date: {
                                format: 'DD/MM/YYYY',
                                message: 'The value is not a valid date'
                            }
                        }
                    }
                },
                messages: {
                    firstName: "This field is required"
                }
            });
    
        var i = 0;
        $(".add").on('click', function(event) {
            event.preventDefault()
            
            if ($("#record input").length != $('#record input').filter(function () {
                    return $.trim(this.value)
                    }).length){
                    $("#record").validate();
                } else {
                   i++;
                    $("#recordTable").append('<tr><th>Date</th><th>Category</th><th>Note</th><th>Payment Mode</th><th>Expenses</th></tr><tbody id="row'+i+'"><tr><td><input id="date" type="date" name="date" style="float:left;border-radius:30px;"/></td><td><select class="category" ><option name="category" value="personal">Personal</option><option name="category" value="work">Work</option><option name="category" value="school">School</option><option name="category" value="bills">Bills</option></select></td><td><input type="text"  name="note" placeholder="Type here" style="border:2px solid #A4CEEE"/></td><td><select class="payment-mode"><option  name="paymentMode" value="credit-debit">Credit/debit</option><option name="paymentMode" value="cash">Cash</option><option  name="paymentMode" value="others" name=others>Others</option></select></td><td><input name="spending" type="text" data-a-sign="$ " style="border:2px solid #A4CEEE" required/><td><button type="button" name="remove" id="'+i+'" class="btn btn-danger btn_remove">X</button></td></td></tbody>');
    
                     }
            });
        
       $('#submit').on('click', function(event){
           event.preventDefault();
            var table = $("#recordTable");
            var recordData = {
                category: [],
                note: [],
                payment: [],
                spending: [],
                date:[]
            }
           table.find('tbody tr').each(function () {
               $('[name=spending]').autoNumeric('init', {aSign:'SGD $ '});
                var category = recordData.category.push($('[name=category]:selected', this).val()),
                note = recordData.note.push($('[name=note]', this).val()),
                payment = recordData.payment.push($('[name=paymentMode]:selected', this).val()),
                spending = parseInt(recordData.spending.push($('[name=spending]', this).autoNumeric('get'))),
                date = recordData.date.push($('[name=date]', this).val())
 

                localStorage.setItem("dataList", JSON.stringify(recordData));
               
               var getRecord = JSON.parse(localStorage.getItem("recordData"));
               
               var rCount = $('#recordTable tr').length - 1;     
               console.log("row count " + rCount);

               var sum = 0;
               if (spending != null){
                   for(var i = 0; i < rCount; i++){
                       sum = sum + parseInt((recordData['spending'])[i]);
                    }
               }
                console.log("expenses" + sum);
                var labelExp = $("#lblExpenses").text("SGD $ " + sum);

               
            });
           

        });     

    function loadExp(){
        for (var i=0; i < spending.length;i++){
            var getExpense = JSON.parse(localStorage.getItem(recordData["spending"]))[i];
        
            console.log(JSON.parse(localStorage.getItem(recordData["spending"]))[i]);
        
            var category = "category";
            var payment = "payment";
            var note = "note";
            var spending = "spending";
            var date = "date";
        }
        /*$('[name=spending]').autoNumeric('init', {aSign:'SGD $ '});
        var rCount = $('#recordTable tr').length - 1;   
        var recordData = {
                category: [],
                note: [],
                payment: [],
                spending: [],
                date:[]
            }
        var category = recordData.category.push($('[name=category]:selected', this).val()),
        note = recordData.note.push($('[name=note]', this).val()),
        payment = recordData.payment.push($('[name=paymentMode]:selected', this).val()),
        spending = parseInt(recordData.spending.push($('[name=spending]', this).autoNumeric('get'))),
        date = recordData.date.push($('[name=date]', this).val())


        localStorage.setItem("dataList", JSON.stringify(recordData));
               
        var getRecord = JSON.parse(localStorage.getItem("recordData"));
        var sum = 0;
        if (spending != null){
           for(var i = 0; i < rCount; i++){
               sum = sum + parseInt((recordData['spending'])[i]);
            }
        }*/


        
    }
 
      $(document).on('click', '.btn_remove', function(){  
            console.log('lci');
            var button_id = $(this).attr("id"); 

            $('#row'+button_id).remove(); 
            console.log("attempting to remove #row " + button_id);               
        });
      

        /*console.log($(".payment-mode").val());
        if(payment == others){
            $(".if-others").show()
        }*/

    
    if ($('nav').hasClass('back')){
           $(".back").on('click', function(){
            window.open("home.html",'_self')
        });
    }
    
   
});


