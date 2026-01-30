import { reactive } from 'vue';
const config = useRuntimeConfig()

type TAddUseBody = {
    email: string
    name: string
    password: string
}

type TUserLoginBody = {
    email: string
    password: string
}
type TUserLoginResponse = {
    status: string
    access_token: string
    user: TUserModel
}

type TUserModel = {
    id: string
    email: string
    name: string
    is_super_user: boolean
    is_god: boolean
}

interface IAuth {
    apiAddUser(body: TAddUseBody): Promise<boolean>
}

export class auth  implements IAuth {

    async apiAddUser (body: TAddUseBody){
        if(!body) {
            console.error('error in apiAddUser: body not found')
        }
        try {
            await $fetch(`${config.public.baseUrl}/api/users`, {
                method: 'POST',
                body
            })
            return true
        } catch (error) {
            console.error('error in apiAddUser:', error)
            return false
        }
        
    }

    async apiUserLogin (body: TUserLoginBody){
        if(!body) {
            console.error('error in apiAddUser: body not found')
        }
        try {
            const res = await $fetch<TUserLoginResponse>(`${config.public.baseUrl}/api/users`, {
                method: 'POST',
                body
            })
            return true
        } catch (error) {
            console.error('error in apiAddUser:', error)
            return false
        }
        
    }
}

export const useTest = reactive(new auth());
