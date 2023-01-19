export type Registro = {
  firstName: string;
  lastName: string;
  age: string;
  username: string;
  password: string;
  birthDate: string;
  gender: 'Male' | 'Female';
}

export type RegistroRespuesta = Registro & {
  id: number;
}
