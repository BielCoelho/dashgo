import { Button, Flex, Stack } from "@chakra-ui/react";
import { Input } from "../components/Forms/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from "next/router";

type SignInFormData = {
  email: string;
  password: string;
}

const singInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório.').email('E-mail inválido.'),
  password: yup.string().required('Senha obrigatória.')
})

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(singInFormSchema)
  });

  const router = useRouter()

  const { errors } = formState;

  console.log(errors);

  const handleSingIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise(resolve => {
      setTimeout(resolve, 1000)
    })
    router.push('/dashboard')
  }

  return (
    <Flex
      w='100vw'
      h='100vh'
      align='center'
      justify='center'
    >
      <Flex
        as='form'
        width='100%'
        maxWidth='360px'
        bg='gray.800'
        p='8'
        borderRadius='8'
        flexDir='column'
        onSubmit={handleSubmit(handleSingIn)}
      >
        <Stack spacing='4'>
          <Input 
            name="email" 
            type="email" 
            label="E-mail"
            error={errors.email}
            {...register('email')}
            />
          <Input 
            name="password" 
            type="password" 
            label="senha" 
            error={errors.password}
            {...register('password')} />
        </Stack>

        <Button type='submit' mt='6' colorScheme='pink' size='lg' isLoading={formState.isSubmitting}>Entrar</Button>
      </Flex>
    </Flex>
  )
}
