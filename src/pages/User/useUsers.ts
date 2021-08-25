import { addToList, removeFromList, updateItemInList } from "list-helper";
import { useMemo, useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createNewUser, fetchUsers, updateExistingUserApi, deleteUserApi } from "../../api/user";
import { useGlobalStore, useGlobalStoreAction } from "../../AppStore";
import { MsalAuthenticationTemplate, useMsal, useAccount } from "@azure/msal-react";
import { InteractionRequiredAuthError, InteractionType } from "@azure/msal-browser";
import { loginRequest } from "authConfig";

export function useUsers() {
    const queryClient = useQueryClient();
    const [showNewUser, setShowNewUser] = useState<boolean>(false);
    const [showEditUser, setShowEditUser] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<any>();
    const updateGlobalStore = useGlobalStoreAction();
    const {search} = useGlobalStore();

    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});

    useEffect(() => {
        console.log("user effect is called")
        if (account && inProgress === "none") {
            instance.acquireTokenPopup({
                scopes: loginRequest.scopes,
                account: account
            }).then((response) => {
                console.log("use effect response", response);
                // callApiWithToken(response.accessToken, protectedResources.apiHello.endpoint)
                //     .then(response => setHelloData(response));
            }).catch((error) => {
                // in case if silent token acquisition fails, fallback to an interactive method
                if (error instanceof InteractionRequiredAuthError) {
                    if (account && inProgress === "none") {
                        instance.acquireTokenPopup({
                            scopes:loginRequest.scopes
                            // scopes: protectedResources.apiHello.scopes,
                        }).then((response) => {
                            console.log("Respoonse", response);
                            // callApiWithToken(response.accessToken, protectedResources.apiHello.endpoint)
                            //     .then(response => setHelloData(response));
                        }).catch(error => console.log(error));
                    }
                }
            });
        } else {
            console.log("Account is", account)
        }
    }, [account, inProgress, instance]);

    const { data: users, refetch: reFetchUsers } = useQuery('users', fetchUsers, {
        initialData: []
    });


    const filteredUsers = useMemo(()=> {
        const searchText = (search && search["/users"] || "") as string;
        if (!searchText || searchText.trim() === "") {return users};
        return users.filter((user: any) => {

            const values = Object.values(user);
            let isMatched: boolean = false;
            for(let i = 0; i < values.length; i++) {
                if (isMatched) {
                    break;
                }
                if (values[i]) {
                    isMatched = String(values[i]).toLowerCase().includes(searchText.toLowerCase())
                }
            }

            return isMatched;
            
        })
        
    },[users, search])

    const { mutate: createUser } = useMutation(createNewUser, {
        onMutate: () => {
            if (updateGlobalStore) {
                updateGlobalStore({type: "toggleProgress",value: true})
            }
        },
        onSuccess: (data) =>{
            if (updateGlobalStore) {
                updateGlobalStore({ type: "setSnackMessage", value: "User created successfully" })
            }
            queryClient.setQueryData("users", (prevData) => {
                return addToList<any>((prevData || []) as any[], data)
            });
        
            setShowNewUser(false);
        },
    });

    const { mutate: updateUserApi } = useMutation(updateExistingUserApi, {
        onMutate: () => {
            if (updateGlobalStore) {
                updateGlobalStore({type: "toggleProgress",value: true})
            }
        },
        onSuccess: (data, variables) => {
            if (updateGlobalStore) {
                updateGlobalStore({type: "setSnackMessage", value:"User details updated successfully" })
            }
            queryClient.setQueryData(["users"], (prevData)=>{
                if (!prevData) { return prevData};
                return updateItemInList<any>(prevData as any[], data, "id");
            });
            setSelectedUser(undefined);
        }
    });

    const { mutate: deleteUser } = useMutation<any, APIError, any, any>(deleteUserApi, {
        onMutate: () => {
            if (updateGlobalStore) {
                updateGlobalStore({type: "toggleProgress",value: true})
            }
        },
        onSuccess: (data, variables) => {
            if (updateGlobalStore) {
                updateGlobalStore({type: "setSnackMessage", value:"User deleted successfully" })
            }
            queryClient.setQueryData(["users"], (prevData)=>{
                if (!prevData) { return prevData};
                const removedUser = removeFromList<any>(prevData as any[], variables,  "id");
                return removedUser;
            });
            setSelectedUser(undefined);
        },
    });

    function editUser(user: any) {
        const edit = {
            id: user.id,
            firstName: user.givenName,
            lastName: user.surname,
            userType: user.extension_15c35030a9a64ce89a2327a12e9bf38c_userType,
            email: user.mailNickname,
            dob: user.extension_15c35030a9a64ce89a2327a12e9bf38c_dob,
            gender: user.extension_15c35030a9a64ce89a2327a12e9bf38c_gender,
        }

        setSelectedUser(edit);
    }
    return {
        users: filteredUsers,
        createUser,
        showNewUser,
        setShowNewUser,
        selectedUser,
        updateUserApi,
        editUser,
        setSelectedUser,
        deleteUser,
        reFetchUsers
    }
}