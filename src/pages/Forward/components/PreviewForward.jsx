import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  PDFViewer,
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import moment from "moment";

import useAxios from "../../../hooks/useAxios";
import { formatUrlQuery } from "../../../helpers/formatter";
import { maskPhone, maskTel } from "../../../helpers/mask";

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

const PreviewForward = ({ values }) => {
  const [loading, setLoading] = useState(true);
  const [previewData, setPreviewData] = useState();

  const api = useAxios();

  useEffect(() => {
    api
      .get(
        formatUrlQuery("/forward/preview", {
          patientId: values.patientId,
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
                  {previewData?.patient.name} -{" "}
                  {maskPhone(previewData?.patient.phone)}
                </Text>
              </View>

              <View style={{ marginTop: 20 }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                >
                  ENCAMINHAMENTO
                </Text>
                <Text style={[styles.text, { marginTop: 20 }]}>
                  Ao {values?.medicalExperience}
                </Text>
                <Text style={[styles.text, { marginTop: 20 }]}>
                  Prezado Dr(a).:
                </Text>
                <Text style={[styles.text, { marginTop: 20 }]}>
                  {values?.forwardReason}
                </Text>
                <Text style={[styles.text, { marginTop: 20 }]}>
                  {values?.showFooter &&
                    "À disposição para qualquer esclarecimento."}
                </Text>
                <Text style={[styles.text, { marginTop: 20 }]}>
                  Atenciosamente,
                </Text>
              </View>

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
                    {previewData?.professional.name}
                  </Text>
                  <Text style={styles.text}>
                    CRF/{previewData?.professional.crfState} -{" "}
                    {previewData?.professional.crf}
                  </Text>
                  <Text style={[styles.text, { marginTop: 20 }]}>
                    {previewData?.professional.city} -{" "}
                    {previewData?.professional.state},{" "}
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

export default PreviewForward;
