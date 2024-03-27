import React from 'react'
import { Button, IconButton, Modal, ModalCloseButton, ModalOverlay, useDisclosure, ModalFooter, ModalContent, ModalHeader, ModalBody} from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'
import { Image, Text } from '@chakra-ui/react'

const ProfileModel = ({user, children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
        {
            children ? <span onClick={onOpen}>{children}</span> : <IconButton display={{base:"flex"}} icon={<ViewIcon/>} onClick={onOpen}/>
        }

        <Modal size={"lg"} isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent h={"410px"}>
            <ModalHeader fontSize={"40px"} fontFamily={"Work sans"} display={"flex"} justifyContent={"center"} textTransform={"capitalize"}>{user.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
                <Image borderRadius="full" boxSize="150px" src={user.pic} alt={user.name}/>
                <Text fontSize={{base:"28px", md:"30px"}} fontFamily = "Work sans">Email : {user.email}</Text>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    </>
  )
}

export default ProfileModel