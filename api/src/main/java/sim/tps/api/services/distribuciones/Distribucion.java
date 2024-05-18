package sim.tps.api.services.distribuciones;


public interface Distribucion {
    float[] generarSerie(int n);
    float getFrecuenciaEsperada(int n, int intervalos, float inicioIntervalo, float finIntervalo);
}
