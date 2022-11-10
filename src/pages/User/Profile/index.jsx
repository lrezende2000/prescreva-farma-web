import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

import { maskCep, maskPhone, maskTel } from "../../../helpers/mask";
import useAxios from "../../../hooks/useAxios";
import { formatBody } from "../../../helpers/formatter";

import PageLayout from "../../../components/PageLayout";
import Text from "../../../components/Text";
import ProfessionalAddress from "../../../admin/pages/User/components/forms/ProfessionalAddress";

const Profile = () => {
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(true);

  const api = useAxios();

  const navigate = useNavigate();

  const getNameInitials = () => {
    const nameSplited = profile?.name
      ?.split(" ")
      .filter((partName) => !!partName);

    if (nameSplited.length && profile.name) {
      if (nameSplited.length > 1) {
        return `${nameSplited[0][0]}${
          nameSplited[nameSplited.length - 1][0]
        }`.toUpperCase();
      }

      return nameSplited[0][0].toUpperCase();
    }

    return "US";
  };

  const handleToggleSubmit = async (values) => {
    const formData = new FormData();

    const body = formatBody(values, {
      numberFields: ["phone", "tel", "cep", "cpf", "professionalPhone"],
    });

    if (values.logo && typeof values.logo !== "string") {
      formData.append("logo", values.logo);
    }

    formData.append("json", JSON.stringify(body));

    try {
      const { data } = await api.put("/user", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(data.message);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    api
      .get("/user/profile")
      .then(({ data }) => setProfile(data.user))
      .catch((err) => {
        toast.error(err.response.data.message);
        navigate("/");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || !profile) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <PageLayout>
      <Container maxWidth="md" sx={{ paddingBottom: 10 }}>
        <Grid container>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ width: 75, height: 75, fontSize: 30 }}>
                {getNameInitials()}
              </Avatar>
              <Box>
                <Text variant="medium" fontWeight={700}>
                  {profile.name}
                </Text>
                <Text variant="small" fontStyle="italic">
                  {`CRF/${profile.crfState} ${profile.crf}`}
                </Text>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Text fontWeight={700}>Detalhes Profissionais</Text>
          </Grid>
          <Formik
            initialValues={{
              professionalPhone:
                profile.professionalPhone.length === 10
                  ? maskTel(profile.professionalPhone)
                  : maskPhone(profile.professionalPhone),
              email: profile.email,
              logo: profile.logo,
            }}
            onSubmit={handleToggleSubmit}
            validationSchema={yup.object().shape({
              professionalPhone: yup
                .string()
                .matches(
                  /(^\(\d{2}\)\d{5}-\d{4}$|^\(\d{2}\)\d{4}-\d{4}$)/,
                  "Celular profissional no formato errado"
                )
                .required("Celular profissional é obrigatório"),
              email: yup
                .string()
                .required("Email é obrigatório")
                .email("Email incorreto"),
              logo: yup.mixed(),
            })}
            validateOnMount
          >
            {({
              values,
              setFieldValue,
              touched,
              setFieldTouched,
              errors,
              isValid,
              handleSubmit,
            }) => (
              <Grid container item xs={12}>
                <Grid item xs={12} display="flex" gap={2} alignItems="center">
                  <Button
                    color="primary"
                    component="label"
                    startIcon={<PhotoCamera />}
                  >
                    <input
                      hidden
                      onChange={(e) => setFieldValue("logo", e.target.files[0])}
                      accept="image/*"
                      type="file"
                    />
                    Insira a identidade do seu estabelecimento
                  </Button>
                  {values.logo && values.logo?.name && (
                    <Chip
                      label={values.logo?.name || values.logo}
                      onDelete={() => setFieldValue("logo", "")}
                    />
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="E-mail"
                    placeholder="Informe seu e-mail"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={(e) => setFieldValue("email", e.target.value)}
                    onFocus={() => setFieldTouched("email", true)}
                    error={touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Telefone profissional"
                    placeholder="(99)99999-9999"
                    name="professionalPhone"
                    value={values.professionalPhone}
                    onChange={(e) => {
                      const value = e.target.value;

                      if (value.length >= 14) {
                        setFieldValue(e.target.name, maskPhone(value));
                      } else {
                        setFieldValue(e.target.name, maskTel(value));
                      }
                    }}
                    onFocus={() => setFieldTouched("professionalPhone", true)}
                    error={
                      touched.professionalPhone && !!errors.professionalPhone
                    }
                    helperText={
                      touched.professionalPhone && errors.professionalPhone
                    }
                  />
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="flex-end">
                  <Button disabled={!isValid} onClick={handleSubmit}>
                    Salvar
                  </Button>
                </Grid>
              </Grid>
            )}
          </Formik>
          <Grid item xs={12}>
            <Text fontWeight={700}>Endereço Profissional</Text>
          </Grid>
          <Formik
            initialValues={{
              street: profile.street,
              cep: maskCep(profile.cep),
              number: profile.number,
              district: profile.district,
              complement: profile.complement,
              state: profile.state,
              city: profile.city,
            }}
            onSubmit={handleToggleSubmit}
            validationSchema={yup.object().shape({
              street: yup.string().required("Rua é obrigatória"),
              cep: yup
                .string()
                .required("CEP é obrigatório")
                .matches(/^\d{5}-\d{3}/, "CEP incorreto"),
              number: yup.string().required("Número é obrigatório"),
              district: yup.string().required("Bairro é obrigatório"),
              complement: yup.string(),
              state: yup.string().required("Estado é obrigatório"),
              city: yup.string().required("Cidade é obrigatória"),
            })}
          >
            {({ isValid, handleSubmit }) => (
              <>
                <ProfessionalAddress />
                <Grid item xs={12} display="flex" justifyContent="flex-end">
                  <Button disabled={!isValid} onClick={handleSubmit}>
                    Salvar
                  </Button>
                </Grid>
              </>
            )}
          </Formik>
          <Grid item xs={12}>
            <Text fontWeight={700}>Senha</Text>
          </Grid>
          <Formik
            initialValues={{
              password: "",
              newPassword: "",
              newPasswordConfirmation: "",
            }}
            onSubmit={async (values, actions) => {
              try {
                const { data } = await api.put(
                  "/user/changePassword",
                  formatBody(values)
                );

                actions.resetForm();
                toast.success(data.message);
              } catch (err) {
                toast.error(err.response.data.message);
              }
            }}
            validationSchema={yup.object().shape({
              password: yup.string().required("Senha atual obrigatória"),
              newPassword: yup
                .string()
                .min(6, "Senha deve ter no mínimo 6 caracteres")
                .required("Nova senha é obrigatória"),
              newPasswordConfirmation: yup
                .string()
                .required()
                .oneOf([yup.ref("newPassword"), null], "Senhas não conferem"),
            })}
          >
            {({
              values,
              setFieldValue,
              touched,
              setFieldTouched,
              errors,
              isValid,
              handleSubmit,
            }) => (
              <Grid container item xs={12}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Senha atual"
                    placeholder="Informe a senha atual"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={(e) => setFieldValue("password", e.target.value)}
                    onFocus={() => setFieldTouched("password", true)}
                    error={touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Nova senha"
                    placeholder="Informe sua nova senha"
                    name="newPassword"
                    type="password"
                    value={values.newPassword}
                    onChange={(e) =>
                      setFieldValue("newPassword", e.target.value)
                    }
                    onFocus={() => setFieldTouched("newPassword", true)}
                    error={touched.newPassword && !!errors.newPassword}
                    helperText={touched.newPassword && errors.newPassword}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Confirmação de senha"
                    placeholder="Confirme sua nova senha"
                    name="newPasswordConfirmation"
                    type="password"
                    value={values.newPasswordConfirmation}
                    onChange={(e) =>
                      setFieldValue("newPasswordConfirmation", e.target.value)
                    }
                    onFocus={() =>
                      setFieldTouched("newPasswordConfirmation", true)
                    }
                    error={
                      touched.newPasswordConfirmation &&
                      !!errors.newPasswordConfirmation
                    }
                    helperText={
                      touched.newPasswordConfirmation &&
                      errors.newPasswordConfirmation
                    }
                  />
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="flex-end">
                  <Button disabled={!isValid} onClick={handleSubmit}>
                    Salvar
                  </Button>
                </Grid>
              </Grid>
            )}
          </Formik>
        </Grid>
      </Container>
    </PageLayout>
  );
};

export default Profile;
