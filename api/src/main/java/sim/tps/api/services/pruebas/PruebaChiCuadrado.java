package sim.tps.api.services.pruebas;

import lombok.RequiredArgsConstructor;
import org.apache.commons.math3.distribution.ChiSquaredDistribution;
import org.springframework.stereotype.Service;
import sim.tps.api.dtos.PruebaChiCuadradoDto;

@Service
@RequiredArgsConstructor
public class PruebaChiCuadrado {
    public PruebaChiCuadradoDto realizarPrueba(float[][] tabla){
        float[][] tablaAgrupada = agruparIntervalos(tabla);
        float chiCalculado = this.calcularChiCalculado(tablaAgrupada);

        int gradosLibertad = tablaAgrupada[0].length - 1;
        double alfa = 0.05;

        Double chiTabulado = this.calcularChiTabulado(gradosLibertad, alfa);

        Boolean aceptada = chiTabulado != null? chiCalculado < chiTabulado : null;

        return PruebaChiCuadradoDto.builder()
                .tabla(tablaAgrupada)
                .chiCalculado(chiCalculado)
                .chiTabulado(chiTabulado)
                .aceptada(aceptada)
                .alfa(alfa)
                .build();
    }

    private float[][] agruparIntervalos(float[][] tabla) {
        int n = tabla[0].length;
        int contador = 0;
        float fe = 0;

        // Para saber el largo de la tabla agrupada
        for (int i = 0; i < n; i++) {
            fe += tabla[3][i];
            if (fe >= 5) {
                contador++;
                fe = 0;
            }
        }

        fe = 0;
        float fo = 0;
        float li = tabla[0][0];

        contador = contador > 0 ? contador : 1;
        float[][] tablaAgrupada = new float[5][contador];

        contador = 0;

        // Agrupar tabla
        for (int i = 0; i < n; i++) {
            fo += tabla[2][i];
            fe += tabla[3][i];
            if (fe >= 5) {
                tablaAgrupada[0][contador] = li;
                tablaAgrupada[1][contador] = tabla[1][i];
                tablaAgrupada[2][contador] = fo;
                tablaAgrupada[3][contador] = fe;
                tablaAgrupada[4][contador] = (float) Math.pow(fo - fe, 2) / fe;
                fe = 0;
                fo = 0;
                contador++;
                li = tabla[1][i];
            }
        }

        // Agrupar las últimas filas en caso de que no hayan llegado a 5
        if (fe > 0 || fo > 0) {
            int ultimoIndice = tablaAgrupada[0].length - 1;
            tablaAgrupada[1][ultimoIndice] = tabla[1][n - 1];
            tablaAgrupada[2][ultimoIndice] += fo;
            tablaAgrupada[3][ultimoIndice] += fe;
            float Fo = tablaAgrupada[2][ultimoIndice];
            float Fe = tablaAgrupada[3][ultimoIndice];
            tablaAgrupada[4][ultimoIndice] = (float) Math.pow(Fo - Fe, 2) / Fe;
        }

        return tablaAgrupada;
    }

    public float calcularChiCalculado(float[][] tabla) {
        float chi = 0;

        for (int i = 0; i < tabla[0].length; i++) {
            chi += tabla[4][i];
        }

        return chi;
    }

    public Double calcularChiTabulado(int gradosLibertad, double alfa) {
        if (gradosLibertad > 0) {
            ChiSquaredDistribution chi = new ChiSquaredDistribution(gradosLibertad);
            return chi.inverseCumulativeProbability(1 - alfa);
        }
        return null;
    }
}
