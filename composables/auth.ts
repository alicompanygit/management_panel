import { useRuntimeConfig } from '#app';
import { reactive } from 'vue';


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
    id: number
    email: string
    name: string
    is_super_user: boolean
    is_god: boolean
}

type TGetCurrentUser = {
    status: string
    user: TUserModel
}

type  TFetchUsersListResponse = {
    status: string
    page: number
    per_page: number
    total: number
    pages: number
    users: usersListModel
}

type usersListModel = {
    id: number
    public_id: string
    email: string
    name: string
    is_god: boolean
    is_super_user: boolean
    created_at: string
}

interface IAuth {
    user: TUserModel|null
    usersListData: TFetchUsersListResponse|null

    apiAddUser(body: TAddUseBody): Promise<boolean|Record<string,string>>
    apiUserLogin(body: TUserLoginBody): Promise<TUserModel|null>
    apiGetCurrentUser(): Promise<void>
    apiFetchUsersList(pageNumber: number): Promise<void>
    apiAddSuperUser(userId: number): Promise<boolean>
    apiRemoveSuperUser(userId: number): Promise<boolean>
}

export class auth  implements IAuth {
    user: TUserModel|null = null
    usersListData: TFetchUsersListResponse|null = null

    private get config() {
        const cfg = useRuntimeConfig()
        console.log('BASE URL (runtime):', cfg.public.baseUrl)
        return cfg
      }
      
      

    private async fetchWithAuth<T>(
        url: string,
        options: Omit<RequestInit, 'headers'> & { headers?: Record<string, string> } = {},
        notAuthorization?: boolean
    ): Promise<T> {
        const token = localStorage.getItem('token')

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(options.headers ?? {})
        }

        if(!notAuthorization) {
            headers['x-access-tokens'] = token ? `${token}` : '';
        }

        return await $fetch<T>(url, {
            ...options,
            headers,
            method: options.method?.toLowerCase() as
                | 'get'
                | 'post'
                | 'put'
                | 'patch'
                | 'delete'
                | 'head'
                | 'options'
                | undefined
        })
    }


    async apiAddUser (body: TAddUseBody){
        if(!body) {
            console.error('error in apiAddUser: body not found')
        }
        try {
            const res = await this.fetchWithAuth<Record<string,string>>(`${this.config.public.baseUrl}/user_register`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (res.message || res.error) return res
            else return false
        } catch (error) {
            console.error('error in apiAddUser:', error)
            return false
        }
        
    }

    async apiUserLogin (body: TUserLoginBody){
        if(!body) {
            console.error('error in apiUserLogin: body not found')
            return null
        }
        try {
            const res = await this.fetchWithAuth<TUserLoginResponse>(
                `${this.config.public.baseUrl}/login`,
                {
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                },
                true
            )
            if(res.status === 'success' && res.user) {
                this.user = res.user
                localStorage.setItem('token', res.access_token)
                return this.user
            } else return null
        } catch (error) {
            console.error('error in apiUserLogin:', error)
            return null
        }
        
    }

    async apiGetCurrentUser (){
        try {
            const res = await this.fetchWithAuth<TGetCurrentUser>(`${this.config.public.baseUrl}/get_current_user`, {
                method: 'GET',
            })
            if(res.status === 'success' && res.user) {
                this.user = res.user
            }
        } catch (error) {
            console.error('error in apiGetCurrentUser:', error)
            return
        }
        
    }

    async apiFetchUsersList (pageNumber: number){
        try {
            const res = await this.fetchWithAuth<TFetchUsersListResponse>(`${this.config.public.baseUrl}/get_users/${pageNumber}`, {
                method: 'GET',
            })
            if(res.status === 'success') {
                this.usersListData = res
            }
        } catch (error) {
            console.error('error in apiFetchUsersList:', error)
            return
        }
        
    }

    async apiAddSuperUser (userId: number){
        try {
            const res = await this.fetchWithAuth<{status: string, message: string}>(`${this.config.public.baseUrl}/make_super_user/${userId}`, {
                method: 'PUT',
            })
            if(res.status === 'success') {
                return true
            } else {
                console.error('error in apiAddSuperUser:', res.message)
                return false
            } 
        } catch (error) {
            console.error('error in apiAddSuperUser:', error)
            return false
        }
        
    }

    async apiRemoveSuperUser (userId: number){
        try {
            const res = await this.fetchWithAuth<{status: string, message: string}>(`${this.config.public.baseUrl}/remove_super_user/${userId}`, {
                method: 'PUT',
            })
            if(res.status === 'success') {
                return true
            } else {
                console.error('error in apiRemoveSuperUser:', res.message)
                return false
            } 
        } catch (error) {
            console.error('error in apiRemoveSuperUser:', error)
            return false
        }
        
    }
}

export const useAuth = reactive(new auth());
