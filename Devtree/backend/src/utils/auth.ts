import bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
//   console.log(password);
    const salt = await bcrypt.genSalt(10); // el numero es la cantidad de caracteres que se van a generar
    return await bcrypt.hash(password, salt);
  
};

export const checkPassword = async (enteredPassword: string, hash: string) => {
    //   console.log(enteredPassword);
    //   console.log(hash);
    // Compara la contraseña ingresada con la contraseña encriptada
    return await bcrypt.compare(enteredPassword, hash); 
 }