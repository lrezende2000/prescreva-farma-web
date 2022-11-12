import { memo, useCallback, useEffect, useState, useLayoutEffect } from "react";
import moment from "moment";
import {
  Add,
  FilterList,
  KeyboardArrowDown,
  Search,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  SpeedDial,
  SpeedDialIcon,
  TextField,
} from "@mui/material";

import PageLayout from "../../../components/PageLayout";

import {
  CalendarContainer,
  CalendarContainerBody,
  CalenderWeekContainer,
  CalenderWeekDayContainer,
  CalenderDateContainer,
  CalenderDateDayContainerActive,
  CalenderDateDayContainerDisable,
  CalenderHeaderContainer,
  DateDataContainer,
  DateContainer,
  DateApointmentContainer,
  AppointmentContainer,
} from "./styles";

import useAxios from "../../../hooks/useAxios";
import { formatUrlQuery } from "../../../helpers/formatter";
import PatientAutocomplete from "../../../components/PatientAutocomplete";
import DeleteDialog from "../../../components/DeleteDialog";
import Text from "../../../components/Text";
import { theme } from "../../../global/theme";

export const weekArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const weekArrayPt = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export const gridArray = _.range(0, 42);

export const yearOptions = ["2021", "2022", "2023", "2024"];

export const monthOptions = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];

const monthLabels = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const AppointmentList = () => {
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [filters, setFilters] = useState({
    month: parseInt(moment().format("MM")) - 1,
    year: parseInt(moment().format("YYYY")),
    cpf: "",
    patientId: null,
  });
  const [calendar, setCalendar] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);

  const open = !!anchorEl;

  const api = useAxios();

  const navigate = useNavigate();

  const handleChangeFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const fetchRows = useCallback(async () => {
    try {
      setLoading(true);
      const url = formatUrlQuery("/appointment/calendar", { ...filters });

      const { data } = await api.get(url);

      setCalendar(data.rowsGrouped);
    } catch (err) {
      setCalendar({});
    } finally {
      setLoading(false);
    }
  }, [filters, api]);

  const startOfDay = moment()
    .year(filters.year)
    .month(filters.month)
    .startOf("month")
    .format("ddd");
  const monthSize = parseInt(
    moment().year(filters.year).month(filters.month).endOf("month").format("DD")
  );

  const handleDeleteAppointment = async () => {
    try {
      await api.delete(`/appointment/${anchorEl?.id}`);

      setOpenDelete(false);
      setAnchorEl(null);

      fetchRows();
    } catch {}
  };

  const startIndex = weekArray.indexOf(startOfDay);
  const endIndex = startIndex + monthSize;

  useEffect(() => {
    fetchRows();
  }, [filters.year, filters.month]);

  useLayoutEffect(() => {
    const dateAppointmentContainers = document.getElementsByClassName(
      "date_apointment_container"
    );

    [...dateAppointmentContainers].forEach((dateAppointmentContainer, i) => {
      const hasVerticalScrollbar =
        dateAppointmentContainer.scrollHeight >
        dateAppointmentContainer.clientHeight;

      if (hasVerticalScrollbar) {
        dateAppointmentContainer.classList.add("show_more");
      }
    });
  }, [calendar]);

  return (
    <PageLayout>
      <CalendarContainer>
        <CalenderHeaderContainer>
          <Grid container spacing={2}>
            <Grid item container xs={12} md={8} spacing={2}>
              <Grid item xs={12} sm={3}>
                <PatientAutocomplete
                  onChange={(patient) =>
                    handleChangeFilter("patientId", patient?.id || undefined)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="CPF"
                  value={filters.cpf}
                  onChange={(e) => handleChangeFilter("cpf", e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      fetchRows();
                    }
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <FormControl fullWidth size="small">
                  <InputLabel id="month_label" htmlFor="month">
                    Mês
                  </InputLabel>
                  <Select
                    id="month"
                    labelId="month_label"
                    label="Mês"
                    name="month"
                    value={(filters.month + 1).toString()}
                    onChange={(e) =>
                      handleChangeFilter("month", parseInt(e.target.value) - 1)
                    }
                  >
                    {monthOptions.map((month) => (
                      <MenuItem key={month} value={month}>
                        {monthLabels[month - 1]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={3}>
                <FormControl fullWidth size="small">
                  <InputLabel id="year_label" htmlFor="year">
                    Ano
                  </InputLabel>
                  <Select
                    id="year"
                    labelId="year_label"
                    label="Ano"
                    name="year"
                    value={filters.year.toString()}
                    onChange={(e) =>
                      handleChangeFilter("year", parseInt(e.target.value))
                    }
                  >
                    {yearOptions.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item container xs={12} md={4}>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  flexDirection={["column", "row"]}
                  alignItems={["unset", "center"]}
                  justifyContent="flex-end"
                  gap={1}
                >
                  <Button
                    disabled={loading}
                    onClick={fetchRows}
                    startIcon={<FilterList />}
                    variant="outlined"
                  >
                    Filtrar
                  </Button>
                  <Button startIcon={<Add />} onClick={() => navigate("novo")}>
                    Agendar consulta
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </CalenderHeaderContainer>
        <CalendarContainerBody>
          <CalenderWeekContainer>
            {weekArrayPt.map((data, i) => (
              <CalenderWeekDayContainer key={i}>
                {data}
              </CalenderWeekDayContainer>
            ))}
          </CalenderWeekContainer>
          <CalenderDateContainer>
            {gridArray.map((data, i) => {
              const dayKey = `${filters.year}-${(filters.month + 1)
                .toString()
                .padStart(2, "0")}-${(i - startIndex + 1)
                .toString()
                .padStart(2, "0")}`;

              return i >= startIndex && i < endIndex ? (
                <CalenderDateDayContainerActive key={i}>
                  <DateDataContainer>
                    <DateContainer>{i - startIndex + 1}</DateContainer>
                    <DateApointmentContainer
                      hasAppointment={dayKey in calendar}
                      className="date_apointment_container"
                    >
                      {dayKey in calendar &&
                        calendar[dayKey].map((appointment) => (
                          <AppointmentContainer
                            id={appointment.id}
                            key={appointment.id}
                            onClick={(e) => setAnchorEl(e.currentTarget)}
                          >
                            {appointment?.patient?.name} às{" "}
                            {moment.utc(appointment.start).format("HH:mm")} -{" "}
                            {moment.utc(appointment.end).format("HH:mm")}
                          </AppointmentContainer>
                        ))}
                      <SpeedDial
                        open={false}
                        className="show_more_icon"
                        ariaLabel="Speed Dial show more"
                        sx={{ position: "absolute", bottom: 0, right: 20 }}
                        FabProps={{
                          sx: {
                            width: 0,
                            height: 0,
                            background: "transparent",
                            boxShadow: "none",
                            ":hover": { background: "transparent" },
                            color: theme.colors.black,
                          },
                        }}
                        icon={<KeyboardArrowDown />}
                      />
                    </DateApointmentContainer>
                    {/* <KeyboardArrowDown
                      className="show_more_icon"
                      sx={{ position: "absolute", right: 10, bottom: 10 }}
                    /> */}
                  </DateDataContainer>
                </CalenderDateDayContainerActive>
              ) : (
                <CalenderDateDayContainerDisable key={i} />
              );
            })}
          </CalenderDateContainer>
        </CalendarContainerBody>
      </CalendarContainer>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        anchorOrigin={{ horizontal: "center", vertical: "center" }}
      >
        <MenuItem onClick={() => setOpenDelete(true)}>
          <Text color="error">Deletar</Text>
        </MenuItem>
      </Menu>
      <DeleteDialog
        title="Tem certeza que deseja remover a consulta?"
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirmDelete={handleDeleteAppointment}
      />
    </PageLayout>
  );
};

export default memo(AppointmentList);
