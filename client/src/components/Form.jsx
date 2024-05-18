import React, { useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const InitialForm = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm();

  const tipodist = watch("tipodist");
  const a = parseFloat(watch("a"));
  const b = parseFloat(watch("b"));
  const intervalos = parseInt(watch("intervalos"));
  const cantidad = watch("cantidad");

  const onSubmit = async (data) => {
    setData(data);
    navigate(`/histograma`, {
      state: {
        a: parseFloat(data.a),
        b: parseFloat(data.b),
        media: parseFloat(data.media),
        desviacion: parseFloat(data.desviacion),
        lambda: parseFloat(data.lambda),
        cantidad: parseInt(data.cantidad),
        intervalos: parseInt(data.intervalos),
        distribucion: data.tipodist
      },
    });
  };
  // Aca comienza el front

  return (
    <div className="cardContainer">
      <Card>
        <h2
          style={{
            fontSize: "24px",
            textAlign: "center",
            color: "#333",
            borderBottom: "2px solid #e0e0e0",
            marginBottom: "10px",
          }}
        >
          Generador de Variables
        </h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="tipoDistribucion">
            <Form.Label>Tipo de distribución</Form.Label>
            <Controller
              name="tipodist"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "El tipo de distribución es requerida.",
                },
              }}
              render={({ field }) => (
                <Form.Select aria-label="select-TD" {...field}>
                  <option value="">Seleccionar</option>
                  <option value="uniforme">Uniforme</option>
                  <option value="normal">Normal</option>
                  <option value="exponencial">Exponencial</option>
                </Form.Select>
              )}
            />
            {errors.tipodist && (
              <p style={{ fontSize: "13px", color: "darkred" }}>
                {errors.tipodist.message}
              </p>
            )}
          </Form.Group>

          {// Si tipodist tiene algo adentro (alguna distribucion seleccionada) me muestra los parametros

              tipodist && (
            <div>
              <Form.Label>Parámetros</Form.Label>
            </div>
          )}

          {tipodist == "exponencial" && (
            <div>
              <Form.Group
                controlId="lambda"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Controller
                  name="lambda"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Este campo es requerido.",
                    },
                    pattern: {
                      value: /^0*(?:[1-9]\d*|0\.\d*[1-9])$/,
                      message:
                        "Lambda debe ser mayor a 0.",
                    },
                  }}
                  render={({ field }) => (
                    <Form.Control
                      type="number"
                      placeholder="Lambda"
                      {...field}
                    />
                  )}
                />
              </Form.Group>
              {errors.lambda && (
                <p style={{ fontSize: "13px", color: "darkred" }}>
                  {errors.lambda.message}
                </p>
              )}
            </div>
          )}

          {tipodist == "normal" && (
            <div>
              <Form.Group
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}
              >
              {errors.media && (
                <p style={{ fontSize: "13px", color: "darkred" }}>
                  {errors.media.message}
                </p>
              )}
                <Controller
                  name="media"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Este campo es requerido.",
                    }
                  }}
                  render={({ field }) => (
                    <Form.Control
                      type="number"
                      placeholder="Media"
                      {...field}
                    />
                  )}
                />

                <Controller
                  name="desviacion"
                  control={control}
                  rules={{
                      required: {
                          value: true,
                          message: "Este campo es requerido.",
                      },
                      pattern: {
                          value: /^0*(?:[1-9]\d*|0\.\d*[1-9])$/,
                          message:
                              "La desviación debe ser mayor a 0.",
                      },
                  }}
                  render={({ field }) => (
                    <Form.Control
                      type="number"
                      placeholder="Desviación"
                      {...field}
                    />
                  )}
                />
                {errors.desviacion && (
                  <p style={{ fontSize: "13px", color: "darkred" }}>
                    {errors.desviacion.message}
                  </p>
                )}
              </Form.Group>

              <div>
            </div>
            </div>
          )}

          {tipodist == "uniforme" && (
            <div>
              <Form.Group
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}
              >

              {errors.a && (
                <p style={{ fontSize: "13px", color: "darkred" }}>
                  {errors.a.message}
                </p>
              )}
                <Controller
                  name="a"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Este campo es requerido.",
                    },
                  }}
                  render={({ field }) => (
                    <Form.Control
                      type="number"
                      placeholder="A"
                      {...field}
                    />
                  )}
                />

                <Controller
                  name="b"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Este campo es requerido.",
                    }
                  }}
                  render={({ field }) => (
                    <Form.Control
                      type="number"
                      placeholder="B"
                      {...field}
                    />
                  )}
                />

                {errors.b && (
                  <p style={{ fontSize: "13px", color: "darkred" }}>
                    {errors.b.message}
                  </p>
                )}
              </Form.Group>
              {a >= b && (
                <p style={{ fontSize: "13px", color: "darkred" }}>
                  {"A debe ser menor a B."}
                </p>
              )}
              <div>
            </div>
            </div>
          )}

          <Form.Group controlId="cantidad">
            <Form.Label>Cantidad</Form.Label>
            <Controller
              name="cantidad"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Este campo es requerido.",
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message:
                    "Por favor, ingresá solo números positivos en este campo.",
                },
                min: {
                  value: 1,
                  message: "El valor mínimo es 1.",
                },
                max: {
                    value: 1000000,
                    message: "El valor máximo es 1000000.",
                },
              }}
              render={({ field }) => (
                <Form.Control
                  type="number"
                  placeholder="0"
                  {...field}
                />
              )}
            />
            {errors.cantidad && (
              <p style={{ fontSize: "13px", color: "darkred" }}>
                {errors.cantidad.message}
              </p>
            )}
            {cantidad < intervalos && (
              <p style={{ fontSize: "13px", color: "darkred" }}>
                {"La cantidad a generar debe ser igual o mayor a los intervalos."}
              </p>
            )}
          </Form.Group>

          <Form.Group controlId="intervalos">
            <Form.Label>Intervalos</Form.Label>
            <Controller
              name="intervalos"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "La cantidad de intervalos es requerida.",
                },
              }}
              render={({ field }) => (
                <Form.Select aria-label="select-TD" {...field}>
                  <option value="">Seleccionar</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                </Form.Select>
              )}
            />
            {errors.intervalos && (
              <p style={{ fontSize: "13px", color: "darkred" }}>
                {errors.intervalos.message}
              </p>
            )}
          </Form.Group>

          <Button
            className="btn-generar"
            variant="primary"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Generar
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export { InitialForm };
