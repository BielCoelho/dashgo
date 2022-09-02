import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
    showProfileData?: boolean;
}

export function Profile({showProfileData = true}: ProfileProps) {
    return (
        <Flex align="center">
          {showProfileData && (  <Box mr="4" textAlign="right">
                <Text>Gabriel Coelho</Text>
                <Text color="gray.300" fontSize="small">
                    gabrielcuei98@gmail.com</Text>
            </Box>
            )}

            <Avatar size="md" name="Gabriel Coelho" src="https://github.com/bielcoelho.png" />
        </Flex>
    )
}