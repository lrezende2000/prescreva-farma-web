import styled from "styled-components";
import { TableRow } from "@mui/material";

// const upDown = `
//   0% {
//     transform: translateY(0px);
//   }

//   25% {
//     transform: translateY(-10px);
//   }

//   50% {
//     transform: translateY(0px);
//   }

//   75% {
//     transform: translateY(-10px);
//   }

//   100% {
//     transform: translateY(0px);
//   }
// `;

export const StyledTableHead = styled(TableRow)`
  background-color: ${({ theme }) => theme.colors.tertiary_blue};
`;

export const StyledTableRow = styled(TableRow)`
  &:last-child td,
  &:last-child th {
    border: 0;
  }
`;

export const DateDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
`;

export const DateContainer = styled.div`
  text-align: center;
  width: 100%;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.primary_blue};
  font-size: 0.875rem;
  font-weight: 700;
  padding: 0.2rem 0;
`;

export const DateApointmentContainer = styled.div`
  display: flex;
  padding: 4px 0;
  flex-direction: column;
  height: 100%;
  background: ${({ theme, hasAppointment }) =>
    hasAppointment ? theme.colors.quartiary_blue : "transparent"};
  width: 100%;
  overflow-y: scroll;
  /* position: relative; */

  &.date_apointment_container:not(.show_more) {
    .show_more_icon {
      display: none;
    }
  }

  .show_more_icon {
    /* animation:  1s;
    animation-delay: 2s; */
  }
`;

export const CalendarContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CalendarContainerBody = styled.div`
  color: blue;
  margin-top: 5px;

  width: 100%;
`;

export const CalenderWeekContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 1rem;

  background-color: ${({ theme }) => theme.colors.secondary_blue};
  padding: 5px 10px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

export const CalenderWeekDayContainer = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  padding: 0.5rem 0;

  font-weight: 700;
`;

export const CalenderDateContainer = styled.div`
  display: grid;
  margin-top: 10px;
  grid-template-columns: repeat(7, 1fr);
`;
export const CalenderDateDayContainerDisable = styled.div`
  margin: 1px;
  text-align: center;
  height: 100px;
`;
export const CalenderDateDayContainerActive = styled.div`
  margin: 1px;
  border: 1px solid gray;
  border-radius: 4px;
  text-align: center;
  height: 100px;
`;

export const ModalHeader = styled.div`
  font-size: 20px;
  text-align: center;
  font-weight: bold;
`;

export const ModalBody = styled.div`
  width: 100%;
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  margin: 15px 0px;
  height: 30px;
  align-items: center;
`;

export const InputSpan = styled.div`
  width: 30%;
`;

export const InputField = styled.input`
  width: 70%;
  height: 25px;
  border-radius: 5px;
  &:focus {
    border: 3px solid #89cff0;
    outline: none;
  }
`;

export const ModalFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

export const ModalSubmit = styled.button`
  width: 40%;
  height: 40px;
  background: #228c22;
  color: #fff;
`;

export const ModalCancel = styled.button`
  width: 40%;
  height: 40px;
  background: #f68a06;
  color: #fff;
`;

export const AppointmentContainer = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.black};
  font-size: 0.875rem;
  padding: 8px 0;

  cursor: pointer;

  & + & {
    border-top: 1px solid ${({ theme }) => theme.colors.black};
  }
`;

export const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "300px",
    padding: "10px",
    border: "1px solid #000",
  },
};

export const CalenderHeaderContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const DropdownContainer = styled.div`
  display: flex;
`;

export const AppointmentButton = styled.button`
  border: 1px solid black;
  background: #228c22;
  color: #fff;
`;
