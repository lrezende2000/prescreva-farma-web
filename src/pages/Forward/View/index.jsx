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

const ViewForward = () => {
  const [loading, setLoading] = useState(true);
  const [forward, setForward] = useState();

  const api = useAxios();

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      navigate("/encaminhamentos");
    }

    api
      .get(`/forward/${id}`)
      .then(({ data }) => {
        if (!data.forward) {
          navigate("/encaminhamentos");
        }

        setForward(data.forward);
      })
      .catch(() => navigate("/encaminhamentos"))
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
                  {forward?.professional?.logo && (
                    <Image
                      style={{ maxWidth: "200px", maxHeight: "100px" }}
                      src={`${process.env.REACT_APP_API_URL}/public/logos/${forward?.professional?.logo}`}
                      alt="Logo marca do profissional"
                    />
                  )}
                  <View style={styles.column}>
                    <Text style={styles.text}>
                      {forward?.professional.street},{" "}
                      {forward?.professional.number} -{" "}
                      {forward?.professional.district},{" "}
                      {forward?.professional.city} -{" "}
                      {forward?.professional.state}
                    </Text>
                    {forward?.professional.professionalPhone && (
                      <Text style={styles.text}>
                        {forward?.professional.professionalPhone.length === 10
                          ? maskTel(forward?.professional.professionalPhone)
                          : maskPhone(forward?.professional.professionalPhone)}
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
                      {forward?.patient.name} -{" "}
                      {maskPhone(forward?.patient.phone)}
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
                      Ao {forward?.medicalExperience}
                    </Text>
                    <Text style={[styles.text, { marginTop: 20 }]}>
                      Prezado Dr(a).:
                    </Text>
                    <Text style={[styles.text, { marginTop: 20 }]}>
                      {forward?.forwardReason}
                    </Text>
                    <Text style={[styles.text, { marginTop: 20 }]}>
                      {forward?.showFooter &&
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
                      <View
                        style={{ borderTop: "1px solid #000", width: 150 }}
                      />
                      <Text style={[styles.text, { margin: "5px 0" }]}>
                        {forward?.professional.name}
                      </Text>
                      <Text style={styles.text}>
                        CRF/{forward?.professional.crfState} -{" "}
                        {forward?.professional.crf}
                      </Text>
                      <Text style={[styles.text, { marginTop: 20 }]}>
                        {forward?.professional.city} -{" "}
                        {forward?.professional.state},{" "}
                        {moment(forward?.createdAt).format("DD/MM/YYYY")}
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

export default ViewForward;
