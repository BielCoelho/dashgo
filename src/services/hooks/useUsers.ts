import { format } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"
import { useQuery, UseQueryOptions } from "react-query"
import { api } from "../api"

type User = {
    id: string,
    name: string,
    email: string,
    createdAt: string,
}

type GetUserResponse = {
    totalCount: number,
    users: User[]
}

export async function getUsers(page: number): Promise<GetUserResponse> {
    const { data, headers } =  await api.get('users', {
        params: {
            page,
        }
    })

    const totalCount = Number(headers['x-total-count'])

    const users = data.users.map(user => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: format(new Date(user.createdAt), 'PPP', {
                locale: ptBR
            }),
        }
    })
    return {
        users,
        totalCount,
    }
}

export function useUsers(page: number) {
    return useQuery(['users', page], () => getUsers(page),{
        staleTime: 1000 * 60 * 10, // 10 minutes
})}