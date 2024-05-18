package sim.tps.api.services.distribuciones;

import java.util.Random;

public class DistribucionExponencial implements Distribucion {
    private final float lambda;

    public DistribucionExponencial(float lambda) {
        if (lambda <= 0) {
            throw new IllegalArgumentException("El parámetro lambda debe ser mayor que 0.");
        }

        this.lambda = lambda;
    }

    @Override
    public float[] generarSerie(int n) {
        Random generador = new Random();
        float[] serie = new float[n];

        for (int i = 0; i < n; i++) {
            float numero = (-1 / this.lambda) * (float) Math.log(1 - generador.nextFloat());
            serie[i] = numero;
        }

        return serie;
    }

    @Override
    public float getFrecuenciaEsperada(int n, int intervalos, float inicioIntervalo, float finIntervalo) {
        float frecuenciaInicio = frecuenciaAcumulada(inicioIntervalo);
        float frecuenciaFin = frecuenciaAcumulada(finIntervalo);

        return (frecuenciaFin - frecuenciaInicio) * n;
    }

    private float frecuenciaAcumulada(double x) {
        return 1 - (float)Math.exp(- this.lambda * x);
    }
}
