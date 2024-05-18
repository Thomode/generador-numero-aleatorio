package sim.tps.api.services.distribuciones;

import lombok.Data;
import org.apache.commons.math3.distribution.NormalDistribution;
import java.util.Random;

@Data
public class DistribucionNormal implements Distribucion {

    private final float media;

    private final float desviacion;


    public DistribucionNormal(float media, float desviacion) {
        if (desviacion <= 0) {
            throw new IllegalArgumentException("El parámetro desviacion debe ser mayor que 0.");
        }
        this.media = media;
        this.desviacion = desviacion;
    }

    @Override
    public float[] generarSerie(int n) {
        Random generador = new Random();
        float[] serie = new float[n];

        for (int i = 0; i < n; i+=2) {
            float rnd1 = generador.nextFloat();
            float rnd2 = generador.nextFloat();

            float parte1 = (float) Math.sqrt(-2 * Math.log(1 - rnd1));
            float parte2 = (float) (2 * Math.PI * (double) rnd2);

            float numero1 = (parte1 * (float) Math.cos(parte2)) * this.desviacion + this.media;
            float numero2 = (parte1 * (float) Math.sin(parte2)) * this.desviacion + this.media;

            serie[i] = numero1;
            if (i != n - 1) serie[i+1] = numero2;
        }

        return serie;
    }

    @Override
    public float getFrecuenciaEsperada(int n, int intervalos, float inicioIntervalo, float finIntervalo) {
        NormalDistribution normal = new NormalDistribution(media, desviacion);

        float frecuenciaInicio = (float) normal.cumulativeProbability(inicioIntervalo);
        float frecuenciaFin = (float) normal.cumulativeProbability(finIntervalo);

        return (frecuenciaFin - frecuenciaInicio) * n;
    }
}
