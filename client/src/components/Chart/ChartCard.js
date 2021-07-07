import React from "react";
import { connect } from "react-redux";
import { Card, CardHeader, CardBody, CardTitle, Col } from "reactstrap";
import { Line, Bar } from "react-chartjs-2";
import { getDataChecked, getDataUnChecked } from "../Utils/ArraySevices";

/**
 * @param {string} labelTitle contient le titre,
 * @param {string} rowLabel contient le texte du graphique
 * @param {num} dataRow contient les valeur du graphiques
 * @param {num} dataArrayTotal valeur max du graphique
 * @param {num} chartTag text sous le titre
 * @param {string} titleChart affiche le titre en gris
 */
export const ChartCard = ({
  rowLabel,
  dataRow,
  titleChart,
  labelTitle,
  dataArrayTotal,
  chartTag,
  data,
}) => {
  /**
   * @param {num} dataChecked
   * @return retourne le nombres de valeur cochées
   */
  const dataChecked = getDataChecked(data).length;
  /**
   * @param {num} dataUnChecked
   * @return retourne le nombres de valeur non cochées
   */
  const dataUnChecked = getDataUnChecked(data).length;

  let chartExample3 = {
    data: (canvas) => {
      let ctx = canvas.getContext("2d");

      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
      gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
      gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
      gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

      return {
        labels: rowLabel,
        datasets: [
          {
            label: labelTitle,
            fill: true,
            backgroundColor: gradientStroke,
            hoverBackgroundColor: gradientStroke,
            borderColor: "#d048b6",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: [dataChecked, dataUnChecked],
          },
        ],
      };
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(225,78,202,0.1)",
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 0,
              suggestedMax: dataArrayTotal,
              padding: 20,
              fontColor: "#9e9e9e",
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(225,78,202,0.1)",
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e",
            },
          },
        ],
      },
    },
  };

  return (
    <>
      <Card className="card-chart">
        <CardHeader>
          <h5 className="card-category">{titleChart}</h5>
          <CardTitle tag="h3">
            <i className="tim-icons icon-chart-bar-32 text-primary mx-2"></i>
            {data.length > 1
              ? `${data.length} Entrées`
              : `${data.length} Entrée`}
          </CardTitle>
        </CardHeader>
        <CardBody>
          <div className="chart-area">
            <Bar data={chartExample3.data} options={chartExample3.options} />
          </div>
        </CardBody>
      </Card>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ChartCard);
