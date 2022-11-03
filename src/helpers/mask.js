export const maskCpf = (value) => {
  if (!value) {
    return "";
  }

  let v = value.replace(/\D/g, "");

  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3}\.\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3}\.\d{3}\.\d{3})(\d)/, "$1-$2");
  v = v.replace(/-(\d{2})(\d)/, "-$1");

  return v;
};

export const maskPhone = (value) => {
  if (!value) {
    return "";
  }

  let v = value.replace(/\D/g, "");

  v = v.replace(/(\d{2})(\d)/, "($1)$2");
  v = v.replace(/(\d{5})(\d)/, "$1-$2");
  v = v.replace(/-(\d{4})(\d)/, "-$1");

  return v;
};

export const maskTel = (value) => {
  if (!value) {
    return "";
  }

  let v = value.replace(/\D/g, "");

  v = v.replace(/(\d{2})(\d)/, "($1)$2");
  v = v.replace(/\)(\d{4})(\d)/, ")$1-$2");
  v = v.replace(/-(\d{4})(\d)/, "-$1");

  return v;
};

export const maskCep = (value) => {
  if (!value) {
    return "";
  }

  let v = value.replace(/\D/g, "");

  v = v.replace(/(\d{5})(\d)/, "$1-$2");
  v = v.replace(/-(\d{3})(\d)/, "-$1");

  return v;
};

export const unmaskNumber = (value) => {
  return value.replace(/\D/g, "");
};
