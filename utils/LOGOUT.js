import React from 'react'
import { useRouter } from 'next/router'

export default function() {
    const router = useRouter()

    localStorage.clear();

    router.push('/login')
}