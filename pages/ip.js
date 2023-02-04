import { NextRequest } from 'next/server'

export default function Ip() {
    const clientIp = NextRequest().headers.get('x-real-ip') || NextRequest().headers.get('x-forwarded-for') || NextRequest().connection.remoteAddress
    return (    <>
        <h2>Your ip is: {clientIp}</h2>
    </>)

}