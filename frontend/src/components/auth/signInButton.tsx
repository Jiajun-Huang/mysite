"use client";

import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import SignInModal from "./signInModal";

export default function SignInButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <Button onPress={onOpen}>Sign In</Button>
      <SignInModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}
