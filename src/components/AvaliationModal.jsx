import { memo } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Box, Button, Modal, Rating, TextField } from "@mui/material";

import { theme } from "../global/theme";
import { formatBody } from "../helpers/formatter";
import useAxios from "../hooks/useAxios";

import Text from "./Text";
import { toast } from "react-toastify";
import moment from "moment";

const AvaliationModal = ({ open, onClose }) => {
  const api = useAxios();

  const validationSchema = yup.object().shape({
    grade: yup
      .number()
      .integer("Nota deve ser um número inteiro")
      .required("Nota é obrigatória")
      .min(1, "Nota mínima é 1 estrela"),
    comment: yup.string(),
  });

  const handleToggleSubmit = async (values) => {
    try {
      const { data } = await api.post("/avaliation/", formatBody(values));

      toast.success(data.message);
      localStorage.setItem(
        "@prescreva:lastAvaliation",
        moment().format("YYYY-MM-DD")
      );
      onClose();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Box>
        <Formik
          initialValues={{ grade: 0, comment: "" }}
          validationSchema={validationSchema}
          onSubmit={handleToggleSubmit}
          validateOnMount
        >
          {({ values, setFieldValue, handleSubmit, isValid }) => (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              bgcolor={theme.colors.white}
              padding="1rem"
              borderRadius={1}
              gap={2}
            >
              <Text variant="medium" fontWeight={700}>
                Ajude-nos a melhorar! Deixe sua avaliação
              </Text>
              <Rating
                value={values.grade}
                onChange={(e, value) => setFieldValue("grade", value)}
                max={10}
                size="large"
              />
              <TextField
                multiline
                rows={4}
                label="Comentário"
                value={values.comment}
                onChange={(e) => setFieldValue("comment", e.target.value)}
              />
              <Box width="100%" display="flex" justifyContent="flex-end">
                <Button disabled={!isValid} onClick={handleSubmit}>
                  Enviar
                </Button>
              </Box>
            </Box>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default memo(AvaliationModal);
