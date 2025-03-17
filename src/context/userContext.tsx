import { getCurrentUser } from "@/services/AuthServices";
import { IUser } from "@/types";
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";

interface IUserProviderValues {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const UserContext = createContext<IUserProviderValues | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleUser = async () => {
        const user = await getCurrentUser();
        setUser(user as IUser);
        setIsLoading(false);
    }

    useEffect(() => {
        handleUser();
    }, [isLoading])

    return (
        <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;