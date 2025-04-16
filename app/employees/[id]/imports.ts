import React from 'react';
import { notFound } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, MailIcon, MapPinIcon, BuildingIcon, UserIcon, BriefcaseIcon, StarIcon } from "lucide-react"
import type {T_Employee} from "@/data/types"
import {formatDate , displayValue } from "@/lib/utils"


export {
    React ,
    notFound,
    Avatar,
    AvatarFallback,
    AvatarImage,
    Badge,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Separator,
    CalendarIcon,
    MailIcon,
    MapPinIcon,
    BuildingIcon,
    UserIcon,
    BriefcaseIcon,
    StarIcon,
    T_Employee,
    formatDate,
    displayValue,
}