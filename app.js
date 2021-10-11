var dob = document.querySelector(".birthDate");
var btn = document.querySelector(".checkButton");
var outputMsg= document.querySelector(".msg");
//var freeHypen = dob.replaceAll("-",0);

function reverseStr(str){

    //var actualStr = "hello";
    var listOfChar = str.split('');
    //console.log(actualStrSplit)
    var reverseListOfChar = listOfChar.reverse();
    var finalStr = reverseListOfChar.join('');
    //console.log(reversedStr);
    return finalStr;
}

function isPalindrome(str){
    var catchStr = reverseStr(str);
    return (catchStr === str);

}

function convertDatetoStr(date){
    var dateStr = {day: '', month:'', year:''};
    if(date.day<10){
        dateStr.day = '0' +date.day;
    }
    else{
        dateStr.day = date.day.toString();
    }
    if(date.month<10){
        dateStr.month = '0' + date.month;
    }
    else{
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();

    return dateStr;
     
}

function getAllDateFormats(date){
    var dateStr = convertDatetoStr(date);

    var ddmmyyyy = dateStr.day + dateStr.month +dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
}

function checkPalindromeForAllDateFormats(date){
    var palindromeList = getAllDateFormats(date);
    var flag=false;
    for(var i=0;i<palindromeList.length;i++){
        if(isPalindrome(palindromeList[i])){
            flag=true;
            break;
        }
    }
    return flag;
}


function checkLeapYear(date){
    var checkYear = date.year;
    if(checkYear%400 === 0){
        return true;
    }
    if(checkYear % 100 != 0 ){
        if(checkYear%4 ===0){
            return true;
        }
    }
    return false;
}

function  getNextDate(date){

    var day= date.day +1;
    var month = date.month;
    var year = date.year;

    var daysInMonth =[31,28,31,30,31,30,31,31,30,31,30,31];

    if(month === 2){
        if(checkLeapYear(year)){
            if(day>29){
                day=1;
                month++;
            }
        }
        else{
            if(day>28){
                day=1;
                month++;
            }
        }
    }
    else{
        if(day>daysInMonth[month-1]){
            day=1;
            month++;
        }
    }

    if(month>12){
        month=1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    };
}

function getNextPalindromeDate(date){
    var count = 0;
    var nextDate = getNextDate(date);

    while(1){
        count++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if(isPalindrome){
            break;
        }
        nextDate = getNextDate(nextDate);
        
    
    }
    return [count,nextDate];
}

function getPreviousDate(date){
    var day = date.day-1;
    var month = date.month;
    var year  = date.year;
    

    var monthList = [31,28,31,30,31,30,31,31,30,31,30,31];
    if(month === 3){
        
        if(checkLeapYear(date) && day<1){
            //console.log("hi");
            
            day = 29;
            month--;
            
        }
        else{
            
            if(day<1){
                day=28;
                month--;
            }

        }
    }
    else{
        if(day<1){
            if(month===1){
                day=31;  
                month=12;
                year--;

            }
            else{
                day=monthList[month-2];
                month--;
            }
        }
        else{
            if(month < 1){
                year--;
            }
        }


    }
    return {
        day: day,
        month: month,
        year: year
    };

}

function getPreviousPalindromeDate(date){
    var prevCount = 0;
    var prevDate = getPreviousDate(date);
    
    while(1){
        prevCount++;
        //console.log(prevCount,prevDate);
        var isPalindrome = checkPalindromeForAllDateFormats(prevDate);
        if(isPalindrome){
            break;
        }
        prevDate = getPreviousDate(prevDate);
    }
    
    //console.log(prevCount);
    return [prevCount,prevDate];

}



// var date = {
//     day: 12,
//     month: 02,
//     year: 2021
// }


//isPalindrome("dad");
//console.log(getPreviousPalindromeDate(date));
//console.log(checkLeapYear(date));

function clickHandler(){
    var dobString = dob.value;
    if(dobString !== ''){
        var listOfDate = dobString.split('-');
        //console.log(listOfDate);
        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };
        var isPalindrome = checkPalindromeForAllDateFormats(date);

        if(isPalindrome){
            outputMsg.innerText = "yipeee!!!! your b'day is a palindrome!"
        }
        else{
            var [count, nextDate] = getNextPalindromeDate(date);
            var [prevCount, prevDate] = getPreviousPalindromeDate(date);
            if(count<=prevCount){
                outputMsg.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${count} days`;
            }
            else{
                outputMsg.innerText = `The next palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed it by ${prevCount} days`;
            }
            
        }
    }
}

btn.addEventListener('click',clickHandler); 