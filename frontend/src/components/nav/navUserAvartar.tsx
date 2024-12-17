"use client";

import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useContext, useState } from "react";
import { UserContext } from "../auth/context";
import SignInButton from "../auth/signInButton";
import UserAvartar from "../user/userAvartar";

export default function NavUserAvartar() {
  const { user, logout } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState<any>(null);
  console.log(user);
  if (!user || !user.pk) return <SignInButton />;
  const delay = 1000;
  return (
    <Dropdown isOpen={isOpen}>
      <DropdownTrigger>
        <Button
          variant="light"
          className="px-10 py-5"
          onMouseEnter={() => {
            clearTimeout(timeoutId);
            setIsOpen(true);
          }}
          onMouseLeave={() => {
            const id = setTimeout(() => setIsOpen(false), delay);
            setTimeoutId(id);
          }}
        >
          <UserAvartar user={user.pk} width={40} height={40} />
          <p>{user.username}</p>
        </Button>
        {/* <p>{user.username}</p> */}
      </DropdownTrigger>
      <DropdownMenu
        onMouseEnter={() => {
          clearTimeout(timeoutId);
          setIsOpen(true);
        }}
        onMouseLeave={() => {
          setIsOpen(false);
        }}
      >
        <DropdownSection>
          <DropdownItem
            data-hover
            key={"logout"}
            onPress={() => {
              logout();
            }}
          >
            Logout
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
