export default interface UserData {
  name: string;
  email: string;
  role: 'shelter' | 'vet' | 'adopter' | 'admin';
}