package sim.tps.api.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sim.tps.api.services.distribuciones.Distribucion;

@Service
@RequiredArgsConstructor
public class TablaService {
    public float[][] getTabla(Distribucion distribucion, float[] serie, int intervalos, int n) {
        float min = Float.POSITIVE_INFINITY;
        float max = Float.NEGATIVE_INFINITY;

        for (float valor : serie) {
            if (valor < min) {
                min = valor;
            }
            if (valor > max) {
                max = valor;
            }
        }

        float rango = max - min;

        float amplitud = rango / intervalos;

        /*
        Columna 1: límite inferior
        Columna 2: límite superior
        Columna 3: frecuencia observada
        Columan 4: frecuencia esperada
         */
        float[][] tabla = new float[4][intervalos];

        for (int i = 0; i < intervalos; i++) {
            float inicioIntervalo = min + (i * amplitud);
            float finIntervalo = min + ((i + 1) * amplitud);

            if (i == intervalos - 1) finIntervalo = max;

            int frecuenciaObservada = 0;
            for (float numero : serie) {
                if (numero >= inicioIntervalo && numero < finIntervalo || numero == max && finIntervalo == max) {
                    frecuenciaObservada++;
                }
            }

            float frecuenciaEsperada = distribucion.getFrecuenciaEsperada(n, intervalos, inicioIntervalo, finIntervalo);

            tabla[0][i] = inicioIntervalo;
            tabla[1][i] = finIntervalo;
            tabla[2][i] = frecuenciaObservada;
            tabla[3][i] = frecuenciaEsperada;
        }

        return tabla;
    }
}
