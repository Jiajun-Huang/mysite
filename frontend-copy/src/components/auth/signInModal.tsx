import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import Devider from "../devider";
import { GithubIcon } from "../icons";
import SignInForm from "./signInForm";
import SocialSignInButton from "./socialSignInButton";

export default function SignInModal({
  isOpen,
  onOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Sign In</ModalHeader>
        <ModalBody>
          <SignInForm />
          <Devider text="Or With" />
          <div className="flex">
            <SocialSignInButton
              icon={GithubIcon}
              text="Github"
              requestUrl="/api/auth/github/url/"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onPress={onOpenChange} variant="light">
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
