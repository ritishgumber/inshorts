# inshorts

[![NPM](https://nodei.co/npm/inshorts.png?mini=true)](https://nodei.co/npm/inshorts/)

A node.js wrapper for https://www.inshorts.com/

## Installation
Install using npm:
```sh
npm install inshorts
```

## Usage
Require library
```javascript
var inshorts= require('inshorts').init();
```
Function
##Refer category names-
 -  //leave blank to get All News
 - national //Indian News
 - business
 - sports
 - world
 - politics
 - technology
 - startup
 - entertainment
 - miscellaneous
 - hatke // out of the way
 - science
 - automobile

```javascript
inshorts.getNews('category_name',function(err,result){
if(!err)
console.log(result);
else
console.log(err);
});
```

```javascript
inshorts.more({category:'startup',id:'id obtained from getNews() function or previous call of this function.'},function(err,result){
if(!err)
console.log(body);
else
console.log(err);
});
```
Response
```javascript
{"body":
		["India's middle and long distance coach Nikolai Snesarev was detained for half a day by Rio police and later released after a lady doctor at the Games Village filed a complaint of misbehaviour. Snesarev, who trains the likes of Lalita Babar, Sudha Singh and OP Jaisha, was later let off reportedly after the intervention of the Indian Embassy in Brazil.",
		"The Mexican pair of Karem Achach and Nuria Diosdado performed to an Indian beat in the synchronised swimming event at the Rio Olympics on Monday. They performed to the Bollywood song ‘Aila re Aila’ from the film ‘Khatta Meetha’, that starred actor Akshay Kumar. The pair was in the ninth spot, having qualified for the final of the event.",
		"Himachal Pradesh CM Virbhadra Singh on Monday announced that state government employees and pensioners will get an additional 6% Dearness Allowance with effect from January 1, 2016. Speaking at a state-level function on the Independence Day, he added that the additional DA would be paid from October 2016 onwards and will cost ₹330 crore more to the state exchequer annually.",
		"The leader of the Lebanon-based terror network Hezbollah Hassan Nasrallah has said US Presidential nominee Donald Trump was right to say that the US President Barack Obama has founded ISIS. Nasrallah said what the American presidential candidate says \"is  based on facts and documents\". Notably, Nasrallah blames the US for the rise of Islamic extremists in the Middle East. "],
"image":
		["http://images.newsinshorts.com.edgesuite.net/app_assets/images/2016/8aug/15/3dcee6a8-6b1b-4ddc-a673-e2d6329b20c5-1-14712874674300.jpg?resize=400px:*",
		"http://images.newsinshorts.com.edgesuite.net/app_assets/images/2016/8aug/15/e984176e-477d-4b08-9def-0dfd6b8dea23-1-14712870099380.jpg?resize=400px:*",
		"http://images.newsinshorts.com.edgesuite.net/app_assets/images/2016/8aug/15/a798aa47-7875-4e1f-aaa0-da5e5f934b98-1-14712860532710.jpg?resize=400px:*",
		"http://images.newsinshorts.com.edgesuite.net/app_assets/images/2016/8aug/15/7f668916-9c76-4284-83e3-80733f332c11-1-14712860131540.jpg?resize=400px:*"],
"headline":
		["India's long distance coach detained for assault",
		"Mexican pair perform on B'wood beat in swimming event",
		"6% hike in DA for HP govt employees, pensioners",
		"Trump is right Obama founded ISIS: Hezbollah leader  "],
"id":"865296bf-759b-4ebd-acdb-2fc68d3ccbcb-1",
"category":"startup"

}
```
