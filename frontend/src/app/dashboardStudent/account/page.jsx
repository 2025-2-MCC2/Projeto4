'use client';

import ProtectedRoute from "../../components/ProtectedRoute.js";

function AccountModel() {
    return (
        <>

        </>
    );
}

export default function account() {
    return (
        <ProtectedRoute>
            <AccountModel />
        </ProtectedRoute>
    );
}