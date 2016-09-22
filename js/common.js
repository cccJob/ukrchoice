/*
   :::                                :::
 :::::::                             :::::
:::::::::                          ::::::::
:::::::::::::::::::::::::::::::::::::::::::
::::    :::    ::::::::::::::::   :::  ::::
:::    Smart    :::::cool::::    Crazy  :::
:::::   :::    :::::::::::::::    :::   :::
:::::::::::::::::::::::::::::::::::::::::::
*/
$(function(){
	// $("#ifr").load(function(){
		// console.clear();
	// });
});
function isIe8(){
	return ccc.isXBrowser("msie 8");
}
function isIe9(){
	return ccc.isXBrowser("msie 9");
}
if(!Array.prototype.add){
	Array.prototype.add = function(posi,item){
		this.splice(posi,0,item);
		return this;
	}
}
if(!Array.prototype.remove){
	Array.prototype.remove = function(posi){
		this.splice(posi,1);
		return this;
	}
}
if(!Array.prototype.exchage){
	Array.prototype.exchage = function(posi1,posi2){//两个位置交换
		if(this.length-1 < posi1 || this.length-1 < posi2 || posi1 == posi2){
			return this;
		}
		var mid = this[posi1];
		this[posi1] = this[posi2];
		this[posi2] = mid;
		return this;
	}
}
if(!Array.prototype.exchageUp){
	Array.prototype.exchageUp = function(posi){
		this.exchage(posi,posi-1);
		return this;
	}
}
if(!Array.prototype.exchageDown){
	Array.prototype.exchageDown = function(posi){
		this.exchage(posi,posi+1);
		return this;
	}
}