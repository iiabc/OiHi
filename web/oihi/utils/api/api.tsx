export const apiSecurityUrl = (path: string) => {
  // return `${process.env.SECURITY_API_URL}${path}`;
  return `http://security:6100${path}`
};

export const apiClientSecurityUrl = (path: string) => {
  // return `${process.env.SECURITY_API_URL}${path}`;
  return `http://192.168.254.131:6100${path}`
};

export const apiClientBupiUrl = (path: string) => {
  // return `${process.env.BUPI_API_URL}${path}`;
  return `http://192.168.254.131:5000${path}`
};
