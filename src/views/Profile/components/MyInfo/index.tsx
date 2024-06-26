import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import Swal from 'sweetalert2';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import styles from './MyInfo.module.css'
import Input from '../../../../components/common/Input'
import useUserData from '../../../../state/useUserData'

const USER_DATA = 'userData'

const schema = yup.object().shape({
    nombre: yup.string()
        .required("Este campo es obligatorio")
        .min(2, "El nombre debe tener al menos dos caracteres"),
    email: yup.string()
        .required("Este campo es obligatorio")
        .matches(/^\S+@\S+$/, "Debe ingresar un email válido"),
    edad: yup.number()
        .required("Este campo es obligatorio")
        .integer("La edad debe ser un número entero")
        .min(0, "La edad debe ser mayor o igual a 0")
        .max(120, "La edad debe ser menor o igual a 120")
        .typeError("La edad debe ser un número válido"),
}).required()

const MyInfo = () => {

    const { handleSubmit, register, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const { userData, setUserData } = useUserData() as { userData: any; setUserData: (data: any) => void };

    useEffect(() => {

        if (!userData) {
          try {
            const storedUserData = JSON.parse(localStorage.getItem(USER_DATA) || '[]');
            if (storedUserData) {
              setUserData(storedUserData);
            }
          } catch (error) {
            Swal.fire({
              title: 'Error al cargar datos',
              icon: 'error',
            });
          }
        }

        if (userData) {
          setValue('nombre', userData.nombre);
          setValue('edad', userData.edad);
          setValue('email', userData.email);
        }
      }, [userData, setValue]);

    const handleSubmitForm = (data: any) => {

        setUserData(data);
        try {
            localStorage.setItem(USER_DATA, JSON.stringify(data));
            Swal.fire({
            title: 'Usuario actualizado',
            icon: 'success',
            });
        } catch (error) {
            Swal.fire({
            title: 'Error al guardar datos',
            icon: 'error',
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)} className={styles.userForm}>
            <div className={styles.formGrid}>
                <Input 
                titulo="Nombre" 
                {...register("nombre")}
                msg_error={errors.nombre ? errors.nombre.message : null}
                />
                <Input 
                titulo="Edad" 
                {...register("edad")}
                msg_error={errors.edad ? errors.edad.message : null}
                />
                <Input 
                titulo="Email" type="email" 
                {...register("email")}
                msg_error={errors.email ? errors.email.message : null}
                />
                <button type="submit">Guardar datos</button>
            </div>
        </form>
    )
}

export default MyInfo