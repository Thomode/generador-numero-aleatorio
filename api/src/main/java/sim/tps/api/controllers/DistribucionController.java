package sim.tps.api.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sim.tps.api.dtos.DistribucionDto;
import sim.tps.api.services.DistribucionService;

@Tag(name = "Distribuciones")
@RestController
@RequestMapping("/distribuciones")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class DistribucionController {
    private final DistribucionService distribucionService;

    @GetMapping("/uniforme")
    public ResponseEntity<DistribucionDto> getUniforme(
            @RequestParam(name = "a", defaultValue = "0") float a,
            @RequestParam(name = "b", defaultValue = "1") float b,
            @RequestParam(name = "cantidad", defaultValue = "100") int cantidad,
            @RequestParam(name = "intervalos", defaultValue = "10") int intervalos
    ){
        return ResponseEntity.ok(this.distribucionService.getUniforme(a, b, cantidad, intervalos));
    }
    

    @GetMapping("/exponencial")
    public ResponseEntity<DistribucionDto> exponencial(
            @RequestParam(name = "lambda", defaultValue = "1") float lambda,
            @RequestParam(name = "cantidad", defaultValue = "100") int cantidad,
            @RequestParam(name = "intervalos", defaultValue = "10") int intervalos
    ){
        return ResponseEntity.ok(this.distribucionService.getExponencial(lambda, cantidad, intervalos));
    }

    @GetMapping("/normal")
    public ResponseEntity<DistribucionDto> normal(
            @RequestParam(name = "media", defaultValue = "0") float media,
            @RequestParam(name = "desviacion", defaultValue = "1") float desviacion,
            @RequestParam(name = "cantidad", defaultValue = "100") int cantidad,
            @RequestParam(name = "intervalos", defaultValue = "10") int intervalos
    ){
        return ResponseEntity.ok(this.distribucionService.getNormal(media, desviacion, cantidad, intervalos));
    }
}
