class SmartCalculator {
  constructor(initialValue) {
    this.stack = [];
    this.stack.push(initialValue);
  }

  add(number) {
    this.stack.push("+" + number);
    return this;
  }
  
  subtract(number) {
    this.stack.push("-" + number);
    return this;
  }

  multiply(number) {
    this.stack.push("*" + number);
    return this;
  }

  devide(number) {
    this.stack.push("/" + number);
    return this;
  }

  pow(number) {
    this.stack.push("^" + number);
    return this;
  }

  calculate(){
    let str = this.stack.join('');
    var regexp = /(\d+)((\^[0-9])+)+/g;
    var matchesArray = str.match(regexp);
    if(matchesArray !== null){
      for(var i = 0; i < matchesArray.length; i++){
        var currentRow = matchesArray[i].split('^').map((x) => (Number(x)));
        var strRow = "";
        if(currentRow.length == 2 ){
          strRow = "Math.pow("+currentRow[0]+","+currentRow[1]+")";
        } else {
          strRow = "Math.pow(" + currentRow[0];
          var brackets = ")";
          for(var j = 1; j < currentRow.length - 1; j++){
            strRow += " , Math.pow(" + currentRow[j];
            brackets += ")";
          }
          strRow += "," + currentRow[currentRow.length - 1] + brackets
        }
        str = str.replace(matchesArray[i], strRow);
      }
    }
    return Number(eval(str)); // Delete Number in case of error
  }

  toString(){
    return this.calculate();
  }
}

module.exports = SmartCalculator;
