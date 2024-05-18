package sim.tps.api.services.distribuciones;

import lombok.Data;
import java.util.Random;


@Data
public class DistribucionUniforme implements Distribucion {
    private final float a;
    private final float b;

    public DistribucionUniforme(float a, float b) {
        if (a >= b) {
            throw new IllegalArgumentException("El límite inferior 'a' debe ser menor que el límite superior 'b'");
        }
        this.a = a;
        this.b = b;
    }

    @Override
    public float[] generarSerie(int n) {
        Random rnd = new Random();
        float[] serie = new float[n];

        for (int i = 0; i < n; i++) {
            float numero = this.a + rnd.nextFloat() * (this.b - this.a);

            serie[i] = numero;
        }

        return serie;
    }

    @Override
    public float getFrecuenciaEsperada(int n, int intervalos, float inicioIntervalo, float finIntervalo) {
        return (float) n / intervalos;
    }
}
