import { memo } from "react";
import { Modal } from "@mui/material";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const PrescriptionPdfPreview = ({ open, onClose, values }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        width: "90%",
        maxWidth: "1020px",
        height: "90%",
        margin: "auto",
      }}
    >
      <PDFViewer style={{ width: "100%", height: "100%" }}>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text>Section #1</Text>
            </View>
            <View style={styles.section}>
              <Text>Section #2</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </Modal>
  );
};

export default memo(PrescriptionPdfPreview);
