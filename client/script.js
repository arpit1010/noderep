function PaymentsController(scope,$http) {
    $http.get("/getPayments").then(function(res){
       
        scope.payments=res.data;
        angular.forEach(scope.payments,function(value){
            value.isSelected = false;
        });
    });
    scope.setSelectedPayment = function(id){
        scope.isNewPayment = false;
        for(let i = 0; i<scope.payments.length;i++){
            if(id === scope.payments[i].id){
                scope.selectedPayment = scope.payments[i];
                scope.payments[i].isSelected = true;
                scope.showDetailForm = true;
                scope.hideCreateButton = true;
            }else{
                scope.payments[i].isSelected = false;
                
            }
        }
    }
    scope.cancelPayment= function(){
        angular.forEach(scope.payments,function(value){
            value.isSelected = false;
        });
        scope.showDetailForm = false;
        scope.isNewPayment = false;
        scope.hideCreateButton = false;
    };
    scope.deletePayment = function(id){
        var dataObj = {
            id:id,
        }
        $http.post('/deletepayment', dataObj).then(function(res){
            scope.payments=res.data;
            scope.cancelPayment();
        });
    }
    scope.savePayment = function(typeOfOperation){
     if(typeOfOperation=='new'){
         var dataObj = {
            id:scope.selectedPayment.id,
            counterparty:scope.selectedPayment.counterparty,
            currency:scope.selectedPayment.currency,
            valueDate:scope.selectedPayment.valueDate,
            creditAccount:scope.selectedPayment.creditAccount,
            amount:scope.selectedPayment.amount
         }
        $http.post('/savenewpayment', dataObj).then(function(res){
            scope.payments=res.data;
            angular.forEach(scope.payments,function(value){
                value.isSelected = false;
            });
        });
     }else{
        var dataObj = {
            id:scope.selectedPayment.id,
            counterparty:scope.selectedPayment.counterparty,
            currency:scope.selectedPayment.currency,
            valueDate:scope.selectedPayment.valueDate,
            creditAccount:scope.selectedPayment.creditAccount,
            amount:scope.selectedPayment.amount
         }
        $http.post('/updatepayment', dataObj).then(function(res){
            scope.payments=res.data;
            angular.forEach(scope.payments,function(value){
                value.isSelected = false;
            });
        });
     }
     scope.cancelPayment();
    };
    scope.createNewPayment = function(){
        scope.hideCreateButton = true;
        scope.isNewPayment = true;
        scope.showDetailForm = true;
        scope.isNewPayment = true;
        scope.selectedPayment = {
            id:(new Date().getTime()).toString(),
            counterparty:"",
            valueDate: "",
            amount:"",
            currency:"",
            creditAccount:""
        };
        angular.forEach(scope.payments,function(value){
            value.isSelected = false;
        });
    }
}

angular.module("paymentsApp", [])
    .controller("PaymentsController", ["$scope","$http", PaymentsController]);
