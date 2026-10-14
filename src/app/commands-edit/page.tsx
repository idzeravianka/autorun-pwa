'use client';
import React, {Suspense} from "react";
import EditCommands from "@/src/components/EditCommands";

export default function CommandsEditPage() {
    return <Suspense>
        <EditCommands></EditCommands>
    </Suspense>
}
