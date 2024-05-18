package sim.tps.api.dtos;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PruebaChiCuadradoDto {
    float[][] tabla;
    double alfa;
    float chiCalculado;
    Double chiTabulado;
    Boolean aceptada;
}
