/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useState } from "react";
import Plotly from "plotly.js-dist-min";
import { useParams, useLocation } from "react-router-dom";
import { Table } from "react-bootstrap";
import { FixedSizeList } from "react-window";
import { llamarDistribucionExponencial, llamarDistribucionNormal, llamarDistribucionUniforme } from './api';

const Histograma = () => {
  const { state } = useLocation();

  const histogramaRef = useRef(null);
  const [datosGenerados, setDatosGenerados] = useState([]);
  const media = state.media;
  const desviacion = state.desviacion;
  const a = state.a;
  const b = state.b;
  const lambda = state.lambda;
  const cantidad = state.cantidad;
  const intervalos = state.intervalos;
  const distribucion = state.distribucion;

  let response;
// Aca mandamos todos los parametros seleccionados por el usuario
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (distribucion == "exponencial"){
          response = await llamarDistribucionExponencial(lambda, cantidad, intervalos);
        }

        if (distribucion == "normal") {
          response = await llamarDistribucionNormal(media, desviacion, cantidad, intervalos);
        }

        if (distribucion == "uniforme"){
          response = await llamarDistribucionUniforme(a, b, cantidad, intervalos);
        }

        const datos = response.serieGenerada;
        const iHistograma = Array.from({ length: response.tabla[0].length }, (_, index) => index + 1);
        const liHistograma = response.tabla[0];
        const lsHistograma = response.tabla[1];
        const foHistograma = response.tabla[2];
        const feHistograma = response.tabla[3];
        const iChi = Array.from({ length: response.pruebaChiCuadradoDto.tabla[0].length }, (_, index) => index + 1);
        const liChi = response.pruebaChiCuadradoDto.tabla[0];
        const lsChi = response.pruebaChiCuadradoDto.tabla[1];
        const foChi = response.pruebaChiCuadradoDto.tabla[2];
        const feChi = response.pruebaChiCuadradoDto.tabla[3];
        const chiChi = response.pruebaChiCuadradoDto.tabla[4];
        const hipotesisNula = distribucion;
        const confianza = 100 * (1 - response.pruebaChiCuadradoDto.alfa);
        const chiCalculado = response.pruebaChiCuadradoDto.chiCalculado;
        const chiTabulado = response.pruebaChiCuadradoDto.chiTabulado;
        const aceptada = response.pruebaChiCuadradoDto.aceptada;

        // Crear tabla de frecuencias del histograma
        const tabla = [{
          type: 'table',
          header: {
              values: [["<b>i</b>"], ["<b>LI</b>"], ["<b>LS</b>"], ["<b>fo</b>"], ["<b>fe</b>"]],
              align: ["center", "center"],
              line: {width: 2, color: 'white'},
              fill: {color: "#D9E9CD"},
              font: {family: "Poppins", size: 15, color: "black"},
          },
          cells: { 
              values: [
                iHistograma,
                liHistograma.map(numero => Number(numero.toFixed(2))),
                lsHistograma.map(numero => Number(numero.toFixed(2))),
                foHistograma.map(numero => Number(numero.toFixed(2))),
                feHistograma.map(numero => Number(numero.toFixed(2)))],
                
              align: ["center", "center"],
              line: {color: "gray", width: 0.3},
              font: {family: "Poppins", size: 12, color: ["#333"]},
          },
        }];

        const layoutTable = {
        title: 'Tabla de Frecuencias',
        margin: {
          l: 20,
          b: 60,
          r: 20,
          t: 80,
        },
        width: 450,
        height: 300,
        };

        Plotly.newPlot('tablaFrecuencia', tabla, layoutTable);

        // Crear histograma
        const layoutHistogram = {
          title: "Histograma",
          xaxis: {
            title: "Valores",
            tickvals: lsHistograma.map(numero => Number(numero.toFixed(2))),
            ticktext: lsHistograma.map(numero => Number(numero.toFixed(2))),
          },
          yaxis: {
            title: "Frecuencia",
          },
          margin: {
            l: 80,
            b: 60,
            r: 80,
            t: 80,
          },
          showlegend: false
        };

        const ls = lsHistograma
        ls[lsHistograma.length - 1] *= 1 + 1/1000000;

        const data = [
          {
            x: datos,
            type: "histogram",
            name: "Observadas",
            xbins: {
              start: liHistograma[0],
              end: lsHistograma[lsHistograma.length - 1],
              size: ((lsHistograma[lsHistograma.length - 1] - liHistograma[0]) / liHistograma.length)
            },
          marker: {
            color: "rgba(154, 204, 119,0.5)",
            line: {
              color: "white",
              width: 1,
            },
          },
          hoverinfo: "x+y",
          hoverlabel: {
            bgcolor: "#D9E9CD",
            font: {
              color: "black",
            },
          },
        },
        ];

        const curvaFrecuenciasEsperadas = [
          {
            x: liHistograma.map((li, index) => (li + lsHistograma[index]) / 2),
            y: feHistograma,
            mode: "lines+markers",
            line: {
              color: "red",
              width: 1,
            },
            marker: {
              size: 3,
            },
            name: "Esperada",
            hoverinfo: "y",
            hoverlabel: {
              bgcolor: "red",
              font: {
                color: "white",
              }
            },
          },
        ];
        
        const graficosCombinados = [...data, ...curvaFrecuenciasEsperadas]

        Plotly.newPlot(histogramaRef.current, graficosCombinados, layoutHistogram);

        // Crear Tabla de la prueba de chi cuadrado

        const tablaChi = [{
        type: 'table',
        header: {
            values: [["<b>i</b>"], ["<b>LI</b>"], ["<b>LS</b>"], ["<b>fo</b>"], ["<b>fe</b>"], ["<b>chi</b>"]],
            align: ["center", "center"],
            line: {width: 2, color: 'white'},
            fill: {color: "#D9E9CD"},
            font: {family: "Poppins", size: 15, color: "black"},
        },
        cells: { 
            values: [
                iChi,
                liChi.map(numero => Number(numero.toFixed(2))),
                lsChi.map(numero => Number(numero.toFixed(2))),
                foChi.map(numero => Number(numero.toFixed(2))),
                feChi.map(numero => Number(numero.toFixed(2))),
                chiChi.map(numero => Number(numero.toFixed(2)))
            ],
            align: ["center", "center"],
            line: {color: "gray", width: 0.3},
            font: {family: "Poppins", size: 12, color: ["#333"]},
        }
        }];

        const layoutChi = {
        title: 'Tabla Chi Cuadrado',
        margin: {
          l: 20, 
          b: 60, 
          r: 20, 
          t: 80, 
        },
        width: 670,
        height: 320
        };

        Plotly.newPlot('tablaChi', tablaChi, layoutChi);

        // Mostrar resultados de la prueba

        const fila1 = ["Confianza:", "Chi calculado:", "Chi tabulado:", "Aceptado:"];
        const fila2 =  [
          confianza,
          chiCalculado.toFixed(4),
          chiTabulado != null ? chiTabulado.toFixed(4) : "No se pudo calcular",
          aceptada == null? "No se pudo calcular" : aceptada ? "Sí" : "No"];
        const resultados = [{
        type: 'table',
        header: {
          values: [["<b>Hipótesis nula:</b>"], [`<b>${hipotesisNula}</b>`]],
          align: ["left", "left"],
          line: {color: 'white'},
          font: {family: "Poppins", size: 15, color: "black"},
        },
        cells: { 
            values: [fila1, fila2],
            align: ["left", "left"],
            line: {color: "white"},
            font: {family: "Poppins", size: 15, color: ["#333"]},
        },
        }];

        const layoutResultados = {
        title: 'Resultados de la prueba Chi Cuadrado',
        margin: {
          l: 80, 
          r: 30, 
        },
        };

        Plotly.newPlot('resultados', resultados, layoutResultados);

        setDatosGenerados(datos);

      } catch (error) {
        console.log("Error fetching data");
      }
    }

    fetchData();
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Contenedor de los cuatro cuadrantes */}
      <div style={{ display: "grid", width: "1110px", marginLeft: "10px", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: "10px", height: "100%"}}>
        {/* Cuadrante 1 */}
        <div style={{ gridArea: "1 / 1", width: "400px", display: "flex"}}>
          <div>
            <div className="tabla" style={{ width: "450px"}}>
              <div id="tablaFrecuencia" style={{ width: "100%", textAlign: "center", marginTop: "10px", height: "300px" }}></div>
            </div>
          </div>
        </div>
        {/* Cuadrante 2 */}
        <div style={{ gridArea: "1 / 2", width: "670px", display: "flex"}}>
          {/* Contenido del cuadrante 2 */}
          <div>
            <div className="contenedor-grafico" style={{width: "670px"}}>
              <div className="histograma" ref={histogramaRef} style={{ height: "300px", marginTop: "10px"}}></div>
            </div>
          </div>
        </div>
        {/* Cuadrante 3 */}
        <div style={{ gridArea: "2 / 1", width: "450px", display: "flex", marginBottom: "10px"}}>
          {/* Contenido del cuadrante 3 */}
          <div>
            <div className="tabla" style={{ width: "450px"}}>
              <div id="resultados" style={{ width: "100%", textAlign: "center", height: "320px", marginBottom: "10px" }}></div>
            </div>
          </div>
        </div>
        {/* Cuadrante 4 */}
        <div style={{ gridArea: "2 / 2", display: "flex", width: "650px", marginBottom: "10px"}}>
          {/* Contenido del cuadrante 4 */}
          <div>
            <div className="tabla" style={{ width: "670px"}}>
              <div id="tablaChi" style={{ width: "100%", textAlign: "center", height: "320px", marginBottom: "10px" }}></div>
            </div>
          </div>
        </div>
      </div>
      {/* Lista de números a la derecha */}
      <div style={{ height: "100%"}}>
        <div className="contenedor-lista" style={{ marginLeft:"40px", width: "170px", fontSize: "13px" }}>
          <h3 style={{textAlign:"center", fontSize:"25px", marginTop:"20px", borderBottom: "2px solid #e0e0e0",}}>Números</h3>
          <div style={{height: 591,
            width: 188,
            overflowY: "auto",  // Hacer que aparezca la barra de desplazamiento cuando sea necesario
            scrollbarWidth: "thin",  // Establecer el grosor de la barra de desplazamiento
            scrollbarColor: "gray transparent"}}>
            <FixedSizeList
              height={591} // Altura de la lista
              itemCount={datosGenerados.length} // Cantidad total de elementos
              itemSize={30} // Altura de cada elemento
              width={188} // Ancho de la lista
            >
              {({ index, style }) => (
                <div style={{ ...style, display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 30,
                borderBottom: "1px solid #ccc",  // Línea divisoria entre elementos
                boxSizing: "border-box",
                padding: "5px" }}>
                  {`Nº${index + 1}: ${datosGenerados[index].toFixed(4)}`}
                </div>
              )}
            </FixedSizeList>
          </div>

        </div>
      </div>
    </div>
  );
  
  
};

export default Histograma;
