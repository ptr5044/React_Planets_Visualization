import "./App.css";
import { scaleLinear } from "d3-scale";

function App() {
  const points = [
    { planet: "Mercury", size: 1516 },
    { planet: "Venus", size: 3760 },
    { planet: "Earth", size: 3959 },
    { planet: "Mars", size: 2106 },
    { planet: "Pluto", size: 738 },
    { planet: "Moon", size: 1079 },
  ];

  const height = 300;
  const width = 600;
  const padding = { top: 0, right: 0, bottom: 0, left: 50, text: 25 };
  const xTicks = points.map((o) => o.planet);
  const circleSize = { min: 10, max: 70 };

  const xScale = scaleLinear()
    .domain([0, xTicks.length])
    .range([padding.left, width - padding.right]);
  const sizeScale = scaleLinear()
    .domain([738, 3959])
    .range([circleSize.min, circleSize.max]);
  const opacityScale = scaleLinear().domain([738, 3959]).range([50, 99]);

  return (
    <div className="App">
      <svg height={height} width={width}>
        <g className="circles">
          {points.map((point, index) => (
            <>
              <circle
                r={sizeScale(point.size)}
                cx={xScale(index)}
                cy={height / 2}
                fill={`#aa1111${Math.round(opacityScale(point.size))}`}
              />

              {point.planet === "Moon" && (
                <circle
                  r={sizeScale(point.size) - 1}
                  cx={xScale(index) + 12}
                  cy={height / 2 - 8}
                  fill="#ffffff"
                  className="moon-shadow"
                />
              )}
            </>
          ))}
        </g>
        <g>
          {xTicks.map((planet, index) => (
            <g
              transform={`translate(${xScale(index)}, ${
                height / 2 - circleSize.max - padding.text
              })`}
            >
              <text textAnchor="middle" dominantBaseline="middle">
                {planet}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

export default App;
