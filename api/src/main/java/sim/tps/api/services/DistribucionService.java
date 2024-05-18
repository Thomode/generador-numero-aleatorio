package sim.tps.api.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sim.tps.api.dtos.*;
import sim.tps.api.services.distribuciones.DistribucionExponencial;
import sim.tps.api.services.distribuciones.DistribucionNormal;
import sim.tps.api.services.distribuciones.DistribucionUniforme;
import sim.tps.api.services.pruebas.PruebaChiCuadrado;

@Service
@RequiredArgsConstructor
public class DistribucionService {
    private final PruebaChiCuadrado pruebaChiCuadrado;
    private final TablaService tablaService;

    public DistribucionDto getUniforme(float a, float b, int n, int intervalos){
        DistribucionUniforme distribucionUniforme = new DistribucionUniforme(a, b);

        float[] serieGenerada = distribucionUniforme.generarSerie(n);

        float[][] tabla = this.tablaService.getTabla(distribucionUniforme, serieGenerada, intervalos, n);

        PruebaChiCuadradoDto pruebaChiCuadradoDto = this.pruebaChiCuadrado.realizarPrueba(tabla);

        return DistribucionDto.builder()
                .serieGenerada(serieGenerada)
                .tabla(tabla)
                .pruebaChiCuadradoDto(pruebaChiCuadradoDto)
                .build();
    }

    public DistribucionDto getExponencial(float lambda, int n, int intervalos){
        DistribucionExponencial distribucionExponencial = new DistribucionExponencial(lambda);

        float[] serieGenerada = distribucionExponencial.generarSerie(n);

        float[][] tabla = this.tablaService.getTabla(distribucionExponencial, serieGenerada, intervalos, n);

        PruebaChiCuadradoDto pruebaChiCuadradoDto = this.pruebaChiCuadrado.realizarPrueba(tabla);
        System.out.println(pruebaChiCuadradoDto);

        return DistribucionDto.builder()
                .serieGenerada(serieGenerada)
                .tabla(tabla)
                .pruebaChiCuadradoDto(pruebaChiCuadradoDto)
                .build();
    }

    public DistribucionDto getNormal(float media, float desviacion,int n, int intervalos){
        DistribucionNormal distribucionNormal = new DistribucionNormal(media, desviacion);

        float[] serieGenerada = distribucionNormal.generarSerie(n);

        float[][] tabla = this.tablaService.getTabla(distribucionNormal, serieGenerada, intervalos, n);

        PruebaChiCuadradoDto pruebaChiCuadradoDto = this.pruebaChiCuadrado.realizarPrueba(tabla);

        return DistribucionDto.builder()
                .serieGenerada(serieGenerada)
                .tabla(tabla)
                .pruebaChiCuadradoDto(pruebaChiCuadradoDto)
                .build();
    }
}
