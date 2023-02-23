
let input = "";
let output = document.querySelector('.output');
let result = document.querySelector('.total');
let pointFlag = false;
let symboleFlag = true;


function showValue(btn){
    result.innerHTML = "Total : ";
    if(btn.value == '.'){
        if(pointFlag == false){
            input += "0" + btn.value;
            pointFlag = true;
        }else{
            input += "";
        };
    }else if(   btn.value == '%' ||
                btn.value == '/' ||
                btn.value == '*' ||
                btn.value == '-' ||
                btn.value == '+'){
        if(symboleFlag == false){
            input += btn.value;
            symboleFlag = true;
            pointFlag = false;
        }else{
            input += "";
        }
    }else if(input == "0"){
        input = btn.value;
    }else{
        input += btn.value;
        symboleFlag = false;
    }

    
    output.innerHTML = input;
	 console.log(input);
};

function calcul(){
	console.log(eval(input));
	if( eval(input) == undefined) {
			result.innerHTML = "";
	}
	else {
     result.innerHTML = input + "=" + eval(input);
	}
};

function reset(btn){
    if(!result == "Total : "){
        result.innerHTML = "";
    }
    output.innerHTML = "0";
    input = "";
    result.innerHTML = "";
};

function remove1(btn){
    result.innerHTML = "Total : ";
    if(input != "0"){
        input = input.replace(input.slice(-1), "");
        if(input == ""){
            input = "0";
        }
    }
    output.innerHTML = input;
};

