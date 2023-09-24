(function () {
  const plan = document.getElementById('plan');
  const points = [];

  plan.addEventListener('mousemove', (e) => {
      const point = document.createElement('div');
      point.className = 'point';
      point.style.left = e.pageX + 'px';
      point.style.top = e.pageY + 'px';
      plan.appendChild(point);
      points.push(point);

      if (points.length > 8) {
          const removedPoint = points.shift();
          plan.removeChild(removedPoint);
      }
  });
})()