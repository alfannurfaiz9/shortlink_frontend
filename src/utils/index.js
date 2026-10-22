export const navLinks = [
  {
    link: "/dashboard",
    title: "Dashboard",
  },
  {
    link: "/analytics",
    title: "Analytics",
  },
  {
    link: "/links",
    title: "Links",
  },
];

export const upperCaseResponse = (payload) => {
  const message = [...payload.message];
  message[0] = message[0].toUpperCase();
  const fixMessage = message.join("");

  return fixMessage;
};
