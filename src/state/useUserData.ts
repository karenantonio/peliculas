import { create } from 'zustand';

interface UserData {
	nombre: string;
	edad: number;
	email: string;
}

// * store pra guardar valores de manera global
const useUserData = create((set) => ({
    userData: null,
    setUserData: (userData: UserData) => set({ userData }),
}));

export default useUserData;