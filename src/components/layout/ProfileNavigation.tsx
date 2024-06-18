"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export default function ProfileNavigation() {
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {!session ? (
          <User className="text-success-foreground bg-success h-8 w-8 rounded-full p-1" /> 
        ) : (
          <Avatar className="h-8 w-8">
            {session.user.image ? (
              <AvatarImage src={session.user.image} />
            ) : (
              <AvatarFallback className="text-success bg-success-foreground">
                CN
              </AvatarFallback>
            )}
          </Avatar>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          {session ? "Hi, " + session.user?.name : "My Account"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() =>
            window.open("https://github.com/eliasablan/next-futy", "_blank")
          }
          className="cursor-pointer"
        >
          GitHub
        </DropdownMenuItem>
        <DropdownMenuItem disabled>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        {session ? (
          <DropdownMenuItem onClick={() => signOut()}>
            Sign out
            <svg
              className="absolute right-2"
              height="15"
              width="15"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M7.707,8.707,5.414,11H17a1,1,0,0,1,0,2H5.414l2.293,2.293a1,1,0,1,1-1.414,1.414l-4-4a1,1,0,0,1,0-1.414l4-4A1,1,0,1,1,7.707,8.707ZM21,1H13a1,1,0,0,0,0,2h7V21H13a1,1,0,0,0,0,2h8a1,1,0,0,0,1-1V2A1,1,0,0,0,21,1Z"></path>
              </g>
            </svg>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => signIn()}>
            Sign in
            <svg
              className="absolute right-2"
              height="15"
              width="15"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M20,21V3H13a1,1,0,0,1,0-2h8a1,1,0,0,1,1,1V22a1,1,0,0,1-1,1H13a1,1,0,0,1,0-2ZM2,12a1,1,0,0,0,1,1H14.586l-2.293,2.293a1,1,0,1,0,1.414,1.414l4-4a1,1,0,0,0,0-1.414l-4-4a1,1,0,1,0-1.414,1.414L14.586,11H3A1,1,0,0,0,2,12Z"></path>
              </g>
            </svg>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
