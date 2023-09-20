class IntegerSet {
  constructor(maxValue) {
    this.maxValue = maxValue;
    this.set = new Array(maxValue).fill(false);
  }

  insert(element) {
    if (element <= this.maxValue) {
      this.set[element] = true;
    }
  }

  delete(element) {
    if (element <= this.maxValue) {
      this.set[element] = false;
    }
  }

  union(setB) {
    let unionSet = new IntegerSet(Math.max(this.maxValue, setB.maxValue));
    for (let i = 0; i <= unionSet.maxValue; i++) {
      unionSet.set[i] = this.set[i] || setB.set[i];
    }
    return unionSet;
  }

  intersection(setB) {
    let intersectionSet = new IntegerSet(Math.min(this.maxValue, setB.maxValue));
    for (let i = 0; i <= intersectionSet.maxValue; i++) {
      intersectionSet.set[i] = this.set[i] && setB.set[i];
    }
    return intersectionSet;
  }

  difference(setB) {
    let differenceSet = new IntegerSet(this.maxValue);
    for (let i = 0; i <= differenceSet.maxValue; i++) {
      differenceSet.set[i] = this.set[i] && !setB.set[i];
    }
    return differenceSet;
  }

  toString() {
    let str = '';
    for (let i = 0; i <= this.maxValue; i++) {
      if (this.set[i]) {
        str += i + ', ';
      }
    }
    return str.slice(0, -2);
  }
}

(function () {
  let A = new IntegerSet(5);
  A.insert(1);
  A.insert(2);
  A.insert(3);
  A.insert(5);

  let B = new IntegerSet(10);
  B.insert(2);
  B.insert(3);
  B.insert(4);
  B.insert(7);
  B.insert(8);

  console.log("Conjunto A: " + A);
  console.log("Conjunto B: " + B);

  let uniaoAB = A.union(B);
  console.log("União de A e B: " + uniaoAB);

  let intersecaoAB = A.intersection(B);
  console.log("Interseção de A e B: " + intersecaoAB);

  let diferencaAB = A.difference(B);
  console.log("Diferença de A e B: " + diferencaAB);
})()