import requestIp from 'request-ip'

export default function Ip() {
    const clientIp = requestIp.getClientIp(req); // on localhost >
    return 
    <>
        <h2>Your ip is: {clientIp}</h2>
    </>
}