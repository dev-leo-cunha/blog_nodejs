import bcrypt from 'bcrypt'

export const encryptHash = async (password:string)=>{ // Cria uma senha criptografada.
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    return passwordHash
}

export const CompareHash = async(password:string, userPassword:string)=>{ // Compara a senha enviada com a senha do BD
    return bcrypt.compare(password, userPassword);
}