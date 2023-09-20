function update() {
  const radius = parseFloat(document.radiusCalculate.radius.value);
  const areaElement = document.getElementById('area');
  const circumferenceElement = document.getElementById('circumference');
  const { area, circumference} = calculate(radius)
  console.log({radius, area, circumference})
  areaElement.innerHTML = area.toFixed(2)
  circumferenceElement.innerHTML = circumference.toFixed(2)
}

function calculate(radius) {
  const area = Math.PI * Math.pow(radius, 2);
  const circumference = 2 * Math.PI * radius;
  return { area, circumference };
}
