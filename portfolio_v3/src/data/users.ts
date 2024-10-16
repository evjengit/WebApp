import { User } from "./types";

export { users };

const users: User[] = [
  {
    id: "1",
    email: "gunnar@test.no",
    name: "Gunnar",
    admin: "false"
  },
  {
    id: "2",
    email: "knut@test.no",
    name: "Knut",
    admin: "true"
  },
  {
    id: "3",
    email: "mia@test.no",
    name: "Mia",
    admin: "false"
  },
];