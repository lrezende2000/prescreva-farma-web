import {
  PDFViewer,
  Document,
  Page,
  View,
  Image,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { formatUrlQuery } from "../../../helpers/formatter";
import { maskPhone, maskTel } from "../../../helpers/mask";
import useAxios from "../../../hooks/useAxios";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFF",
    margin: 10,
    overflow: "hidden",
    position: "relative",
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

const PreviewPrescription = ({ values }) => {
  const [loading, setLoading] = useState(true);
  const [previewData, setPreviewData] = useState();

  const api = useAxios();

  useEffect(() => {
    api
      .get(
        formatUrlQuery("/prescription/preview", {
          patientId: values.patientId,
          medicines: values.medicines.map((m) => m.medicineId).join(","),
        })
      )
      .then(({ data }) => setPreviewData(data))
      .catch((err) => toast.error(err.response.data.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PDFViewer style={{ width: "100%", height: "100%", minHeight: "70vh" }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={{ position: "relative", zIndex: 999 }}>
            <View style={styles.header}>
              {previewData?.professional?.logo && (
                <Image
                  style={{ maxWidth: "200px", maxHeight: "100px" }}
                  src={`${process.env.REACT_APP_API_URL}/public/logos/${previewData?.professional?.logo}`}
                  alt="Logo marca do profissional"
                />
              )}
              <View style={styles.column}>
                <Text style={styles.text}>
                  {previewData?.professional.street},{" "}
                  {previewData?.professional.number} -{" "}
                  {previewData?.professional.district},{" "}
                  {previewData?.professional.city} -{" "}
                  {previewData?.professional.state}
                </Text>
                {previewData?.professional.professionalPhone && (
                  <Text style={styles.text}>
                    {previewData?.professional.professionalPhone.length === 10
                      ? maskTel(previewData?.professional.professionalPhone)
                      : maskPhone(previewData?.professional.professionalPhone)}
                  </Text>
                )}
              </View>
            </View>

            <View
              style={{ margin: "50px auto 0", maxWidth: 500, width: "100%" }}
            >
              <View>
                <Text style={styles.text}>
                  {previewData?.patient?.name} -{" "}
                  {maskPhone(previewData?.patient?.phone)}
                </Text>
              </View>
              {!!values?.medicines.filter(
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
                  {values?.medicines
                    .filter(
                      (prescriptionMedicine) =>
                        prescriptionMedicine.administrationForm ===
                        "Uso Interno"
                    )
                    .map((prescriptionMedicine, index) => (
                      <View
                        key={prescriptionMedicine.medicineName}
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
                            {index + 1}) {prescriptionMedicine.medicineName}{" "}
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
                            {previewData.medicines.find(
                              (m) => m.id === prescriptionMedicine.medicineId
                            )?.pharmaceuticalForm || ""}
                          </Text>
                          {/* <Text style={{ maxWidth: 200, fontSize: 10 }}>
                            {prescriptionMedicine.medicine.pharmaceuticalForm}
                          </Text> */}
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
              {!!values?.medicines.filter(
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
                  {values?.medicines
                    .filter(
                      (prescriptionMedicine) =>
                        prescriptionMedicine.administrationForm ===
                        "Uso Externo"
                    )
                    .map((prescriptionMedicine, index) => (
                      <View
                        key={prescriptionMedicine.medicineName}
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
                            {index + 1}) {prescriptionMedicine.medicineName}{" "}
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
                            {previewData.medicines.find(
                              (m) => m.id === prescriptionMedicine.medicineId
                            )?.pharmaceuticalForm || ""}
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
              {values?.aditionalInfos && (
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
                  <Text style={styles.text}>{values?.aditionalInfos}</Text>
                </View>
              )}
              {values?.nonPharmacologicalTherapy && (
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
                    {values?.nonPharmacologicalTherapy}
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
                  <View style={{ borderTop: "1px solid #000", width: 150 }} />
                  <Text style={[styles.text, { margin: "5px 0" }]}>
                    {previewData?.professional?.name}
                  </Text>
                  <Text style={styles.text}>
                    CRF/{previewData?.professional?.crfState} -{" "}
                    {previewData?.professional?.crf}
                  </Text>
                  <Text style={[styles.text, { marginTop: 20 }]}>
                    {previewData?.professional?.city} -{" "}
                    {previewData?.professional?.state},{" "}
                    {moment().format("DD/MM/YYYY")}
                  </Text>
                </View>
              </View>
              <Text style={[styles.text, { marginTop: 50 }]}>
                Serviço realizado em conformidade de Lei 13.021/14. Este
                procedimento não tem finalidade de diagnóstico e não substitui
                consulta médica ou realização de exames laboratoriais. Conforme
                Art. 69 do RDC 44/2009 da Anvisa. Seus dados pessoais são
                tratados para a estrita execução dos serviços de saúde
                realizados e em conformidade com a Lei n 13.709/2018, podendo
                este documento ser armazenado pelo tempo necessário para
                cumprimento das obrigações legais e/ou regulatórias aplicáveis.
              </Text>
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

export default PreviewPrescription;
