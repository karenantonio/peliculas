import { useForm } from "react-hook-form"
import styles from './MyInfo.module.css'
import { useEffect } from "react"
import Swal from 'sweetalert2';

const USER_DATA = 'userData'

const MyInfo = () => {

    const { handleSubmit, register, setValue } = useForm()

    useEffect(() => {
        try {
            const userData = JSON.parse(localStorage.getItem(USER_DATA) || '[]')
            setValue('nombre', userData?.nombre)
            setValue('edad', userData?.edad)
            setValue('email', userData?.email)
        } catch (error) {
            Swal.fire({
                title: "Ha ocurrido un error",
                icon: "error"
            });
        }
    },[setValue])

    const handleSubmitForm = (data: any) => {
        try {
            localStorage.setItem(USER_DATA, JSON.stringify(data))
            Swal.fire({
                title: "Usuario actualizado",
                icon: "success"
            });
        } catch (error) {
            Swal.fire({
                title: "Ha ocurrido un error",
                icon: "error"
            });
        }
        
    }

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)} className={styles.form}>
            <label htmlFor="nombre">Nombre
            <input type="text"
                {...register('nombre', { required:true, minLength:1, max:120 })} />
            </label>
            <label htmlFor="edad">Edad
            <input type="number"
                {...register('edad', { required:true, min:1, max:120, valueAsNumber:true })} />
            </label>
            <label htmlFor="email">Email
            <input type="email"
                {...register('email', { required:true, minLength:1, max:200 })} />
            </label>
            <div>
                <button type="submit">Guardar</button>
            </div>
        </form>
    )
}

export default MyInfo