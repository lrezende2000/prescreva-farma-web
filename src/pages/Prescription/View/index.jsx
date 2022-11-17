import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import {
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { Box, CircularProgress } from "@mui/material";

import useAxios from "../../../hooks/useAxios";
import { maskPhone, maskTel } from "../../../helpers/mask";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFF",
    margin: 10,
    overflow: "hidden",
    position: "relative",
    height: "100%",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    fontSize: 10,
  },
});

const ViewPrescription = () => {
  const [loading, setLoading] = useState(true);
  const [prescription, setPrescription] = useState();

  const api = useAxios();

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      navigate("/prescricao");
    }

    api
      .get(`/prescription/${id}`)
      .then(({ data }) => {
        if (!data.prescription) {
          navigate("/prescricao");
        }

        setPrescription(data.prescription);
      })
      .catch(() => navigate("/prescricao"))
      .finally(setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <PDFViewer style={{ width: "100%", height: "100%" }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={{ position: "relative", zIndex: 999 }}>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <View>
                <View style={styles.header}>
                  {prescription?.professional?.logo && (
                    <Image
                      style={{ maxWidth: "200px", maxHeight: "100px" }}
                      src={`${process.env.REACT_APP_API_URL}/public/logos/${prescription?.professional?.logo}`}
                      alt="Logo marca do profissional"
                    />
                  )}
                  <View style={styles.column}>
                    <Text style={styles.text}>
                      {prescription?.professional.street},{" "}
                      {prescription?.professional.number} -{" "}
                      {prescription?.professional.district},{" "}
                      {prescription?.professional.city} -{" "}
                      {prescription?.professional.state}
                    </Text>
                    {prescription?.professional.professionalPhone && (
                      <Text style={styles.text}>
                        {prescription?.professional.professionalPhone.length ===
                        10
                          ? maskTel(
                              prescription?.professional.professionalPhone
                            )
                          : maskPhone(
                              prescription?.professional.professionalPhone
                            )}
                      </Text>
                    )}
                  </View>
                </View>

                <View
                  style={{
                    margin: "50px auto 0",
                    maxWidth: 500,
                    width: "100%",
                  }}
                >
                  <View>
                    <Text style={styles.text}>
                      {prescription?.patient.name} -{" "}
                      {maskPhone(prescription?.patient.phone)}
                    </Text>
                  </View>
                  {!!prescription?.prescriptionMedicines.filter(
                    (prescriptionMedicine) =>
                      prescriptionMedicine.administrationForm === "Uso Interno"
                  ).length && (
                    <View style={{ marginTop: 20 }}>
                      <Text
                        style={{
                          fontSize: 12,
                          textDecoration: "underline",
                          fontWeight: "bold",
                          marginBottom: 10,
                        }}
                      >
                        USO INTERNO
                      </Text>
                      {prescription?.prescriptionMedicines
                        .filter(
                          (prescriptionMedicine) =>
                            prescriptionMedicine.administrationForm ===
                            "Uso Interno"
                        )
                        .map((prescriptionMedicine, index) => (
                          <View
                            key={prescriptionMedicine.medicine.name}
                            style={{ marginLeft: 20, marginTop: 10 }}
                          >
                            <View
                              style={{
                                displa: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <Text style={{ maxWidth: 200, fontSize: 10 }}>
                                {index + 1}){" "}
                                {prescriptionMedicine.medicine.name}{" "}
                                {prescriptionMedicine.concentration}
                              </Text>
                              <View
                                style={{
                                  borderBottom: "1px dashed #000",
                                  flex: 1,
                                  margin: "0 10px",
                                }}
                              />
                              <Text style={{ maxWidth: 200, fontSize: 10 }}>
                                {
                                  prescriptionMedicine.medicine
                                    .pharmaceuticalForm
                                }
                              </Text>
                            </View>
                            <Text
                              style={[
                                styles.text,
                                { marginLeft: 20, marginTop: 5 },
                              ]}
                            >
                              {prescriptionMedicine.instructions}
                            </Text>
                          </View>
                        ))}
                    </View>
                  )}
                  {!!prescription?.prescriptionMedicines.filter(
                    (prescriptionMedicine) =>
                      prescriptionMedicine.administrationForm === "Uso Externo"
                  ).length && (
                    <View style={{ marginTop: 20 }}>
                      <Text
                        style={{
                          fontSize: 12,
                          textDecoration: "underline",
                          fontWeight: "bold",
                          marginBottom: 10,
                        }}
                      >
                        USO EXTERNO
                      </Text>
                      {prescription?.prescriptionMedicines
                        .filter(
                          (prescriptionMedicine) =>
                            prescriptionMedicine.administrationForm ===
                            "Uso Externo"
                        )
                        .map((prescriptionMedicine, index) => (
                          <View
                            key={prescriptionMedicine.medicine.name}
                            style={{ marginLeft: 20, marginTop: 10 }}
                          >
                            <View
                              style={{
                                displa: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <Text style={{ maxWidth: 200, fontSize: 10 }}>
                                {index + 1}){" "}
                                {prescriptionMedicine.medicine.name}{" "}
                                {prescriptionMedicine.concentration}
                              </Text>
                              <View
                                style={{
                                  borderBottom: "1px dashed #000",
                                  flex: 1,
                                  margin: "0 10px",
                                }}
                              />
                              <Text style={{ maxWidth: 200, fontSize: 10 }}>
                                {
                                  prescriptionMedicine.medicine
                                    .pharmaceuticalForm
                                }
                              </Text>
                            </View>
                            <Text
                              style={[
                                styles.text,
                                { marginLeft: 20, marginTop: 5 },
                              ]}
                            >
                              {prescriptionMedicine.instructions}
                            </Text>
                          </View>
                        ))}
                    </View>
                  )}
                  {prescription?.aditionalInfos && (
                    <View style={{ marginTop: 20 }}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "bold",
                          marginBottom: 10,
                        }}
                      >
                        Informações Adicionais
                      </Text>
                      <Text style={styles.text}>
                        {prescription?.aditionalInfos}
                      </Text>
                    </View>
                  )}
                  {prescription?.nonPharmacologicalTherapy && (
                    <View style={{ marginTop: 20 }}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "bold",
                          marginBottom: 10,
                        }}
                      >
                        Terapia não farmacológica
                      </Text>
                      <Text style={styles.text}>
                        {prescription?.nonPharmacologicalTherapy}
                      </Text>
                    </View>
                  )}
                  <View
                    style={{
                      marginTop: 75,
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <View style={{ display: "flex", alignItems: "center" }}>
                      <View
                        style={{ borderTop: "1px solid #000", width: 150 }}
                      />
                      <Text style={[styles.text, { margin: "5px 0" }]}>
                        {prescription?.professional.name}
                      </Text>
                      <Text style={styles.text}>
                        CRF/{prescription?.professional.crfState} -{" "}
                        {prescription?.professional.crf}
                      </Text>
                      <Text style={[styles.text, { marginTop: 20 }]}>
                        {prescription?.professional.city} -{" "}
                        {prescription?.professional.state},{" "}
                        {moment(prescription?.createdAt).format("DD/MM/YYYY")}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ maxWidth: 500, margin: "0 auto" }}>
                <Text style={[styles.text, { margin: "50px 0" }]}>
                  Serviço realizado em conformidade de Lei 13.021/14. Este
                  procedimento não tem finalidade de diagnóstico e não substitui
                  consulta médica ou realização de exames laboratoriais.
                  Conforme Art. 69 do RDC 44/2009 da Anvisa. Seus dados pessoais
                  são tratados para a estrita execução dos serviços de saúde
                  realizados e em conformidade com a Lei n° 13.709/2018, podendo
                  este documento ser armazenado pelo tempo necessário para
                  cumprimento das obrigações legais e/ou regulatórias aplicáveis
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              zIndex: 0,
              opacity: 0.1,
            }}
          >
            <Image src="/assets/logo/blue.png" style={{ width: 300 }} />
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default ViewPrescription;
