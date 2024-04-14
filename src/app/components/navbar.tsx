"use client";

import React, { useState } from 'react';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/app/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "@/app/components/ui/navigation-menu"
import Link from "next/link"
import { UserButton, useUser } from '@clerk/nextjs';

export default function Navbar() {
    const { user, isLoaded } = useUser();
    console.log("User: ", user);
    console.log("IsLoaded: ", isLoaded);

    return (
        <nav className="flex flex-wrap gap-3 p-4 items-center justify-between shadow-md">
            <div>
                {isLoaded && user &&
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link href="/pages/admin/messages">
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Messages
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/pages/admin/residents">
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Residents
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/pages/admin/contacts">
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Contacts
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/pages/admin/staff">
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Staff
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/pages/admin/invite-list">
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Invite List
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/pages/admin/locations">
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Locations
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/pages/admin/payments">
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Payments
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/pages/admin/folders">
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Folders
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/pages/admin/settings">
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Settings
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/pages/super-admin/organizations">
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Organizations
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                }
            </div>
            <div>
                <UserButton afterSignOutUrl='/sign-in' />
            </div>
        </nav>
    )
}