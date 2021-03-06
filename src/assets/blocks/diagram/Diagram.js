import './diagram.scss';

export default class Diagram {
  constructor(itemCanvas, votes) {
    this.canvas = itemCanvas;
    this.context = this.canvas.getContext('2d');
    this.votes = votes;
    this._draw();
  }

  _draw() {
    const c = this.context;
    const { PI } = Math;

    const r = 58;
    const { canvas, votes } = this;
    const total = votes.reduce((sum, item) => sum + item.votes, 0);
    document.getElementsByClassName('js-diagram__total')[0].textContent = total;
    let startAngle = -PI / 2;
    let endAngle;

    votes.forEach((item) => {
      endAngle = startAngle + (item.votes / total) * 2 * PI;
      this._arcGradient(canvas.width / 2, canvas.height / 2, r,
        startAngle, endAngle,
        item.colorStart, item.colorEnd,
        PI / 36);
      startAngle = endAngle;
    });

    c.save();
    c.translate(canvas.width / 2, canvas.height / 2);
    startAngle = -PI / 2;
    c.rotate(startAngle);

    votes.forEach((item) => {
      const angle = (item.votes / total) * 2 * PI;
      c.rotate(angle);
      c.fillStyle = 'white';

      c.lineWidth = 4;
      c.rect(r - 2, 0, 4, 2);
      c.fill();
    });
    c.restore();
  }

  _arcGradient(xc, yc, r, startAngle, endAngle, colorStart, colorEnd, step = Math.PI / 36) {
    const c = this.context;

    c.lineWidth = 4;

    let xPrev = r * Math.cos(startAngle) + xc;
    let yPrev = r * Math.sin(startAngle) + yc;

    c.lineCap = 'butt';
    for (let angle = step + startAngle; angle <= endAngle; angle += step) {
      const xCurr = r * Math.cos(angle) + xc;
      const yCurr = r * Math.sin(angle) + yc;

      const d = ((xCurr - xPrev) ** 2 + (yCurr - yPrev) ** 2) ** 0.5;
      const sinA = (xCurr - xPrev) / d;
      const cosA = (yCurr - yPrev) / d;

      const xStart = xPrev - r * (angle - startAngle) * sinA;
      const yStart = yPrev - r * (angle - startAngle) * cosA;

      const xEnd = xCurr + r * (endAngle - angle) * sinA;
      const yEnd = yCurr + r * (endAngle - angle) * cosA;

      const gradient = c.createLinearGradient(xStart, yStart, xEnd, yEnd);
      gradient.addColorStop(0, colorStart);
      gradient.addColorStop(1, colorEnd);
      c.strokeStyle = gradient;
      c.beginPath();
      c.arc(xc, yc, r, (angle - step), angle);
      c.stroke();
      xPrev = xCurr;
      yPrev = yCurr;

      c.lineCap = 'square';
    }
  }
}
